import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Products } from "../page";
import { Toaster, toast } from "sonner";

export default function HPItemComp({ productData }: { productData: Products }) {
  const saveToStorage = (data: Products) => {
    const cartItemsString = localStorage.getItem("cart");
    const cartItems: { count: number; data: Products }[] = cartItemsString
      ? JSON.parse(cartItemsString)
      : [];

    const existingItem = cartItems.find((item) => item.data.id === data.id);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      cartItems.push({ count: 1, data });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  return (
    <Card className="w-[30%] pr-1/12 pb-1/12 pt-1/12 flex justify-center group relative overflow-hidden">
      <CardContent className="flex justify-center w-full relative">
        <img
          className="w-full transition-opacity duration-300 group-hover:opacity-30"
          src={productData.imgUrl}
          alt={productData.name}
        />
      </CardContent>
      <CardFooter className="flex flex-col mt-1/12 text-center  transition-opacity duration-300 group-hover:opacity-30">
        <CardTitle className="text-[24px] text-black font-black">
          {productData.name}
        </CardTitle>
        <CardDescription className="text-[24px] text-black font-black">
          {productData.price} ₮
        </CardDescription>
      </CardFooter>
      <button
        onClick={() => saveToStorage(productData)}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer"
      >
        <div
          className="duration-200 w-2/3 border-[1px] bg-green-600 flex items-center p-[10px] justify-center rounded-md gap-2.5 hover:bg-black  text-white"
          onClick={() => {
            toast("✅ Product added to cart");
          }}
        >
          <ShoppingBag className="w-5" />
          <span className="text-sm text-white">Сагсанд хийх</span>
        </div>
        <Toaster />
      </button>
    </Card>
  );
}
