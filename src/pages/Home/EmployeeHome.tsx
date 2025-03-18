import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { TaskService, Task } from "../../services/task.service";
import moment from "moment";
import StatusSwitch from "../../components/employee/home/SwitchStatus";

const EmployeeHome = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await TaskService.getMyTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Task Name",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 300,
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            color: "#fff",
            p: 0.5,
            borderRadius: 1,
            width: "80%",
            textAlign: "center",
            backgroundColor:
              params.value === "High"
                ? "#ff1744"
                : params.value === "Medium"
                ? "#ff9100"
                : "#00e676",
          }}
        >
          {params.value}
        </Box>
      ),
      sortable: true,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
      minWidth: 180,
      renderCell(params) {
        return moment(params.value).utc().format("MMM D, YYYY h:mm A");
      },
      sortable: true,
      sortComparator: (v1, v2) =>
        new Date(v1).getTime() - new Date(v2).getTime(),
    },
    {
      field: "isCompleted",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => (
        <StatusSwitch
          taskId={params.row.id}
          initialStatus={params.value}
          onUpdate={(taskId, newStatus) => {
            setTasks((prev) =>
              prev.map((task) =>
                task.id === taskId ? { ...task, isCompleted: newStatus } : task
              )
            );
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, height: "100%", width: "100%" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        My Tasks
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Box
          sx={{
            height: 600,
            width: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "grey.100",
            },
          }}
        >
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: "dueDate", sort: "asc" }],
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default EmployeeHome;
