// import { setCookie } from "./cookieHelper"

import { ProjectTypes } from "@/types/projects/projects";
import { getCookie, setCookie } from "./cookieHelper";

export type CurrentProjectKey = {
  category: ProjectTypes;
  project_slug: string;
}
export const setCurrentProjectKeyCookie = (category:ProjectTypes, projectSlug: string): void => {
  setCookie<CurrentProjectKey>('current-project', {
    category,
    project_slug: projectSlug
  })
}

export const getCurrentProjectKeyCookie = async (): Promise<CurrentProjectKey | null> => {
  const res = await getCookie<CurrentProjectKey>('current-project');
  return res ? res : null
}