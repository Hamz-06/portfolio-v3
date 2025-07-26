import { CategorisedProjects } from "@/sanity/schema/schema-types";
import { UserDeviceValue } from "@/types/cookieTypes";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isSmallScreen = (device: UserDeviceValue): boolean => {
  if (process.env.IS_MOBILE_VIEW) return true;
  return device === 'mobile' || device === 'tablet';
}

export function formatToMonthYear(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}
export function underscoreToSpace(str: string): string {
  return str.replace(/_/g, ' ');
}

export const isProjectLiked = async (slug: string, likedProject: string[] | null): Promise<boolean> => {
  if (!likedProject) {
    return false
  }

  return likedProject.includes(slug);
}
export const projectCategories = (projectsSummary: CategorisedProjects): Array<keyof CategorisedProjects> => {
  // todo remove the as type
  return Object.keys(projectsSummary) as Array<keyof CategorisedProjects>
}