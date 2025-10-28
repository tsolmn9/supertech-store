"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

type dataType = {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
};

export const CartContent = () => {
  const [cartItems, setCartItems] = useState<
    { count: number; data: dataType }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsString = localStorage.getItem("cart");
      if (cartItemsString) {
        const parsedCart = JSON.parse(cartItemsString);
        setCartItems(parsedCart);
      }
    }
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.count * item.data.price,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleDelete = (id: string) => {
    const newCart = cartItems.filter((item) => item.data.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateCount = (id: string, amount: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.data.id === id) {
        return { ...item, count: Math.max(1, item.count + amount) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-xl text-gray-600 flex justify-center">
        Сагс хоосон байна.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {cartItems.map((item) => (
        <div
          key={item.data.id}
          className="w-full bg-white h-[350px] border-2 rounded-2xl p-4"
        >
          <div className="flex h-2/3">
            <div className="p-4">
              <img src={item.data.imgUrl} width={200} height={150} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-sans text-black text-3xl font-extrabold">
                {item.data.name}
              </div>
              <div className="text-xl text-black">{item.data.description}</div>
            </div>
          </div>
          <div className="flex justify-between mt-2 border-b-2 border-neutral-600 pb-3">
            <div className="text-xl font-sans text-black font-bold">
              Нийт дүн
            </div>
            <div className="text-xl font-sans text-black font-bold">
              {item.data.price * item.count}₮
            </div>
          </div>
          <div className="flex justify-between mb-4 mt-4">
            <div className="flex gap-2 items-center">
              <div
                className="flex gap-1 text-red-600 rounded-md p-1 justify-center items-center hover:cursor-pointer"
                onClick={() => handleDelete(item.data.id)}
              >
                <X />
                <div className="text-lg font-sans">Устгах</div>
              </div>
            </div>
            <div className="flex items-center">
              {item.count > 1 && (
                <button
                  className="bg-black w-8 h-8 rounded-md text-white font-bold text-xl hover:cursor-pointer"
                  onClick={() => updateCount(item.data.id, -1)}
                >
                  -
                </button>
              )}
              <div className="w-8 h-8 text-center text-xl font-sans font-bold">
                {item.count}
              </div>
              <button
                className="bg-red-600 w-8 h-8 rounded-md text-white font-bold text-xl hover:cursor-pointer"
                onClick={() => updateCount(item.data.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex w-full justify-between mt-6 border-t-2 border-black pt-4">
        <div className="font-bold text-xl text-amber-950 ">Нийт дүн</div>
        <div className="text-lg font-sans text-amber-950 font-bold">
          {totalPrice}₮
        </div>
      </div>
    </div>
  );
};
