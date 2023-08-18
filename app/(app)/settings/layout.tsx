import Link from "next/link";

import { Button } from "@/ui/button";
import Tabs, { Tab } from "@/ui/tabs";
import { Heading } from "@/ui/typography";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Heading>Settings</Heading>
      <Tabs className="mt-3">
        <Tab active="settings">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings">General</Link>
          </Button>
        </Tab>
        <Tab active="profile">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings/profile">Profile</Link>
          </Button>
        </Tab>
        <Tab active="security">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/settings/security">Security</Link>
          </Button>
        </Tab>
        <Tab active="appearance">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/appearance">Appearance</Link>
          </Button>
        </Tab>
      </Tabs>

      {children}
    </>
  );
};

export default SettingsLayout;
