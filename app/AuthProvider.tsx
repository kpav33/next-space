// To access user on the frontend we create a AuthProvider component, which will wrap the session provider at the root of the application

// This must be marked as a client component, because it works on the frontend
"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  // Any client side components nested below this will now be able to access the user
  return <SessionProvider>{children}</SessionProvider>;
}
