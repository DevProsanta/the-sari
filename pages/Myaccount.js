import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../utils/firebase.utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myaccount = () => {
  const { currentUser } = useAuth();
  const add = currentUser?.address;
  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });
  useEffect(() => {
    if (currentUser?.address) {
      setUserProfile(currentUser.address);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.id);
    await updateDoc(userRef, {
      address: { ...userProfile },
    });
    toast.success("Address Added Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUpdatebutton(false)
  };


  const [updatebutton, setUpdatebutton] = useState(false);

  return (
    <>
    {currentUser ? (
        <div className="bg-mainColor flex">
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
     <div className="md:w-2/3 w-full">
       <h2 className="text-xl font-semibold pt-5 pb-2 px-9 lg:mx-36 mx-1">
         1. Account Details
       </h2>
       <div className="flex lg:mx-36 mx-1 py-3 shadow-md bg-white rounded-md">
         <div className=" mb-2 md:px-10 px-2">
           <label htmlFor="name" className="leading-7 text-sm text-gray-600">
             Name
           </label>
           <input
             onChange={handleChange}
             type="text"
             id="name"
             name="name"
             value={currentUser?.displayName}
             className="w-full bg-formfill rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
         <div className="md:px-10 px-2 mb-2">
           <label htmlFor="email" className="leading-7 text-sm text-gray-600">
             Email
           </label>
           <input
             onChange={handleChange}
             type="email"
             id="email"
             name="email"
             value={currentUser?.email}
             className="w-full bg-formfill rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
           />
         </div>
       </div>
       <h2 className="text-xl font-semibold pt-6 pb-2 px-9 lg:mx-36 mx-1">
         2. Delivery Address
       </h2>
       {currentUser?.address && (
         <div className="shadow-md bg-white lg:mx-36 mx-1 mb-2 md:px-10 px-3  py-2 rounded-md">
           <div className="flex items-center justify-between">
             <h3 className="text-lg font-medium pb-2">Deliver To:</h3>
             <Link href="/Myaccount">
               <button onClick={()=>setUpdatebutton(!updatebutton)} className="text-base font-medium rounded-sm py-1 md:px-2 px-1 border-timercolor border-solid border bg-gray_300 text-pink">
                 Update
               </button>
             </Link>
           </div>
           <div className="flex items-center pb-2">
             <h3 className="text-lg font-medium md:pr-4 pr-2">
               {add?.name}
             </h3>
             <p className="p-1 text-gray bg-gray_300 rounded-sm text-xs">
               Home
             </p>
           </div>
           <p className="text-sm font-medium text-rare pb-2">
             {add?.addressLine}, {add?.city}{" "}
             {add?.pinCode}, {add?.state}
           </p>
           <p className="text-sm font-medium text-rare pb-2">
             {add?.phone}
           </p>
         </div>
       )}
       {updatebutton && (
           <>
            <h2 className="font-semibold lg:mx-36 mx-1 text-xl py-3">Delivery Details</h2>
         <div className=" lg:mx-36 mx-1 shadow-md rounded-md bg-white pb-5 pt-4">
           <div className="flex  ">
             <div className=" mb-2 md:px-10 px-2">
               <label
                 htmlFor="name"
                 className="leading-7 text-sm text-gray-600"
               >
                 Name
               </label>
               <input
                 onChange={handleChange}
                 type="text"
                 id="name"
                 name="name"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
             <div className="md:px-10 px-2 mb-2">
               <label
                 htmlFor="Phone"
                 className="leading-7 text-sm text-gray-600"
               >
                 Phone Number
               </label>
               <input
                 onChange={handleChange}
                 type="Phone"
                 id="Phone"
                 name="phone"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
           </div>
           <div className="mb-2 md:px-10 px-2">
             <label
               htmlFor="addressLine"
               className="leading-7 text-sm text-gray-600"
             >
               Address Line
             </label>
             <textarea
               id="addressLine"
               type="text"
               name="addressLine"
               onChange={handleChange}
               className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
             ></textarea>
           </div>
           <div className="flex">
             <div className=" mb-2 md:px-10 px-2">
               <label
                 htmlFor="City"
                 className="leading-7 text-sm text-gray-600"
               >
                 City
               </label>
               <input
                 onChange={handleChange}
                 type="City"
                 id="City"
                 name="city"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
             <div className="md:px-10 px-2 mb-2">
               <label
                 htmlFor="Pincode"
                 className="leading-7 text-sm text-gray-600"
               >
                 Pincode
               </label>
               <input
                 onChange={handleChange}
                 type="Pincode"
                 id="Pincode"
                 name="pinCode"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
           </div>
           <div className="flex">
             <div className=" mb-2 md:px-10 px-2">
               <label
                 htmlFor="State"
                 className="leading-7 text-sm text-gray-600"
               >
                 State
               </label>
               <input
                 onChange={handleChange}
                 type="State"
                 id="State"
                 name="state"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
             <div className="md:px-10 px-2 mb-2">
               <label
                 htmlFor="Country"
                 className="leading-7 text-sm text-gray-600"
               >
                 Country
               </label>
               <input
                 onChange={handleChange}
                 type="Country"
                 id="Country"
                 name="country"
                 value="India"
                 className="w-full bg-white rounded border border-gray_300 focus:border-pink focus:ring-2 focus:ring-pink_200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
               />
             </div>
           </div>
           <button
             onClick={handleSubmit}
             className="flex mt-5 md:ml-9 ml-32 text-white bg-pink border-0 py-2 px-4 focus:outline-none hover:bg-color2 rounded"
           >
             Submit
           </button>
         </div></>
       )}
     </div>
     <div className="md:w-1/3 w-0 md:mx-2 lg:mx-0 mt-20 ">
       <Image
         width="400"
         height="400"
         alt="panda"
         className=" object-cover object-center rounded"
         src="/relax panda.jpg"
       />
     </div>
   </div>
    ) : ("")}
    
    </>
  );
};

export default Myaccount;
