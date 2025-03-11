import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      // Redirect only if the user is on login/signup pages
      if (["/", "/admin-login", "/admin-signup"].includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  return null;
}

export default RefreshHandler;
