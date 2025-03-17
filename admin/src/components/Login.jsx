import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are require");
    }
    try {
      const url = "https://proposal-backend-1dom.onrender.com/auth/Login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { message, success, error, jwtToken, name } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    // <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
    //   <div className="card shadow-lg p-4 rounded" style={{ width: "350px" }}>
    //     <h3 className="text-center mb-3">Login</h3>
    //     <form onSubmit={handleLogin}>
    //       <div className="mb-3">
    //         <label htmlFor="email" className="form-label">
    //           Email address
    //         </label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           id="email"
    //           name="email"
    //           onChange={handleChange}
    //           placeholder="Enter your email"
    //           value={loginInfo.email}
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="password" className="form-label">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           id="password"
    //           name="password"
    //           onChange={handleChange}
    //           placeholder="Create a password"
    //           value={loginInfo.password}
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-primary w-100">
    //         login
    //       </button>
    //     </form>
    //     <span className="text-center mt-3">
    //       Already have an account? <Link to="/admin-signup">Signup</Link>
    //     </span>
    //   </div>
    //   <ToastContainer />
    // </div>

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />

      <div className="bg-white p-8 rounded-lg shadow-lg w-[30vw] h-[60vh] text-center">
        {/* Title Container with Bottom Border */}
        <div className="border-b border-gray-300 text-center py-3">
          <h2 className="text-2xl font-medium text-[#606060]">Login</h2>
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
            placeholder="Create a password"
            value={loginInfo.password}
          />
          <button
            type="submit"
            className="bg-black text-white px-3 py-2.5 rounded w-full mb-3"
          >
            Login
          </button>
        </form>
        <span className="text-center mt-3">
          Already have an account? <Link to="/admin-signup">Signup</Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
