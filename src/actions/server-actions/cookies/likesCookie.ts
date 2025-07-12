'use server'

import { getCookie } from "./cookieHelper";

export const isProjectLiked = async (slug: string): Promise<[boolean, string[]]> => {
  const likesCookie = await getCookie<string[]>('likes');

  if (!likesCookie) {
    return [false, []]; // No likes cookie found
  }

  const isExists = likesCookie.includes(slug); 
  return [isExists, likesCookie]; 
}