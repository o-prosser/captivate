"use client";

import * as React from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";

import { cn } from "@/util/cn";
import * as Dialog from "@/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-background text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:mt-8 [&_[cmdk-input]]:h-auto  [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-0 [&_[cmdk-item]_svg]:h-[18px] [&_[cmdk-item]_svg]:w-[18px]",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content
        closeButton={false}
        className="overflow-hidden p-2 top-20 translate-y-0 sm:rounded-xl"
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="" cmdk-input-wrapper="">
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "h-auto w-full border-b py-3 px-2 pt-2 pb-4 mb-4 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[400px] h-[min(330px,calc(var(--cmdk-list-height)))] overflow-y-auto overflow-x-hidden overscroll-contain transition-[height] duration-100",
      className,
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="text-sm flex items-center justify-center h-12 whitespace-pre-wrap"
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "[&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-0 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:flex [&_[cmdk-group-heading]]:items-center",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("my-1 w-full h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      // "relative flex cursor-pointer select-none items-center rounded-2xl px-2.5 py-3 text-sm transition outline-none aria-selected:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:text-muted-foreground",
      "cursor-pointer h-12 rounded-lg text-muted-foreground text-sm flex items-center gap-2 px-4 select-none transition data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-muted-foreground active:text-foreground active:bg-muted [&+[cmdk-item]]:mt-1 [&>svg]:h-[18px] [&>svg]:w-[18px]",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command as Root,
  CommandDialog as Dialog,
  CommandInput as Input,
  CommandList as List,
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandItem as Item,
  CommandShortcut as Shortcut,
  CommandSeparator as Separator,
};
