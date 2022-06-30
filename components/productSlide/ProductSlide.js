import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import Image from "next/image";
import Link from "next/link";
import { CartState } from "../../CartContext";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductSlide = ({ timer, title }) => {

  const {state:{product}} = CartState();
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className="timer flex items-center ml-2 text-timercolor">
        {hours} : {minutes} : {seconds} Left
      </span>
    );
  };

  return (
    <div className="carousel_container">
      <div className="heading_one flex p-1 bg-white">
        <h2 className="heading_deal flex mr-6 font-bold	 md:text-2xl text-base	">
          {title}
        </h2>
        {timer && (
          <>
            <Image src={timerURL} width="28" height="24" alt="clock" />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
            <button className="header_button flex p-2 bg-buttoncolor border-none text-white md:text-sm text-xs ml-auto">
              View All
            </button>
          </>
        )}
      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["mobile"]}
        renderArrowsWhenDisabled={false}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {product.map((product, index) => {
          return (
            <Link href={`/product/${product.longTitle}`} key={index}>
              <div
                key={index}
                className="wrapper bg-white text-center p-2 border-t-4 border-solid border-bordercolor cursor-pointer"
              >
                <Image
                  src={product.url}
                  className="slide_image"
                  height="200"
                  width="200"
                  alt="products"
                />
                <p
                  className="text mt-1 text-sm"
                  style={{ fontWeight: 600, color: "#212121" }}
                >
                  {product.shortTitle}
                </p>
                <p className="text mt-1 text-sm" style={{ color: "green" }}>
                  {product.discount}
                </p>
                <p
                  className="text mt-1 text-sm"
                  style={{ color: "#212121", opacity: ".6" }}
                >
                  {product.tagline}
                </p>
                {/* <div className="overlay">
                <a
                  href="javascript:undefined"
                  onClick={() => addToBasket(product)}
                >
                  <ShoppingCartIcon sx={{ fontSize: 25 }} />
                </a>

                <a href="#">
                  <FavoriteIcon />
                </a>
              </div> */}
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductSlide;
