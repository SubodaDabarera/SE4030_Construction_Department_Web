import React from "react";

export const useRoles = () => {
  const checkRoles = (email) => {
    // checking the user roles
    let splitEmail = email.split("@");

    try {
      let firstElement = splitEmail[0];
      let splitFirstElement = firstElement.split(".");

      console.log(splitFirstElement.length);
      if(splitFirstElement.length < 2){
        return ""
      }
      let userRole = splitFirstElement[1];
      return userRole;
    } catch (err) {
      return "";
    }
  };

  return { checkRoles };
};
