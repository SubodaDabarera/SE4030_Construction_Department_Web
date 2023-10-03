import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { getItem } = useSession();

  const user = getItem("user");

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  } else if (!allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to a 403 page
    return <Navigate to="/403" />;
  } else {
    // If the user is logged in and their role is allowed, render the element
    return element;
  }
};

export default ProtectedRoute;
