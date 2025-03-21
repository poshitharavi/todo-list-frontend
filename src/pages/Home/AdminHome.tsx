// src/pages/AdminHome/index.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddEmployeeButton from "../../components/admin/home/AddEmployeeBtn";
import EmployeesDataGrid from "../../components/admin/home/EmployeesDataGrid";
import { Employee, EmployeeService } from "../../services/employee.service";
import AddEmployeeModal from "../../components/admin/home/AddEmployeeModal";
import EditEmployeeModal from "../../components/admin/home/EditEmployeeModal";
import AddTaskModal from "../../components/admin/home/AddTaskModal";
import { TaskAnalytics, TaskService } from "../../services/task.service";
import AnalyticsCard from "../../components/admin/home/AnalyticsCard";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedAssignedId, setSelectedAssignedId] = useState<number | null>(
    null
  );
  const [analyticsData, setAnalyticsData] = useState<TaskAnalytics[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

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

    const fetchAnalytics = async () => {
      try {
        const data = await TaskService.getTaskAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setAnalyticsError("Failed to load analytics data");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
    fetchEmployees();
  }, []);

  const handleEditEmployeeSuccess = async () => {
    try {
      const data = await EmployeeService.getEmployees();
      setEmployees(data);
      setSuccessMessage(
        selectedEmployee
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
    } catch (err) {
      setError("Failed to refresh employee list");
    }
  };

  const handleNewTaskSuccess = async () => {
    try {
      // Add task list refresh logic if needed
      setSuccessMessage("Task created successfully!");
    } catch (err) {
      setError("Failed to refresh data");
    }
  };

  const handleNewEmployeeSuccessMessage = async () => {
    try {
      const data = await EmployeeService.getEmployees();
      setEmployees(data);
      setSuccessMessage("Employee added successfully!");
    } catch (err) {
      setError("Failed to refresh employee list");
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);

    setTabValue(newValue);
  };

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setEmployeeToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleEdit = (id: number) => {
    const employee = employees.find((e) => e.id === id);
    if (employee) {
      setSelectedEmployee(employee);
      setIsEditModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;

    try {
      setIsDeleting(true);
      await EmployeeService.deleteEmployee(employeeToDelete);
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeToDelete));
      setSuccessMessage("Employee deleted successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete employee"
      );
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleAssignTask = (employeeId: number) => {
    setSelectedAssignedId(employeeId);
    setIsTaskModalOpen(true);
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
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(null)}
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
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
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Task Analytics Overview
          </Typography>

          {analyticsLoading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : analyticsError ? (
            <Alert severity="error">{analyticsError}</Alert>
          ) : analyticsData.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No analytics data available
            </Typography>
          ) : (
            analyticsData.map((analytics) => (
              <AnalyticsCard key={analytics.userId} analytics={analytics} />
            ))
          )}
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
      <AddEmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleNewEmployeeSuccessMessage}
      />
      <EditEmployeeModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditEmployeeSuccess}
        employee={selectedEmployee}
      />
      <AddTaskModal
        open={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedAssignedId(null);
        }}
        onSuccess={handleNewTaskSuccess}
        assignedToId={selectedAssignedId || undefined}
      />
    </Container>
  );
};

export default AdminHome;
