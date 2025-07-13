import { verifyJwt } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const isAuthed = token && await verifyJwt(token)
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')


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
    '/((?!_next|favicon.ico|images|api/).*)',
  ],
}
