import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const userRoles = token?.userData?.roles || [];
    const isAdmin = userRoles.includes("ADMIN");
    const isAllowToPerfomance = userRoles.includes("PERFOMANCE");

    const path = req.nextUrl.pathname;
    const adminRoutes = ["/users"];
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

    const perfomanceRoutes = ["/perfomance"];
    const isPerfomanceRoute = perfomanceRoutes.some((route) =>
      path.startsWith(route),
    );

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (isPerfomanceRoute && !isAllowToPerfomance) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: [
    "/((?!login|api|register|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
