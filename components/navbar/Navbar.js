import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


import { BsSearch } from "react-icons/Bs";
import { MdShoppingBasket } from "react-icons/Md";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartState } from "../../CartContext";
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const {
    state: { cart },
  } = CartState();
  useEffect(() => {}, [currentUser]);
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("saree");
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start h-22 md:h-16 items-center bg-color1 w-full md:sticky top-0 z-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Link href={"/"}>
        <Image
          className="header_logo mr-1 object-contain cursor-pointer"
          src="/logo.jpg"
          width="200"
          height="64"
          alt="logo"
        />
      </Link>
      <div className="header_search flex  items-center rounded-2xl flex-1 mr-1 ">
        <input
          className="header_searchInput h-7 p-4 border-none w-4/5"
          placeholder="Search for Sarees"
          type="text"
          onChange={handleChange}
        />
        <Link href={`/searchPage/${search}`}>
          <span className="p-2 bg-color2 flex">
            <BsSearch
              type="submit"
              className="header_searchIcon flex bg-color2 cursor-pointer  "
            />
          </span>
        </Link>
      </div>
      <div className="header_nav cursor-pointer flex justify-evenly text-center md:mr-10 mt-1 md:mt-0 mb-2">
        {dropdown && (
          <div>
            {currentUser && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute lg:right-52 sm:right-96 z-10 lg:top-11 sm:top-32 bg-color2  rounded-md px-5 w-30"
              >
                <ul>
                  <Link href={"/Myaccount"}>
                    <li className="py-1 text-sm font-medium hover:text-white">
                      My Account
                    </li>
                  </Link>
                  <li
                    className="py-1 text-sm font-medium hover:text-white"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <Link href={"/login"}>
          <div
            className="Header_option flex flex-col text-white	mr-12 ml-0 "
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            <span className="Header_optionone text-xs">Hello </span>
            <span className="Header_optiontwo text-sm font-extrabold">
              {currentUser ? currentUser.displayName : "Sign In"}
            </span>
          </div>
        </Link>
        <Link href={"/orders"}>
          <div className="Header_option flex flex-col text-white	mr-12">
            <span className="Header_optionone text-xs">Returns</span>
            <span className="Header_optiontwo text-sm font-extrabold">
              & Orders
            </span>
          </div>
        </Link>
        <Link href={"/cart"}>
          <div className="header_optionBasket flex items-center text-white mx-2">
            <MdShoppingBasket size="25" />
            <span className="Header_optiontwo header_basketCount">
              {cart.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
