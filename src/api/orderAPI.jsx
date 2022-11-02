import axios from "axios";

const BACKEND_URL = "http://localhost:8000/api";

export const getRequestsListByStatus = async (setRequestsList) => {
  try {
    await axios.get(`${BACKEND_URL}/order/by-order-status`).then((result) => {
      setRequestsList(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setRequestsList("");
  }
};

export const updateRequestStatus = async (orderId, updateOrder) => {
  try {
    await axios.put(`${BACKEND_URL}/order/update-order-status`, {orderId:orderId, status:updateOrder}).then((result) => {
    //   setRequestsList(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    // setRequestsList("");
  }
};
