import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await prisma.users.update({
      where: {
        phoneNumber: body.phoneNumber,
      },
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
      },
    });
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};
