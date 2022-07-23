import { useEffect, useState } from "react";
import Context from "../CartContext";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import AuthContextProvider from "../context/AuthContext";
import "../styles/globals.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.utils";
import NextNProgress from "nextjs-progressbar";
import Image from "next/image";


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [carts, setCarts] = useState([])

  useEffect(()=>{
    try {
      if(localStorage.getItem("cart")){
        var my = (JSON.parse(localStorage.getItem("cart")))
        if(my.length != 0){
          setCarts(my);
        }
    }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }  
  },[])
 
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
    <>{!loading ?  (
      <AuthContextProvider>
        <Context product={productData} carts={carts}>
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
      </AuthContextProvider>) : (
        <div className="flex justify-center w-full h-[100vh] items-center bg-[#EEEBF9]">
          <Image
            src="/sari.gif"
            width="200"
            height="200"
            alt="loading."
            priority={true}
          ></Image>
          </div>
      )}
    </>
  );
}

export default MyApp;
