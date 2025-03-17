// src/pages/AdminHome/index.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddEmployeeButton from "../../components/admin/home/AddEmployeeBtn";
import EmployeesDataGrid from "../../components/admin/home/EmployeesDataGrid";
import { Employee, EmployeeService } from "../../services/employee.service";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminHome = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployees(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddEmployee = () => {
    // Implement add employee logic
    console.log("Add employee clicked");
  };

  const handleDelete = (id: number) => {
    // Implement delete logic
    console.log("Delete employee:", id);
  };

  const handleEdit = (id: number) => {
    // Implement edit logic
    console.log("Edit employee:", id);
  };

  const handleAssignTask = (id: number) => {
    // Implement task assignment
    console.log("Assign task to employee:", id);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Admin Dashboard</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back, {user?.name}
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Analytics" {...a11yProps(0)} />
            <Tab label="Employee Management" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ p: 3, height: 600 }}>
            <Typography variant="h5" gutterBottom>
              Analytics Overview
            </Typography>
            <Typography color="text.secondary">
              Analytics dashboard coming soon
            </Typography>
            {/* Add analytics components here */}
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Employee Management
            </Typography>
            <AddEmployeeButton onClick={handleAddEmployee} />
          </Box>
          <EmployeesDataGrid
            employees={employees}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAssignTask={handleAssignTask}
          />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default AdminHome;
