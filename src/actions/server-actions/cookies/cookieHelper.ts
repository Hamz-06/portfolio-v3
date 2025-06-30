'use server'
import { CookieKey } from '@/types/cookieTypes'
import { cookies } from 'next/headers'

export async function getCookie<T>(name: CookieKey): Promise<T | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(name)?.value;
  return cookieValue ? JSON.parse(cookieValue) : null;
}

export async function setCookie<T>(name: CookieKey, value: T): Promise<T> {
  const stringValue = JSON.stringify(value)

  const cookieStore = await cookies()
  cookieStore.set(name, stringValue)

  return value
}