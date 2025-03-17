import api from "./api";

interface LoginResponse {
  statusCode: number;
  message: string;
  body?: {
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await api.post("/users/login", { email, password });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response?.data || { message: "An error occurred" };
    }
  },
};
