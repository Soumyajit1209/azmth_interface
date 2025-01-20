import { createTheme } from "@mui/material/styles";

const gradientTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800", // Orange
    },
    secondary: {
      main: "#4caf50", // Green
    },
    background: {
      default: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)",
      paper: "linear-gradient(135deg, #1c1c1c, #2c2c2c)",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    body1: {
      color: "#ffffff",
    },
    body2: {
      color: "#b0b0b0",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #1c1c1c, #2c2c2c)",
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #ff9800, #ff5722)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(135deg, #ff5722, #e65100)",
          },
        },
      },
    },
  },
});

export default gradientTheme;