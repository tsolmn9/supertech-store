import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { currentState } = body;
    const response = prisma.order.findMany({ where: { currentState } });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: `Failed to fetch Orders => ${error}` });
  }
};
