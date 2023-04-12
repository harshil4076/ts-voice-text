import { useState, useEffect, useRef } from 'react';

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        setTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current?.start();
    } else {
      setIsListening(false);
      recognitionRef.current?.stop();
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        className={`px-4 py-2 rounded-lg text-white ${
          isListening
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-700'
        } focus:outline-none focus:shadow-outline`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop' : 'Ask'}
      </button>
      <p
        className="my-4 border-2 border-gray-400 h-1/2 w-1/2 p-2 overflow-y-auto"
      >
      {transcript}</p>
    </div>
  );
};

export default SpeechToText;
