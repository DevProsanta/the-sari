import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { CartState } from "../../CartContext";

const Items = ({ id, url, longTitle, qty, price }) => {
  const { removeItem, increment, decrement } = CartState();
  return (
    <>
      <div className="items-info flex items-center ">
      <Link href={`/product/${longTitle}`} >
        <div className="product-img cursor-pointer w-1/7 p-2 md:mr-2">
          <Image src={url} width="150" height="130" alt="iamge" />
        </div>
        </Link>
        <div className="title w-1/7 p-2 md:mr-2 justify-center text-center md:text-lg text-sm">
          <h2>{longTitle}</h2>
        </div>
        <div className="add-minus-quantity md:pl-12 w-1/7 p-2">
          <AiFillMinusCircle
            className="md:text-2xl sm:text-lg text-pink"
            onClick={() => decrement(id) }
          />
        </div>
        {/* <input type="text" placeholder={qty} disabled /> */}
        <div className="w-1/7 p-2">
          <span className=" md:text-lg text-sm font-semibold px-3 py-1 border-solid border-2 border-pink border-opacity-50">{qty}</span>
        </div>
        <div className="w-1/7 p-2">
          <AiFillPlusCircle
            className="md:text-2xl sm:text-lg text-pink"
            onClick={() => increment(id)}
          />
        </div>
        <div className="price w-1/7 p-2 lg:px-12">
          <h3 className="font-semibold">₹{price}</h3>
        </div>
        <div className="remove-item w-1/7 p-2">
          <BsTrashFill
            className="md:text-2xl sm:text-lg text-pink"
            onClick={() => removeItem(id)}
          />
        </div>
      </div>
    </>
  );
};

export default Items;
