'use server'
import { CookieKey } from '@/types/cookieTypes'
import { cookies } from 'next/headers'

// set cookie on the client until this next js issue is resolved
// https://github.com/vercel/next.js/issues/50163

export async function getCookie<T>(name: CookieKey): Promise<T | null> {
  const cookieStore = await cookies()
  try {
    const cookieValue = cookieStore.get(name)?.value;
    return cookieValue ? JSON.parse(cookieValue) : null;
  } catch {
    // cookieStore.delete(name);
    return null;
  }
}
