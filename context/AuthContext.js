const { createContext, useContext, useEffect, useState } = require("react");
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth, db } from "../utils/firebase.utils";

const AuthContext = createContext({
  currentUser: null,
  login: () => Promise,
  logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setCurrentUser({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function login(email, password) {
    const auth = getAuth();
    if (email) {
      if (password.length >= 6) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            toast.success("SignIn Successful", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/");
          })
          .catch((error) => {
            if (error.message.includes("wrong-password")) {
              toast.info("Wrong Password.");
            }
            if (error.message.includes("user-not-found")) {
              toast.info("User not found.");
            }
          });
      } else {
        toast.info(`Password must be at least 6 characters.`);
      }
    } else {
      toast.info(`Email field can't be empty`);
    }
  }

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(
      () =>
        toast.success("Successfully Logged out", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }),
      router.push("/")
    );
  };

  const values = { currentUser, login, logout };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
