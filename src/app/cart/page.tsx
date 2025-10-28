"use client";
import {
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { CartContent } from "../_components/CartContent";
import { useEffect, useState } from "react";
import Link from "next/link";

type dataType = {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
};
const Page = () => {
  const [cartItems, setCartItems] = useState<
    { count: number; data: dataType }[]
  >([]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem("cart");
    if (!cartItemsString) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      const parsedCart = JSON.parse(cartItemsString);
      setCartItems(parsedCart);
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      {cartItems.length === 0 ? (
        <div className=" flex flex-col items-center gap-8 pt-56">
          <ShoppingCart width={120} height={120} />
          <div className=" text-red-600 font-bold text-3xl flex justify-center">
            Таны сагс хоосон байна.
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-sans text-xl text-gray-600">
              Та бүтээгдэхүүн сагслаагүй байна.
            </div>
            <div className="font-sans text-xl text-gray-600">
              Бүтээгдэхүүн сонгож сагслах товчийг дарснаар таны сагсанд орох
              болно.
            </div>
          </div>
          <Link
            className="bg-black text-white p-3 rounded-md font-sans font-bold text-sm"
            href={"/"}
          >
            Нүүр хуудас руу буцах
          </Link>
        </div>
      ) : (
        <div className="bg-white min-h-screen flex flex-col items-center mt-12">
          <div className="w-4/6">
            <div className="flex justify-between pb-4">
              <div className="font-bold text-3xl">Миний сагс</div>
              <div className="flex gap-4">
                <Link
                  className="flex bg-green-700 rounded-md text-white p-2 gap-2 font-bold hover:cursor-pointer"
                  href={"/"}
                >
                  <CirclePlus />
                  <div>Бүтээгдэхүүн нэмэх</div>
                </Link>
                <div
                  className="flex bg-red-500 rounded-md text-white p-2 gap-2 font-bold hover:cursor-pointer"
                  onClick={clearCart}
                >
                  <Trash2 />
                  <div>Сагс хоослох</div>
                </div>
              </div>
            </div>

            <CartContent />

            <div className="flex justify-between mt-8 mb-8">
              <Link
                className="flex bg-black rounded-md text-white p-2 gap-2 hover:cursor-pointer"
                href={"/"}
              >
                <ArrowLeft />
                <div>Өмнөх алхам руу буцах</div>
              </Link>
              <Link
                className="flex bg-red-600 rounded-md text-white p-2 gap-2 hover:cursor-pointer"
                href={"/order"}
              >
                <div>Үргэлжүүлэх</div>
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
