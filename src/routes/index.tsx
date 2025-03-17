import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminHome from "../pages/Home/AdminHome";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import EmployeeHome from "../pages/Home/EmployeeHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "admin",
        element: (
          <PrivateRoute roles={["admin"]}>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <PrivateRoute roles={["employee"]}>
            <EmployeeHome />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
