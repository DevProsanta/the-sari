import React from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

const Orders = () => {

  const { currentUser } = useAuth()
  
  const n = currentUser?.orders?.length;
  const order = currentUser?.orders?.[n-1];
  const orderDetail = order?.orders;
  

  return (
    <>
      <section className="text-gray body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray tracking-widest">
                Thesari.in
              </h2>
              <h1 className="text-gray text-3xl title-font font-medium mb-4">
                Order Id: #{order?.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your Order has been placed successfully
              </p>
              <div className="flex justify-center text-center  mb-4">
                <a className="flex-grow text-pink border-b-2 border-pink py-2 text-lg px-1">
                  Items
                </a>
                <a className="flex-grow border-b-2 border-gray py-2 text-lg px-1">
                  Item Price
                </a>
              </div>
              { orderDetail?.map((i,index)=>{
                return (<div key={index} className="flex justify-between md:pr-28  mx-2 border-b border-gray py-2">
                <span className="text-gray">{i.shortTitle}</span>
                <span className=" text-gray"> ₹{i.price}</span>
              </div>)
              })
              }
              

              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray">
                  Subtotal : ₹{order?.total}
                </span>
                {/* <Link href="/trackOrder"> */}
                <button className="flex ml-auto text-white bg-pink border-0 py-2 px-6 focus:outline-none hover:bg-pink rounded">
                  Track Order
                </button>
                {/* </Link> */}
              </div>
            </div>
            <Image
              width="400"
              height="400"
              alt="ecommerce"
              className=" object-cover object-center rounded"
              src="https://i.ibb.co/B6tVjbc/drone-2.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
