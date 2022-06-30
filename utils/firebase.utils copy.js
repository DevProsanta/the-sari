// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  confirmPasswordReset,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp29MAMndFHhrCliFPMw1TeTzSh8383wg",
  authDomain: "sari-project-4bb3c.firebaseapp.com",
  databaseURL: "https://sari-project-4bb3c-default-rtdb.firebaseio.com",
  projectId: "sari-project-4bb3c",
  storageBucket: "sari-project-4bb3c.appspot.com",
  messagingSenderId: "88401442681",
  appId: "1:88401442681:web:58a1344fcd10043e3f61a8"
};

// Initialize Firebase
// export const firestore = firebase.firestore();

export const auth = getAuth();

export function createUser(displayName, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const id= user.uid;
          
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
