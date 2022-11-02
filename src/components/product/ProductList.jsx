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

export default function ProductsList() {
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState("");

  useEffect(() => {
    async function getProducts() {
      await viewProductsList(setProductList).then(() => {
        console.log("Products retrived successfully");
      });
    }

    getProducts();
  }, []);

  const handleOpen = async (productId) => {
    await viewProduct(productId, setProductDetails).then(() => {
      console.log("product retrived successfully");
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId).then(() => {
      console.log("product deleted successfully");
    });

    async function getProducts() {
      await viewProductsList(setProductList).then(() => {
        console.log("Products retrived successfully");
      });
    }

    getProducts();
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Products List
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
                        Owner
                      </th>
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
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price ($)
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
                    {productList.map((product, personIdx) => (
                      <tr
                        className={
                          personIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {product.owner}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.unitPrice}.00
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button onClick={() => handleOpen(product._id)}>
                            View
                          </button>

                          <Link to={`/staff/update-product/${product._id}`}>
                            <button>
                              <AiOutlineEdit size={20} color="green-500" />
                            </button>
                          </Link>

                          <button onClick={() => handleDelete(product._id)}>
                            Delete
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
                              <p className="align-middle text-gray-900 pb-4">
                                Title : {productDetails.title}
                              </p>
                              <p className="align-middle text-gray-900 pb-4">
                                Owner : {productDetails.owner}
                              </p>
                              <p className="align-middle text-gray-900 pb-4">
                                Price : {productDetails.unitPrice}
                              </p>
                              <p className="align-middle text-gray-900 pb-4">
                                Quantity : {productDetails.quantity}
                              </p>
                              <p className="align-middle text-gray-900 pb-4">
                                Location : {productDetails.location}
                              </p>
                              <p className="align-middle text-gray-900 pb-4">
                                Quantity : {productDetails.quantity}
                              </p>
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
                              className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-400 px-8 py-2 text-m text-white"
                              onClick={() => handleClose()}
                            >
                              OK
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
