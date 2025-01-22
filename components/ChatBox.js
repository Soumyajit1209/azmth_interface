"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";
import Recorder from "./Recorder";

const ChatBox = () => {
  const [text, setText] = useState(""); // Holds the chat input
  const [isRecording, setIsRecording] = useState(false); // Tracks if recording is active
  const [priority, setPriority] = useState("text"); // "text" or "voice"
  const [voiceText, setVoiceText] = useState(""); // Holds the voice-to-text result

  // Toggle recording state
  const handleMicToggle = () => {
    if (priority === "voice") {
      setIsRecording((prev) => !prev);
    }
  };

  // Handle priority change
  const handlePriorityChange = (event, newPriority) => {
    if (newPriority !== null) {
      setPriority(newPriority);
      if (newPriority === "text") {
        setIsRecording(false); // Stop recording if switching to text
      }
    }
  };

  // Send message
  const handleSend = () => {
    const messageToSend = priority === "text" ? text : voiceText;
    console.log("Message Sent:", messageToSend);

    // Reset inputs
    setText("");
    setVoiceText("");
    setIsRecording(false);
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
        position: "relative",
        overflow: "hidden",
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
          color: "rgba(255, 255, 255, 0.1)",
          zIndex: 0,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        azmth
      </Box>

      {/* Toggle Priority */}
      <ToggleButtonGroup
        value={priority}
        exclusive
        onChange={handlePriorityChange}
        sx={{ mb: 2, position: "relative", zIndex: 1 }}
      >
        <ToggleButton value="text">Text Priority</ToggleButton>
        <ToggleButton value="voice">Voice Priority</ToggleButton>
      </ToggleButtonGroup>

      {/* Recorder Component (Active only for voice priority) */}
      {priority === "voice" && (
        <Recorder
          isRecording={isRecording}
          setText={setVoiceText}
          sx={{ position: "relative", zIndex: 1 }}
        />
      )}

      {/* Chat History Placeholder */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          color: "#fff",
          position: "relative",
          zIndex: 1,
        }}
      >
        Previous chat messages...
      </Box>

      {/* Text Input Field (Visible only for text priority) */}
      {priority === "text" && (
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={3}
          fullWidth
          placeholder="Type your message..."
          sx={{
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
            borderRadius: 1,
            input: { color: "#ffffff" },
            position: "relative",
            zIndex: 1,
          }}
        />
      )}

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
          disabled={priority === "text"} // Mic disabled for text priority
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </IconButton>

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={
            (priority === "text" && text.trim() === "") ||
            (priority === "voice" && voiceText.trim() === "" && isRecording)
          }
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
