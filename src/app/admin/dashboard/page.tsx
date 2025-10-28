"use client";
import { Package } from "lucide-react";
import AdminTable from "./AdminTable";
import { useEffect, useState } from "react";
import { AddProduct } from "@/app/_components/AddProduct";
type DataType = {
  id: string;
  orderItems: Array<object>;
  user: UserType;
  orderAddress: string;
  currentState: string;
  usersId: string;
  updatedAt: string;
  createdAt: string;
};
type UserType = {
  id: string;
  firstname: string;
  lastname: string;
};
const Page = () => {
  const [data, setData] = useState<Array<DataType>>();
  const Fetch = async () => {
    const JSONdata = await fetch("../api/order/crudOrder", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await JSONdata.json();
    setData(res);
  };

  useEffect(() => {
    Fetch();
  }, []);

  const filteredTransit = data?.filter(
    (order) => order.currentState === "In Transit"
  );
  // const filteredPending = data?.filter(
  //   (order) => order.currentState === "Pending"
  // );

  const filteredCancelled = data?.filter(
    (order) => order.currentState === "Cancelled"
  );
  const filteredDelivered = data?.filter(
    (order) => order.currentState === "Delivered"
  );

  return (
    <div className="bg-white h-screen items-center mt-10 flex flex-col gap-8">
      <div className="flex justify-around w-full">
        <div className="font-extrabold flex gap-2 text-2xl items-center">
          <Package />
          <div>Food Delivery Admin</div>
        </div>
        <AddProduct />
      </div>
      <div className="flex gap-9">
        <div className="border-1 border-grey h-[120px] w-[300px] rounded-[8px] flex flex-col justify-center gap-2 pl-6 font-bold">
          <div>Total Deliveries</div>
          <div className="text-[25px]">{data?.length}</div>
          <div className="font-[500] text-gray-400 text-[12px]">
            +2.5% from the last month
          </div>
        </div>
        <div className="border-1 border-grey h-[120px] w-[300px] rounded-[8px] flex flex-col justify-center gap-2 pl-6 font-bold">
          <div>In Transit</div>
          <div className="text-[25px]">{filteredTransit?.length}</div>
          <div className="font-[500] text-gray-400 text-[12px]">
            Currently on the road
          </div>
        </div>
        <div className="border-1 border-grey h-[120px] w-[300px] rounded-[8px] flex flex-col justify-center gap-2 pl-6 font-bold">
          <div>Delivered</div>
          <div className="text-[25px]">{filteredDelivered?.length}</div>
          <div className="font-[500] text-gray-400 text-[12px]">
            Completed successfully
          </div>
        </div>
        <div className="border-1 border-grey h-[120px] w-[300px] rounded-[8px] flex flex-col justify-center gap-2 pl-6 font-bold">
          <div>Cancelled</div>
          <div className="text-[25px]">{filteredCancelled?.length}</div>
          <div className="font-[500] text-gray-400 text-[12px]">
            Requires attention
          </div>
        </div>
      </div>
      <div className="border-1 border-grey h-[850px] w-[1310px] rounded-[8px] p-5 flex flex-col gap-6">
        <AdminTable />
      </div>
    </div>
  );
};
export default Page;
