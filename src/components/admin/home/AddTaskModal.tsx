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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CreateTaskPayload, TaskService } from "../../../services/task.service";
import moment from "moment";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  assignedToId?: number;
}

const AddTaskModal = ({
  open,
  onClose,
  onSuccess,
  assignedToId,
}: AddTaskModalProps) => {
  const [priorities, setPriorities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateTaskPayload>({
    name: "",
    description: "",
    dueDate: moment().toISOString(),
    assignedToId: 0, // Initialize with 0
    priority: "",
  });

  useEffect(() => {
    // Update formData when assignedToId changes
    if (assignedToId) {
      setFormData((prev) => ({
        ...prev,
        assignedToId: assignedToId,
      }));
    }
  }, [assignedToId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prioritiesData = await TaskService.getPriorities();
        setPriorities(prioritiesData);
      } catch (err) {
        setError("Failed to load required data");
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchData();
  }, [open]);

  const handleSubmit = async () => {
    try {
      setError(null);
      await TaskService.createTask(formData);
      onSuccess();
      onClose();
      setFormData({
        name: "",
        description: "",
        dueDate: moment().toISOString(),
        assignedToId: 0,
        priority: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Assign New Task</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Task Name"
            margin="normal"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Description"
            margin="normal"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <DateTimePicker
            label="Due Date"
            value={moment(formData.dueDate)}
            onChange={(newValue) => {
              if (newValue) {
                setFormData({
                  ...formData,
                  dueDate: newValue.toISOString(),
                });
              }
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true,
              },
            }}
          />

          {loading ? (
            <CircularProgress size={24} sx={{ mt: 2 }} />
          ) : (
            <TextField
              select
              fullWidth
              label="Priority"
              margin="normal"
              required
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
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
            disabled={
              loading ||
              !formData.name ||
              !formData.dueDate ||
              !formData.priority ||
              !formData.assignedToId
            }
          >
            {loading ? <CircularProgress size={24} /> : "Create Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddTaskModal;
