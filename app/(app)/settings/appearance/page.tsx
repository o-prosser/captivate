import { Heading, Text } from "@/ui/typography";

import Theme from "./theme";

const SecurityPage = async () => {
  return (
    <div>
      <Heading level={2}>Appearance</Heading>
      <Text className="!mt-1 text-muted-foreground">
        Manage your appearance settings.
      </Text>

      <div className="mt-6 max-w-xl">
        <h4 className="font-bold">Theme</h4>
        <Theme />
      </div>
    </div>
  );
};

export default SecurityPage;
