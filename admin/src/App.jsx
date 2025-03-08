import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import RefreshHandler from "./components/RefreshHandler";
import CreateProposal from "./components/CreateProposal";
import EditProposal from "./components/EditProposal";
import ShowAllpages from "./ShowAllpages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/admin-login" />;
  };

  const downloadPDF = (id) => {
    console.log("Download PDF called with ID:", id);
    window.location.href = `/proposal/${id}`;
  };

  return (
    <div>
      <BrowserRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          <Route path="*" element={<Navigate to="/admin-login" replace />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin-signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute element={<Dashboard downloadPDF={downloadPDF} />} />
            }
          />
          <Route path="/proposal/:id" element={<ShowAllpages />} />
          <Route path="/create-proposal" element={<CreateProposal />} />
          <Route path="/edit-proposal/:id" element={<EditProposal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
