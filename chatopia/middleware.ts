import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthprefix,
  authRoutes,
  publicRoutes
} from "@/routes"
import { NextResponse } from "next/server";


const { auth } = NextAuth(authConfig)


// export default withAuth({
//     pages: {
//       signIn: "/"
//     }
//   });

export default auth((req) => {
  const { nextUrl } = req ;
  console.log("Current Route :", nextUrl.pathname)
  const isLoggedIn = !!req.auth;
  console.log("isLoggedIn :", isLoggedIn)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthprefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If route is calling next-auth , then dont redirect
  if(isApiAuthRoute){
    return null;
  }

  // If user is trying to login OR register
  if(isAuthRoute){
    // If user is logged in , redirect to default login redirect
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    // If user is not logged in , allow to access the route
    return null;
  }

  // If user is not logged in and route is not public , redirect to login page
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/", nextUrl))
  }
})

export function middleware() {
  // retrieve the current response
  const res = NextResponse.next()

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', 'http://localhost:4000') // replace this your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  return res
}

export const config = {
    matcher: [
      // "/users/:path*",
      // "/conversations/:path*",
      '/((?!.*\\..*|_next).*)',
      '/', 
      '/(api|trpc)(.*)'
    ]
  };