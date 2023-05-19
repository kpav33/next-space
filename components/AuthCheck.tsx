// This component is used to check the authentication status

"use client";

// This hook lets you access the current session and status of the user
import { useSession } from "next-auth/react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  console.log(session, status);

  // Only show data if user is authenticated
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <>Not logged in to see this</>;
  }
}
