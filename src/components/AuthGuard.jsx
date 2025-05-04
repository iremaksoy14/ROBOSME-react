import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const userData = localStorage.getItem("userEmail");
  const isAuthenticated =  userData ? !!JSON.parse(userData).email : null

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default AuthGuard;
