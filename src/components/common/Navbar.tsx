// src/components/common/Navbar.tsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Logout } from "@mui/icons-material";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; // Don't render navbar if not authenticated

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        {/* Left side - App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo Manager
        </Typography>

        {/* Right side - User Info and Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1">{user.name}</Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
