import { Container, CssBaseline, Box, Avatar, Typography } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
