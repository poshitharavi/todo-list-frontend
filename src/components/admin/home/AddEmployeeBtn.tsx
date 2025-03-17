import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface AddEmployeeButtonProps {
  onClick: () => void;
}

const AddEmployeeButton = ({ onClick }: AddEmployeeButtonProps) => {
  return (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={onClick}
      sx={{ mb: 2 }}
    >
      Add Employee
    </Button>
  );
};

export default AddEmployeeButton;
