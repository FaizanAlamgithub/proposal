import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const ResetSuperAdminCredentials = () => {
  const [superNewEmail, setSuperNewEmail] = useState("");
  const [superNewPassword, setSuperNewPassword] = useState("");
  const [superResetLoading, setSuperResetLoading] = useState(false);

  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  // Reset Super Admin Credentials
  const resetSuperAdminCredentials = async (e) => {
    e.preventDefault();
    setSuperResetLoading(true);

    if (!superNewEmail && !superNewPassword) {
      handleError("At least one of new email or new password is required");
      setSuperResetLoading(false);
      return;
    }

    try {
      const superAdminId = localStorage.getItem("superAdminId");
      const super_adminToken = localStorage.getItem("super_admin_token");

      if (!superAdminId || !super_adminToken) {
        handleError("Super admin session not found. Please log in again.");
        navigate("/super-admin-login");
        return;
      }

      const response = await fetch(
        `${backendUrl}/auth/superadmin/reset-credentials/${superAdminId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${super_adminToken}`, // Fixed syntax
          },
          body: JSON.stringify({
            newEmail: superNewEmail || undefined,
            newPassword: superNewPassword || undefined,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        handleSuccess("Super Admin credentials reset successfully!");
        if (superNewEmail) {
          localStorage.setItem("superAdminUser", superNewEmail);
        }
        setSuperNewEmail("");
        setSuperNewPassword("");
        navigate("/super-admin-dashboard"); // Redirect to dashboard
      } else {
        handleError(data.message || "Failed to reset credentials");
      }
    } catch (err) {
      handleError("Something went wrong, please try again.");
    } finally {
      setSuperResetLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
        <div className="border-b border-gray-300 text-center py-3">
          <h2 className="text-2xl font-medium text-[#606060]">
            Reset Super Admin Credentials
          </h2>
        </div>
        <form onSubmit={resetSuperAdminCredentials} className="mt-4 space-y-4">
          <input
            type="email"
            value={superNewEmail}
            onChange={(e) => setSuperNewEmail(e.target.value)}
            placeholder="New Email (optional)"
            className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <input
            type="password"
            value={superNewPassword}
            onChange={(e) => setSuperNewPassword(e.target.value)}
            placeholder="New Password (optional)"
            className="bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              disabled={superResetLoading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              {superResetLoading ? "Resetting..." : "Reset"}
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
      </div>
    </div>
  );
};

export default ResetSuperAdminCredentials;
