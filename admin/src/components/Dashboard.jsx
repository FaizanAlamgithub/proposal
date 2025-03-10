// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// function Dashboard() {
//   const [loggedInAdmin, setLoggedInAdmin] = useState("");
//   const [proposals, setProposals] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     handleSuccess("Admin Logged out");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1000);
//   };

//   const fetchProposals = async () => {
//     try {
//       const url = "http://localhost:5000/api/proposals/?admin=true"; // Ensure admin view
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: localStorage.getItem("token"),
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch proposals");
//       }

//       const result = await response.json();
//       setProposals(result);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProposals();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1>{loggedInAdmin}</h1>
//       <h2 className="mb-4">Admin Panel - Proposals</h2>
//       <button onClick={handleLogout} className="btn btn-secondary mb-3">
//         Logout
//       </button>

//       {/* Create Proposal Button */}
//       <button
//         onClick={() => navigate("/create-proposal")}
//         className="btn btn-primary mb-3 ms-2"
//       >
//         + Create Proposal
//       </button>

//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Company Name</th>
//             <th>Client Name</th>
//             <th>Created Date</th> {/* Added Created Date Column */}
//             <th>Expiry Date</th>
//             <th>Proposal ID</th>
//             <th>Password</th>
//           </tr>
//         </thead>
//         <tbody>
//           {proposals.length > 0 ? (
//             proposals.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.companyName}</td>
//                 <td>{item.clientName}</td>
//                 <td>{new Date(item.createdAt).toDateString()}</td>
//                 {/* Created Date */}
//                 <td>{new Date(item.expiryDate).toDateString()}</td>
//                 <td>{item._id}</td>
//                 <td>{item.proposalPassword}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No proposals found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer } from "react-toastify";

// function Dashboard({ downloadPDF }) {
//   const [loggedInAdmin, setLoggedInAdmin] = useState("");
//   const [proposals, setProposals] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     handleSuccess("Admin Logged out");
//     setTimeout(() => {
//       navigate("/login");
//     }, 1000);
//   };

//   const fetchProposals = async () => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const url = "http://localhost:5000/api/proposals/?admin=true";

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch proposals");
//       }

//       const result = await response.json();
//       if (!Array.isArray(result)) {
//         throw new Error("Invalid response format");
//       }

//       setProposals(result);
//     } catch (error) {
//       handleError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProposals();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1>{loggedInAdmin}</h1>
//       <h2 className="mb-4">Admin Panel - Proposals</h2>
//       <button onClick={handleLogout} className="btn btn-secondary mb-3">
//         Logout
//       </button>

//       <button
//         onClick={() => navigate("/create-proposal")}
//         className="btn btn-primary mb-3 ms-2"
//       >
//         + Create Proposal
//       </button>

//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Company Name</th>
//             <th>Client Name</th>
//             <th>Created Date</th>
//             <th>Expiry Date</th>
//             <th>Proposal ID</th>
//             <th>Password</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {proposals.length > 0 ? (
//             proposals.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.companyName}</td>
//                 <td>{item.clientName}</td>
//                 <td>
//                   {item.createdAt
//                     ? new Date(item.createdAt).toDateString()
//                     : "N/A"}
//                 </td>
//                 <td>
//                   {item.expiryDate
//                     ? new Date(item.expiryDate).toDateString()
//                     : "N/A"}
//                 </td>
//                 <td>{item._id}</td>
//                 <td>{item.proposalPassword}</td>
//                 <td>
//                   <button
//                     onClick={() => downloadPDF(item._id)}
//                     className="btn btn-success"
//                   >
//                     Download PDF
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center">
//                 No proposals found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import { Copy } from "lucide-react";

function Dashboard({ downloadPDF }) {
  const [loggedInAdmin, setLoggedInAdmin] = useState("");
  const [proposals, setProposals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
    fetchProposals();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Admin Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProposals = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const url = "https://proposal-backend-1dom.onrender.com/api/proposals/?admin=true";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch proposals");
      }

      const result = await response.json();
      if (!Array.isArray(result)) {
        throw new Error("Invalid response format");
      }

      setProposals(result);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch(
        `https://proposal-backend-1dom.onrender.com/api/proposals/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete proposal");
      }

      toast.success("Proposal deleted successfully");

      // Update state by filtering out the deleted proposal
      setProposals((prevProposals) =>
        prevProposals.filter((proposal) => proposal._id !== id)
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const handleCopy = (text) => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .catch((err) => console.error("Failed to copy:", err));
  // };

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="container mt-5">
      <h1>{loggedInAdmin}</h1>
      <h2 className="mb-4">Admin Panel - Proposals</h2>
      <button onClick={handleLogout} className="btn btn-secondary mb-3">
        Logout
      </button>

      <button
        onClick={() => navigate("/create-proposal")}
        className="btn btn-primary mb-3 ms-2"
      >
        + Create Proposal
      </button>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Company Name</th>
            <th>Client Name</th>
            <th>Created Date</th>
            <th>Expiry Date</th>
            <th>Proposal ID</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {proposals.length > 0 ? (
            proposals.map((item, idx) => (
              <tr key={idx}>
                <td>{item.companyName}</td>
                <td>{item.clientName}</td>
                <td>
                  {item.createdAt
                    ? new Date(item.createdAt).toDateString()
                    : "N/A"}
                </td>
                <td>
                  {item.expiryDate
                    ? new Date(item.expiryDate).toDateString()
                    : "N/A"}
                </td>
                <td>{item._id}</td>
                {/* <td>
                  <p
                    onClick={() => handleCopy(item.proposalPassword)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {item.proposalPassword}
                  </p>
                </td> */}
                {/* <td
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
                    {item.proposalPassword}
                  </p>
                  <Copy
                    size={18}
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => handleCopy(item.proposalPassword)}
                  />
                </td> */}
                {/* <td
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
                    {item.proposalPassword}
                  </p>
                  <Copy
                    size={18}
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => handleCopy(item.proposalPassword, item._id)}
                  />
                  {copiedId === item._id && (
                    <span style={{ fontSize: "14px", color: "green" }}>
                      Copied
                    </span>
                  )}
                </td> */}
                {/* <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
                    {item.proposalPassword}
                  </p>
                  <Copy
                    size={18}
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={() => handleCopy(item.proposalPassword, item._id)}
                  />

                  {copiedId === item._id && (
                    <span
                      style={{
                        position: "absolute",
                        left: "100%", // Position right of the password
                        marginLeft: "10px",
                        fontSize: "14px",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Copied!
                    </span>
                  )}
                </td> */}
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
                    {item.proposalPassword}
                  </p>

                  {/* Copy Icon */}
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Copy
                      size={18}
                      style={{ cursor: "pointer", color: "gray" }}
                      onClick={() =>
                        handleCopy(item.proposalPassword, item._id)
                      }
                    />

                    {/* Popup message over the icon */}
                    {copiedId === item._id && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "25px", // Moves it above the icon
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "black",
                          color: "white",
                          padding: "5px 8px",
                          fontSize: "12px",
                          borderRadius: "5px",
                          whiteSpace: "nowrap",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                          opacity: 1,
                          transition: "opacity 0.3s ease-in-out",
                        }}
                      >
                        Copied!
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit-proposal/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => downloadPDF(item._id)}
                    className="btn btn-success btn-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No proposals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// function Dashboard({ downloadPDF }) {
//   const [loggedInAdmin, setLoggedInAdmin] = useState("");
//   const [proposals, setProposals] = useState([]);
//   const navigate = useNavigate();

//   console.log(downloadPDF);

//   useEffect(() => {
//     setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//     fetchProposals();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     toast.success("Admin Logged out");
//     setTimeout(() => {
//       navigate("/admin-login");
//     }, 1000);
//   };

//   const fetchProposals = async () => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         "http://localhost:5000/api/proposals/?admin=true",
//         {
//           method: "GET",
//           headers: { Authorization: token, "Content-Type": "application/json" },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to fetch proposals");
//       const result = await response.json();
//       if (!Array.isArray(result)) throw new Error("Invalid response format");
//       setProposals(result);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         `http://localhost:5000/api/proposals/delete/${id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: token, "Content-Type": "application/json" },
//         }
//       );
//       if (!response.ok) throw new Error("Failed to delete proposal");
//       toast.success("Proposal deleted successfully");
//       setProposals((prev) => prev.filter((proposal) => proposal._id !== id));
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1>{loggedInAdmin}</h1>
//       <h2 className="mb-4">Admin Panel - Proposals</h2>
//       <button onClick={handleLogout} className="btn btn-secondary mb-3">
//         Logout
//       </button>
//       <button
//         onClick={() => navigate("/create-proposal")}
//         className="btn btn-primary mb-3 ms-2"
//       >
//         + Create Proposal
//       </button>
//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Company Name</th>
//             <th>Client Name</th>
//             <th>Created Date</th>
//             <th>Expiry Date</th>
//             <th>Proposal ID</th>
//             <th>Password</th>
//             <th>Action</th>
//             <th>Approval Status</th>
//           </tr>
//         </thead>
//         {/* <tbody>
//           {proposals.length > 0 ? (
//             proposals.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.companyName}</td>
//                 <td>{item.clientName}</td>
//                 <td>{new Date(item.createdAt).toDateString()}</td>
//                 <td>{new Date(item.expiryDate).toDateString()}</td>
//                 <td>{item._id}</td>
//                 <td>{item.proposalPassword}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => navigate(`/edit-proposal/${item._id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 <td>
//                   <span
//                     className={
//                       item.isAccepted
//                         ? "text-success fw-bold"
//                         : item.isRejected
//                         ? "text-danger fw-bold"
//                         : "text-warning fw-bold"
//                     }
//                   >
//                     {item.isAccepted
//                       ? "Accepted"
//                       : item.isRejected
//                       ? "Rejected"
//                       : "Pending"}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => downloadPDF(item._id)}
//                   >
//                     Download file
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">
//                 No proposals found
//               </td>
//             </tr>
//           )}
//         </tbody> */}

//         <tbody>
//           {proposals.length > 0 ? (
//             proposals.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.companyName}</td>
//                 <td>{item.clientName}</td>
//                 <td>{new Date(item.createdAt).toDateString()}</td>
//                 <td>{new Date(item.expiryDate).toDateString()}</td>
//                 <td>{item._id}</td>
//                 <td>{item.proposalPassword}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => navigate(`/edit-proposal/${item._id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//                 <td>
//                   <span
//                     className={
//                       item.isAccepted
//                         ? "text-success fw-bold"
//                         : item.isRejected
//                         ? "text-danger fw-bold"
//                         : "text-warning fw-bold"
//                     }
//                   >
//                     {item.isAccepted
//                       ? "Accepted"
//                       : item.isRejected
//                       ? "Rejected"
//                       : "Pending"}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => downloadPDF && downloadPDF(item._id)}
//                   >
//                     Download file
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="text-center">
//                 {" "}
//                 {/* ✅ Fixed colSpan */}
//                 No proposals found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Dashboard;
