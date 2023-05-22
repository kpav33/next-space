import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

// Export PUT because we will be updating a database
export async function PUT(req: Request) {
  // Authenticate the request
  const session = await getServerSession(authOptions);
  // Check we have access to current user's email
  // Make sure to access to email on the server and not allow the user to access it on the client side, because on the client side a hacker could use any email they want to potentially update data of other users
  const currentUserEmail = session?.user?.email!;

  const data = await req.json();
  // Convert age value to number, because in JSON this value is a string, but in database it is expected to be stored as a number
  data.age = Number(data.age);

  // Update the value in the database, where the email equals the current user email
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });

  return NextResponse.json(user);
}
