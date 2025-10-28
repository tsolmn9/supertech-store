import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { categoryName, categoryImg } = body;
    const response = await prisma.category.create({
      data: {
        categoryName,
        categoryImg,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      message: `Failed to create category => ${error}`,
    });
  }
};
