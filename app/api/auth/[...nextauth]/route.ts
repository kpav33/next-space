// By using the [...nextauth] we created a catch all api route that allows the next-auth to create a bunch of different api routes, which are used by it
// Example - /api/auth/signin, /api/auth/signout, /api/auth/signin/:provider, /api/auth/callback/:provider...
// Generate NEXTAUTH_SECRET https://generate-secret.vercel.app/32

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // We are using GithubProvider here for signing in, could use any that is available with next-auth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
