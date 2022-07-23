import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartState } from "../../CartContext";
import Link from "next/link";
import { LocalCartStorage } from "../../utils/firebase.utils";
import { useAuth } from "../../context/AuthContext";

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [service, setService] = useState();
  const [pin, setPin] = useState();
  const {
    state: { product, cart },
    dispatch,
  } = CartState();

  const {currentUser} = useAuth();

  const [item, setItem] = useState([]);

  function filterData() {
    const filterdItem = product?.filter((item) => item.longTitle === slug);
    if (filterdItem) {
      setItem({ ...filterdItem[0] });
    }
  }

  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  useEffect(()=>{
    if(triggered )
    LocalCartStorage(currentUser?.id,cart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[triggered])

  const checkService = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success("Yay! Pincode is serviceable", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error("Sorry! your pincode is not serviceable", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  if (!item) return null;

  return (
    <>
      {item && (
        <section className="text-gray-600 body-font overflow-hidden">
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="container px-5 py-16 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {item?.detailUrl && (
                <Image
                  alt="ecommerce"
                  width="400"
                  height="400"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={item.detailUrl}
                />
              )}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray tracking-widest">
                  Thesari.in
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {item.longTitle}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a className="text-gray">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="text-gray">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{item.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-timercolor rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-timercolor ml-1 bg-buttoncolor rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-timercolor ml-1 bg-pink rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{item.price}
                  </span>
                  {cart?.find((p) => p.id === item.id) ? (
                    <Link href="/cart">
                      <button className="flex ml-auto text-white bg-color2 border-0 py-2 px-6 focus:outline-none hover:bg-error rounded">
                        Go To Cart
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={async () => {
                        toast.success("Item added to Cart", {
                          position: "bottom-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                        await dispatch({
                          type: "ADD_TO_CART",
                          payload: item,
                        });
                        setTriggered(true);
                      }}
                      className="flex ml-auto text-white bg-pink border-0 py-2 px-6 focus:outline-none hover:bg-color2 rounded"
                    >
                      Add to Cart
                    </button>
                  )}

                  <button className="rounded-full w-10 h-10 bg-mainColor p-0 border-0 inline-flex items-center justify-center text-gray ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <div className="pincode flex mt-6 space-x-2 text-sm ">
                  <input
                    onChange={onChangePin}
                    className="px-2 border-2 rounded-md border-timercolor"
                    type="number"
                    placeholder="  Enter your Pincode"
                  ></input>
                  <button
                    onClick={checkService}
                    className="flex ml-auto text-white bg-pink border-0 py-2 px-6 focus:outline-none hover:bg-color2 rounded"
                  >
                    Check
                  </button>
                </div>
                {!service && service != null && (
                  <div className="text-error text-sm mt-3">
                    Sorry! we have not reached your pincode yet.
                  </div>
                )}
                {service && service != null && (
                  <div className="text-success text-sm mt-3">
                    Yay! Your pincode is serviceable.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
