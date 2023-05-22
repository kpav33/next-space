import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/buttons";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  // Get server session for current user, so non-users can't access this route
  // You need to pass authOptions in this version of next-auth here for it to work properly
  const session = await getServerSession(authOptions);
  //   console.log(session);

  // If session is null redirect the user
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Find the current user in database based on the email
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });

  return (
    <>
      <h1>Dashboard</h1>
      <SignOutButton />
      <ProfileForm user={user} />
    </>
  );
}
