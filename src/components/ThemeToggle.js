// src/components/ThemeToggle.js
import React from "react";
import { IconButton, Box, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../ThemeProvider";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        bgcolor: "background.paper",
        borderRadius: "50%",
        boxShadow: 3,
        zIndex: 1300,
      }}
    >
      <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
        <IconButton onClick={toggleTheme} color="primary" aria-label="toggle theme">
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
