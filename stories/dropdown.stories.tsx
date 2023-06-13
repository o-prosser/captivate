import type { Meta, StoryObj } from "@storybook/react";

import { Button, DropdownMenu } from "../app/(ui)";
import {
  CloudIcon,
  CreditCardIcon,
  GithubIcon,
  KeyboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof DropdownMenu.Root> = {
  title: "Ui/DropdownMenu",
  component: DropdownMenu.Root,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu.Root>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Base: Story = {
  args: {
    children: (
      <>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <KeyboardIcon className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item>
              <UsersIcon className="mr-2 h-4 w-4" />
              <span>Team</span>
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>
                <UserPlusIcon className="mr-2 h-4 w-4" />
                <span>Invite users</span>
              </DropdownMenu.SubTrigger>
              <DropdownMenu.Portal>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item>
                    <MailIcon className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                    <span>Message</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>
                    <PlusCircleIcon className="mr-2 h-4 w-4" />
                    <span>More...</span>
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Portal>
            </DropdownMenu.Sub>
            <DropdownMenu.Item>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>New Team</span>
              <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <GithubIcon className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <LifeBuoyIcon className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item disabled>
            <CloudIcon className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </>
    ),
  },
};
