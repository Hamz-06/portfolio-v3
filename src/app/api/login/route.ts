import { signJwt } from '@/lib/jwt'
import { CookieKey } from '@/types/cookieTypes'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  const validPassword = process.env.SITE_PASSWORD

  if (password === validPassword) {
    const token = await signJwt({ auth: true })
    console.log('JWT token generated:', token)

    const cookieKey: CookieKey = 'auth_token';
    const cookieStore = await cookies();

    cookieStore.set(cookieKey, token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({ success: true })
  }
  console.log('Failed to login, invalid password')
  return NextResponse.json({ success: false }, { status: 401 })
}
