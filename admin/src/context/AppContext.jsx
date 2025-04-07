import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppcontextProvider = (props) => {
  // const backendUrl = "https://proposal-backend-tzo5.onrender.com";
  const backendUrl = "http://13.60.13.12:5000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(false);

  //   const getAdminData = async () => {
  //     try {
  //       const { data } = await axios.get(backendUrl + "/admin/data");
  //       data.success ? setAdminData(data.adminData) : toast.error(data.message);
  //     } catch (error) {
  //       toast.error(data.message);
  //     }
  //   };

  const getAdminData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized access! Please log in.");
        return;
      }

      const { data } = await axios.get(backendUrl + "/admin/data", {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in request headers
      });

      if (data.success) {
        setAdminData(data.adminData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch admin data"
      );
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    adminData,
    setAdminData,
    getAdminData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
