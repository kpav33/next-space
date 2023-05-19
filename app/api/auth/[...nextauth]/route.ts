// By using the [...nextauth] we created a catch all api route that allows the next-auth to create a bunch of different api routes, which are used by it
// Example - /api/auth/signin, /api/auth/signout, /api/auth/signin/:provider, /api/auth/callback/:provider...
// Generate NEXTAUTH_SECRET https://generate-secret.vercel.app/32

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // We are using GithubProvider here for signing in, could use any that is available with next-auth
  // Before adding PrismaAdapter our user authentication system didn't persist user data, with the PrismaAdapter the session data will be stored in the Session table in the database
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
