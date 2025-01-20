"use client";
import React, { useState } from "react";
import { Box, TextField, IconButton, Stack, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";
import Recorder from "./Recorder";

const ChatBox = () => {
  const [text, setText] = useState(""); // Holds the chat input
  const [isRecording, setIsRecording] = useState(false); // Tracks if recording is active

  const handleMicToggle = () => setIsRecording((prev) => !prev); // Start/Stop recording

  const handleSend = () => {
    console.log("Message Sent:", text);
    setText(""); // Clear the text field after sending
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        position: "relative", // Ensure children can use absolute positioning
        overflow: "hidden", // Prevent overflow of background text
        background: "linear-gradient(135deg, #000000, #1a1a1a, #333333)",
      }}
    >
      {/* Background Text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "8rem",
          fontWeight: "bold",
          color: "rgba(255, 255, 255, 0.1)", // Subtle text for background
          zIndex: 0, // Ensure it's behind other elements
          pointerEvents: "none", // Allow clicks to pass through
          userSelect: "none", // Prevent text selection
        }}
      >
        azmth
      </Box>

      {/* Recorder Component */}
      <Recorder isRecording={isRecording} setText={setText} />

      {/* Chat History Placeholder */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          color: "#fff",
          position: "relative",
          zIndex: 1, // Bring chat content above background text
        }}
      >
        Previous chat messages...
      </Box>

      {/* Input Field */}
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={3}
        fullWidth
        placeholder="Type your message or use the mic..."
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
          borderRadius: 1,
          input: { color: "#ffffff" },
          position: "relative",
          zIndex: 1, 
        }}
      />

      {/* Controls */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 2, position: "relative", zIndex: 1 }}
      >
        <IconButton
          onClick={handleMicToggle}
          color={isRecording ? "error" : "primary"}
          sx={{ fontSize: "5rem" }}
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={text.trim() === "" && isRecording}
          onClick={handleSend}
          sx={{
            background: "linear-gradient(135deg, #ff9800, #ff5722)",
            "&:hover": {
              background: "linear-gradient(135deg, #ff5722, #e65100)",
            },
          }}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatBox;
