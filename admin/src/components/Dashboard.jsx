// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer, toast } from "react-toastify";
// import { Copy } from "lucide-react";
// import DeleteProposalModal from "../modal/DeleteProposalModal";

// function Dashboard({ downloadPDF }) {
//   const [loggedInAdmin, setLoggedInAdmin] = useState("");
//   const [proposals, setProposals] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedProposalId, setSelectedProposalId] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//     fetchProposals();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     handleSuccess("Admin Logged out");
//     setTimeout(() => {
//       navigate("/admin-login");
//     }, 1000);
//   };

//   const fetchProposals = async () => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const url =
//         "https://proposal-backend-1dom.onrender.com/api/proposals/?admin=true";

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

//   const openDeleteModal = (id) => {
//     setSelectedProposalId(id);
//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     setSelectedProposalId(null);
//     setShowDeleteModal(false);
//   };

//   const handleDelete = async (id) => {
//     if (!selectedProposalId) return;

//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         `https://proposal-backend-1dom.onrender.com/api/proposals/delete/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete proposal");
//       }

//       toast.success("Proposal deleted successfully");

//       // Update state by filtering out the deleted proposal
//       setProposals((prevProposals) =>
//         prevProposals.filter((proposal) => proposal._id !== id)
//       );
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const [copiedId, setCopiedId] = useState(null);

//   const handleCopy = (text, id) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopiedId(id);

//       // Reset copied state after 2 seconds
//       setTimeout(() => setCopiedId(null), 2000);
//     });
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
//                 <td
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     position: "relative",
//                   }}
//                 >
//                   <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
//                     {item.proposalPassword}
//                   </p>

//                   {/* Copy Icon */}
//                   <div
//                     style={{ position: "relative", display: "inline-block" }}
//                   >
//                     <Copy
//                       size={18}
//                       style={{ cursor: "pointer", color: "gray" }}
//                       onClick={() =>
//                         handleCopy(item.proposalPassword, item._id)
//                       }
//                     />

//                     {/* Popup message over the icon */}
//                     {copiedId === item._id && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           bottom: "25px", // Moves it above the icon
//                           left: "50%",
//                           transform: "translateX(-50%)",
//                           backgroundColor: "black",
//                           color: "white",
//                           padding: "5px 8px",
//                           fontSize: "12px",
//                           borderRadius: "5px",
//                           whiteSpace: "nowrap",
//                           boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
//                           opacity: 1,
//                           transition: "opacity 0.3s ease-in-out",
//                         }}
//                       >
//                         Copied!
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => navigate(`/edit-proposal/${item._id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm me-2"
//                     onClick={() => openDeleteModal(item._id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => downloadPDF(item._id)}
//                     className="btn btn-success btn-sm"
//                   >
//                     View
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
//       {/* Delete Confirmation Modal */}
//       <DeleteProposalModal
//         show={showDeleteModal}
//         handleClose={closeDeleteModal}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer, toast } from "react-toastify";
// import { Copy } from "lucide-react";
// import DeleteProposalModal from "../modal/DeleteProposalModal";

// function Dashboard({ downloadPDF }) {
//   const [loggedInAdmin, setLoggedInAdmin] = useState("");
//   const [proposals, setProposals] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedProposalId, setSelectedProposalId] = useState(null);

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//   //   // fetchProposals();

//   //   // const handleBeforeUnload = () => {
//   //   //   localStorage.removeItem("token");
//   //   //   localStorage.removeItem("loggedInUser");
//   //   // };

//   //   // window.addEventListener("beforeunload", handleBeforeUnload);

//   //   // return () => {
//   //   //   window.removeEventListener("beforeunload", handleBeforeUnload);
//   //   // };

//   //   const token = localStorage.getItem("token");

//   //   if (token) {
//   //     setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//   //     fetchProposals();

//   //     // Remove token after 30 minute
//   //     const tokenTimeout = setTimeout(() => {
//   //       localStorage.removeItem("token");
//   //       localStorage.removeItem("loggedInUser");
//   //       handleSuccess("Session expired. Please log in again.");
//   //       navigate("/admin-login");
//   //     }, 30 * 60 * 1000); // 30 minute

//   //     return () => clearTimeout(tokenTimeout);
//   //   } else {
//   //     navigate("/admin-login");
//   //   }
//   // }, [navigate]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     let expirationTimestamp = localStorage.getItem("tokenExpiration");

//     if (token) {
//       setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
//       fetchProposals();

//       if (!expirationTimestamp) {
//         expirationTimestamp = Date.now() + 30 * 60 * 1000;
//         localStorage.setItem("tokenExpiration", expirationTimestamp);
//       }

//       const currentTime = Date.now();
//       let remainingTime = expirationTimestamp - currentTime;

//       if (remainingTime <= 0) {
//         logoutAdmin();
//         return;
//       }

//       const interval = setInterval(() => {
//         remainingTime -= 1000;
//       }, 1000);

//       const tokenTimeout = setTimeout(() => {
//         clearInterval(interval);
//         logoutAdmin();
//       }, remainingTime);

//       return () => {
//         clearTimeout(tokenTimeout);
//         clearInterval(interval);
//       };
//     } else {
//       navigate("/admin-login");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("loggedInUser");
//     handleSuccess("Admin Logged out");
//     setTimeout(() => {
//       navigate("/admin-login");
//     }, 1000);
//   };

//   const fetchProposals = async () => {
//     try {
//       const token = localStorage.getItem("token") || "";
//       const url =
//         "https://proposal-backend-1dom.onrender.com/api/proposals/?admin=true";

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
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

//   const openDeleteModal = (id) => {
//     setSelectedProposalId(id);
//     setShowDeleteModal(true);
//   };

//   const closeDeleteModal = () => {
//     setSelectedProposalId(null);
//     setShowDeleteModal(false);
//   };

//   const handleDelete = async () => {
//     if (!selectedProposalId) return;

//     try {
//       const token = localStorage.getItem("token") || "";
//       const response = await fetch(
//         `https://proposal-backend-1dom.onrender.com/api/proposals/delete/${selectedProposalId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete proposal");
//       }

//       toast.success("Proposal deleted successfully");

//       setProposals((prevProposals) =>
//         prevProposals.filter((proposal) => proposal._id !== selectedProposalId)
//       );

//       closeDeleteModal(); // Close modal after deleting
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const [copiedId, setCopiedId] = useState(null);

//   const handleCopy = (text, id) => {
//     navigator.clipboard.writeText(text).then(() => {
//       setCopiedId(id);

//       setTimeout(() => setCopiedId(null), 2000);
//     });
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
//                 <td
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                     position: "relative",
//                   }}
//                 >
//                   <p style={{ cursor: "pointer", color: "blue", margin: 0 }}>
//                     {item.proposalPassword}
//                   </p>

//                   {/* Copy Icon */}
//                   <div
//                     style={{ position: "relative", display: "inline-block" }}
//                   >
//                     <Copy
//                       size={18}
//                       style={{ cursor: "pointer", color: "gray" }}
//                       onClick={() =>
//                         handleCopy(item.proposalPassword, item._id)
//                       }
//                     />

//                     {/* Popup message over the icon */}
//                     {copiedId === item._id && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           bottom: "25px",
//                           left: "50%",
//                           transform: "translateX(-50%)",
//                           backgroundColor: "black",
//                           color: "white",
//                           padding: "5px 8px",
//                           fontSize: "12px",
//                           borderRadius: "5px",
//                           whiteSpace: "nowrap",
//                           boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
//                           opacity: 1,
//                           transition: "opacity 0.3s ease-in-out",
//                         }}
//                       >
//                         Copied!
//                       </div>
//                     )}
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => navigate(`/edit-proposal/${item._id}`)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger btn-sm me-2"
//                     onClick={() => openDeleteModal(item._id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => downloadPDF(item._id)}
//                     className="btn btn-success btn-sm"
//                   >
//                     View
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

//       {/* Delete Confirmation Modal */}
//       <DeleteProposalModal
//         show={showDeleteModal}
//         handleClose={closeDeleteModal}
//         handleDelete={handleDelete}
//         selectedProposalId={selectedProposalId}
//       />
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import { Copy } from "lucide-react";
import DeleteProposalModal from "../modal/DeleteProposalModal";

function Dashboard({ downloadPDF }) {
  const [loggedInAdmin, setLoggedInAdmin] = useState("");
  const [proposals, setProposals] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const navigate = useNavigate();

  // Logout function
  const logoutAdmin = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("tokenExpiration");
    handleSuccess("Session expired. Please log in again.");
    navigate("/admin-login");
  }, [navigate]);

  // Fetch proposals
  const fetchProposals = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized access. Please log in.");

      const response = await fetch(
        "http://localhost:5000/api/proposals/?admin=true",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch proposals");

      const result = await response.json();
      if (!Array.isArray(result)) throw new Error("Invalid response format");

      setProposals(result);
    } catch (error) {
      handleError(error.message);
    }
  }, []);

  // Auto Logout & Fetch Proposals on Mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    let expirationTimestamp = localStorage.getItem("tokenExpiration");

    if (token) {
      setLoggedInAdmin(localStorage.getItem("loggedInUser") || "Admin");
      fetchProposals();

      if (!expirationTimestamp) {
        expirationTimestamp = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("tokenExpiration", expirationTimestamp);
      }

      const currentTime = Date.now();
      let remainingTime = expirationTimestamp - currentTime;

      if (remainingTime <= 0) {
        logoutAdmin();
        return;
      }

      const interval = setInterval(() => {
        remainingTime -= 1000;
        // console.log(
        //   `Time remaining: ${Math.ceil(remainingTime / 1000)} seconds`
        // );
      }, 1000);

      const tokenTimeout = setTimeout(() => {
        clearInterval(interval);
        logoutAdmin();
      }, remainingTime);

      return () => {
        clearTimeout(tokenTimeout);
        clearInterval(interval);
      };
    } else {
      navigate("/admin-login");
    }
  }, [navigate, fetchProposals, logoutAdmin]);

  // Logout handler
  const handleLogout = () => {
    logoutAdmin();
  };

  // Handle copy action
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setSelectedProposalId(id);
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setSelectedProposalId(null);
    setShowDeleteModal(false);
  };

  // Delete proposal
  const handleDelete = async () => {
    if (!selectedProposalId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://proposal-backend-1dom.onrender.com/api/proposals/delete/${selectedProposalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete proposal");

      toast.success("Proposal deleted successfully");
      setProposals((prev) => prev.filter((p) => p._id !== selectedProposalId));
      closeDeleteModal();
    } catch (error) {
      toast.error(error.message);
    }
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
            proposals.map((item) => (
              <tr key={item._id}>
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
                    {copiedId === item._id && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "25px",
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
                    onClick={() => openDeleteModal(item._id)}
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
      <DeleteProposalModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
