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

// get top procurement manager's requested orders
export const getTopPMRequestedOrders = async (setRequestsList) => {
  try {
    await axios.get(`${BACKEND_URL}/order/by-topPM-order-status`).then((result) => {
      setRequestsList(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setRequestsList("");
  }
};

export const updateRequestStatus = async (orderId, updateOrder) => {
  try {
    await axios
      .put(`${BACKEND_URL}/order/update-order-status`, {
        orderId: orderId,
        status: updateOrder,
      })
      .then((result) => {});
  } catch (err) {
    console.log(err);
  }
};

export const updatePartialOrderQty = async (
  orderId,
  approvedQuantity,
  unitPrice
) => {
  try {
    await axios
      .put(`${BACKEND_URL}/order/update-partial-order-qty`, {
        orderId: orderId,
        partialyApprovedQty: approvedQuantity,
        unitPrice: unitPrice,
      })
      .then((result) => {});
  } catch (err) {
    console.log(err);
  }
};
