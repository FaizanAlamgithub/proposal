import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppcontextProvider = (props) => {
  const backendUrl = "http://localhost:5000";

  const value = {
    backendUrl,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
