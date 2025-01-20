"use client";
import React, { useEffect } from "react";

const Recorder = ({ isRecording, setText }) => {
  useEffect(() => {
    if (!isRecording) return;

    // Browser compatibility
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening for continuous speech
    recognition.interimResults = true; // Get partial results as the user speaks
    recognition.lang = "en-US"; 

    recognition.onresult = (event) => {
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

      if (finalTranscript) {
        setTimeout(() => {
          setText((prev) => prev + finalTranscript);
        }, 500);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      alert("An error occurred during speech recognition.");
    };

    recognition.start(); 

    return () => recognition.stop();
  }, [isRecording, setText]);

  return null;
};

export default Recorder;
