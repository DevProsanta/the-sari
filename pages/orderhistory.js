import React from "react";
import OrderItem from "../components/OrderHistory/OrderItem";
import { useAuth } from "../context/AuthContext";

const Orderhistory = () => {
  const { currentUser } = useAuth();

  const order = currentUser?.orders;

  return (
    <div className="bg-mainColor py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <h1 className="font-bold text-3xl py-3 mb-3">My Orders -&gt;</h1>
      {order.length == 0 && <div>Oh! looks like you haven&apos;t placed any order</div>}
      {order?.map((item, index) => {
        return <OrderItem key={index} orderDetail={item} />;
      })}
    </div>
  );
};

export default Orderhistory;
