'use client'

import { CookieKey } from "@/types/cookieTypes";
import clientSideCookie from 'js-cookie'

// used to set / get cookies on the client side

export function setClientCookie(name: CookieKey, value: string | number | object | boolean): void {
  const stringifiedValue = JSON.stringify(value);
  clientSideCookie.set(name, stringifiedValue)
}

export function getClientCookie<T>(name: CookieKey): T | null {
  const cookieValue = clientSideCookie.get(name);
  return cookieValue ? JSON.parse(cookieValue) : null;
}