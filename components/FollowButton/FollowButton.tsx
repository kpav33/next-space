// This is a server component
import { getServerSession } from "next-auth";
import FollowClient from "./FollowClient";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession(authOptions);

  // Get user's id
  const currentUserId = await prisma.user
    .findFirst({ where: { email: session?.user?.email! } })
    .then((user) => user?.id!);

  // Check if the user is following the target user
  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  return (
    // The double !! converts the isFollowing into a boolean value
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
