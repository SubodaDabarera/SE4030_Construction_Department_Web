import axios from "axios";
import { useSession } from "../hooks/useSession";

const BACKEND_URL = "http://localhost:8000/api";

const CheckSession = () => {
  const { getItem } = useSession();
  const tokenValue = getItem("token");
  return tokenValue;
};

export const addProduct = async (
  { owner, title, unitPrice, quantity, location, description, imgUrl },
  setIsCreationSuccess
) => {
  const token = CheckSession();

  try {
    await axios
      .post(
        `${BACKEND_URL}/product/add-product`,
        {
          headers: {
            "x-access-token": token,
          },
        },
        {
          owner,
          title,
          unitPrice,
          quantity,
          location,
          description,
          imgUrl,
        }
      )
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const viewProductsList = async (setProductList) => {
  const token = CheckSession();
  try {
    await axios
      .get(`${BACKEND_URL}/product`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        if (result) {
          setProductList(result.data.existingProducts);
        } else {
          setProductList([]);
        }
      });
  } catch (err) {
    console.log(err);
    setProductList([]);
  }
};

export const viewProduct = async (productId, setProductDetails) => {
  const token = CheckSession();
  try {
    await axios
      .get(`${BACKEND_URL}/product/` + productId, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setProductDetails(result.data.existingProduct);
      });
  } catch (err) {
    console.log(err);
    setProductDetails("");
  }
};

export const deleteProduct = async (productId) => {
  const token = CheckSession();
  try {
    await axios
      .delete(`${BACKEND_URL}/product/` + productId, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => {
        console.log("Product deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch {}
};

export const updateProduct = async (
  productId,
  { owner, title, unitPrice, quantity, location, description },
  setIsCreationSuccess
) => {
  const updateProduct = {
    owner,
    title,
    unitPrice,
    quantity,
    location,
    description,
  };
  const token = CheckSession();

  try {
    await axios
      .put(
        `${BACKEND_URL}/product/update/` + productId,
        {
          headers: {
            "x-access-token": token,
          },
        },
        updateProduct
      )
      .then((result) => {
        setIsCreationSuccess(result.data.success);
      });
  } catch (err) {
    console.log(err);
    setIsCreationSuccess(false);
  }
};

export const viewProductOnUpdate = async (
  productId,
  setTitle,
  setDescription,
  setOwner,
  setLocation,
  setQty,
  setPrice
) => {
  const token = CheckSession();
  try {
    await axios
      .get(`${BACKEND_URL}/product/` + productId, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((result) => {
        setTitle(result.data.existingProduct.title);
        setDescription(result.data.existingProduct.description);
        setOwner(result.data.existingProduct.owner);
        setLocation(result.data.existingProduct.location);
        setQty(result.data.existingProduct.quantity);
        setPrice(result.data.existingProduct.unitPrice);
      });
  } catch (err) {
    console.log(err);
  }
};
