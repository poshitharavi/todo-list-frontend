import api from "./api";

interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
}

interface EmployeesResponse {
  statusCode: number;
  message: string;
  body: {
    employees: Employee[];
  };
}

export const EmployeeService = {
  getEmployees: async (): Promise<Employee[]> => {
    try {
      const response = await api.get<EmployeesResponse>("/users/employees");
      if (response.data.statusCode === 200) {
        return response.data.body.employees;
      }
      throw new Error("Failed to fetch employees");
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },
};
