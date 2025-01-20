"use client";
import React from "react";
import { Button } from "@mui/material";

const SubmitButton = ({ text, isRecording }) => {
  const isDisabled = isRecording || text.trim() === "";

  const handleSubmit = () => {
    if (isDisabled) return;
    console.log("Message Sent:", text);
    text("");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isDisabled}
      onClick={handleSubmit}
    >
      Send
    </Button>
  );
};

export default SubmitButton;