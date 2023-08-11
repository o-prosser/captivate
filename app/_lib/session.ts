import { cookies } from "next/headers";

import { auth } from "@/lib/auth";

export const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });

  return await authRequest.validate();
};
