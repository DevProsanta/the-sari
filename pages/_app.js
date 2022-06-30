import { useEffect, useState } from "react";
import Context from "../CartContext";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import AuthContextProvider from "../context/AuthContext";
import "../styles/globals.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const [productData, setProductData] = useState("");

  const fetchProduct = async () => {
    const response = await getDocs(collection(db, "products"));
    setProductData([]);
    response.forEach((doc) => {
      var data = doc.data();
      setProductData((arr) => [...arr, data]);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Context product={productData}>
          <NextNProgress
            color="#ffffff"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
            showOnShallow={true}
          />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Context>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
