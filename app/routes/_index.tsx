import type {  ActionArgs, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useState, useEffect, useRef } from 'react';
import { getAnswerFromGptAll } from '~/lib/server';
import { Form, useActionData } from "@remix-run/react";


export const loader: LoaderFunction = async () => {
  return null;
}
export const action  = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const question = body.get('getAnswerFromGptInput') as string;
  const gptResponse = await getAnswerFromGptAll({gptPrompt:question})
    return json({
      data: gptResponse
    })
}
const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const actionData = useActionData()

  useEffect(() => {
    //Only works in chrome
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
  const handleInput= (event:any) => {
    setTranscript(event.target.value)
  }
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <p className='text-2xl font-medium text-slate-500'>Only works in Chrome!</p>
        <p
        className="my-4 bg-grey-100 h-1/3 w-1/2 p-2 overflow-y-auto"
          >{actionData?.data}
      </p>

      <div className='m-4 flex w-full justify-center align-center'>
      <input
        type="text"
        value={transcript}
        onInput={handleInput}
        className="border border-gray-400 rounded h-12 w-1/2 p-2 overflow-y-auto"
     />

      <button
        className={`mx-2 px-4 py-2 rounded-lg text-white h-12 ${
          isListening
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-700'
        } focus:outline-none focus:shadow-outline`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop' : 'Speak..'}
      </button>
      <Form method="post">
      {/*
      Get user input from the voice and submit the form with that string
      */}
      <input type="hidden" name="getAnswerFromGptInput" value={transcript} />
      <button type='submit'
        className='mx-2 px-4 py-2 rounded-lg text-white h-12 bg-green-500'
      >Get Answer</button>
      </Form>
      </div>
    </div>
  );
};

export default SpeechToText;
