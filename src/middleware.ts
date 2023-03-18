import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserType } from "./lib/types";
import { parseRole } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const sessionId = request.cookies.get("sessionId")?.value;

  if (!request.cookies.has("sessionId") || !sessionId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const resp = await fetch(new URL(`/api/me?id=${sessionId}`, request.url));
  if (!resp.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const user: UserType = await resp.json();

  if (user.role === "ADMIN") {
    return NextResponse.next()
  }

  if (parseRole(url.pathname) !== user.role) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/coordinator/:path*",
    "/instructor/:path*",
    "/adminstrator/:path*",
  ],
};
