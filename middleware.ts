import { NextRequest, NextResponse } from "next/server";

import { getMiddlewareSession } from "@/lib/session";

export const middleware = async (request: NextRequest) => {
  const { session, shouldDelete } = await getMiddlewareSession(request);
  const pathname = request.nextUrl.pathname;

  const protectedRoute =
    pathname.startsWith("/calendar") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/subjects") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/files") ||
    pathname.startsWith("/getting-started") ||
    pathname.startsWith("/api");

  const guestRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/verify-request");

  let response = NextResponse.next();
  if (protectedRoute && !session)
    response = NextResponse.redirect(new URL("/login", request.url));
  if (guestRoute && session)
    response = NextResponse.redirect(new URL("/dashboard", request.url));

  if (shouldDelete) response.cookies.delete("session_id");
  return response;
};
