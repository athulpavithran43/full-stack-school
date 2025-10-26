"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface SpeechToTextProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
  onListeningChange?: (listening: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const SpeechToText = ({
  onTranscript,
  isListening = false,
  onListeningChange,
  disabled = false,
  placeholder = "Click to start speaking...",
  className = "",
}: SpeechToTextProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isCurrentlyListening, setIsCurrentlyListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition settings
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      // Handle recognition results
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        
        if (finalTranscript) {
          onTranscript(finalTranscript);
        }
      };

      // Handle recognition end
      recognitionRef.current.onend = () => {
        setIsCurrentlyListening(false);
        onListeningChange?.(false);
      };

      // Handle recognition errors
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsCurrentlyListening(false);
        onListeningChange?.(false);
      };

      // Handle recognition start
      recognitionRef.current.onstart = () => {
        setError(null);
        setIsCurrentlyListening(true);
        onListeningChange?.(true);
      };
    } else {
      setIsSupported(false);
      setError("Speech recognition is not supported in this browser");
    }
  }, [onTranscript, onListeningChange]);

  const startListening = () => {
    if (recognitionRef.current && !isCurrentlyListening && !disabled) {
      setTranscript("");
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isCurrentlyListening) {
      recognitionRef.current.stop();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    onTranscript("");
  };

  if (!isSupported) {
    return (
      <div className={`text-red-500 text-sm ${className}`}>
        Speech recognition is not supported in this browser
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={isCurrentlyListening ? stopListening : startListening}
          disabled={disabled}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isCurrentlyListening
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <Image
            src={isCurrentlyListening ? "/close.png" : "/message.png"}
            alt={isCurrentlyListening ? "Stop" : "Start"}
            width={16}
            height={16}
          />
          {isCurrentlyListening ? "Stop Listening" : "Start Speaking"}
        </button>
        
        {transcript && (
          <button
            type="button"
            onClick={clearTranscript}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      {transcript && (
        <div className="p-3 bg-gray-50 rounded-md border">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Transcript:</span> {transcript}
          </p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      {!transcript && !isCurrentlyListening && (
        <p className="text-gray-500 text-sm italic">
          {placeholder}
        </p>
      )}

      {isCurrentlyListening && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          Listening...
        </div>
      )}
    </div>
  );
};

export default SpeechToText;