// import React from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import { useState } from "react";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import ShowAllpages from "./ShowAllpages";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/admin-login" />;
//   };

//   const downloadPDF = (id) => {
//     console.log("Download PDF called with ID:", id);
//     window.location.href = `/proposal/${id}`;
//   };

//   return (
//     <div>
//       <BrowserRouter>
//         <ProtectedRoute setIsAuthenticated={setIsAuthenticated} />

//         <Routes>
//           <Route path="*" element={<Navigate to="/admin-login" replace />} />
//           <Route path="/admin-login" element={<Login />} />
//           <Route path="/admin-signup" element={<Signup />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
//             }
//           />
//           <Route path="/proposal/:id" element={<ShowAllpages />} />
//           <Route path="/create-proposal" element={<CreateProposal />} />
//           <Route path="/edit-proposal/:id" element={<EditProposal />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import RefreshHandler from "./components/RefreshHandler";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import ShowAllpages from "./ShowAllpages";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("adminToken")
//   );

//   // Effect to check token on load
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     setIsAuthenticated(!!token);
//   }, []);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/admin-login" />;
//   };

//   const downloadPDF = (id) => {
//     console.log("Download PDF called with ID:", id);
//     window.location.href = `/proposal/${id}`;
//   };

//   return (
//     <BrowserRouter>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

//       <Routes>
//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/admin-login" replace />} />

//         {/* Public Routes */}
//         <Route
//           path="/admin-login"
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
//         />
//         <Route
//           path="/admin-signup"
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
//         />

//         {/* Private Routes (Only show when admin is logged in) */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
//           }
//         />
//         <Route
//           path="/proposal/:id"
//           element={<PrivateRoute element={<ShowAllpages />} />}
//         />
//         <Route
//           path="/create-proposal"
//           element={<PrivateRoute element={<CreateProposal />} />}
//         />
//         <Route
//           path="/edit-proposal/:id"
//           element={<PrivateRoute element={<EditProposal />} />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import RefreshHandler from "./components/RefreshHandler";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import ShowAllpages from "./ShowAllpages";

// function App({ downloadPDF }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // Null to avoid premature redirection

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     setIsAuthenticated(!!token);
//   }, []);

//   // Prevent redirection until authentication status is confirmed
//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Show a loader until auth state is determined
//   }

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/admin-login" />;
//   };

//   return (
//     <BrowserRouter>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

//       <Routes>
//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/admin-login" replace />} />

//         {/* Public Routes */}
//         <Route
//           path="/admin-login"
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
//         />
//         <Route
//           path="/admin-signup"
//           element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
//         />

//         {/* Private Routes (Only when admin is logged in) */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
//           }
//         />
//         <Route
//           path="/proposal/:id"
//           element={<PrivateRoute element={<ShowAllpages />} />}
//         />
//         <Route
//           path="/create-proposal"
//           element={<PrivateRoute element={<CreateProposal />} />}
//         />
//         <Route
//           path="/edit-proposal/:id"
//           element={<PrivateRoute element={<EditProposal />} />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import RefreshHandler from "./components/RefreshHandler";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import ShowAllpages from "./ShowAllpages";
// import "./index.css";
// import Archived from "./components/Archived";
// import ResetPassword from "./components/ResetPassword";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to avoid premature redirection

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Prevents incorrect redirection before authentication is determined
//   }

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/admin-login" replace />;
//   };

//   const downloadPDF = (id) => {
//     // console.log("Download PDF called with ID:", id);
//     // window.location.href = `/proposal/${id}`;
//     window.open(`/proposal/${id}`, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <BrowserRouter>
//       <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//       <Routes>
//         <Route path="*" element={<Navigate to="/admin-login" replace />} />
//         <Route
//           path="/admin-login"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
//           }
//         />
//         <Route
//           path="/reset-password"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/login" replace />
//             ) : (
//               <ResetPassword />
//             )
//           }
//         />
//         <Route
//           path="/admin-signup"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
//           }
//         />
//         <Route
//           path="/proposal/:id"
//           element={<PrivateRoute element={<ShowAllpages />} />}
//         />
//         <Route
//           path="/proposal/archive"
//           element={
//             <PrivateRoute element={<Archived downloadPDF={downloadPDF} />} />
//           }
//         />
//         <Route
//           path="/create-proposal"
//           element={<PrivateRoute element={<CreateProposal />} />}
//         />
//         <Route
//           path="/edit-proposal/:id"
//           element={<PrivateRoute element={<EditProposal />} />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import RefreshHandler from "./components/RefreshHandler";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import ShowAllpages from "./ShowAllpages";
// import "./index.css";
// import Archived from "./components/Archived";
// import ResetPassword from "./components/ResetPassword";
// import { AppcontextProvider } from "./context/AppContext"; // ✅ Import AppcontextProvider
// import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
// import SuperAdminLogin from "./SuperAdmin/SuperAdminLogin";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to avoid premature redirection

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Prevents incorrect redirection before authentication is determined
//   }

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/admin-login" replace />;
//   };

//   const downloadPDF = (id) => {
//     window.open(`/proposal/${id}`, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <AppcontextProvider>
//       {" "}
//       {/* ✅ Wrap entire application inside context provider */}
//       <BrowserRouter>
//         <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
//         <Routes>
//           <Route path="*" element={<Navigate to="/admin-login" replace />} />
//           <Route
//             path="/admin-login"
//             element={
//               isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
//             }
//           />
//           <Route
//             path="/super-admin-login"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/super-admin-dashboard" replace />
//               ) : (
//                 <SuperAdminLogin />
//               )
//             }
//           />
//           <Route
//             path="/reset-password"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/login" replace />
//               ) : (
//                 <ResetPassword />
//               )
//             }
//           />
//           <Route
//             path="/admin-signup"
//             element={
//               isAuthenticated ? (
//                 <Navigate to="/dashboard" replace />
//               ) : (
//                 <Signup />
//               )
//             }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
//             }
//           />
// <Route
//   path="/proposal/:id"
//   element={<PrivateRoute element={<ShowAllpages />} />}
// />
//           <Route
//             path="/proposal/archive"
//             element={
//               <PrivateRoute element={<Archived downloadPDF={downloadPDF} />} />
//             }
//           />
//           <Route
//             path="/create-proposal"
//             element={<PrivateRoute element={<CreateProposal />} />}
//           />
//           <Route
//             path="/edit-proposal/:id"
//             element={<PrivateRoute element={<EditProposal />} />}
//           />
//           <Route
//             path="/super-admin-dashboard"
//             element={<PrivateRoute element={<SuperAdminDashboard />} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </AppcontextProvider>
//   );
// }

// export default App;

// import React from "react";
// import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import CreateProposal from "./components/CreateProposal";
// import EditProposal from "./components/EditProposal";
// import Archived from "./components/Archived";
// import "./index.css";
// import SuperAdminLogin from "./SuperAdmin/SuperAdminLogin";
// import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";

// // Protected Route component to check authentication
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("admin_token");
//   return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
// };

// // Public Route component to prevent access when authenticated
// const PublicRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("admin_token");
//   return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
// };

// // Protected Route component to check authentication
// const ProtectedRouteSuperAdmin = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("super_admin_token");
//   return isAuthenticated ? (
//     children
//   ) : (
//     <Navigate to="/super-admin-login" replace />
//   );
// };

// // Public Route component to prevent access when authenticated
// const PublicRouteSuperAdmin = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("super_admin_token");
//   return isAuthenticated ? (
//     <Navigate to="/super-admin-dashboard" replace />
//   ) : (
//     children
//   );
// };

// function App() {
//   const downloadPDF = (id) => {
//     window.open(`/proposal/${id}`, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route
//           path="/admin-login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/super-admin-login"
//           element={
//             <PublicRouteSuperAdmin>
//               <SuperAdminLogin />
//             </PublicRouteSuperAdmin>
//           }
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard downloadPDF={downloadPDF} />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Navigate to="/dashboard" replace />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/proposal/archive"
//           element={
//             <ProtectedRoute>
//               <Archived downloadPDF={downloadPDF} />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/create-proposal"
//           element={
//             <ProtectedRoute>
//               <CreateProposal />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/edit-proposal/:id"
//           element={
//             <ProtectedRoute>
//               <EditProposal />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/super-admin-dashboard"
//           element={
//             <ProtectedRouteSuperAdmin>
//               <SuperAdminDashboard />
//             </ProtectedRouteSuperAdmin>
//           }
//         />

//         {/* Catch-all for any other route */}
//         <Route
//           path="*"
//           element={
//             localStorage.getItem("admin_token") ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/admin-login" replace />
//             )
//           }
//         />
//         <Route
//           path="*"
//           element={
//             localStorage.getItem("super_admin_token") ? (
//               <Navigate to="/super-admin-dashboard" replace />
//             ) : (
//               <Navigate to="/super-admin-login" replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateProposal from "./components/CreateProposal";
import EditProposal from "./components/EditProposal";
import Archived from "./components/Archived";
import SuperAdminLogin from "./SuperAdmin/SuperAdminLogin";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import {
  ProtectedRouteAdmin,
  PublicRouteAdmin,
  ProtectedRouteSuperAdmin,
  PublicRouteSuperAdmin,
} from "./components/ProtectedRoute"; // Import from ProtectedRoute.jsx
import "./index.css";
import Signup from "./components/Signup";
import ShowAllpages from "./ShowAllpages";
import { AppcontextProvider } from "./context/AppContext";
import ResetAdminCredentials from "./ResetPasswordEmail/ResetAdminCredentials";
import ResetSuperAdminCredentials from "./ResetPasswordEmail/ResetSuperAdminCredentials";

function App() {
  const downloadPDF = (id) => {
    window.open(`/proposal/${id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <BrowserRouter>
      <AppcontextProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/admin-login"
            element={
              <PublicRouteAdmin>
                <Login />
              </PublicRouteAdmin>
            }
          />
          <Route
            path="/super-admin-login"
            element={
              <PublicRouteSuperAdmin>
                <SuperAdminLogin />
              </PublicRouteSuperAdmin>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteAdmin>
                <Dashboard downloadPDF={downloadPDF} />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/proposal/archive"
            element={
              <ProtectedRouteAdmin>
                <Archived downloadPDF={downloadPDF} />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/create-proposal"
            element={
              <ProtectedRouteAdmin>
                <CreateProposal />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/edit-proposal/:id"
            element={
              <ProtectedRouteAdmin>
                <EditProposal />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="/proposal/:id"
            element={
              <ProtectedRouteAdmin>
                <ShowAllpages />
              </ProtectedRouteAdmin>
            }
          />

          {/* Super Admin Protected Routes */}
          <Route
            path="/super-admin-dashboard"
            element={
              <ProtectedRouteSuperAdmin>
                <SuperAdminDashboard />
              </ProtectedRouteSuperAdmin>
            }
          />
          <Route
            path="/admin-signup"
            element={
              <ProtectedRouteSuperAdmin>
                <Signup />
              </ProtectedRouteSuperAdmin>
            }
          />
          <Route
            path="/reset-admin-credentials/:id"
            element={
              <ProtectedRouteSuperAdmin>
                <ResetAdminCredentials />
              </ProtectedRouteSuperAdmin>
            }
          />
          <Route
            path="/reset-superadmin-credentials"
            element={
              <ProtectedRouteSuperAdmin>
                <ResetSuperAdminCredentials />
              </ProtectedRouteSuperAdmin>
            }
          />

          {/* Root Route */}
          <Route
            path="/"
            element={
              localStorage.getItem("super_admin_token") ? (
                <Navigate to="/super-admin-dashboard" replace />
              ) : localStorage.getItem("admin_token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* Catch-all Route */}
          <Route
            path="*"
            element={
              localStorage.getItem("super_admin_token") ? (
                <Navigate to="/super-admin-dashboard" replace />
              ) : localStorage.getItem("admin_token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />
        </Routes>
      </AppcontextProvider>
    </BrowserRouter>
  );
}

export default App;
