import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/common/LoadingScreen";

interface PrivateRouteProps {
  children: JSX.Element;
  roles?: string[]; // Add role-based protection
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  if (roles && !roles.includes(user?.role!)) {
    const redirectPath = user?.role === "admin" ? "/admin" : "/employee";
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default PrivateRoute;
