import { verifyJwt } from '@/lib/jwt'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { getCookie, setCookie } from './actions/cookies/cookieHelper'
import { UserDeviceCookie, UserDeviceValue } from './types/cookieTypes'
import projectConfig from '@config/default.json';

export async function middleware(request: NextRequest) {

  // https://nextjs.org/docs/app/api-reference/functions/userAgent
  const userAgentVar = userAgent(request)
  const deviceType = (userAgentVar?.device?.type || 'desktop') as UserDeviceValue;

  if (!await getCookie('user-device')) {
    setCookie<UserDeviceCookie>('user-device', { "device-type": deviceType },)
  }

  await passwordProtection(request)

  // // 4. Allow authenticated users
  return NextResponse.next()
}

async function  passwordProtection(request: NextRequest){
  if (!projectConfig.site.passwordProtected){
    return;
  }
  const token = request.cookies.get('auth_token')?.value
  const isAuthed = token && await verifyJwt(token)
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')


  if (!isAuthed && isLoginPage) {
    return;
  }

  if (!isAuthed && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}


export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|api/|images/|fonts/|.*\\..*).*)',
  ],
}
