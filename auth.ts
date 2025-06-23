// lib/auth.ts
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { get } from "http";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
  providers: [
    // // Google login
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),

    // Username/password login 
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (passwordMatch) {
            return user;
        }
        return null;
    },
    }),
  ],
session: {
    strategy: "jwt", // or "database" if you want to persist sessions in DB
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const auth = () => getServerSession(
  authOptions);