// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// const SuperAdminLogin = () => {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(name, value);
//     const copyLoginInfo = { ...loginInfo };
//     copyLoginInfo[name] = value;
//     setLoginInfo(copyLoginInfo);
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;
//     if (!email || !password) {
//       return handleError("All fields are require");
//     }
//     try {
//       const url = "http://localhost:5000/auth/super-admin-login";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginInfo),
//       });
//       const result = await response.json();
//       const { message, success, error, jwtToken, name } = result;
//       if (success) {
//         handleSuccess(message);
//         localStorage.setItem("token", jwtToken);
//         localStorage.setItem("loggedInUser", name);
//         setTimeout(() => {
//           navigate("/super-admin-dashboard");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//       console.log(result);
//     } catch (error) {
//       handleError(error);
//     }
//   };
//   return (
//     <div className="flex justify-center items-center h-screen  bg-gray-100">
//       <ToastContainer />

//       <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[380px] text-center">
//         {/* Title Container with Bottom Border */}
//         <div className="border-b border-gray-300 text-center py-3">
//           <h2 className="text-2xl font-medium text-[#606060]">Super Login</h2>
//         </div>

//         <form onSubmit={handleLogin} className="pt-4">
//           <input
//             type="email"
//             className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//             id="email"
//             name="email"
//             onChange={handleChange}
//             placeholder="Enter your email"
//             value={loginInfo.email}
//           />
//           <input
//             type="password"
//             className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//             id="password"
//             name="password"
//             onChange={handleChange}
//             placeholder="Create a password"
//             value={loginInfo.password}
//           />
//           <button
//             type="submit"
//             className="bg-black text-white px-3 py-2.5 rounded w-full mb-3"
//           >
//             Super Admin Login
//           </button>
//         </form>
//         <span className="text-center mt-3">
//           Login to Admin?? <Link to="/admin-login">Admin Login</Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminLogin;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// const SuperAdminLogin = () => {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo({ ...loginInfo, [name]: value });
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   const { email, password } = loginInfo;

//   //   if (!email || !password) {
//   //     return handleError("All fields are required");
//   //   }

//   //   try {
//   //     const url = "http://localhost:5000/auth/super-admin-login"; // ✅ Super Admin API
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(loginInfo),
//   //     });

//   //     const result = await response.json();
//   //     const { message, success, error, jwtToken, name } = result;

//   //     if (success) {
//   //       handleSuccess(message);
//   //       localStorage.setItem("super_admin_token", jwtToken);
//   //       localStorage.setItem("superAdminUser", name);

//   //       setTimeout(() => {
//   //         navigate("/super-admin-dashboard");
//   //       }, 1000);
//   //     } else if (error) {
//   //       handleError(error?.details?.[0]?.message || error || message);
//   //     } else {
//   //       handleError("Login failed. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     handleError(error.message || "Something went wrong");
//   //   }
//   // };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;

//     if (!email || !password) {
//       return handleError("All fields are required");
//     }

//     try {
//       const url = "http://localhost:5000/auth/super-admin-login";
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginInfo),
//       });

//       const result = await response.json();
//       const { message, success, jwtToken, name } = result;

//       if (success) {
//         handleSuccess(message); // ✅ Show success message
//         localStorage.setItem("super_admin_token", jwtToken);
//         localStorage.setItem("superAdminUser", name);

//         setTimeout(() => {
//           navigate("/super-admin-dashboard");
//         }, 1000);
//       } else {
//         handleError(message); // ❌ Show error message
//       }
//     } catch (error) {
//       handleError("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <ToastContainer />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[380px] text-center">
//         {/* Title Container */}
//         <div className="border-b border-gray-300 text-center py-3">
//           <h2 className="text-2xl font-medium text-[#606060]">
//             Super Admin Login
//           </h2>
//         </div>

//         <form onSubmit={handleLogin} className="pt-4">
//           <input
//             type="email"
//             className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//             id="email"
//             name="email"
//             onChange={handleChange}
//             placeholder="Enter your email"
//             value={loginInfo.email}
//           />
//           <input
//             type="password"
//             className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
//             id="password"
//             name="password"
//             onChange={handleChange}
//             placeholder="Enter a password"
//             value={loginInfo.password}
//           />
//           <button
//             type="submit"
//             className="bg-black text-white px-3 py-2.5 rounded w-full mb-3"
//           >
//             Super Admin Login
//           </button>
//         </form>

//         <span className="text-center mt-3">
//           Login as Admin?{" "}
//           <Link to="/admin-login" className="text-primary">
//             Admin Login
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminLogin;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { AppContent } from "../context/AppContext";

const SuperAdminLogin = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const { backendUrl } = useContext(AppContent);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = backendUrl + "/auth/super-admin-login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { message, success, jwtToken, name, superAdminId } = result; // Expect superAdminId in response

      if (success) {
        handleSuccess(message);
        localStorage.setItem("super_admin_token", jwtToken);
        localStorage.setItem("superAdminUser", name);
        localStorage.setItem("superAdminId", superAdminId); // Store superAdminId

        setTimeout(() => {
          navigate("/super-admin-dashboard");
        }, 1000);
      } else {
        handleError(message || "Login failed. Please try again.");
      }
    } catch (error) {
      handleError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[380px] text-center">
        {/* Title Container */}
        <div className="border-b border-gray-300 text-center py-3">
          <h2 className="text-2xl font-medium text-[#606060]">
            Super Admin Login
          </h2>
        </div>

        <form onSubmit={handleLogin} className="pt-4">
          <input
            type="email"
            className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            value={loginInfo.email}
          />
          <input
            type="password"
            className="form-control bg-gray-100 border-none rounded p-2.5 w-full focus:outline-none focus:ring-1 focus:ring-gray-500 mb-3"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter a password"
            value={loginInfo.password}
          />
          <button
            type="submit"
            className="bg-black text-white px-3 py-2.5 rounded w-full mb-3"
          >
            Super Admin Login
          </button>
        </form>

        <span className="text-center mt-3">
          Login as Admin?{" "}
          <Link to="/admin-login" className="text-primary">
            Admin Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
