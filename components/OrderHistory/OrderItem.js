import Image from "next/image";
import React from "react";

const OrderItem = () => {
  return (
    <div className=" bg-white rounded-md md:px-2 px-1 md:py-2 py-1">
      <div className="flex justify-start item-start space-y-2 flex-col ">
       <div className="flex items-center">
        <h1 className=" text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray">
          Order #13432 
        </h1>
        <span className="px-4 font-semibold leading-7 lg:leading-9  text-gray text-xl">( Total : ₹360 )</span>
       </div>
        <p className="text-base font-medium leading-6 text-timercolor">
          21st Mart 2021 at 10:34 PM
        </p>
      </div>
      <div className="mt-8 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray_50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray">
              Order Deatils
            </p>
            <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <Image
                  className="w-full hidden md:block"
                  src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                  alt="dress"
                  width="150"
                  height="150"
                />
              </div>
              <div className="border-b border-gray_300 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray">
                    Premium Quaility Dress
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm leading-none text-gray">
                      <span className="text-gray_300">Style: </span> Italic
                      Minimal Design
                    </p>
                    <p className="text-sm leading-none text-gray">
                      <span className="text-gray_300">Color: </span> Light Blue
                    </p>
                  </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg leading-6 text-gray font-semibold">
                    ₹360 <span className="text-error line-through"> ₹450</span>
                  </p>
                  <p className="text-base xl:text-lg leading-6 text-gray font-semibold">
                    01
                  </p>
                  <p className="text-base xl:text-lg font-semibold leading-6 text-gray">
                    ₹360
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
