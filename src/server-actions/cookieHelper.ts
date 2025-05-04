'use server'
import { cookies } from 'next/headers'

export async function getCookie<T>(name: string): Promise<T | null>{
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value as T ?? null
}

export async function setCookie<T extends JSON>(name: string, value: T ): Promise<T> {
  const stringValue = JSON.stringify(value)

  const cookieStore = await cookies()
  cookieStore.set(name, stringValue)

  return value 
}