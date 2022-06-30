import Head from "next/head";
import Carousel from "react-material-ui-carousel";
import  bannerData  from "../config/data";
import Image from "next/image";
import ProductSlide from "../components/productSlide/ProductSlide";



export default function Home() {

  return (
    <div className="bg-mainColor">
      <Head>
        <title>Sari.in - Wear the Culture</title>
        <meta name="description" content="Sari - The symbol of independence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home_container bg-mainColor">
        <div className="home_image mt-3 mx-2">
          <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
          >
            {bannerData.map((image, index) => (
              <Image
                key={index}
                src={image}
                className="image "
                layout="responsive"
                width="100"
                height="25"
                alt="slideimage"
              />
            ))}
          </Carousel>
        </div>
        <div className="mt-4 mx-2">
          <ProductSlide timer={true} title="Deals of the Day" />
        </div>
        <div className="mt-3 mx-2">
          <ProductSlide timer={false} title="Best sellers" />
        </div>
        <div className="main_banner mt-4 mx-2">
          <Image
            src="https://i.ibb.co/LnrDFXW/Banner-Saree-1.jpg"
            layout="responsive"
            width="100"
            height="26"
            alt="img"
          />
        </div>
        <div className="mt-3 mx-2">
          <ProductSlide timer={false} title="Top Picks" />
        </div>
      </div>
    </div>
  );
}
