export { default } from "next-auth/middleware";

// import { NextResponse, NextRequest } from "next/server";

// import { authConfig } from "@/configs/auth";
// import { getServerSession } from "next-auth/next";

// export async function middleware(request: NextRequest) {
//   // Assume `isAuthenticated` is a function that checks for a valid session (e.g., from a cookie)
//   // The specific implementation depends on your auth provider (e.g., Auth.js)
//   //   const isAuthenticated = /* your authentication logic here */;
//   const session = await getServerSession(authConfig);

//   if (!session) {
//     // Redirect to the login page
//     const loginUrl = new URL("/login", request.url);
//     // Optional: Add a 'redirect' search parameter to return the user to their original page after login
//     loginUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: [
    "/((?!login|register|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
