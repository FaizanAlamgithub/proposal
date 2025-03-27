// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function ProtectedRoute({ setIsAuthenticated }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       setIsAuthenticated(true);

//       // Redirect only if the user is on login/signup pages
//       if (["/", "/admin-login", "/admin-signup"].includes(location.pathname)) {
//         navigate("/dashboard", { replace: true });
//       }
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [location.pathname]);

//   return null;
// }

// export default ProtectedRoute;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("admin_token"); // Example check

//   return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

// Protected Route for Admin
const ProtectedRouteAdmin = ({ children }) => {
  const isAdminAuthenticated = !!localStorage.getItem("admin_token");
  const isSuperAdminAuthenticated = !!localStorage.getItem("super_admin_token");

  // If super admin is authenticated, redirect to super admin dashboard
  if (isSuperAdminAuthenticated) {
    return <Navigate to="/super-admin-dashboard" replace />;
  }

  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin-login" replace />
  );
};

// Public Route for Admin
const PublicRouteAdmin = ({ children }) => {
  const isAdminAuthenticated = !!localStorage.getItem("admin_token");
  const isSuperAdminAuthenticated = !!localStorage.getItem("super_admin_token");

  if (isSuperAdminAuthenticated) {
    return <Navigate to="/super-admin-dashboard" replace />;
  }

  return isAdminAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Protected Route for Super Admin
const ProtectedRouteSuperAdmin = ({ children }) => {
  const isAdminAuthenticated = !!localStorage.getItem("admin_token");
  const isSuperAdminAuthenticated = !!localStorage.getItem("super_admin_token");

  // If admin is authenticated, redirect to admin dashboard
  if (isAdminAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return isSuperAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/super-admin-login" replace />
  );
};

// Public Route for Super Admin
const PublicRouteSuperAdmin = ({ children }) => {
  const isAdminAuthenticated = !!localStorage.getItem("admin_token");
  const isSuperAdminAuthenticated = !!localStorage.getItem("super_admin_token");

  if (isAdminAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return isSuperAdminAuthenticated ? (
    <Navigate to="/super-admin-dashboard" replace />
  ) : (
    children
  );
};

// Export all route components
export {
  ProtectedRouteAdmin,
  PublicRouteAdmin,
  ProtectedRouteSuperAdmin,
  PublicRouteSuperAdmin,
};
