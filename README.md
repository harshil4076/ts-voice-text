
# SpeechToText
This component allows users to use their microphone to input text into a text field using the Web Speech API.

# How to use
To use the SpeechToText component, simply include it in your React project and render it. The component will display a single button that toggles between "Ask" and "Stop" depending on whether the Web Speech API is listening for input.

When the "Ask" button is clicked, the Web Speech API will start listening for input from the user's microphone. As the user speaks, the transcript of their speech will be displayed in a text field below the button. When the user clicks the "Stop" button or stops speaking, the Web Speech API will stop listening and the transcript will be finalized.

Props
This component does not take any props.

Example Usage

```
import React from 'react';
import SpeechToText from './SpeechToText';

function App() {
  return (
    <div className="App">
      <SpeechToText />
    </div>
  );
}

export default App;

```

In this example, the SpeechToText component is imported and rendered in the App component. The component will display a button that the user can click to start and stop the Web Speech API, and a text field below the button that will display the transcript of the user's speech.

# How it works
The SpeechToText component uses React's state and useEffect hooks to initialize and manage the Web Speech API. When the component is rendered, it creates a new SpeechRecognition object and sets its properties to allow for continuous input and interim results.

When the user clicks the "Ask" button, the component sets the isListening state to true and calls the start() method on the SpeechRecognition object, which begins listening for user input. As the user speaks, the onresult method of the SpeechRecognition object is called and the transcript of the user's speech is extracted from the results and stored in state.

When the user clicks the "Stop" button or stops speaking, the component sets the isListening state to false and calls the stop() method on the SpeechRecognition object, which stops listening for user input and finalizes the transcript.

The transcript of the user's speech is then displayed in a text field below the button, and the component waits for the user to click the "Ask" button again to start a new session of listening.