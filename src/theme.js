import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // default mode, can be overridden dynamically
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ac3b61",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

export default theme;
