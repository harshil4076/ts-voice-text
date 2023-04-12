import type { V2_MetaFunction } from "@remix-run/react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};
//Use web speech API to receive speech input and convert it to text


export default function Index() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <>
    <div className="text-4xl text-center">Welcome to Speech to Text</div>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
     <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
       <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </>);
}
