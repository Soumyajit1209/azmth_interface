"use client";
import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ChatBox from "../components/ChatBox";
import Navbar from "@/components/Navbar";

export default function Home() {
  //const [chatHistory, setChatHistory] = useState(["Hello world"]);
  const [notes, setNotes] = useState([]);

  return (

    <Stack
      direction="column"
      spacing={0}
      sx={{
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Navbar at the top */}
      <Box>
        <Navbar />
      </Box>
    <Stack
      direction="row"
      spacing={2}
      sx={{
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/*Chat History - Left Side*/}
      {/* <Box
        sx={{
          width: "20%",
          p: 2,
          borderRight: "1px solid #444",
          overflowY: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chat History
        </Typography>
        {chatHistory.map((message, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              mb: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              bgcolor: "background.default",
            }}
          >
            {message}
          </Box>
        ))}
      </Box> */}

      {/* Chat Box - Center */}
      <Box sx={{ flex: 1, p: 2 }}>
        <ChatBox />
      </Box>

      {/* Notes - Right Side */}
      <Box
        sx={{
          width: "20%",
          p: 2,
          borderLeft: "1px solid #444",
          overflowY: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Notes
        </Typography>
        {notes.map((note, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              mb: 1,
              border: "1px solid #ccc",
              borderRadius: 1,
              bgcolor: "background.default",
            }}
          >
            {note}
          </Box>
        ))}
      </Box>
    </Stack>
  </Stack>
  );
}

