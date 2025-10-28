"use client";

import React from "react";

type dataType = {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
};
export const SetCartButton = ({ data }: { data: dataType }) => {
  const updateCartInStorage = (newCount: number) => {
    const cartItemsString = localStorage.getItem("cart");
    let cartItems: { count: number; data: dataType }[] = [];

    if (cartItemsString) {
      cartItems = JSON.parse(cartItemsString);
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.data.id === data.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].count = newCount;
    } else {
      cartItems.push({ count: newCount, data });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  return (
    <div>
      {" "}
      <button
        onClick={() => updateCartInStorage}
        className="bg-green-500 text-white p-2 rounded-md"
      >
        Сагсанд нэмэх
      </button>
    </div>
  );
};
