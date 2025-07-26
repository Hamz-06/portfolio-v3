'use server'
import { CookieKey } from '@/types/cookieTypes'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'
import ms from 'ms';

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

type SetCookieOptions = {
  expiration: '1d' | '7d'
}

export async function setCookie<T>(name: CookieKey, value: T, opts?: SetCookieOptions): Promise<void> {
  const cookieStore = await cookies()
  try {
    let options: Partial<ResponseCookie> = {}
    if (opts?.expiration) {
      options = { expires: ms(opts.expiration) }
    }

    cookieStore.set(name, JSON.stringify(value), options)
  } catch (error) {
    console.error(`Failed to set cookie ${name}:`, error);
    // Optionally, you can delete the cookie if setting it fails
    // cookieStore.delete(name);
  }


}