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
    await axios
      .get(`${BACKEND_URL}/order/by-topPM-order-status`)
      .then((result) => {
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

export const getApprovedOrderList = async (setApprovedOrders) => {
  try {
    await axios.get(`${BACKEND_URL}/order/approved-orders`).then((result) => {
      setApprovedOrders(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setApprovedOrders("");
  }
};

export const getDeclinedOrderList = async (setDeclinedOrders) => {
  try {
    await axios.get(`${BACKEND_URL}/order/declined-orders`).then((result) => {
      setDeclinedOrders(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setDeclinedOrders("");
  }
};

export const getPendingOrderList = async (setPendingOrders) => {
  try {
    await axios.get(`${BACKEND_URL}/order/pending-orders`).then((result) => {
      setPendingOrders(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setPendingOrders("");
  }
};

export const getOrderByParamsId = async (orderId, setOrderDetails) => {
  try {
    await axios
      .get(`${BACKEND_URL}/order//order-details/` + orderId)
      .then((result) => {
        setOrderDetails(result.data.order);
      });
  } catch (err) {
    console.log(err);
    setOrderDetails("");
  }
};

export const getConfirmedOrderList = async (setConfirmedOrders) => {
  try {
    await axios.get(`${BACKEND_URL}/order/confirmed-orders`).then((result) => {
      setConfirmedOrders(result.data.orders);
    });
  } catch (err) {
    console.log(err);
    setConfirmedOrders("");
  }
};
