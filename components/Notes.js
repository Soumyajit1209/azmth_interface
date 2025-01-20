
"use client";
import { Box, Typography } from '@mui/material';

const Notes = ({ notes }) => {
    return (
      <Box
        sx={{
          p: 2,
          overflowY: "auto",
          height: "100%",
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
    );
  };
  
  export default Notes;