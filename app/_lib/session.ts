import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { addMonths, isPast } from "date-fns";
import { EncryptJWT, jwtDecrypt } from "jose";

import { env } from "@/env.mjs";
import { selectSession } from "@/models/session";

import { db } from "./db";

// const secret = jose.base64url.decode(env.JOSE_SESSION_KEY);
const secret = new TextEncoder().encode(env.JOSE_SESSION_KEY);
const issuer = "urn:example:issuer";
const audience = "urn:example:audience";
const expiresAt = `${60 * 60 * 24 * 31}s`;

export const encodeUserSession = async (sessionId: string) => {
  const jwt = await new EncryptJWT({ sessionId })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresAt)
    .encrypt(secret);

  return jwt;
};

export const decodeUserSession = async (jwt: string) => {
  try {
    const { payload } = await jwtDecrypt(jwt, secret, {
      issuer,
      audience,
    });

    const { sessionId } = payload;
    return sessionId;
  } catch (error) {
    return null;
  }
};

// const verifySession = async () => {
//   const userId = "1";

//   const jwtToken = await encodeUserSession(userId);
//   const user = await decodeUserSession(jwtToken);

//   console.log(user, userId === user);
// };

// verifySession()
//   .then((x) => console.log("verify"))
//   .catch((e) => console.error(e));

export const createSession = async (sessionId: string) => {
  const newSessionValue = await encodeUserSession(sessionId);

  cookies().set("session_id", newSessionValue, {
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: addMonths(new Date(), 1),
  });
};

export const clearSession = async () => {
  await fetch("/api/sessions", {
    method: "DELETE",
  });
};

export const getMiddlewareSession = async (request: NextRequest) => {
  const cookieSessionValue = request.cookies.get("session_id")?.value;
  if (!cookieSessionValue) {
    return {
      session: undefined,
      shouldDelete: false,
    };
  }

  const extractedSessionId = await decodeUserSession(cookieSessionValue);
  if (!extractedSessionId || typeof extractedSessionId !== "string") {
    return {
      session: undefined,
      shouldDelete: true,
    };
  }

  // const session = await selectSession({ id: extractedSessionId });
  const session = await db.query.sessionsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, extractedSessionId),
    columns: {
      id: true,
      expiresAt: true,
    },
  });

  if (!session || isPast(session.expiresAt)) {
    return {
      session: undefined,
      shouldDelete: true,
    };
  }

  return { session, shouldDelete: false };
};

export const getSession = async () => {
  const cookieSessionValue = cookies().get("session_id")?.value;
  if (!cookieSessionValue) return;

  const extractedSessionId = await decodeUserSession(cookieSessionValue);
  if (!extractedSessionId || typeof extractedSessionId !== "string") {
    await clearSession();
    return;
  }

  const session = await selectSession({ id: extractedSessionId });

  if (!session || isPast(session.expiresAt)) {
    await clearSession();
    return;
  }

  return session;
};
