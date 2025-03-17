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

export interface EmployeeRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  departmentId: number;
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
  registerEmployee: async (payload: EmployeeRegistrationPayload) => {
    try {
      const response = await api.post("/users/employee-register", payload);
      if (response.data.statusCode === 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Registration failed");
    } catch (error) {
      console.error("Error registering employee:", error);
      throw error;
    }
  },
};
