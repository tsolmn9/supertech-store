import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const GET = async () => {
  try {
    const response = await prisma.order.findMany({
      include: {
        user: true,
        orderItems: true,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await prisma.order.update({
      where: {
        id: body.id,
      },
      data: {
        currentState: body.currentState,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, orderItems, orderAddress } = body;

    const orderId = nanoid();

    const order = await prisma.order.create({
      data: {
        id: orderId,
        userId,
        orderAddress,
        totalPrice: 10,
        currentState: "PENDING",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });

    await Promise.all(
      orderItems.map(
        async (orderItem: { productId: string; quantity: number }) =>
          prisma.orderItems.create({
            data: {
              id: nanoid(),
              orderId: order.id,
              productId: orderItem.productId,
              quantity: orderItem.quantity,
            },
          })
      )
    );

    return NextResponse.json(order);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: `Failed to create Order => ${error}` },
      { status: 500 }
    );
  }
};
