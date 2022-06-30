/* eslint-disable react/jsx-key */
import React from "react";
import Image from "next/image";
import { BsBagCheckFill } from "react-icons/Bs";


import Link from "next/link";
import { CartState } from "../CartContext";
import Items from "../components/cartItems/Items";
import { useRouter } from "next/router";


const Cart = () => {
  const {
    state: { cart },
    clearCart,
    total,
    totalMrp,
    disc,
  } = CartState();

  const router = useRouter();

  return (
    <div className=" md:w-full py-3 lg:px-24 overflow-hidden px-2 bg-mainColor">
      {cart.length != 0 && (
        <div className="banner mb-5 ">
          <Image
            width="50"
            height="10"
            layout="responsive"
            src="https://i.ibb.co/pbf47dm/Checkout-page-banner.jpg"
            alt="banner"
          />
        </div>
      )}
      <>
        {cart?.length == 0 && (
          <div>
            <h1 className="font-bold text-lg py-3 ">
              Shopping Cart ({cart.length})
            </h1>
            <div className="container text-center items-center shadow-md bg-white rounded-md w-full">
              <Image
                src="/empty cart.jpg"
                width="50"
                height="15"
                layout="responsive"
                alt="cart empty"
              />
              <div className="pb-1 md:text-base text-sm font-medium">
                Missing Cart items?
              </div>
              <span className="md:text-sm text-xs font-medium text-gray">Then Go add some from our awesome collection</span>
              <div className=" flex justify-center text-center items-center pt-4 pb-5">
              <button
              onClick={() => router.push("/")}
                  className="mt-0  text-white bg-pink border-0 py-2 px-4 focus:outline-none hover:bg-color2 rounded"
                >
                  You Go Girl
                </button>
                {/* <Image src="/YX1e.gif"  width="180" height="150" alt="gifimage" /> */}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap md:flex-nowrap md:flex-row flex-col">
          {cart?.length != 0 && (
            <div className="md:w-2/3 w-full px-4 md:px-0 ">
              <h1 className="font-bold text-lg py-3 ">
                Shopping Cart ({cart.length})
              </h1>

              <div className="cart-items">
                <div className="container shadow-md bg-white">
                  {cart.map((curItem) => {
                    return <Items key={curItem.id} {...curItem} />;
                  })}
                </div>
              </div>
            </div>
          )}

          {cart?.length != 0 && (
            <div className="container  md:w-1/3 w-full md:ml-6 px-4 md:px-0">
              <h2 className="font-semibold text-xl py-3">Price Details</h2>
              <div className="shadow-md bg-white pb-4">
                <div className=" text-sm font-medium text-rare flex justify-between md:px-5 px-3 py-2">
                  <span>Price ({cart.length} items)</span>
                  <span>₹{totalMrp}</span>
                </div>
                <div className="text-sm font-medium text-rare flex justify-between md:px-5 px-3 py-2 pb-5">
                  <span>Discount</span>
                  <span className="text-green"> − ₹{disc}</span>
                </div>
                <div className=" font-semibold text-base flex justify-between md:px-5 px-3 py-3 border-dashed border-y-2 border-opacity-50 border-gray">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
                <div className=" text-green font-semibold text-base md:px-5 px-3 py-2 pt-4">
                  You will save ₹{disc} on this order
                </div>
              </div>

              <div className="flex pb-4">
                <button
                  onClick={clearCart}
                  className="clear-cart mt-3 text-white bg-pink border-0 py-2 px-6 focus:outline-none hover:bg-color2 rounded"
                >
                  Clear Cart
                </button>
                <Link href="/checkout">
                  <button className="flex mt-3 ml-auto text-white bg-pink border-0 py-2 px-6 focus:outline-none hover:bg-color2 rounded">
                    <BsBagCheckFill className="mt-1 mr-1" />
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Cart;
