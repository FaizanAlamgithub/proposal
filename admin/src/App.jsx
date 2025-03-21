// import React from "react";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import { useState } from "react";
// import RefreshHandler from "./components/RefreshHandler";
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
//         <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

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

import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import RefreshHandler from "./components/RefreshHandler";
import CreateProposal from "./components/CreateProposal";
import EditProposal from "./components/EditProposal";
import ShowAllpages from "./ShowAllpages";
import "./index.css";
import Archived from "./components/Archived";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to avoid premature redirection

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Prevents incorrect redirection before authentication is determined
  }

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/admin-login" replace />;
  };

  const downloadPDF = (id) => {
    // console.log("Download PDF called with ID:", id);
    // window.location.href = `/proposal/${id}`;
    window.open(`/proposal/${id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="*" element={<Navigate to="/admin-login" replace />} />
        <Route
          path="/admin-login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/admin-signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
          }
        />
        <Route
          path="/proposal/:id"
          element={<PrivateRoute element={<ShowAllpages />} />}
        />
        <Route
          path="/proposal/archive"
          element={<PrivateRoute element={<Archived />} />}
        />
        <Route
          path="/create-proposal"
          element={<PrivateRoute element={<CreateProposal />} />}
        />
        <Route
          path="/edit-proposal/:id"
          element={<PrivateRoute element={<EditProposal />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
