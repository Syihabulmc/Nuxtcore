import { setCookie, createError, readBody } from 'h3'
import { authCookieKeys, createAuthSnapshot, createDemoUser, createSessionExpiry, resolveAuthLandingRoute, resolveAuthSessionStatusLabel } from '../../utils/auth'

interface SignInBody {
  email?: string
  password?: string
  remember?: boolean
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SignInBody>(event)
  const email = body.email?.trim().toLowerCase() ?? ''
  const password = body.password?.trim() ?? ''
  const remember = Boolean(body.remember)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required.' })
  }

  if (password !== 'nuxtcore') {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials.' })
  }

  const user = createDemoUser(email)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Demo account not found.' })
  }

  const session = {
    id: remember ? `session-${user.id}-persistent` : `session-${user.id}-temporary`,
    status: 'authenticated' as const,
    expiresAt: createSessionExpiry(remember),
    lastActiveAt: new Date().toISOString()
  }

  setCookie(event, authCookieKeys.user, JSON.stringify(user), {
    sameSite: 'lax',
    path: '/',
    maxAge: remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8
  })

  setCookie(event, authCookieKeys.session, JSON.stringify(session), {
    sameSite: 'lax',
    path: '/',
    maxAge: remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8
  })

  const snapshot = createAuthSnapshot(event)

  return {
    ...snapshot,
    landingRoute: resolveAuthLandingRoute(user.permissions),
    sessionStatusLabel: resolveAuthSessionStatusLabel(session.status)
  }
})
