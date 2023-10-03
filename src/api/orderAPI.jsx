import axios from "axios";
import { useSession } from "../hooks/useSession";

const BACKEND_URL = "http://localhost:8000/api";

const CheckSession = () => {
  const { getItem } = useSession();
  const tokenValue = getItem("token");
  return tokenValue;
};

export const getRequestsListByStatus = async (setRequestsList) => {
  const token = CheckSession();
  try {
    await axios
      .get(`${BACKEND_URL}/order/by-order-status`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setRequestsList(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setRequestsList("");
  }
};

// get top procurement manager's requested orders
export const getTopPMRequestedOrders = async (setRequestsList) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order/by-topPM-order-status`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setRequestsList(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setRequestsList("");
  }
};

export const updateRequestStatus = async (orderId, updateOrder) => {
  const token = CheckSession();

  try {
    await axios
      .put(
        `${BACKEND_URL}/order/update-order-status`,
        {
          headers: {
            "x-access-token": token,
          },
        },
        {
          orderId: orderId,
          status: updateOrder,
        }
      )
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
  const token = CheckSession();

  try {
    await axios
      .put(
        `${BACKEND_URL}/order/update-partial-order-qty`,
        {
          headers: {
            "x-access-token": token,
          },
        },
        {
          orderId: orderId,
          partialyApprovedQty: approvedQuantity,
          unitPrice: unitPrice,
        }
      )
      .then((result) => {});
  } catch (err) {
    console.log(err);
  }
};

export const getApprovedOrderList = async (setApprovedOrders) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order/approved-orders`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setApprovedOrders(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setApprovedOrders("");
  }
};

export const getDeclinedOrderList = async (setDeclinedOrders) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order/declined-orders`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setDeclinedOrders(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setDeclinedOrders("");
  }
};

export const getPendingOrderList = async (setPendingOrders) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order/pending-orders`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setPendingOrders(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setPendingOrders("");
  }
};

export const getOrderByParamsId = async (orderId, setOrderDetails) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order//order-details/` + orderId, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setOrderDetails(result.data.order);
      });
  } catch (err) {
    console.log(err);
    setOrderDetails("");
  }
};

export const getConfirmedOrderList = async (setConfirmedOrders) => {
  const token = CheckSession();

  try {
    await axios
      .get(`${BACKEND_URL}/order/confirmed-orders`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setConfirmedOrders(result.data.orders);
      });
  } catch (err) {
    console.log(err);
    setConfirmedOrders("");
  }
};
