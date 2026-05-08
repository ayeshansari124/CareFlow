import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

import { cookies } from "next/headers";

export async function PATCH(req, context) {
  try {
    const { id } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();

    const appointment = await prisma.appointment.update({
      where: { id },

      data: {
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
