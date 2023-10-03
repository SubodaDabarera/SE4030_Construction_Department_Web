import React from "react";

export const useSession = () => {
  const setItem = (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  const getItem = (key) => {
    const itemStr = sessionStorage.getItem(key);

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage and return null
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const removeSession = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    window.location.href = '/login';

  };

  return { setItem, getItem, removeSession };
};
