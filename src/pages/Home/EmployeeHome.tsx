import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Container } from "@mui/material";

const EmployeeHome = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Employee Dashboard</h1>
      <p>Welcome {user?.name}</p>
      {/* Employee-specific content */}
    </Container>
  );
};

export default EmployeeHome;
