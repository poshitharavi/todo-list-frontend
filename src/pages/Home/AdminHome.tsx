import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Container } from "@mui/material";

const AdminHome = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user?.name}</p>
    </Container>
  );
};

export default AdminHome;
