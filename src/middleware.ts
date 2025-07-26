import { verifyJwt } from '@/lib/jwt'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { getCookie, setCookie } from './actions/cookies/cookieHelper'
import { UserDeviceCookie, UserDeviceValue } from './types/cookieTypes'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const isAuthed = token && await verifyJwt(token)
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  // https://nextjs.org/docs/app/api-reference/functions/userAgent
  const userAgentVar = userAgent(request)
  const deviceType = (userAgentVar?.device?.type || 'desktop') as UserDeviceValue;

  if (!await getCookie('user-device')) {
    setCookie<UserDeviceCookie>('user-device', { "device-type": deviceType },)
  }

  if (!isAuthed && isLoginPage) {
    return NextResponse.next()
  }

  if (!isAuthed && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // // 4. Allow authenticated users
  return NextResponse.next()
}


export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|api/|images/|fonts/|.*\\..*).*)',
  ],
}
