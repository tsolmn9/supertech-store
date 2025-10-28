"use client";
type OrderProductDataType = {
  productCover: string;
  productName: string;
  productPrice: string;
  productDescription: string;
};
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();
  const MockData = {
    productCover:
      "https://objectstorage.ap-sydney-1.oraclecloud.com/n/oraclegbuprod/b/IC_FBGBU_SS_38034_bt-sim-231023071222-MAX-8b5003ca-618d-46e1-b8b3-610d2d37a600/o/MAX240529055106386.PNG",
    productName: "Воппер",
    productPrice: "12900",
    productDescription:
      " Ил гал дээр шарсан 100% үхрийн мах, гүнжидийн үртэй шинэхэн талх болон ногооны хавчуургатай, майонез/кетчуп соустай бургер ",
  };
  const [productData, setProductData] = useState<OrderProductDataType>();
  const [productCount, setProductCount] = useState(1);

  const FetchData = async () => {
    // const JSONData = await fetch(`www.HEREWILLBEADDRESS.com/${id}`);
    // const data = await JSONData.json();
    // setProductData(data);
    setProductData(MockData);
    console.log(productData);
    console.log("working");
  };
  const IncreaseCount = () => {
    setProductCount((prev) => prev + 1);
  };
  const DecreaseCount = () => {
    if (productCount > 1) {
      setProductCount((prev) => prev - 1);
    } else {
      alert("Error count can't be less than 1");
    }
  };
  const ClickedOnBuy = () => {
    router.push("/");
  };

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div className="h-full w-full">
      <div className="h-4/5 w-full flex flex-col gap-8">
        <div className="bg-amber-950 w-full h-min flex justify-center">
          <img src={productData?.productCover} className="w-1/3 h-1/3"></img>
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <span className="text-red-700 text-[32px] uppercase font-extrabold">
            {productData?.productName}
          </span>
          <div className="flex w-1/5 justify-center items-center h-[30px] gap-1.5">
            <span className="text-amber-900 text-[28px] font-bold">
              {productData?.productPrice}₮
            </span>
            <div className="h-[30px] w-[2px] border-2 border-amber-900"></div>
            <span className="text-amber-900 text-[28px] font-bold">KKal</span>
          </div>
          <span className="text-amber-900 text-[14px] font-light w-1/3 flex text-center">
            {productData?.productDescription}
          </span>
        </div>
      </div>
      <div className="h-[80px] w-full bg-amber-50 flex justify-center items-center fixed right-0 left-0 bottom-0">
        <div className="flex w-1/6 justify-center items-center h-full gap-1.5">
          <button
            className="bg-amber-950 h-[30px] rounded-sm w-[30px] text-white"
            onClick={DecreaseCount}
          >
            -
          </button>
          <span className="font-[25px] text-black font-mono ">
            {productCount}
          </span>
          <button
            className="bg-red-700 rounded-sm w-[30px] text-white h-[30px]"
            onClick={IncreaseCount}
          >
            +
          </button>
        </div>
        <div className="flex gap-3 h-[30px] items-center">
          <span className="font-bold">
            {productCount * Number(productData?.productPrice)}₮
          </span>
          <button
            className="bg-red-700 h-[30px] w-[140px] rounded-sm text-white font-bold"
            onClick={ClickedOnBuy}
          >
            Сагсанд хийх
          </button>
        </div>
      </div>
    </div>
  );
}
