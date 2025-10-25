import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import UserDashboard from "./dashboards/UserDashboard";
import CollectorDashboard from "./dashboards/CollectorDashboard";
import NGODashboard from "./dashboards/NGODashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  switch (user?.role) {
    case "user":
      return <UserDashboard />;
    case "collector":
      return <CollectorDashboard />;
    case "ngo":
      return <NGODashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

export default Dashboard;
