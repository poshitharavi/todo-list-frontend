import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";

interface User {
  name: string;
  email: string;
  role: string;
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<User>; // Updated return type
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await AuthService.login(email, password);

      if (response.statusCode === 200 && response.body) {
        const userData = response.body;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return userData; // Now matches the Promise<User> return type
      } else {
        throw new Error(response.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
