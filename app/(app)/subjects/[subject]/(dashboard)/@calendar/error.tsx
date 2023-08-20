"use client";

import { Error } from "@/ui/error";

const ErrorPage = () => {
  return (
    <Error>
      <Error.Icon />
      <Error.Title>Error loading calendar</Error.Title>
      <Error.Text>
        There was an error loading your events. You can try to load them again
        by refreshing the page.
      </Error.Text>
    </Error>
  );
};

export default ErrorPage;
