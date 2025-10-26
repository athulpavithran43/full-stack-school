"use client";

import { FieldError } from "react-hook-form";
import { useState } from "react";
import SpeechToText from "./SpeechToText";

type SpeechInputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  enableSpeech?: boolean;
  speechPlaceholder?: string;
};

const SpeechInputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
  enableSpeech = false,
  speechPlaceholder,
}: SpeechInputFieldProps) => {
  const [speechValue, setSpeechValue] = useState("");

  const handleSpeechTranscript = (text: string) => {
    setSpeechValue(text);
    // Trigger the input change event to update the form
    const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
    if (input) {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  // Don't show speech input for password fields or hidden fields
  const shouldShowSpeech = enableSpeech && type !== "password" && !hidden;

  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-500">{label}</label>
      
      <div className="flex flex-col gap-2">
        <input
          type={type}
          {...register(name)}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...inputProps}
          defaultValue={defaultValue}
        />
        
        {shouldShowSpeech && (
          <SpeechToText
            onTranscript={handleSpeechTranscript}
            placeholder={speechPlaceholder || `Speak to fill ${label.toLowerCase()}`}
            className="text-xs"
          />
        )}
      </div>
      
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default SpeechInputField;