import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userData = JSON.parse(localStorage.getItem("vijayansLogin"));
  const isAuthenticated = userData && userData.token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
