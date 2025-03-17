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
  Employee,
  EmployeeService,
  EmployeeUpdatePayload,
} from "../../../services/employee.service";
import {
  Department,
  DepartmentService,
} from "../../../services/department.service";

interface EditEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  employee: Employee | null;
}

const EditEmployeeModal = ({
  open,
  onClose,
  onSuccess,
  employee,
}: EditEmployeeModalProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EmployeeUpdatePayload>({
    firstName: "",
    lastName: "",
    email: "",
    departmentId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depts] = await Promise.all([DepartmentService.getDepartments()]);

        setDepartments(depts);
        if (employee) {
          setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            departmentId: employee.department.id,
          });
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchData();
  }, [open, employee]);

  const handleSubmit = async () => {
    if (!employee) return;

    try {
      setError(null);
      await EmployeeService.updateEmployee(employee.id, formData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update employee"
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Employee</DialogTitle>
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
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Update Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModal;
