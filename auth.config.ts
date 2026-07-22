import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "c83daddad499008bac179cee7c4195592f18d36b41974030ae7e27b8ab9ae1ab",
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET || "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_SECRET || "",
    }),
  ],
} satisfies NextAuthConfig;