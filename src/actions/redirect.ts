'use server'

import { redirect } from "next/navigation"

// https://github.com/vercel/next.js/issues/75477
// redirect the user via a server action, router push currently is not working, 
// high priority, causes extra re-renders 

export const serverRedirect = async (url: string) => {
  redirect(url)
}