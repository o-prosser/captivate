import { Select } from "@/ui/html-select";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";

export const metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  return (
    <div>
      <Heading level={2}>General</Heading>
      <Text className="!mt-1 text-muted-foreground">
        Manage general application settings
      </Text>

      <div className="mt-6 max-w-xl">
        <h4 className="font-bold">Time and location</h4>
        <div className="text-sm text-muted-foreground">
          Allow the Captviate support team to temporarily sign in as you to help
          us quickly resolve any problems you report to us.
        </div>
        <form className="mt-6 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="timeFormat">Time format</Label>
            <Select
              name="timeFormat"
              options={{
                "12": "12 hour",
                "24": "24 hour",
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

export const runtime = "edge";
export const preferredRegion = "lhr1";
