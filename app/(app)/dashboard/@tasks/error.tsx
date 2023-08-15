"use client";

import { AlertCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="bg-destructive/20 rounded-2xl py-4 px-4 text-destructive">
      <AlertCircle className="h-6 w-6" />
      <h4 className="font-semibold brightness-50 mt-3 mb-1">
        Error loading tasks
      </h4>
      <p className="text-sm brightness-75">
        There was an error loading your tasks. You can try to load them again by
        refreshing the page.
      </p>
    </div>
  );
};

export default Error;
