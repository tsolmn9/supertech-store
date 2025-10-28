"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
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

export default function AdminTable() {
  const [Data, setData] = useState<Array<DataType>>();
  const StatusValues = ["DELIVERED", "PENDING", "CANCELLED", "INTRANSIT"];
  const updateDeliveryStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("../api/order/crudOrder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          currentState: status,
        }),
      });
      await response.json();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };
  const ChangeStatus = async (status: string, id: string) => {
    setData((prevData) =>
      prevData?.map((order) =>
        order.id === id ? { ...order, currentState: status } : order
      )
    );
    await updateDeliveryStatus(id, status);
  };

  const FetchData = async () => {
    const response = await fetch("../api/order/crudOrder");
    const data = await response.json();

    setData(data);
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Data?.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell className="font-medium">
                {data.user.firstname} {data.user.lastname}
              </TableCell>
              <TableCell>
                <select
                  value={data.currentState}
                  onChange={(e) => ChangeStatus(e.target.value, data.id)}
                >
                  {StatusValues.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </TableCell>

              <TableCell>{data.orderAddress}</TableCell>
              <TableCell>{data.orderItems.length}</TableCell>
              <TableCell>{data.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
