import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sessionsTable, usersTable } from "@/drizzle/schema";

import { and, db, eq, gte } from "@/lib/db";
import { clearSession } from "@/lib/session";
import { hashPassword, isMatchingPassword } from "@/util/password";
import { getValidSession } from "@/util/session";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

const SecurityPage = async () => {
  const { user } = await getValidSession();

  const impersonationAction = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    const impersonation = formData.get("impersonation");

    await db
      .update(usersTable)
      .set({ impersonation: impersonation === "on" ? true : false })
      .where(eq(usersTable.id, user.id));

    // revalidatePath("/settings/security");
  };

  const passwordAction = async (formData: FormData) => {
    "use server";

    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    if (typeof oldPassword !== "string" || typeof newPassword !== "string")
      throw new Error("INVALID_SUBMISSION");

    const { user } = await getValidSession();

    const userWithCurrentPassword = (
      await db
        .select({
          hashedPassword: usersTable.hashedPassword,
          id: usersTable.id,
        })
        .from(usersTable)
        .where(eq(usersTable.id, user.id))
    )[0];

    const correctPassword = await isMatchingPassword(
      oldPassword,
      userWithCurrentPassword.hashedPassword,
    );

    if (!correctPassword) throw new Error("INCORRECT_PASSWORD");

    await db
      .update(usersTable)
      .set({ hashedPassword: await hashPassword(newPassword) })
      .where(eq(usersTable.id, user.id));

    if (formData.get("invalidate") === "on") {
      await db
        .update(sessionsTable)
        .set({ expiresAt: new Date() })
        .where(
          and(
            gte(sessionsTable.expiresAt, new Date()),
            eq(sessionsTable.userId, user.id),
          ),
        );

      await clearSession();
      redirect("/login");
    } else {
      revalidatePath("/settings/security");
    }
  };

  return (
    <div>
      <Heading level={2}>Security</Heading>
      <Text className="!mt-1 text-muted-foreground">
        Manage your security settings.
      </Text>

      <div className="mt-6 max-w-xl">
        <h4 className="font-bold">Impersonation</h4>
        <div className="text-sm text-muted-foreground">
          Allow the Captviate support team to temporarily sign in as you to help
          us quickly resolve any problems you report to us.
        </div>
        <form className="mt-6">
          <Label className="flex items-center gap-2">
            <Switch
              type="submit"
              name="impersonation"
              defaultChecked={user.impersonation}
              formAction={impersonationAction}
            />
            Allow user impersonation
          </Label>
        </form>
      </div>

      <div className="mt-6 pt-6 border-t max-w-xl">
        <h4 className="font-bold">Change your password</h4>
        <form action={passwordAction} className="mt-6 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              type="password"
              name="oldPassword"
              id="oldPassword"
              required
              autoComplete="current-password"
              placeholder="••••••••••"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              required
              autoComplete="new-password"
              autoFocus
              placeholder="••••••••••"
            />
          </div>

          <Label className="flex items-center gap-2">
            <Switch name="invalidate" />
            <div>
              <span>Invalidate sessions</span>
              <div className="text-xs text-muted-foreground">
                Sign you out on all devices.
              </div>
            </div>
          </Label>

          <FormButton>Update password</FormButton>
        </form>
      </div>
    </div>
  );
};

export default SecurityPage;
