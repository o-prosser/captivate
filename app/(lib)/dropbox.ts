import { Dropbox } from "dropbox";
import { env } from "@/env.mjs";
import fetch from "node-fetch";

const dropbox = new Dropbox({
  accessToken: env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

export default dropbox;
