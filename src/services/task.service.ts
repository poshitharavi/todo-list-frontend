import api from "./api";

interface PriorityListResponse {
  statusCode: number;
  body: {
    priorityList: string[];
  };
}

export interface CreateTaskPayload {
  name: string;
  description: string;
  dueDate: string; // ISO date string
  assignedToId: number;
  priority: string;
}

export const TaskService = {
  getPriorities: async (): Promise<string[]> => {
    try {
      const response = await api.get<PriorityListResponse>(
        "/tasks/priority-list"
      );
      if (response.data.statusCode === 200) {
        return response.data.body.priorityList;
      }
      throw new Error("Failed to fetch priorities");
    } catch (error) {
      console.error("Error fetching priorities:", error);
      throw error;
    }
  },

  createTask: async (payload: CreateTaskPayload) => {
    try {
      const response = await api.post("/tasks/new", payload);
      if (response.data.statusCode === 200) {
        return response.data;
      }
      throw new Error(response.data.message || "Task creation failed");
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
};
