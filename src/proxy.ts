import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth/auth.service";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value;
    const userInfo = await getCurrentUser();
    const role = userInfo?.role;

    const { pathname } = req.nextUrl;

    /* ========================
       NOT LOGGED IN → GO LOGIN
       ========================  */
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    /* ===========================================================================
       LOGGED IN & TRYING TO ACCESS LOGIN PAGE REDIRECT TO DASHBOARD BASED ON ROLE
       =========================================================================== */
    if (token && pathname === "/") {
        if (role === "ADMIN" || role === "SUPER_ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin/overview", req.url));
        } else if (role === "MANAGER") {
            return NextResponse.redirect(new URL("/dashboard/manager/overview", req.url));
        } else if (role === "EMPLOYEE") {
            return NextResponse.redirect(new URL("/dashboard/employee/overview", req.url));
        } else if (role === "FINANCE") {
            return NextResponse.redirect(new URL("/dashboard/finance/overview", req.url));
        } else if (role === "CLIENT") {
            return NextResponse.redirect(new URL("/dashboard/client/overview", req.url));
        }
    }
    /* ============================
       BLOCK WRONG DASHBOARD ACCESS
       ============================ */

    if (token && pathname.startsWith("/dashboard")) {

        // ADMIN AREA
        if (
            pathname.startsWith("/dashboard/admin") &&
            role !== "ADMIN" &&
            role !== "SUPER_ADMIN"
        ) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // MANAGER AREA
        if (pathname.startsWith("/dashboard/manager") && role !== "MANAGER") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // EMPLOYEE AREA
        if (pathname.startsWith("/dashboard/employee") && role !== "EMPLOYEE") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // FINANCE AREA
        if (pathname.startsWith("/dashboard/finance") && role !== "FINANCE") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // CLIENT AREA
        if (pathname.startsWith("/dashboard/client") && role !== "CLIENT") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/"],
};
