import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CartState } from "../../CartContext";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const { slug2 } = router.query;
  const {
    state: { product },
  } = CartState();

  const [item, setItem] = useState([]);


  function filterData() {
    if (slug2) {
      var updatedList =
        slug2.toLowerCase() == "saree"
          ? product
          : product?.filter(
              (i) =>
                (
                  i.longTitle.toLowerCase() && i.shortTitle.toLowerCase()
                ).search(slug2.toLowerCase().trim()) !== -1
            );
    }
    setItem(updatedList);
  }

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug2]);

  return (
    <div className="flex w-full bg-mainColor">
      <div className="w-1/4 hidden lg:flex px-2 m-2 mr-0">
        <Image
          src="https://i.ibb.co/y5zYVjg/side-banner.png"
          width="280"
          height="800"
          layout="fixed"
          alt="side banner"
        />
      </div>
      <div className="w-3/4">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto ">
            <div className="flex flex-wrap -m-4 ">
              {item?.map((k) => {
                return (
                  <>
                  <Link href={`/product/${k.longTitle}`} >
                    <div className="cursor-pointer lg:w-1/4 md:w-1/2 p-4 w-full ">
                      <a className="block relative h-48 rounded overflow-hidden">
                        <Image
                          width="260"
                          height="240"
                          alt="ecommerce"
                          className="object-contain block"
                          src={k.url}
                        />
                      </a>
                      <div className="mt-4 text-center">
                        <h3 className="text-green text-xs tracking-widest title-font mb-1">
                          {k.tagline}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {k.shortTitle}
                        </h2>
                        <p className="mt-1 text-gray">₹{k.price}</p>
                      </div>
                    </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
