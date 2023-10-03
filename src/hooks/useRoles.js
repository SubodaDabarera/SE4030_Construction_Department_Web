import React from "react";

export const useRoles = () => {
  const checkRoles = (email) => {
    // checking the user roles
    let splitEmail = email.split("@");

    try {
      let firstElement = splitEmail[0];
      let splitFirstElement = firstElement.split(".");
      let userRole = splitFirstElement[1];
      return userRole;
    } catch (err) {
      return "";
    }
  };

  return { checkRoles };
};
