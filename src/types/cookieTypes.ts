export type CookieKey = 'current-project' | 'react-resizable-panels:layout' | 'is-shuffling-enabled' | 'likes'

import { ProjectTypes } from "@/sanity/schema/schema-types";

export type CurrentProjectCookieKey = {
  category: ProjectTypes;
  project_slug: string;
}