import { useState } from "react";
import { TaskService } from "../../../services/task.service";
import { Box, Switch } from "@mui/material";

const StatusSwitch = ({
  taskId,
  initialStatus,
  onUpdate,
}: {
  taskId: number;
  initialStatus: boolean;
  onUpdate: (taskId: number, newStatus: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked;
    setLoading(true);
    try {
      await TaskService.updateStatus(taskId, newStatus);
      setStatus(newStatus);
      onUpdate(taskId, newStatus);
    } catch (error) {
      setStatus(initialStatus); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" height="100%">
      <Switch
        checked={status}
        onChange={handleChange}
        disabled={loading}
        color={status ? "success" : "default"}
      />
    </Box>
  );
};

export default StatusSwitch;
