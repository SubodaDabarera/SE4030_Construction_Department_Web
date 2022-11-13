import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  viewProduct,
  viewProductsList,
} from "../../api/productAPI";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import {
  getApprovedOrderList,
  getOrderByParamsId,
  updateRequestStatus,
} from "../../api/orderAPI";

export default function AcceptOrders() {
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState("");
  const [diliveryStatus, setDeliveryStatus] = useState(
    setOrderDetails.deliveryNoteAdded
  );
  const [value, setValue] = useState(true);

  useEffect(() => {
    async function getOrders() {
      await getApprovedOrderList(setApprovedOrders).then(() => {
        console.log("Products retrived successfully");
      });
    }

    getOrders();
  }, []);

  const handleOpen = async (orderId) => {
    await getOrderByParamsId(orderId, setOrderDetails).then(() => {
      console.log("product retrived successfully");
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (orderId) => {
    let status = "confirmed";
    await updateRequestStatus({ orderId, updateOrder: status }).then(() => {
      console.log("Order details updated");
    });

    setOpen(false);

    async function getOrders() {
      await getApprovedOrderList(setApprovedOrders).then(() => {
        console.log("Products retrived successfully");
      });
    }

    getOrders();
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Approved List
            </h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Supplier Name
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {approvedOrders.map((order, personIdx) => (
                      <tr
                        className={
                          personIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          data-testid="owner"
                        >
                          {order.owner}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.siteManagerName}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button onClick={() => handleOpen(order._id)}>
                            Confirm Order
                          </button>
                        </td>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth={true}
                        >
                          <DialogTitle id="alert-dialog-title">
                            <b className="align-middle pb-4">Product Details</b>
                            <br />
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Name : {orderDetails.owner}
                              </p>

                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Product : {orderDetails.title}
                              </p>
                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Unit Price : {orderDetails.unitPrice}
                              </p>
                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Quantity : {orderDetails.quantity}
                              </p>
                              {/* <p className="align-middle text-gray-900 pb-4 ml-4">
                                Price : {orderDetails.unitPrice}
                              </p> */}
                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Supplier Name : {orderDetails.siteManagerName}
                              </p>
                              {/* <p className="align-middle text-gray-900 pb-4 ml-4">
                                Location : {oorderDetailsrder.location}
                              </p>
                              <p className="align-middle text-gray-900 pb-4 ml-4">
                                Quantity : {orderDetails.quantity}
                              </p> */}
                            </DialogContentText>
                          </DialogContent>

                          <DialogActions>
                            {/* <button
                              className="mr-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none bg-red-600"
                              // onClick={() => exportPDF()}
                            >
                              <AiOutlineDownload size={18} />
                            </button> */}
                            <button
                              type="button"
                              className="inline-flex w-full font-semibold items-center justify-center rounded-md border border-transparent bg-green-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                              onClick={() => handleConfirm(orderDetails._id)}
                            >
                              Confirm Order
                            </button>
                            <button
                              type="button"
                              className="inline-flex w - '50%' font-semibold items-center justify-center rounded-md border border-transparent bg-yellow-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                              onClick={() => handleClose()}
                            >
                              Cancel
                            </button>
                          </DialogActions>
                        </Dialog>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
