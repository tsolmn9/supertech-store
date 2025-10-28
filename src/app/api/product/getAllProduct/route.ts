import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: Request) => {
  try {
    const response = await prisma.products.findMany();
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
};
