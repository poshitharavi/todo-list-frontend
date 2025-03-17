import api from "./api";

interface PriorityListResponse {
  statusCode: number;
  body: {
    priorityList: string[];
  };
}

export interface TaskAnalytics {
  userId: number;
  userName: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  expiredTasks: number;
  completionPercentage: number;
}

interface AnalyticsResponse {
  statusCode: number;
  body: {
    analytics: TaskAnalytics[];
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
  getTaskAnalytics: async (): Promise<TaskAnalytics[]> => {
    try {
      const response = await api.get<AnalyticsResponse>("/tasks/analytics");
      if (response.data.statusCode === 200) {
        return response.data.body.analytics;
      }
      throw new Error("Failed to fetch analytics");
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  },
};
