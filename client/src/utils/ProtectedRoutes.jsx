import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const client = null;

  return client ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
