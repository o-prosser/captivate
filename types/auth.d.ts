/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    username?: string | null;
    name?: string | null;
    image?: string | null;
    emailVerifiedAt?: Date | null;
    token?: string | null;
  };
  type DatabaseSessionAttributes = {};
}
