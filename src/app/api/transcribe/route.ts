import { NextResponse } from "next/server";
import OpenAI from "openai";
import { toFile } from "openai/uploads";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY on server" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const audio = formData.get("audio");
    const language = formData.get("language") as string | null;
    const prompt = formData.get("prompt") as string | null;

    if (!(audio instanceof File)) {
      return NextResponse.json(
        { error: "Expected 'audio' file in multipart form-data" },
        { status: 400 }
      );
    }

    const arrayBuffer = await audio.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileForUpload = await toFile(
      buffer,
      audio.name || "recording.webm",
      { type: audio.type || "audio/webm" }
    );

    // Initialize client lazily to avoid build-time env errors
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    // Prefer the modern transcribe model; fall back to whisper-1 if needed
    let text: string | undefined;
    try {
      const res = await openai.audio.transcriptions.create({
        file: fileForUpload,
        model: "gpt-4o-mini-transcribe",
        language: language || undefined,
        prompt: prompt || undefined,
      } as any);
      const out = res as { text?: string };
      text = out.text;
    } catch (err) {
      // Fallback to whisper-1 for broader availability
      const res = await openai.audio.transcriptions.create({
        file: fileForUpload,
        model: "whisper-1",
        language: language || undefined,
        prompt: prompt || undefined,
      } as any);
      const out = res as { text?: string };
      text = out.text;
    }

    if (!text) {
      return NextResponse.json(
        { error: "Transcription failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("/api/transcribe error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
