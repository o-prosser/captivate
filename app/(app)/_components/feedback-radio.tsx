"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { AlertCircle, HelpCircle, Lightbulb } from "lucide-react";

import { Button } from "@/ui/button";

const typeOptions = {
  Feature: {
    icon: Lightbulb,
    label: "Feature request",
  },
  Bug: {
    icon: AlertCircle,
    label: "Bug",
  },
  Other: {
    icon: HelpCircle,
    label: "Other",
  },
};

const FeedbackRadio = () => {
  return (
    <RadioGroup.Root
      name="type"
      orientation="horizontal"
      className="grid grid-cols-3 gap-4"
    >
      {Object.entries(typeOptions).map(
        ([value, { label, icon: Icon }], key) => (
          <RadioGroup.Item value={value} asChild key={key}>
            <Button
              variant="outline"
              className="flex-col h-auto py-4 data-[state=checked]:ring-2 data-[state=checked]:ring-ring data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-background"
            >
              <Icon className="text-muted-foreground" />
              {label}
            </Button>
          </RadioGroup.Item>
        ),
      )}
    </RadioGroup.Root>
  );
};

export default FeedbackRadio;
