import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/admin-login" ||
        location.pathname === "/admin-signup"
      ) {
        navigate("/dashboard", {replace: false});
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
}

export default RefreshHandler;
