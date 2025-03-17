import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
