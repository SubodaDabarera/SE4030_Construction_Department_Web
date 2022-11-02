import React, { useEffect, useState } from "react";
import { viewProduct } from "../../api/productAPI";
import { getUserDetails } from "../../api/userAPI";

const RequestRow = ({ product }) => {
  const [productDetails, setProductDetails] = useState();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    viewProduct(product.productId, setProductDetails).then(() => {
      console.log("Data retrieved successfully");
    });

    getUserDetails(product.siteManager, setUserDetails).then(() => {
      console.log("Data retrieved successfully");
    });
  }, [product]);


  return (
    <>
      {productDetails && (
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {productDetails.title}
        </td>
      )}
      {userDetails && (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {userDetails.userName}
        </td>
      )}
    </>
  );
};

export default RequestRow;
