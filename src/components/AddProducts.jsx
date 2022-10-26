import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { addNewProduct } from "../api/productAPI";

const staticOwnersList = [
  { id: "ec1d8513-5f5c-4353-9868-0264fd59b14a", name: "Lakmal Perera" },
  { id: "54329373-0af6-4064-befb-7f2a946fda7e", name: "Jon Doe" },
  { id: "1e5b403b-248a-4c9b-b4bb-96f2c7d7bec6", name: "Silvester Tweety" },
  { id: "9f03beea-3f4d-4e12-a3d5-66d84700d2c5", name: "Stark Mathews" },
  { id: "2cdd14b1-2d7e-4f28-abff-a0a9cf69fb86", name: "Kumar Dharmaraja" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const AddProducts = () => {
  const [ownersList, setOwnersList] = useState(staticOwnersList);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [owner, setOwner] = useState({name:"Select . . ."});
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState('')

  // error messages
  const [isPriceError, setIsPriceError] = useState(false);
  const [isQtyError, setIsQtyError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  const [isTypeError, setIsTypeError] = useState(false);
  const [isLocationError, setIsLocationError] = useState(false);
  const [isOwnerError, setIsOwnerError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {

    if (qty <= 0) {
      setIsQtyError(true);
    } else {
      setIsQtyError(false);
    }

    if (price <= 0) {
      setIsPriceError(true);
    } else {
      setIsPriceError(false);
    }

    // if (category == "") {
    //   setIsCategoryError(true);
    // } else {
    //   setIsCategoryError(false);
    // }

    // if (type == "") {
    //   setIsTypeError(true);
    // } else {
    //   setIsTypeError(false);
    // }
    if (title == "") {
      setIsTypeError(true);
    } else {
      setIsTypeError(false);
    }

    if (owner.name == "Select . . .") {
      setIsOwnerError(true);
    } else {
      setIsOwnerError(false);
    }

    if (qty > 0 && price > 0 && category != "" && owner.name != "Select . . ." && type != "") {
      await addNewProduct({
        owner: owner,
        category: category,
        type: type,
        qty: qty,
        price,
        location,
        description
      })
        .then(() => {
          toast.success("Data added successfully !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          navigate("/farmer/mySeedRequests");
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <>
        <ToastContainer />
        <div className="my-10">
          <p className="font-semibold text-2xl text-center">New product</p>

          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Owner of the Product :
          </label>

          {/* dropdown start */}
          <Menu
            as="div"
            className="relative inline-block text-left w-full mt-2"
          >
            <div>
              <Menu.Button className="inline-flex py-2 px-5 border border-gray-300 md:mr-0 md:pr-0 w-full rounded-md text-sm font-medium text-gray-700 active:ring-2 active:ring-amber-400 active:border-0 focus:ring-2 focus:ring-amber-400 focus:border-0">
                <div className="text-gray-500 font-normal">{owner.name}</div>
                <ChevronDownIcon
                  color="#a3a3a3"
                  className=" ml-0.5 h-5 w-3 absolute right-6"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-amber-400 ring-opacity-5 focus:outline-none overflow-visible z-50">
                <div className="py-1">
                  {ownersList && (
                    <>
                      {ownersList.map((owner, idx) => {
                        return (
                          <Menu.Item key={owner.id}>
                            {({ active }) => (
                              <a
                                onClick={() => setOwner(owner)}
                                className={classNames(
                                  active
                                    ? "bg-amber-50 text-gray-700"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {owner.name}
                              </a>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          {/* dropdown end */}

          {isOwnerError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Please select an owner
            </div>
          )}

          <label
            htmlFor="category"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Category :
          </label>
          <input
            type="text"
            name="category"
            id="category"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            required
          />

          {isCategoryError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Category must have value
            </div>
          )}

          <label
            htmlFor="type"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Type :
          </label>
          <input
            type="text"
            name="type"
            id="type"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setType(event.target.value);
            }}
            required
          />

          {isTypeError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Type must have value
            </div>
          )}

          <label
            htmlFor="price"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Unit price (LKR) :
          </label>
          <input
            type="number"
            name="price"
            id="price"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            required
          />

          {isPriceError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Type must have value
            </div>
          )}

          <label
            htmlFor="quantity"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Quantity :
          </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setQty(event.target.value);
            }}
            required
          />

          {isQtyError && (
            <div className="text-red-500 mt-1 text-sm bg-red-100 pl-2 p-1 font-medium rounded-sm">
              Quantity must have positive value
            </div>
          )}

          <label
            htmlFor="location"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Location :
          </label>
          <input
            type="text"
            name="location"
            id="location"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />

          <label
            htmlFor="description"
            className="block text-base font-medium text-gray-700 mt-6"
          >
            Description :
          </label>
          <input
            type="text"
            name="description"
            id="description"
            autoComplete="given-name"
            className="mt-2 focus:ring-1 focus:ring-amber-400 focus:border-amber-400 block w-full shadow-sm sm:text-sm text-gray-600 border-gray-300 rounded-md"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />

          <div className="flex items-center justify-center mt-10">
            <div
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-400 hover:bg-amber-600 transition-colors cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
          
        </div>
      </>
    </div>
  );
};

export default AddProducts;
