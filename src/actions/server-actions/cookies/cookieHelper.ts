'use server'
import { CookieKey } from '@/types/cookieTypes'
import { cookies } from 'next/headers'

export async function getCookie<T>(name: CookieKey): Promise<T | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(name)?.value;
  return cookieValue ? JSON.parse(cookieValue) : null;
}
