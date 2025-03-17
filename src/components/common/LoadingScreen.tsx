import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingScreen = ({
  message = "Loading...",
  variant = "spinner",
}: {
  message?: string;
  variant?: "spinner" | "linear";
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "background.paper",
        zIndex: 9999,
        animation: `${fadeIn} 0.3s ease-in`,
      }}
      role="progressbar"
      aria-live="polite"
      aria-label="Loading"
    >
      {variant === "spinner" ? (
        <>
          <CircularProgress
            size={64}
            thickness={4}
            sx={{ mb: 2, color: "primary.main" }}
          />
          <Typography
            variant="h6"
            component="div"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        </>
      ) : (
        <>
          <LinearProgress
            sx={{
              width: "80%",
              maxWidth: 400,
              height: 8,
              borderRadius: 4,
              mb: 2,
            }}
          />
          <Typography variant="body1" component="div" color="text.secondary">
            {message}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LoadingScreen;
