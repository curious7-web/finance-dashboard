import React, { createContext, useState, useMemo, useContext } from "react";
import { createTheme } from "@mui/material/styles";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: { main: "#1976d2" },
                background: { default: "#fafafa", paper: "#fff" },
              }
            : {
                // palette values for dark mode
                primary: { main: "#90caf9" },
                background: { default: "#121212", paper: "#121212" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ ...colorMode, theme }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
