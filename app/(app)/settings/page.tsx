import { Suspense } from "react";

import { Heading } from "@/ui/typography";

import Theme from "./_components/theme";
import User from "./_components/user";
import UserFallback from "./_components/user-fallback";

export const metadata = {
  title: "Settings",
};

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
