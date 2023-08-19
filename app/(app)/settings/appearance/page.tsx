import { insertUserSchema, usersTable } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { Select } from "@/ui/html-select";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import Color from "./color";
import Theme from "./theme";

const SecurityPage = async () => {
  const { user } = await getValidSession();

  const viewsAction = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    const data = insertUserSchema
      .pick({ preferredCalendarView: true, preferredTaskView: true })
      .required()
      .parse(Object.fromEntries(formData.entries()));

    await db.update(usersTable).set(data).where(eq(usersTable.id, user.id));
  };

  return (
    <div>
      <Heading level={2}>Appearance</Heading>
      <Text className="!mt-1 text-muted-foreground">
        Manage your appearance settings.
      </Text>

      <div className="mt-6 max-w-xl">
        <h4 className="font-bold">Theme</h4>
        <Theme />
        <Color />
      </div>

      <div className="mt-6 pt-6 border-t max-w-xl">
        <h4 className="font-bold">Default views</h4>
        <div className="text-sm text-muted-foreground">
          Choose your preferred view for when you navigate to the calendar and
          tasks pages.
        </div>
        <form action={viewsAction} className="mt-6 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="preferredCalendarView">
              Preferred calendar view
            </Label>
            <Select
              name="preferredCalendarView"
              id="preferredCalendarView"
              defaultValue={user.preferredCalendarView}
              options={{ Month: "Month", Week: "Week" }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="preferredTaskView">Preferred task view</Label>
            <Select
              name="preferredTaskView"
              id="preferredTaskView"
              defaultValue={user.preferredTaskView}
              options={{ Card: "Card", Table: "Table" }}
            />
          </div>
          <FormButton>Update preferences</FormButton>
        </form>
      </div>
    </div>
  );
};

export default SecurityPage;
