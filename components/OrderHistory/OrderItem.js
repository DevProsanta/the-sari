import Image from "next/image";
import React from "react";

const OrderItem = ({orderDetail}) => {

  const singleOrder = orderDetail?.orders;
  return (
    <div className=" bg-white rounded-md md:px-2 px-1 md:py-2 py-1 mb-4">
      <div className="flex justify-start item-start space-y-2 flex-col ">
       <div className="flex items-center">
        <h1 className=" text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray">
          Order #{orderDetail?.orderId} 
        </h1>
        <span className="md:px-4 px-2 font-semibold leading-7 lg:leading-9  text-gray text-xl">( Total : ₹{orderDetail?.total})</span>
       </div>
        <p className="text-base font-medium leading-6 text-timercolor">
          {orderDetail?.date}
        </p>
      </div>
      <div className="mt-8 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray_50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray">
              Order Deatils
            </p>
            {singleOrder?.map((item,index)=>{
              return (
            <div key={index} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <Image
                  className="w-full hidden md:block"
                  src={item?.url}
                  alt="dress"
                  width="150"
                  height="150"
                />
              </div>
              <div className="border-b border-gray_300 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray">
                    {item?.longTitle}
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none text-gray">
                      <span className="text-gray_300">Category: </span> {item?.shortTitle}
                    </p>
                    <p className="text-sm leading-none text-gray">
                      <span className="text-gray_300">Color: </span> Light Blue
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6 text-gray font-semibold md:pl-10">
                    ₹{item?.price} 
                  </p>
                  <p className="text-base xl:text-lg leading-6 font-semibold text-error line-through">
                   ₹{item?.mrp}
                  </p>
                  <p className="text-base xl:text-lg leading-6 text-gray font-semibold">
                    {item?.qty}
                  </p>
                </div>
              </div>
            </div>)})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
