import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false; // or a default fallback
  return window.innerWidth < 460;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const replaceString = (replaceObject: Record<string, string>, input: string): string => {
  let result = input;
  Object.entries(replaceObject).forEach(([key, value]) => {
    const regex = new RegExp(key, 'g');
    result = result.replace(regex, value);
  });
  return result;
};
