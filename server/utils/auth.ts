import { enterpriseSidebarNavigation } from '@shared/constants/modules'
import type { AuthSession, AuthSessionSnapshot, AuthSessionStatus, AuthUser } from '@shared/types/app'
import { getEnterpriseUserByEmail } from '@shared/constants/directory'
import { getCookie } from 'h3'

const AUTH_USER_COOKIE = 'nuxtcore-auth-user'
const AUTH_SESSION_COOKIE = 'nuxtcore-auth-session'

export const authCookieKeys = {
  user: AUTH_USER_COOKIE,
  session: AUTH_SESSION_COOKIE
} as const

const createAnonymousSession = (): AuthSession => ({
  id: 'session-anonymous',
  status: 'anonymous',
  lastActiveAt: new Date().toISOString()
})

const isExpired = (session: AuthSession) => Boolean(session.expiresAt && Date.parse(session.expiresAt) <= Date.now())

const resolveLandingRoute = (permissions: readonly string[]) => {
  const accessible = enterpriseSidebarNavigation.find(item => !item.permissions?.length || item.permissions.some(permission => permissions.includes(permission)))

  return accessible?.to ?? '/dashboard'
}

const createSessionStatusLabel = (status: AuthSessionStatus) => {
  if (status === 'authenticated') {
    return 'Active session'
  }

  if (status === 'expired') {
    return 'Session expired'
  }

  return 'Guest session'
}

const readJsonCookie = <T>(event: Parameters<typeof getCookie>[0], key: string): T | null => {
  const value = getCookie(event, key)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  }
  catch {
    return null
  }
}

export function createAuthSnapshot(event: Parameters<typeof getCookie>[0], source: AuthSessionSnapshot['source'] = 'server'): AuthSessionSnapshot {
  const storedUser = readJsonCookie<AuthUser | null>(event, AUTH_USER_COOKIE)
  const storedSession = readJsonCookie<AuthSession | null>(event, AUTH_SESSION_COOKIE)
  const user = storedUser ?? null
  const session = storedSession ?? createAnonymousSession()
  const normalizedStatus: AuthSessionStatus = session.status === 'authenticated' && isExpired(session) ? 'expired' : session.status
  const permissions = user?.permissions ?? []

  return {
    user,
    session: {
      ...session,
      status: normalizedStatus
    },
    landingRoute: resolveLandingRoute(permissions),
    sessionStatusLabel: createSessionStatusLabel(normalizedStatus),
    permissions,
    source
  }
}

export function createDemoUser(email: string): AuthUser | null {
  const matchingUser = getEnterpriseUserByEmail(email)

  if (!matchingUser) {
    return null
  }

  return {
    id: matchingUser.id,
    name: matchingUser.name,
    email: matchingUser.email,
    role: matchingUser.role,
    permissions: matchingUser.permissions
  }
}

export function createSessionExpiry(remember: boolean) {
  return new Date(Date.now() + (remember ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000)).toISOString()
}

export function createAnonymousAuthSession() {
  return createAnonymousSession()
}

export function resolveAuthLandingRoute(permissions: readonly string[]) {
  return resolveLandingRoute(permissions)
}

export function resolveAuthSessionStatusLabel(status: AuthSessionStatus) {
  return createSessionStatusLabel(status)
}
