// import { setCookie } from "./cookieHelper"
// set cookie on the client until this next js issue is resolved
// https://github.com/vercel/next.js/issues/50163

// TODO: remove this file move  to client side 

import { ProjectTypes } from "@/schema/schema-types";

export type CurrentProjectKey = {
  category: ProjectTypes;
  project_slug: string;
}