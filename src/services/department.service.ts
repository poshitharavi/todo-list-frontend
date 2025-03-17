import api from "./api";

export interface Department {
  id: number;
  name: string;
}

interface DepartmentsResponse {
  statusCode: number;
  body: {
    departments: Department[];
  };
}

export const DepartmentService = {
  getDepartments: async (): Promise<Department[]> => {
    try {
      const response = await api.get<DepartmentsResponse>("/departments/all");
      if (response.data.statusCode === 200) {
        return response.data.body.departments;
      }
      throw new Error("Failed to fetch departments");
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },
};
