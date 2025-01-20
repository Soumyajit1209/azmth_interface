"use client";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ChatHistory = ({ chatHistory }) => {
    return (
      <Box
        sx={{
          p: 2,
          overflowY: "auto",
          height: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Typography  variant="h6" sx={{ mb: 2 }}>
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
      </Box>
    );
  };
  
  export default ChatHistory;