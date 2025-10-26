"use client";

import { useEffect, useRef, useState } from "react";

export type VoiceRecorderProps = {
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  className?: string;
  buttonClassName?: string;
  autoStopMs?: number; // optional max duration
  lang?: string; // BCP-47 language hint
  prompt?: string; // optional prompt to guide model
};

export default function VoiceRecorder({
  onResult,
  onError,
  className,
  buttonClassName,
  autoStopMs = 60_000,
  lang,
  prompt,
}: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const autoStopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const start = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        try {
          const mimeType = recorder.mimeType || "audio/webm";
          const blob = new Blob(chunksRef.current, { type: mimeType });
          if (blob.size < 1024) {
            setIsRecording(false);
            return;
          }
          setIsSending(true);
          const form = new FormData();
          const ext = mimeType.includes("mp4") ? "m4a" : mimeType.split("/").pop() || "webm";
          form.append("audio", blob, `recording.${ext}`);
          if (lang) form.append("language", lang);
          if (prompt) form.append("prompt", prompt);
          const res = await fetch("/api/transcribe", { method: "POST", body: form });
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            const message = data.error || `Transcription failed (${res.status})`;
            setErrorMessage(message);
            throw new Error(message);
          }
          const data = (await res.json()) as { text?: string };
          if (data.text && onResult) onResult(data.text);
        } catch (err: any) {
          const msg = err?.message || "Failed to transcribe";
          setErrorMessage(msg);
          if (onError) onError(msg);
        } finally {
          setIsSending(false);
          setIsRecording(false);
          // stop tracks
          recorder.stream.getTracks().forEach((t) => t.stop());
        }
      };

      recorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = recorder;

      if (autoStopMs && autoStopMs > 0) {
        if (autoStopTimerRef.current) clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = setTimeout(() => stop(), autoStopMs);
      }
    } catch (err: any) {
      setIsRecording(false);
      const msg = err?.message || "Microphone permission denied";
      setErrorMessage(msg);
      if (onError) onError(msg);
    }
  };

  const stop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => (isRecording ? stop() : start())}
        className={buttonClassName}
        disabled={isSending}
        aria-pressed={isRecording}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        {isSending ? "Transcribing..." : isRecording ? "Stop" : "🎤"}
      </button>
      {errorMessage ? (
        <span className="ml-2 text-red-500 text-xs" role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
