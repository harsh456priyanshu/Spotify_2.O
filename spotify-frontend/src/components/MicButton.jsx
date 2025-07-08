import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


const MicButton = ({ onVoice }) => {
  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      console.log('Recognized:', voiceText);
      onVoice(voiceText);
    };

    recognition.onerror = (event) => {
      alert('Voice recognition error: ' + event.error);
    };
  };

  return (
    <button
      onClick={handleVoice}
      className="text-green-700 hover:text-black text-2xl  hover:scale-102  px-6 py-3 outline-0 rounded-full  border-b w-1/4'"
    >
      <FontAwesomeIcon icon={faMicrophone} size="lg" />
    </button>
  );
};

export default MicButton;
