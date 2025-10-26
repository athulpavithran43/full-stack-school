"use client";

import { useState } from "react";
import SpeechToText from "@/components/SpeechToText";
import SpeechInputField from "@/components/SpeechInputField";
import { useForm } from "react-hook-form";

const SpeechDemoPage = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleTranscript = (text: string) => {
    setTranscript(text);
  };

  const handleListeningChange = (listening: boolean) => {
    setIsListening(listening);
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        AI Speech-to-Text Feature Demo
      </h1>
      
      <div className="space-y-8">
        {/* Basic Speech-to-Text Component */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Speech-to-Text</h2>
          <p className="text-gray-600 mb-4">
            Click the button below to start speaking. Your speech will be converted to text in real-time.
          </p>
          
          <SpeechToText
            onTranscript={handleTranscript}
            isListening={isListening}
            onListeningChange={handleListeningChange}
            placeholder="Try saying: Hello, this is a speech-to-text demo!"
          />
          
          {transcript && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="font-medium text-blue-900 mb-2">Captured Text:</h3>
              <p className="text-blue-800">{transcript}</p>
            </div>
          )}
        </div>

        {/* Form with Speech Input Fields */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Form with Speech Input</h2>
          <p className="text-gray-600 mb-4">
            This form demonstrates how speech-to-text is integrated into input fields. 
            Click the microphone icon next to any text field to start speaking.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpeechInputField
                label="Full Name"
                name="fullName"
                register={register}
                error={errors.fullName as any}
                enableSpeech={true}
                speechPlaceholder="Speak your full name"
              />
              
              <SpeechInputField
                label="Email Address"
                name="email"
                register={register}
                error={errors.email as any}
                enableSpeech={true}
                speechPlaceholder="Speak your email address"
              />
              
              <SpeechInputField
                label="Phone Number"
                name="phone"
                register={register}
                error={errors.phone as any}
                enableSpeech={true}
                speechPlaceholder="Speak your phone number"
              />
              
              <SpeechInputField
                label="Address"
                name="address"
                register={register}
                error={errors.address as any}
                enableSpeech={true}
                speechPlaceholder="Speak your address"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
              <textarea
                {...register("notes")}
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={4}
                placeholder="You can also type here normally..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Features and Instructions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Features & Instructions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">✅ Features</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Real-time speech recognition</li>
                <li>• Visual feedback during listening</li>
                <li>• Clear transcript display</li>
                <li>• Error handling and user feedback</li>
                <li>• Browser compatibility detection</li>
                <li>• Easy integration with forms</li>
                <li>• Customizable placeholders</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">📋 How to Use</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>1. Click &quot;Start Speaking&quot; button</li>
                <li>2. Allow microphone access when prompted</li>
                <li>3. Speak clearly into your microphone</li>
                <li>4. Watch the transcript appear in real-time</li>
                <li>5. Click &quot;Stop Listening&quot; when finished</li>
                <li>6. Use &quot;Clear&quot; to reset the transcript</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <h4 className="font-medium text-yellow-900 mb-2">⚠️ Browser Requirements</h4>
            <p className="text-sm text-yellow-800">
              This feature requires a modern browser with Web Speech API support. 
              Chrome, Edge, and Safari are recommended. Make sure you have a working microphone.
            </p>
          </div>
        </div>

        {/* Integration Examples */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Integration Examples</h2>
          <p className="text-gray-600 mb-4">
            The speech-to-text feature is already integrated into all forms in the application:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Student Forms</h4>
              <p className="text-sm text-gray-600">
                Username, email, first name, last name, phone, and address fields all support speech input.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Teacher Forms</h4>
              <p className="text-sm text-gray-600">
                Similar to student forms, with speech input for personal information fields.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Class Forms</h4>
              <p className="text-sm text-gray-600">
                Class name field supports speech input for easy class creation.
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">Subject & Exam Forms</h4>
              <p className="text-sm text-gray-600">
                Subject names and exam titles can be entered via speech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechDemoPage;