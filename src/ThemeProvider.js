// src/ThemeProvider.js
import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#1976d2" },
            background: {
              default: "#f9f9f9",
              paper: "#fff",
            },
            text: {
              primary: "#000",
              secondary: "#555",
            },
          }
        : {
            primary: { main: "#90caf9" },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#fff",
              secondary: "#bbb",
            },
          }),
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
