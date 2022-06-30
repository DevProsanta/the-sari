import Image from "next/image";
import React from "react";
import OrderItem from "../components/OrderHistory/OrderItem";

const Orderhistory = () => {
  return (
    <div className="bg-mainColor py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <OrderItem />
    </div>
  );
};

export default Orderhistory;
