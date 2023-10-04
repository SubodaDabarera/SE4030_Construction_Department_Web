import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { useRoles } from "../hooks/useRoles";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { getItem } = useSession();
  const { checkRoles } = useRoles();
  let userRole = "";
  const user = getItem("user");

  if (user) {
    if (user.email) {
      const role = checkRoles(user.email);
      if (role) {
        userRole = role;
      }
    }
  }

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  } else if (!allowedRoles.includes(userRole)) {
    // If the user's role is not allowed, redirect to a 403 page
    return <Navigate to="/page-not-found" />;
  } else {
    // If the user is logged in and their role is allowed, render the element
    return element;
  }
};

export default ProtectedRoute;
