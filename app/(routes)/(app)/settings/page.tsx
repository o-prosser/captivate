import { Suspense } from "react";

import { Heading } from "@/ui";

import Theme from "./theme";
import User from "./user";
import UserFallback from "./user-fallback";

const SettingsPage = () => {
  return (
    <>
      <Heading className="mt-0">Settings</Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        <Theme />
        <Suspense fallback={<UserFallback />}>
          <User />
        </Suspense>
      </div>
    </>
  );
};

export default SettingsPage;
