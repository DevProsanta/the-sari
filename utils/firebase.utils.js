import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
  apiKey: "AIzaSyBp29MAMndFHhrCliFPMw1TeTzSh8383wg",
  authDomain: "sari-project-4bb3c.firebaseapp.com",
  databaseURL: "https://sari-project-4bb3c-default-rtdb.firebaseio.com",
  projectId: "sari-project-4bb3c",
  storageBucket: "sari-project-4bb3c.appspot.com",
  messagingSenderId: "88401442681",
  appId: "1:88401442681:web:58a1344fcd10043e3f61a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const createUserProfileDocument = async (userAuth, displayName) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, uid } = userAuth;
    const id = uid;
    const orders = [];
    const createdAt = new Date();

    try {
      await setDoc(doc(db, "users", id), {
        id,
        createdAt,
        displayName,
        email,
        orders,
      });
    } catch (error) {
      alert(error.message);
    }
  }
};

export async function LocalCartStorage(userId, localCart) {
  if(userId === undefined || userId === null ) return;
  const userRef = doc(db, `users/${userId}`)

  
  console.log(userRef);
  console.log(localCart);

  await updateDoc(userRef, {
    localCart,
  });
}

export async function storeOrderHistory(
  userId,
  _orderId,
  _orderHistory,
  _totalAmount,
  date
) {
  const userRef = doc(db, `users/${userId}`);
  // creating a virtual object

  var virtualOrders = {
    orderId: _orderId,
    orders: _orderHistory,
    total: _totalAmount,
    date,
  };
  await updateDoc(userRef, {
    orders: arrayUnion(virtualOrders),
  });
}
