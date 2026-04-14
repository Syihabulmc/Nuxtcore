import { deleteCookie } from 'h3'
import { authCookieKeys, createAuthSnapshot, createAnonymousAuthSession } from '../../utils/auth'

export default defineEventHandler((event) => {
  deleteCookie(event, authCookieKeys.user, { path: '/' })
  deleteCookie(event, authCookieKeys.session, { path: '/' })

  const snapshot = createAuthSnapshot(event)

  return {
    ...snapshot,
    user: null,
    session: createAnonymousAuthSession(),
    landingRoute: '/dashboard',
    sessionStatusLabel: 'Guest session'
  }
})
