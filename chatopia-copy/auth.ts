import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";


export const { handlers,signIn,signOut,auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;
  
                if (!email || !password) {
                    throw new Error('Invalid Credentials');
                }
        
                const user = await prisma.user.findUnique({
                    where: {
                    email: email
                    }
                });
        
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
        
                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.hashedPassword
                );
        
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
        
                return user;
            }
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});
