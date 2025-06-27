import { getCookie, setCookie } from "./cookieHelper"

type CookieValue = {
  value: number
}
export const setCurrentProjectIndexCookie = (index: number): void => {
  setCookie<CookieValue>('current-project-index', {
    value: index,
  })
}

export const getCurrentProjectIndexCookie = async (): Promise<number | null> => {
  const res = await getCookie<CookieValue>('current-project-index');
  return res ? res.value : null
}