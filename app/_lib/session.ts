import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionsTable } from "@/drizzle/schema";
import { isPast } from "date-fns";
import * as jose from "jose";

import { env } from "@/env.mjs";
import { db, eq } from "@/lib/db";

// const secret = jose.base64url.decode(env.JOSE_SESSION_KEY);
const secret = new TextEncoder().encode(env.JOSE_SESSION_KEY);
const issuer = "urn:example:issuer";
const audience = "urn:example:audience";
const expiresAt = "10s";

export const encodeUserSession = async (sessionId: string) => {
  const jwt = await new jose.EncryptJWT({ sessionId })
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
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer,
      audience,
    });

    const { sessionId } = payload;
    return sessionId;
  } catch (error) {}

  return null;
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

  cookies().set("session_id", newSessionValue);
};

export const clearSession = () => {
  cookies().set("session_id", "");
};

export const getSession = cache(async () => {
  const cookieSessionValue = cookies().get("session_id")?.value;
  if (!cookieSessionValue) return;

  const extractedSessionId = await decodeUserSession(cookieSessionValue);
  if (!extractedSessionId || typeof extractedSessionId !== "string") return;

  const session = await db.query.sessionsTable.findFirst({
    where: eq(sessionsTable.id, extractedSessionId),
    columns: {
      id: true,
      expiresAt: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          username: true,
          name: true,
          image: true,
        },
        with: {
          usersToSubjects: {
            columns: {
              level: true,
            },
            with: {
              subject: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!session || isPast(session.expiresAt)) {
    clearSession();
    return;
  }

  return session;
});

// For use in areas where we know there is a session, so will not be undefined.
export const getValidSession = async () => {
  const session = await getSession();
  if (!session) throw new Error("Used getValidSession but no session found");

  return session;
};
