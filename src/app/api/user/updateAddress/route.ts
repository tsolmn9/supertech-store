import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await prisma.users.update({
      where: {
        phoneNumber: body.phoneNumber.toSting(),
      },
      data: {
        orderAddress: body.orderAddress,
      },
    });
    await prisma.order.update({
      where: {
        id: body.orderId,
      },
      data: {
        orderAddress: body.orderAddress,
      },
    });
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};
