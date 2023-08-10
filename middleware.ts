import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;

  const protectedRoute =
    pathname.startsWith("/calendar") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/subjects") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/getting-started") ||
    pathname.startsWith("/api");

  const guestRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/verify-request");

  if (protectedRoute && !session)
    return NextResponse.redirect(new URL("/login", request.url));
  if (guestRoute && session)
    return NextResponse.redirect(new URL("/dashboard", request.url));

  return NextResponse.next();
};
