import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, price, description, imgUrl, categoryId } = body;
    const response = await prisma.products.create({
      data: {
        id: nanoid(),
        name,
        price,
        description,
        imgUrl,
        categoryId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        message: `Failed to create Product => ${error}`,
      },
      { status: 500 }
    );
  }
};
