import NextAuth from "next-auth"

// Providers
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"

// Prisma Modules
import { PrismaAdapter } from "@auth/prisma-adapter"

// Prisma Client Instance
import prisma from "@/app/libs/prismadb";

import authConfig from "./auth.config"

import axios from "axios";
 
export const { 
    handlers:{ GET, POST}, 
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({ token, account, profile }) {
            // console.log('JWT Callback')
            // console.log(token)
            axios.post('http://localhost:3000/api/socket/online', { email: token?.email });
            // Persist the OAuth access_token and or the user id to the token right after signin
            return token;
          },
    },

    // debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: '/users',
    },
})
