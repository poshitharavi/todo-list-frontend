// src/components/employee/EmployeesDataGrid.tsx
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Assignment, Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Employee } from "../../../services/employee.service";

interface EmployeesDataGridProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onAssignTask: (id: number) => void;
}

const EmployeesDataGrid = ({
  employees,
  onDelete,
  onEdit,
  onAssignTask,
}: EmployeesDataGridProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Employee ID", width: 120 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      renderCell(params) {
        return params.row.department.name;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => onDelete(params.id as number)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => onEdit(params.id as number)}
          showInMenu
        />,
        <Button
          variant="contained"
          size="small"
          startIcon={<Assignment />}
          onClick={() => onAssignTask(params.id as number)}
          sx={{ ml: 1 }}
        >
          Assign Task
        </Button>,
      ],
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "grey.100",
          },
        }}
      />
    </Box>
  );
};

export default EmployeesDataGrid;
