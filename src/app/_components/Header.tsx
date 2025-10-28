"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { CircleUser, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

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

const Header = () => {
  const [categories, setCategories] = useState<Category>([]);
  const { user } = useUser();

  const getCategories = async () => {
    const response = await fetch("/api/product/getAllCategory");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-neutral-200 flex gap-8 p-2 justify-center font-mono">
        <div className="text-sm flex gap-1 items-center">
          <img src={"mail.svg"} />
          <div>supertech@gmail.com</div>
        </div>
        <div className="flex gap-1 text-sm items-center">
          <img src={"phone.svg"} />
          <div>96666694</div>
        </div>
        <div className="text-sm">Даваа-Бямба:10.00-19.00</div>
      </div>
      <div className="flex justify-between items-center">
        <img src={"/logo2.png"} width={200} height={75} className="pl-8" />
        <div className="relative w-2/5 flex">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Эндээс бүхнийг хайж олох..."
          />
        </div>
        <div className="flex gap-6 items-center pr-8">
          <Link className="flex flex-col items-center gap-2" href={"/cart"}>
            <img src={"cart.svg"} />
            <div className="text-sm font-bold">Сагс</div>
          </Link>
          <button className="flex flex-col items-center gap-2">
            <img src={"heart.svg"} />
            <div className="text-sm font-bold">Хүсэл</div>
          </button>
          <SignedOut>
            <SignInButton>
              <button className="flex flex-col items-center gap-2 cursor-pointer">
                <CircleUser />
                <div className="text-sm font-bold">Нэвтрэх</div>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <button className="flex flex-col items-center gap-2 cursor-pointer">
              <UserButton />
              <div className="text-sm font-bold">
                {user?.emailAddresses[0].emailAddress}
              </div>
            </button>
          </SignedIn>
        </div>
      </div>
      <div className="bg-black h-[80px] flex items-center pl-12">
        <div className="flex gap-2 border-r-2 pr-8">
          <div className="text-white font-sans font-semibold">Бүх ангилал</div>
          <img src={"align.svg"} className="text-white" />
        </div>
        <div>
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="text-white pl-8 font-sans font-semibold border-r-2 pr-8"
              >
                {category.categoryName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Header;
