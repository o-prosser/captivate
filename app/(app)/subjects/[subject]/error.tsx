"use client";

import { Error } from "@/ui/error";

const ErrorPage = () => {
  return (
    <Error>
      <Error.Icon />
      <Error.Title>Error loading subject page</Error.Title>
      <Error.Text>
        An unexpected error occured on the server. Reload the page to try again.
      </Error.Text>
    </Error>
  );
};

export default ErrorPage;
