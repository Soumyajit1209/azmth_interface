"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e1e1e",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left side - Logo */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            cursor: "pointer",
            "&:hover": {
              color: "#90caf9", // Hover effect color
            },
          }}
          onClick={() => router.push("/")}
        >
          azmth
        </Typography>

        {/* Middle - Centered Navigation */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Coming Soon (left, invisible) */}
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              opacity: 0, // Invisible
            }}
          >
            Coming Soon
          </Typography>

          {/* Personal Assistance */}
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              cursor: "pointer",
              "&:hover": {
                color: "#90caf9", // Hover effect color
              },
            }}
            onClick={() => router.push("/personalassistance")}
          >
            Personal Assistance
          </Typography>

          {/* Coming Soon (right, invisible) */}
          <Typography
            variant="h6"
            sx={{
              color: "#ffffff",
              opacity: 0, // Invisible
            }}
          >
            Coming Soon
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
