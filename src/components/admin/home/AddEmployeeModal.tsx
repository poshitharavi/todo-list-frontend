import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Department,
  DepartmentService,
} from "../../../services/department.service";
import {
  EmployeeRegistrationPayload,
  EmployeeService,
} from "../../../services/employee.service";

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddEmployeeModal = ({
  open,
  onClose,
  onSuccess,
}: AddEmployeeModalProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeRegistrationPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    departmentId: 0,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchDepartments();
  }, [open]);

  const handleSubmit = async () => {
    try {
      setError(null);
      await EmployeeService.registerEmployee(formData);
      onSuccess();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        departmentId: 0,
      });
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to register employee"
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Employee</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="First Name"
          margin="normal"
          required
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Last Name"
          margin="normal"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {loading ? (
          <CircularProgress size={24} sx={{ mt: 2 }} />
        ) : (
          <TextField
            select
            fullWidth
            label="Department"
            margin="normal"
            required
            value={formData.departmentId}
            onChange={(e) =>
              setFormData({
                ...formData,
                departmentId: Number(e.target.value),
              })
            }
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.departmentId}
        >
          {loading ? <CircularProgress size={24} /> : "Create Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
