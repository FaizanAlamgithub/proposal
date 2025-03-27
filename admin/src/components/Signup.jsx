import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { AppContent } from "../context/AppContext";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are require");
    }
    try {
      const url = `${backendUrl}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/admin-login");
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
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <button
        onClick={() => navigate("/super-admin-dashboard")}
        className="btn btn-close position-absolute top-0 end-0 m-3"
        aria-label="Close"
      ></button>{" "}
      <div className="card shadow-lg p-4 rounded" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Admin Account</h3>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              value={signupInfo.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              value={signupInfo.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Create a password"
              value={signupInfo.password}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create Admin Account
          </button>
        </form>
        {/* <span className="text-center mt-3">
          Already have an account? <Link to="/admin-login">Login</Link>
        </span> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
