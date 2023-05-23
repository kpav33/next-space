import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  // Get current user email
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  // Get target user id from request body, this is the user that the current user is trying to follow
  const { targetUserId } = await req.json();

  // Get current user id
  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // Access follows table and create a new record that tracks data about follower and following users
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  // Return JSON from the endpoint
  return NextResponse.json(record);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  // Get targetUserId from search paramterers, which means we will pass the targetUserId in the URL itself when making a request to the endpoint
  const targetUserId = req.nextUrl.searchParams.get("targetUserId");

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  // Use the DELETE method on the follows table to find the relationship, where we have a matching followerId and followingId
  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: targetUserId!,
      },
    },
  });

  // Return JSON response
  return NextResponse.json(record);
}
