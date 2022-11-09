import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { viewProduct, viewProductsList } from "../../api/productAPI";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  getRequestsListByStatus,
  updatePartialOrderQty,
  updateRequestStatus,
} from "../../api/orderAPI";
import RequestRow from "../../components/procurementManager/RequestRow";
import { getUserDetails } from "../../api/userAPI";
import { async } from "@firebase/util";

export default function RequestListNew() {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [requestsList, setRequestsList] = useState([]);
  const [userDetails, setUserDetails] = useState();
  const [isAcceptClicked, setIsAcceptClicked] = useState(false);
  const [isRejectClicked, setIsRejectClicked] = useState(false);
  const [partialOpen, setPartialOpen] = useState(false);
  const [sendTopManagerOpen, setSendTopManagerOpen] = useState(false);
  const [approvedQuantity, setApprovedQuantity] = useState(0);
  const [isAppovedQuantity, setIsAppovedQuantity] = useState(false);

  useEffect(() => {
    async function getData() {
      await getRequestsListByStatus(setRequestsList).then(() => {
        console.log("Data retrieved successfully");
      });
    }
    getData();
  }, []);

  const handleOpen = async (product, button) => {
    await viewProduct(product.productId, setProductDetails).then(() => {
      console.log("Data retrieved successfully");
    });
    await getUserDetails(product.siteManager, setUserDetails).then(() => {
      console.log("Data retrieved successfully");
    });

    if (button == "approve" || button == "reject") {
      setOpen(true);
    } else if (button == "partial") {
      setPartialOpen(true);
    } else if (button == "topManager") {
      setSendTopManagerOpen(true);
    }
  };

  const handleClose = async (status, orderId) => {
    if (status == "approved") {
      await updateRequestStatus({ orderId, updateOrder: status }).then(() => {
        console.log("Order details updated");
      });
    } else if (status == "rejected") {
      await updateRequestStatus({ orderId, updateOrder: status }).then(() => {
        console.log("Order details updated");
      });
    }

    async function getData() {
      await getRequestsListByStatus(setRequestsList).then(() => {
        console.log("Data retrieved successfully");
      });
    }
    await getData();

    setOpen(false);
  };

  const onEvaluation = async (orderId, decision, product) => {
    if (decision == "approved") {
      setIsAcceptClicked(true);
      setIsRejectClicked(false);
      handleOpen(product, "approve");
    } else if (decision == "rejected") {
      setIsRejectClicked(true);
      setIsAcceptClicked(false);
      handleOpen(product, "reject");
    }
  };

  const onPartialApprove = async (product) => {
    if (approvedQuantity > 0) {
      if (product.quantity >= approvedQuantity) {
        await updatePartialOrderQty(
          product._id,
          approvedQuantity,
          product.unitPrice
        )
          .then(() => {
            console.log("Partially approved");
          })
          .catch((err) => {
            console.log(err);
          });

        await updateRequestStatus({
          orderId: product._id,
          updateOrder: "partiallyApproved",
        })
          .then(() => {
            console.log("Qty updated in partially approved order");
          })
          .catch((err) => {
            console.log(err);
          });

        await getRequestsListByStatus(setRequestsList).then(() => {
          console.log("Data retrieved successfully");
        });

        setIsAppovedQuantity(false);
        setPartialOpen(false);
        setApprovedQuantity(0);
      } else {
        // add error message here...
      }
    } else {
      setIsAppovedQuantity(true);
      setPartialOpen(true);
    }
  };

  const onSendToTopManager = async (product) => {
    await updateRequestStatus({
      orderId: product._id,
      updateOrder: "topManager",
    })
      .then(() => {
        console.log("order updated");
      })
      .catch((err) => {
        console.log(err);
      });

    await getRequestsListByStatus(setRequestsList).then(() => {
      console.log("Data retrieved successfully");
    });

    setSendTopManagerOpen(false);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Requested Orders
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
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Site manager
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Unit Price (LKR)
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total amount (LKR)
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {requestsList.map((product, personIdx) => (
                      <tr
                        className={
                          personIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <RequestRow product={product} />

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.unitPrice}.00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.unitPrice * product.quantity}.00
                        </td>

                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button onClick={() => handleOpen(product)}>
                            View
                          </button>
                        </td> */}

                        <td className="whitespace-nowrap py-4 pl-3 text-sm font-medium sm:pr-6 grid justify-center ">
                          <div className="flex justify-center w-full">
                            <button
                              className="p-1 bg-green-300 rounded-md mr-2 text-green-900 w-full hover:bg-green-400"
                              onClick={() =>
                                onEvaluation(product._id, "approved", product)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="p-1 bg-red-300 rounded-md text-red-900 w-full hover:bg-red-400"
                              onClick={() =>
                                onEvaluation(product._id, "rejected", product)
                              }
                            >
                              Reject
                            </button>
                          </div>
                          <button
                            onClick={() => handleOpen(product, "partial")}
                            className="p-1 my-1 bg-slate-300 rounded-md text-slate-800 hover:bg-gray-400"
                          >
                            Partially approve
                          </button>

                          <button
                            onClick={() => handleOpen(product, "topManager")}
                            className="px-2 p-1 bg-slate-300 rounded-md text-slate-800 hover:bg-gray-400"
                          >
                            Send to Top manager
                          </button>
                        </td>

                        {isAcceptClicked ? (
                          <>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              fullWidth={true}
                            >
                              <DialogTitle id="alert-dialog-title">
                                <div className="align-middle py-4 justify-center grid font-semibold">
                                  Order Details
                                </div>
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {productDetails && (
                                    <>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Title : {productDetails.title}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Owner : {productDetails.owner}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Price : {productDetails.unitPrice}.00
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Quantity : {product.quantity}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Location : {productDetails.location}
                                      </p>
                                    </>
                                  )}
                                  {userDetails && (
                                    <p className="align-middle text-gray-900 pb-4 ml-4">
                                      Seller name : {userDetails.userName}
                                    </p>
                                  )}
                                </DialogContentText>
                              </DialogContent>

                              <DialogActions>
                                <button
                                  type="button"
                                  className="inline-flex w-full font-semibold items-center justify-center rounded-md border border-transparent bg-yellow-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                                  onClick={() =>
                                    handleClose("approved", product._id)
                                  }
                                >
                                  Accept the order
                                </button>
                              </DialogActions>
                            </Dialog>
                          </>
                        ) : (
                          <>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              fullWidth={true}
                            >
                              <DialogTitle id="alert-dialog-title">
                                <div className="align-middle py-4 justify-center grid font-semibold">
                                  Order Details
                                </div>
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  {productDetails && (
                                    <>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Title : {productDetails.title}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Owner : {productDetails.owner}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Price : {productDetails.unitPrice}.00
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Quantity : {product.quantity}
                                      </p>
                                      <p className="align-middle text-gray-900 pb-4 ml-4">
                                        Location : {productDetails.location}
                                      </p>
                                    </>
                                  )}
                                  {userDetails && (
                                    <p className="align-middle text-gray-900 pb-4 ml-4">
                                      Seller name : {userDetails.userName}
                                    </p>
                                  )}
                                </DialogContentText>
                              </DialogContent>

                              <DialogActions>
                                <button
                                  type="button"
                                  className="inline-flex w-full font-semibold items-center justify-center rounded-md border border-transparent bg-yellow-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                                  onClick={() =>
                                    handleClose("rejected", product._id)
                                  }
                                >
                                  Reject the order
                                </button>
                              </DialogActions>
                            </Dialog>
                          </>
                        )}

                        {/* partial approve modal */}
                        <Dialog
                          open={partialOpen}
                          onClose={() => setPartialOpen(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth={true}
                        >
                          <DialogTitle id="alert-dialog-title">
                            <div className="align-middle py-4 justify-center grid font-semibold">
                              Partially approve order
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              {productDetails && (
                                <>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Title : {productDetails.title}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Owner : {productDetails.owner}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Price : {productDetails.unitPrice}.00
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Quantity : {product.quantity}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Location : {productDetails.location}
                                  </p>
                                </>
                              )}
                              {userDetails && (
                                <p className="align-middle text-gray-900 pb-4 ml-4">
                                  Seller name : {userDetails.userName}
                                </p>
                              )}
                              <p className="align-middle text-yellow-600 pb-4 ml-4 mt-4">
                                Enter the approved quantity
                              </p>
                              <div className="mt-1">
                                <input
                                  id="quantity"
                                  name="quantity"
                                  type="number"
                                  autoComplete="current-quantity"
                                  placeholder="Enter quantity"
                                  required
                                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                  onChange={(e) =>
                                    setApprovedQuantity(e.target.value)
                                  }
                                />
                              </div>
                              {isAppovedQuantity && (
                                <div className="bg-red-200 mt-1 w-full px-2 text-sm py-1 rounded-md text-red-700">
                                  Please enter quantity
                                </div>
                              )}
                            </DialogContentText>
                          </DialogContent>

                          <DialogActions>
                            <button
                              type="button"
                              className="inline-flex w-full font-semibold items-center justify-center rounded-md border border-transparent bg-yellow-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                              onClick={() =>
                                // handleClose("approved", product._id)
                                // setPartialOpen(false)
                                onPartialApprove(product)
                              }
                            >
                              Partialy approve
                            </button>
                          </DialogActions>
                        </Dialog>

                        {/* send to top manager */}
                        <Dialog
                          open={sendTopManagerOpen}
                          onClose={() => setSendTopManagerOpen(false)}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          fullWidth={true}
                        >
                          <DialogTitle id="alert-dialog-title">
                            <div className="align-middle py-4 justify-center grid font-semibold">
                              Order Details
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              {productDetails && (
                                <>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Title : {productDetails.title}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Owner : {productDetails.owner}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Price : {productDetails.unitPrice}.00
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Quantity : {product.quantity}
                                  </p>
                                  <p className="align-middle text-gray-900 pb-4 ml-4">
                                    Location : {productDetails.location}
                                  </p>
                                </>
                              )}
                              {userDetails && (
                                <p className="align-middle text-gray-900 pb-4 ml-4">
                                  Seller name : {userDetails.userName}
                                </p>
                              )}
                            </DialogContentText>
                          </DialogContent>

                          <DialogActions>
                            <button
                              type="button"
                              className="inline-flex w-full font-semibold items-center justify-center rounded-md border border-transparent bg-yellow-600 mx-10 mb-4 text-white px-4 py-2 text-sm"
                              onClick={() =>
                                // handleClose("approved", product._id)
                                onSendToTopManager(product)
                              }
                            >
                              Send to top manager
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
