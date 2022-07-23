import React from "react";
import Link from "next/link";
import { CartState } from "../CartContext";
import Item from "../components/checkoutItems/checkoutItems";
import { useAuth } from "../context/AuthContext";
import { storeOrderHistory } from "../utils/firebase.utils";
import { useRouter } from "next/router";

const Checkout = () => {
  const {
    state: { cart },
    total,
    totalMrp,
    disc,
  } = CartState();
  const router = useRouter();

  const { currentUser } = useAuth();
  const address = currentUser?.address;

  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(total),
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Thesari Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Test",
      image: "/logo.jpg",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // console.log(response.razorpay_payment_id);
        // console.log(response.razorpay_order_id);
        // console.log(response.razorpay_signature);

        var ch = response.razorpay_order_id;
        var val = "";
        for (let i = 0; i <4; i++) {
          var value = ch.charCodeAt(i);
          var str = value.toString();
          val = val + str;
        }
        var order_id = val.slice(5,13)
        var today = new Date();

        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        storeOrderHistory(
          currentUser.id,
          // response.razorpay_order_id,
          order_id,
          cart,
          total,
          date
        );
        router.push("/orders");
      },
      prefill: {
        name: "Test",
        email: "test@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div className="bg-mainColor md:px-32 ">
      <div className="font-bold text-3xl py-3 text-center">Checkout</div>
     {currentUser && <div className="flex flex-wrap md:flex-nowrap md:flex-row flex-col">
        <div className="md:w-2/3 w-full px-4 md:px-0 ">
          {currentUser && (
            <>
              <h2 className="font-semibold text-xl py-3">Delivery Details</h2>
              <div className="shadow-md bg-white md:px-10 px-3  py-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium pb-2">Deliver To:</h3>
                  <Link href="/Myaccount">
                    <button className="text-base font-medium rounded-sm py-1 md:px-2 px-1 border-gray_300 border-solid border text-pink">
                      Change
                    </button>
                  </Link>
                </div>
                <div className="flex items-center pb-2">
                  <h3 className="text-lg font-medium md:pr-4 pr-2">
                    {address?.name}
                  </h3>
                  <p className="p-1 text-gray bg-gray_300 rounded-sm text-xs">
                    Home
                  </p>
                </div>
                <p className="text-sm font-medium text-rare pb-2">
                  {address?.addressLine}, {address?.city} {address?.pinCode},{" "}
                  {address?.state}
                </p>
                <p className="text-sm font-medium text-rare pb-2">
                  {address?.phone}
                </p>
              </div>
            </>
          )}
          <h2 className="font-semibold text-xl py-3">Review Cart Items</h2>
          <div className=" shadow-md bg-white">
            {cart?.map((curItem) => {
              return <Item key={curItem.id} {...curItem} />;
            })}
          </div>
          {/* <Link href="/orders"> */}
          <button
            onClick={makePayment}
            className="flex mt-5 ml-auto text-white bg-pink border-0 py-2 md:px-6 px-3 focus:outline-none hover:bg-color2 rounded"
          >
            Quick Pay ₹{total}
          </button>
          {/* </Link> */}
        </div>
        <div className="container  md:w-1/3 w-full md:ml-6 px-4 md:px-0">
          <h2 className="font-semibold text-xl py-3">Price Details</h2>
          <div className="shadow-md bg-white pb-4">
            <div className=" text-sm font-medium text-rare flex justify-between md:px-5 px-3 py-2">
              <span>Price ({cart?.length} items)</span>
              <span>₹{totalMrp}</span>
            </div>
            <div className="text-sm font-medium text-rare flex justify-between md:px-5 px-3 py-2">
              <span>Discount</span>
              <span className="text-green"> − ₹{disc}</span>
            </div>
            <div className=" text-sm font-medium text-rare flex justify-between md:px-5 px-3 py-2 pb-5">
              <span>Delivery Charges</span>
              <span className="text-green">FREE</span>
            </div>
            <div className=" font-semibold text-base flex justify-between md:px-5 px-3 py-3 border-dashed border-y-2 border-opacity-50 border-gray">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            <div className=" text-green font-semibold text-base md:px-5 px-3 py-2 pt-4">
              You will save ₹{disc} on this order
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Checkout;
