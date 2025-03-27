// import React, { useState, useEffect, useCallback, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer, toast } from "react-toastify";
// import DeleteAdminAccount from "../modal/DeleteAdminAccount";
// const SuperAdminDashboard = () => {
//   const [loggedInSuperAdmin, setLoggedInSuperAdmin] = useState("");
//   const [admins, setAdmins] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [newEmail, setNewEmail] = useState(""); // New state for email
//   const [resetId, setResetId] = useState(null); // Track which admin is being reset
//   const [newPassword, setNewPassword] = useState("");
//   const navigate = useNavigate();

//   // Logout function
//   const logoutSuperAdmin = useCallback(() => {
//     localStorage.removeItem("super_admin_token");
//     localStorage.removeItem("superAdminUser");
//     localStorage.removeItem("super_adminTokenExpiration");
//     handleSuccess("Session expired. Please log in again.");
//     navigate("/super-admin-login");
//   }, [navigate]);

//   // Auto Logout & Fetch Proposals on Mount
//   useEffect(() => {
//     const super_adminToken = localStorage.getItem("super_admin_token");
//     let expirationTimestamp = localStorage.getItem(
//       "super_adminTokenExpiration"
//     );

//     if (super_adminToken) {
//       setLoggedInSuperAdmin(
//         localStorage.getItem("superAdminUser") || "SuperAdmin"
//       );

//       if (!expirationTimestamp) {
//         expirationTimestamp = Date.now() + 30 * 60 * 1000;
//         localStorage.setItem("super_adminTokenExpiration", expirationTimestamp);
//       }

//       const currentTime = Date.now();
//       let remainingTime = expirationTimestamp - currentTime;

//       if (remainingTime <= 0) {
//         logoutSuperAdmin();
//         return;
//       }

//       const interval = setInterval(() => {
//         remainingTime -= 1000;
//         // console.log(
//         //   `Time remaining: ${Math.ceil(remainingTime / 1000)} seconds`
//         // );
//       }, 1000);

//       const TokenTimeout = setTimeout(() => {
//         clearInterval(interval);
//         logoutSuperAdmin();
//       }, remainingTime);

//       return () => {
//         clearTimeout(TokenTimeout);
//         clearInterval(interval);
//       };
//     } else {
//       navigate("/super-admin-login");
//     }
//   }, [navigate, logoutSuperAdmin]);

//   // Admin Details
//   const fetchAdmins = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/admin/data");
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setAdmins(data.adminData);
//         setMessage(null); // Clear any previous message
//       } else {
//         setAdmins([]); // Set to empty array if no admins
//         setMessage(data.message || "No admin accounts found"); // Use server message or default
//       }
//     } catch (err) {
//       setAdmins([]);
//       setMessage("Failed to fetch admin data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   // Handle delete action

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/admin/delete/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setAdmins(admins.filter((admin) => admin.id !== id));
//         toast.success("Admin deleted successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         if (admins.length === 1) {
//           setAdmins([]);
//           setMessage("No admin accounts found");
//         }
//         setShowDeleteModal(false);
//       } else {
//         toast.error(data.message || "Failed to delete admin", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to delete admin", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const openDeleteModal = (id) => {
//     setShowDeleteModal(id);
//   };

//   const closeDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   const handleResetCredentials = async (id) => {
//     if (!newEmail && !newPassword) {
//       toast.error("Please enter a new email or password", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/admin/reset-password/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ newEmail, newPassword }),
//         }
//       );
//       const data = await response.json();

//       if (response.ok && data.success) {
//         toast.success("Admin credentials reset successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         setAdmins(
//           admins.map((admin) =>
//             admin.id === id
//               ? { ...admin, email: newEmail || admin.email }
//               : admin
//           )
//         );
//         setResetId(null);
//         setNewEmail("");
//         setNewPassword("");
//       } else {
//         toast.error(data.message || "Failed to reset credentials", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to reset credentials", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   // Logout handler
//   const handleLogout = () => {
//     logoutSuperAdmin();
//   };

//   return (
//     <div className="container mt-5">
//       <h1>{loggedInSuperAdmin}</h1>
//       <h2 className="mb-4">Super Admin Panel</h2>
//       <div className="flex justify-between">
//         <div>
//           <button onClick={handleLogout} className="btn btn-dark mb-3">
//             Logout
//           </button>
//           <button
//             onClick={() => navigate("/admin-signup")}
//             className="btn btn-dark mb-3 ms-2"
//           >
//             Create Admin Account
//           </button>
//         </div>
//       </div>
//       {admins.length > 0 ? (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>Admin Name</th>
//               <th>Admin Email</th>
//               <th>Created Date</th>
//               <th>Proposal ID</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin.id}>
//                 <td>{admin.name}</td>
//                 <td>{admin.email}</td>
//                 <td>
//                   {admin.createdAt
//                     ? new Date(admin.createdAt).toDateString()
//                     : "N/A"}
//                 </td>
//                 <td>{admin.id}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm me-2"
//                     onClick={() => openDeleteModal(admin.id)}
//                   >
//                     Delete
//                   </button>
//                   {resetId === admin.id ? (
//                     <>
//                       <input
//                         type="email"
//                         value={newEmail}
//                         onChange={(e) => setNewEmail(e.target.value)}
//                         placeholder="New Email"
//                         style={{ padding: "5px", marginRight: "5px" }}
//                       />
//                       <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="New Password"
//                         style={{ padding: "5px", marginRight: "5px" }}
//                       />
//                       <button
//                         onClick={() => handleResetCredentials(admin.id)}
//                         className="btn btn-success btn-sm me-2"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setResetId(null)}
//                         className="btn btn-secondary btn-sm me-2"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => setResetId(admin.id)}
//                       className="btn btn-primary btn-sm me-2"
//                     >
//                       Reset Credentials
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>{message || "No admins available"}</p>
//       )}
//       <ToastContainer />
//       <DeleteAdminAccount
//         show={showDeleteModal}
//         handleClose={closeDeleteModal}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default SuperAdminDashboard;

// import React, { useState, useEffect, useCallback, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { handleError, handleSuccess } from "../utils";
// import { ToastContainer, toast } from "react-toastify";
// import DeleteAdminAccount from "../modal/DeleteAdminAccount";
// import { AppContent } from "../context/AppContext";

// const SuperAdminDashboard = () => {
//   const [loggedInSuperAdmin, setLoggedInSuperAdmin] = useState("");
//   const [admins, setAdmins] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [newEmail, setNewEmail] = useState(""); // For admin reset
//   const [resetId, setResetId] = useState(null); // Track which admin is being reset
//   const [newPassword, setNewPassword] = useState(""); // For admin reset
//   const [superNewEmail, setSuperNewEmail] = useState(""); // For super admin reset
//   const [superNewPassword, setSuperNewPassword] = useState(""); // For super admin reset
//   const [superResetLoading, setSuperResetLoading] = useState(false);

//   const { backendUrl } = useContext(AppContent);
//   const navigate = useNavigate();

//   // Logout function
//   const logoutSuperAdmin = useCallback(() => {
//     localStorage.removeItem("super_admin_token");
//     localStorage.removeItem("superAdminUser");
//     localStorage.removeItem("superAdminId");
//     localStorage.removeItem("super_adminTokenExpiration");
//     handleSuccess("Session expired. Please log in again.");
//     navigate("/super-admin-login");
//   }, [navigate]);

//   // Auto Logout & Fetch Proposals on Mount
//   useEffect(() => {
//     const super_adminToken = localStorage.getItem("super_admin_token");
//     let expirationTimestamp = localStorage.getItem(
//       "super_adminTokenExpiration"
//     );

//     if (super_adminToken) {
//       setLoggedInSuperAdmin(localStorage.getItem("superAdminUser"));

//       if (!expirationTimestamp) {
//         expirationTimestamp = Date.now() + 30 * 60 * 1000;
//         localStorage.setItem("super_adminTokenExpiration", expirationTimestamp);
//       }

//       const currentTime = Date.now();
//       let remainingTime = expirationTimestamp - currentTime;

//       if (remainingTime <= 0) {
//         logoutSuperAdmin();
//         return;
//       }

//       const interval = setInterval(() => {
//         remainingTime -= 1000;
//       }, 1000);

//       const TokenTimeout = setTimeout(() => {
//         clearInterval(interval);
//         logoutSuperAdmin();
//       }, remainingTime);

//       return () => {
//         clearTimeout(TokenTimeout);
//         clearInterval(interval);
//       };
//     } else {
//       navigate("/super-admin-login");
//     }
//   }, [navigate, logoutSuperAdmin]);

//   // Admin Details
//   const fetchAdmins = async () => {
//     try {
//       const response = await fetch(backendUrl + "/admin/data");
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setAdmins(data.adminData);
//         setMessage(null);
//       } else {
//         setAdmins([]);
//         setMessage(data.message || "No admin accounts found");
//       }
//     } catch (err) {
//       setAdmins([]);
//       setMessage("Failed to fetch admin data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   // Handle delete action
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`${backendUrl}/admin/delete/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setAdmins(admins.filter((admin) => admin.id !== id));
//         toast.success("Admin deleted successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         if (admins.length === 1) {
//           setAdmins([]);
//           setMessage("No admin accounts found");
//         }
//         setShowDeleteModal(false);
//       } else {
//         toast.error(data.message || "Failed to delete admin", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to delete admin", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const openDeleteModal = (id) => {
//     setShowDeleteModal(id);
//   };

//   const closeDeleteModal = () => {
//     setShowDeleteModal(false);
//   };

//   const handleResetCredentials = async (id) => {
//     if (!newEmail && !newPassword) {
//       toast.error("Please enter a new email or password", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       const response = await fetch(`${backendUrl}/admin/reset-password/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ newEmail, newPassword }),
//       });
//       const data = await response.json();

//       if (response.ok && data.success) {
//         toast.success("Admin credentials reset successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         setAdmins(
//           admins.map((admin) =>
//             admin.id === id
//               ? { ...admin, email: newEmail || admin.email }
//               : admin
//           )
//         );
//         setResetId(null);
//         setNewEmail("");
//         setNewPassword("");
//       } else {
//         toast.error(data.message || "Failed to reset credentials", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } catch (err) {
//       toast.error("Failed to reset credentials", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   // Reset Super Admin Credentials (adapted from resetAdminCredentials)
//   const resetSuperAdminCredentials = async (e) => {
//     e.preventDefault();
//     setSuperResetLoading(true);

//     if (!superNewEmail && !superNewPassword) {
//       handleError("At least one of new email or new password is required");
//       setSuperResetLoading(false);
//       return;
//     }

//     try {
//       const superAdminId = localStorage.getItem("superAdminId");
//       if (!superAdminId) {
//         handleError("Super Admin ID not found");
//         setSuperResetLoading(false);
//         return;
//       }

//       const super_adminToken = localStorage.getItem("super_admin_token");
//       if (!super_adminToken) {
//         handleError("Authentication token not found");
//         setSuperResetLoading(false);
//         return;
//       }

//       const response = await fetch(
//         `${backendUrl}/auth/superadmin/reset-credentials/${superAdminId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${super_adminToken}`,
//           },
//           body: JSON.stringify({
//             newEmail: superNewEmail || undefined,
//             newPassword: superNewPassword || undefined,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.success) {
//         handleSuccess("Super Admin credentials reset successfully!");
//         if (superNewEmail) {
//           setLoggedInSuperAdmin(superNewEmail);
//           localStorage.setItem("superAdminUser", superNewEmail);
//         }
//         setSuperNewEmail("");
//         setSuperNewPassword("");
//       } else {
//         switch (response.status) {
//           case 400:
//             handleError(
//               "At least one of new email or new password is required"
//             );
//             break;
//           case 401:
//             handleError("Unauthorized: Invalid or expired token");
//             break;
//           case 404:
//             handleError("Super Admin not found");
//             break;
//           case 409:
//             handleError("This email is already in use by another super admin");
//             break;
//           default:
//             handleError(data.message || "Failed to reset credentials");
//         }
//       }
//     } catch (err) {
//       handleError("Something went wrong, please try again.");
//     } finally {
//       setSuperResetLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   const handleLogout = () => {
//     logoutSuperAdmin();
//   };

//   return (
//     <div className="container mt-5">
//       <h1>{loggedInSuperAdmin}</h1>
//       <h2 className="mb-4">Super Admin Panel</h2>

//       {/* Super Admin Reset Section */}
//       <div className="mb-4">
//         <h3>Reset Super Admin Credentials</h3>
//         <form onSubmit={resetSuperAdminCredentials}>
//           <input
//             type="email"
//             value={superNewEmail}
//             onChange={(e) => setSuperNewEmail(e.target.value)}
//             placeholder="New Email (optional)"
//             style={{ padding: "5px", marginRight: "5px", width: "200px" }}
//           />
//           <input
//             type="password"
//             value={superNewPassword}
//             onChange={(e) => setSuperNewPassword(e.target.value)}
//             placeholder="New Password (optional)"
//             style={{ padding: "5px", marginRight: "5px", width: "200px" }}
//           />
//           <button
//             type="submit"
//             disabled={superResetLoading}
//             className="btn btn-success btn-sm"
//           >
//             {superResetLoading ? "Resetting..." : "Reset"}
//           </button>
//         </form>
//         <p style={{ fontSize: "0.9em", color: "#666", marginTop: "5px" }}>
//           Note: At least one of new email or new password is required
//         </p>
//       </div>

//       <div className="flex justify-between">
//         <div>
//           <button onClick={handleLogout} className="btn btn-dark mb-3">
//             Logout
//           </button>
//           <button
//             onClick={() => navigate("/admin-signup")}
//             className="btn btn-dark mb-3 ms-2"
//           >
//             Create Admin Account
//           </button>
//         </div>
//       </div>

//       {admins.length > 0 ? (
//         <table className="table table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>Admin Name</th>
//               <th>Admin Email</th>
//               <th>Created Date</th>
//               <th>Proposal ID</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin) => (
//               <tr key={admin.id}>
//                 <td>{admin.name}</td>
//                 <td>{admin.email}</td>
//                 <td>
//                   {admin.createdAt
//                     ? new Date(admin.createdAt).toDateString()
//                     : "N/A"}
//                 </td>
//                 <td>{admin.id}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm me-2"
//                     onClick={() => openDeleteModal(admin.id)}
//                   >
//                     Delete
//                   </button>
//                   {resetId === admin.id ? (
//                     <>
//                       <input
//                         type="email"
//                         value={newEmail}
//                         onChange={(e) => setNewEmail(e.target.value)}
//                         placeholder="New Email"
//                         style={{ padding: "5px", marginRight: "5px" }}
//                       />
//                       <input
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         placeholder="New Password"
//                         style={{ padding: "5px", marginRight: "5px" }}
//                       />
//                       <button
//                         onClick={() => handleResetCredentials(admin.id)}
//                         className="btn btn-success btn-sm me-2"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setResetId(null)}
//                         className="btn btn-secondary btn-sm me-2"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button
//                       onClick={() => setResetId(admin.id)}
//                       className="btn btn-primary btn-sm me-2"
//                     >
//                       Reset Credentials
//                     </button>
//                   )}
//                   <button onClick={() => navigate("/reset-admin-credentials")}>
//                     reset credentials
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>{message || "No admins available"}</p>
//       )}
//       <ToastContainer />
//       <DeleteAdminAccount
//         show={showDeleteModal}
//         handleClose={closeDeleteModal}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default SuperAdminDashboard;

import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import DeleteAdminAccount from "../modal/DeleteAdminAccount";
import { AppContent } from "../context/AppContext";

const SuperAdminDashboard = () => {
  const [loggedInSuperAdmin, setLoggedInSuperAdmin] = useState("");
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [superNewEmail, setSuperNewEmail] = useState("");
  // const [superNewPassword, setSuperNewPassword] = useState("");
  // const [superResetLoading, setSuperResetLoading] = useState(false);

  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  // Logout function
  const logoutSuperAdmin = useCallback(() => {
    localStorage.removeItem("super_admin_token");
    localStorage.removeItem("superAdminUser");
    localStorage.removeItem("superAdminId");
    localStorage.removeItem("super_adminTokenExpiration");
    handleSuccess("Session expired. Please log in again.");
    navigate("/super-admin-login");
  }, [navigate]);

  // Auto Logout & Fetch Admins on Mount
  useEffect(() => {
    const super_adminToken = localStorage.getItem("super_admin_token");
    let expirationTimestamp = localStorage.getItem(
      "super_adminTokenExpiration"
    );

    if (super_adminToken) {
      setLoggedInSuperAdmin(localStorage.getItem("superAdminUser"));

      if (!expirationTimestamp) {
        expirationTimestamp = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("super_adminTokenExpiration", expirationTimestamp);
      }

      const currentTime = Date.now();
      let remainingTime = expirationTimestamp - currentTime;

      if (remainingTime <= 0) {
        logoutSuperAdmin();
        return;
      }

      const interval = setInterval(() => {
        remainingTime -= 1000;
      }, 1000);

      const TokenTimeout = setTimeout(() => {
        clearInterval(interval);
        logoutSuperAdmin();
      }, remainingTime);

      const fetchAdmins = async () => {
        try {
          const response = await fetch(backendUrl + "/admin/data", {
            headers: {
              Authorization: `Bearer ${super_adminToken}`,
            },
          });
          const data = await response.json();

          if (response.ok && data.success) {
            setAdmins(data.adminData);
            setMessage(null);
          } else {
            setAdmins([]);
            setMessage(data.message || "No admin accounts found");
          }
        } catch (err) {
          setAdmins([]);
          setMessage("Failed to fetch admin data");
        } finally {
          setLoading(false);
        }
      };

      fetchAdmins();

      return () => {
        clearTimeout(TokenTimeout);
        clearInterval(interval);
      };
    } else {
      navigate("/super-admin-login");
    }
  }, [navigate, logoutSuperAdmin, backendUrl]);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("super_admin_token")}`,
        },
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setAdmins(admins.filter((admin) => admin._id !== id));
        handleSuccess("Admin deleted successfully!");
        if (admins.length === 1) {
          setAdmins([]);
          setMessage("No admin accounts found");
        }
        setShowDeleteModal(false);
      } else {
        handleError(data.message || "Failed to delete admin");
      }
    } catch (err) {
      handleError("Failed to delete admin");
    }
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(id);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // Reset Super Admin Credentials
  // const resetSuperAdminCredentials = async (e) => {
  //   e.preventDefault();
  //   setSuperResetLoading(true);

  //   if (!superNewEmail && !superNewPassword) {
  //     handleError("At least one of new email or new password is required");
  //     setSuperResetLoading(false);
  //     return;
  //   }

  //   try {
  //     const superAdminId = localStorage.getItem("superAdminId");
  //     const super_adminToken = localStorage.getItem("super_admin_token");

  //     const response = await fetch(
  //       `${backendUrl}/auth/superadmin/reset-credentials/${superAdminId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${super_adminToken}`,
  //         },
  //         body: JSON.stringify({
  //           newEmail: superNewEmail || undefined,
  //           newPassword: superNewPassword || undefined,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok && data.success) {
  //       handleSuccess("Super Admin credentials reset successfully!");
  //       if (superNewEmail) {
  //         setLoggedInSuperAdmin(superNewEmail);
  //         localStorage.setItem("superAdminUser", superNewEmail);
  //       }
  //       setSuperNewEmail("");
  //       setSuperNewPassword("");
  //     } else {
  //       handleError(data.message || "Failed to reset credentials");
  //     }
  //   } catch (err) {
  //     handleError("Something went wrong, please try again.");
  //   } finally {
  //     setSuperResetLoading(false);
  //   }
  // };

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    logoutSuperAdmin();
  };

  return (
    <div className="container mt-5">
      <h1>{loggedInSuperAdmin}</h1>
      <h2 className="mb-4">Super Admin Panel</h2>

      <div className="flex justify-between">
        <div>
          <button onClick={handleLogout} className="btn btn-dark mb-3">
            Logout
          </button>
          <button
            onClick={() => navigate("/admin-signup")}
            className="btn btn-dark mb-3 ms-2"
          >
            Create Admin Account
          </button>
        </div>
        <div>
          <button
            onClick={() => navigate("/reset-superadmin-credentials")}
            className="btn btn-primary mb-3 ms-2"
          >
            Reset Super Admin Credentials
          </button>
        </div>
      </div>

      {admins.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Admin Name</th>
              <th>Admin Email</th>
              <th>Created Date</th>
              <th>Proposal ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name || "N/A"}</td>
                <td>{admin.email}</td>
                <td>
                  {admin.createdAt
                    ? new Date(admin.createdAt).toDateString()
                    : "N/A"}
                </td>
                <td>{admin.id}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => openDeleteModal(admin.id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/reset-admin-credentials/${admin.id}`)
                    }
                    className="btn btn-primary btn-sm me-2"
                  >
                    Reset Credentials
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{message || "No admins available"}</p>
      )}
      <ToastContainer />
      <DeleteAdminAccount
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SuperAdminDashboard;
