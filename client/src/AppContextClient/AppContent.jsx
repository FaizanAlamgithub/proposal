import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppcontextProvider = (props) => {
  const backendUrl = "https://proposal-backend-tzo5.onrender.com";

  const value = {
    backendUrl,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
