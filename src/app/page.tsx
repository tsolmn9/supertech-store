"use client";
import { useEffect, useState } from "react";
import ProductItemComp from "./_components/HomePageItemComp";

export type Category = {
  id: string;
  categoryName: string;
  categoryImg: string;
  products: Products[];
}[];
export type Products = {
  id: string;
  price: number;
  name: string;
  description: string;
  imgUrl: string;
  categoryId: string;
};

const HomePage = () => {
  const [categories, setCategories] = useState<Category>([]);

  const getCategories = async () => {
    const response = await fetch("/api/product/getAllCategory");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-white min-h-screen flex justify-center w-full relative pb-12">
      <div className="flex flex-col items-center w-full max-w-[75%]">
        <div className="w-screen">
          <img
            className="w-full pr-12 pl-16 pt-12"
            src={
              "https://scontent.fuln8-1.fna.fbcdn.net/v/t39.30808-6/493396901_1217282927073687_8721437949214841888_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Xil1jhPc22QQ7kNvwFcMR5x&_nc_oc=Adld_ApciRLoUQkbyp8a1S71G3rd_Qmyinf8a_T8VuPLH7p485v_sVZTgrMiYsoLiA0&_nc_zt=23&_nc_ht=scontent.fuln8-1.fna&_nc_gid=9G0p-GP0OFm18U1ud5W1ww&oh=00_AfckWW29eQtCT39P-TvkEVNk64x5gxiSKtLOFZQapOjkHw&oe=690509E5"
            }
          />
        </div>
        <div className="flex gap-36 w-11/12">
          <div className="w-full flex flex-col">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col justify-center">
                <div className="text-[21px] text-black font-extrabold mb-5 mt-1">
                  {category.categoryName}
                </div>
                <div className="w-full flex flex-wrap gap-4 justify-start">
                  {category.products.map((product, index) => (
                    <ProductItemComp key={index} productData={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
