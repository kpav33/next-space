import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  console.log(users);

  // users is already formatted as JavaScript object so we can directly use NextResponse to return them as JSON
  return NextResponse.json(users);
}
