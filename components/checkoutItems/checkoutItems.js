import Image from "next/image";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { CartState } from "../../CartContext";

const Item = ({ id, detailUrl, longTitle, qty, price }) => {
  const {  increment, decrement } = CartState();
  return (
    <>
      <div className="items-info flex items-center ">
        <div className="product-img w-1/7  p-2 md:mr-2">
          <Image src={detailUrl}  width="130" height="110" layout="fixed" alt="iamge" />
        </div>

        <div className="title w-1/7 p-2 md:mr-2 justify-center text-center md:text-lg text-sm">
          <h2>{longTitle}</h2>
        </div>
        <div className=" md:pl-12 w-1/7 md:p-2 p-0">
          <AiFillMinusCircle
            className="md:text-2xl sm:text-lg text-pink"
            onClick={() => decrement(id)}
          />
        </div>
        <div className="w-1/7 md:p-2 p-1">
          <span className=" md:text-lg text-sm font-semibold md:px-3 px-1 py-1 border-solid border-2 border-pink border-opacity-50">{qty}</span>
        </div>
        <div className="w-1/7 md:p-2 p-0">
          <AiFillPlusCircle
            className="md:text-2xl sm:text-lg text-pink"
            onClick={() => increment(id)}
          />
        </div>
        <div className="price w-1/7 md:p-2 p-1 lg:px-12">
          <h3 className="font-semibold">₹{price}</h3>
        </div>
      </div>
    </>
  );
};
export default Item;
