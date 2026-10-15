import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const userRoles = token?.userData?.roles || [];
    const isAdmin = userRoles.includes("ADMIN");
    const isAllowToEmployees = userRoles.includes("EMPLOYEES");
    const isAllowToPerfomance = userRoles.includes("PERFOMANCE");
    const isAllowToThresholds = userRoles.includes("THRESHOLDS");
    const isAllowToFiles = userRoles.includes("FILES");
    const isAllowToProduction = userRoles.includes("PRODUCTION");
    const isAllowToOperations = userRoles.includes("OPERATIONS");

    const path = req.nextUrl.pathname;

    const adminRoutes = ["/users"];
    const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

    const employeeRoutes = ["/employees"];
    const isEmployeeRoute = employeeRoutes.some((route) =>
      path.startsWith(route),
    );

    const thresholdsRoutes = ["/tresholds"];
    const isThresholdsRoute = thresholdsRoutes.some((route) =>
      path.startsWith(route),
    );

    const filesRoutes = ["/files"];
    const isFilesRoute = filesRoutes.some((route) => path.startsWith(route));

    const perfomanceRoutes = ["/perfomance"];
    const isPerfomanceRoute = perfomanceRoutes.some((route) =>
      path.startsWith(route),
    );

    const productionRoutes = ["/products"];
    const isProductioneRoute = productionRoutes.some((route) =>
      path.startsWith(route),
    );
    const operationsRoutes = ["/operations"];
    const isOperationsRoute = operationsRoutes.some((route) =>
      path.startsWith(route),
    );

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isEmployeeRoute && !isAllowToEmployees) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isFilesRoute && !isAllowToFiles) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isThresholdsRoute && !isAllowToThresholds) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isPerfomanceRoute && !isAllowToPerfomance) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isProductioneRoute && !isAllowToProduction) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
    }
    if (isOperationsRoute && !isAllowToOperations) {
      return NextResponse.redirect(new URL("/forbidden", req.url));
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
