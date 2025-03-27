// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContent } from "../context/AppContext";
// import { ToastContainer, toast } from "react-toastify";

// const ResetPasswordEmail = ({ admins, setAdmins }) => {
//   const [newEmail, setNewEmail] = useState(""); // For admin reset
//   const [resetId, setResetId] = useState(null); // Track which admin is being reset
//   const [newPassword, setNewPassword] = useState(""); // For admin reset

//   const { backendUrl } = useContext(AppContent);
//   const navigate = useNavigate();

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

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <ToastContainer />

//       <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[380px] text-center">
//         {/* Title Container with Bottom Border */}
//         <div className="border-b border-gray-300 text-center py-3">
//           <h2 className="text-2xl font-medium text-[#606060]">
//             Admin Reset Credentials
//           </h2>
//         </div>

//         {admins.map((admin) => (
//           <div key={admin.id} className="mt-4">
//             {resetId === admin.id ? (
//               <>
//                 <input
//                   type="email"
//                   className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//                   id="email"
//                   name="email"
//                   value={newEmail}
//                   onChange={(e) => setNewEmail(e.target.value)}
//                   placeholder="Enter your email"
//                 />
//                 <input
//                   type="password"
//                   className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//                   id="password"
//                   name="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="Enter a password"
//                 />
//                 <div className="flex justify-center gap-2">
//                   <button
//                     onClick={() => handleResetCredentials(admin.id)}
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setResetId(null)}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <button
//                 onClick={() => setResetId(admin.id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//               >
//                 Reset Credentials
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordEmail;

import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const ResetAdminCredentials = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(AppContent);
  const { id } = useParams(); // Get admin ID from URL
  const navigate = useNavigate();

  const handleResetCredentials = async (e) => {
    e.preventDefault();

    if (!newEmail && !newPassword) {
      handleError("Please enter a new email or password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/admin/reset-password/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("super_admin_token")}`,
        },
        body: JSON.stringify({ newEmail, newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        handleSuccess("Admin credentials reset successfully!");
        setNewEmail("");
        setNewPassword("");
        navigate("/super-admin-dashboard"); // Redirect back to dashboard
      } else {
        handleError(data.message || "Failed to reset credentials");
      }
    } catch (err) {
      handleError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
        <div className="border-b border-gray-300 text-center py-3">
          <h2 className="text-2xl font-medium text-[#606060]">
            Reset Admin Credentials
          </h2>
        </div>
        <form onSubmit={handleResetCredentials} className="mt-4 space-y-4">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email (optional)"
            className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password (optional)"
            className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              {loading ? "Resetting..." : "Reset"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/super-admin-dashboard")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Note: At least one of new email or new password is required
        </p>
      </div>
    </div>
  );
};

export default ResetAdminCredentials;
