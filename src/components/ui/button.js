// src/components/ui/button.js
import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ children, variant = "contained", onClick, fullWidth = false, sx = {}, type = "button" }) => {
  return (
    <MuiButton
      variant={variant}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        fontWeight: 600,
        ...sx,
      }}
      type={type}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
