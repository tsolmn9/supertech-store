"use client";
import { MapPinHouse, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Toaster, toast } from "sonner";

export default function OrderAddressPage() {
  const [addressValue, setAddressValue] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const HandleAddressValue = (e: { target: { value: string } }) => {
    setAddressValue(e.target.value);
  };
  const getTotalPriceFromCart = (): number => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        return cartItems.reduce(
          (total: number, item: { count: number; data: { price: number } }) => {
            return total + item.count * item.data.price;
          },
          0
        );
      }
    } catch (error) {
      console.error("Error retrieving total price from cart:", error);
    }
    return 0;
  };

  const handleOrder = async () => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);

        const orderItems = cartItems.map(
          (cartItem: { data: { id: string }; count: number }) => {
            return {
              productId: cartItem.data.id,
              quantity: cartItem.count,
            };
          }
        );

        const response = await fetch("/api/order/crudOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            totalPrice,
            orderAddress: addressValue,
            orderItems,
          }),
        });
        if (response.ok) {
          toast("✅ Order successfully completed `Cart is now empty`");
          setOpen(false);
        }
      } else {
        toast("❌ Cart is empty");
      }
    } catch (error) {
      setOpen(false);
      console.log({ message: error });
    }
  };

  useEffect(() => {
    setTotalPrice(getTotalPriceFromCart());
  }, []);
  return (
    <div className="flex flex-col h-screen items-center bg-white mt-12">
      <div className="w-[70%]">
        <div className="text-black font-extrabold text-[20px]">
          ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ
        </div>
        <div>
          <div>
            <span className="text-[13px] text-black font-extrabold">
              Хүргэлтийн хаяг
            </span>
            <div className="flex items-center h-[45px] w-[850px]  bg-white border-gray-500 rounded-sm gap-1">
              <MapPinHouse className="h-[20px]" />
              <div className="border-[1px] border-black h-[20px] rounded-sm"></div>
              <div className="w-[650px] flex justify-between">
                <input
                  placeholder="Хаягаа бичнэ үү"
                  className="text-xs w-[650px] p-1 outline-0 placeholder-black  text-black font-medium placeholder:font-extrabold border-2 border-black rounded-md"
                  value={addressValue}
                  onChange={HandleAddressValue}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-[40px] w-full">
          <div className=" flex justify-between">
            <span className="text-[15px] text-amber-950 font-md">
              Бүтээгдэхүүн
            </span>
            <span>{totalPrice}₮</span>
          </div>
          <div className=" flex justify-between">
            <span className="text-[15px] text-amber-950 font-md">Хүргэлт</span>
            <span>7000 ₮</span>
          </div>
          <div className=" border-[1px] border-amber-950"></div>
          <div className=" flex justify-between">
            <span className="text-[17px] text-amber-950 font-extrabold">
              Нийт дүн
            </span>
            <span className="font-extrabold">{totalPrice + 7000}₮</span>
          </div>
        </div>
        <div className="flex justify-between mt-[50px]">
          <Link
            href={"/cart"}
            className="flex w-[270px] bg-black rounded-sm h-[35px] text-white justify-center items-center"
          >
            <ChevronLeft />
            <span>Өмнөх алхам руу буцах</span>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <div className="flex w-[270px] bg-green-700 rounded-sm h-[35px] text-white justify-center items-center hover:cursor-pointer">
                <span>Захиалга баталгаажуулах</span>
                <ChevronRight />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="h-[100px] flex gap-[20px] justify-center">
                <DialogTitle className="flex justify-center">
                  Are you absolutely sure?
                </DialogTitle>
                <DialogDescription className="flex justify-around">
                  <button
                    className="flex w-[100px] bg-neutral-200  rounded-sm h-[35px] text-black justify-center items-center hover:cursor-pointer"
                    onClick={handleOrder}
                  >
                    Yes
                  </button>
                  <button
                    className="flex w-[100px] bg-red-600   rounded-sm h-[35px] text-white justify-center items-center hover:cursor-pointer"
                    onClick={() => setOpen(false)}
                  >
                    Wait
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
