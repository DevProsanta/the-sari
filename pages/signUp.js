import React from "react";
import Link from "next/link";
import { createUser, createUserProfileDocument } from "../utils/firebase.utils";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

const SignUp = () => {
  const [user, setUser] = React.useState({
    displayName: "",
    email: "",
    password: "",
  });
  const router = useRouter()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password } = user;
    if (displayName.length > 0) {
      if (email.length > 0) {
        if (password.length > 6) {
          try {
            let auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password).then(

              (userCredential) => {
                const user = userCredential.user;
                createUserProfileDocument(user, displayName);
              },
              router.push('/')
              
            );
          } catch (error) {
            alert(error.message);
          }
        } else {
          toast.error("Password length must be greater than 6", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error("Email cannot be Empty ", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Display Name cannot be Empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray">
            Sign Up for your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray">
            Or
            <Link href="/login">
              <a className="font-medium text-pink hover:text-pink"> Sign In </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="displayName"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-t-md focus:outline-none focus:ring-pink focus:border-pink focus:z-10 sm:text-sm"
                placeholder="Enter your Name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-t-md focus:outline-none focus:ring-pink focus:border-pink focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray placeholder-gray text-gray rounded-b-md focus:outline-none focus:ring-pink focus:border-pink focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink hover:bg-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
              onClick={handleSubmit}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-pink group-hover:text-pink"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
