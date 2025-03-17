import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Outlet />
    </div>
  );
};

export default App;
