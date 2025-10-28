import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};
