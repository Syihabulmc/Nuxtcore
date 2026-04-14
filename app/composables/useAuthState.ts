import type { AuthSessionSnapshot } from '@shared/types/app'
import { computed, watchEffect } from 'vue'

export interface AuthCredentials {
  email: string
  password: string
  remember: boolean
}

const createAnonymousSnapshot = (): AuthSessionSnapshot => ({
  user: null,
  session: {
    id: 'session-anonymous',
    status: 'anonymous',
    lastActiveAt: new Date().toISOString()
  },
  landingRoute: '/dashboard',
  sessionStatusLabel: 'Guest session',
  permissions: [],
  source: 'client'
})

export function useAuthState() {
  const snapshot = useState<AuthSessionSnapshot>('nuxtcore-auth-snapshot', createAnonymousSnapshot)
  const { data, refresh } = useFetch<AuthSessionSnapshot>('/api/auth/session', {
    key: 'nuxtcore-auth-session',
    default: createAnonymousSnapshot,
    server: true,
    lazy: false
  })

  watchEffect(() => {
    if (data.value) {
      snapshot.value = data.value
    }
  })

  const user = computed(() => snapshot.value.user)
  const session = computed(() => snapshot.value.session)
  const sessionStatus = computed(() => snapshot.value.session.status)
  const isAuthenticated = computed(() => sessionStatus.value === 'authenticated' && user.value !== null)
  const permissions = computed(() => snapshot.value.permissions)
  const sessionStatusLabel = computed(() => snapshot.value.sessionStatusLabel)

  const hasPermission = (permission: string) => permissions.value.includes(permission)
  const canAccessAny = (requiredPermissions: readonly string[]) => requiredPermissions.length === 0 || requiredPermissions.some(permission => hasPermission(permission))
  const canAccessAll = (requiredPermissions: readonly string[]) => requiredPermissions.length === 0 || requiredPermissions.every(permission => hasPermission(permission))
  const getLandingRoute = () => snapshot.value.landingRoute

  const syncSnapshot = async () => {
    await refresh()
    if (data.value) {
      snapshot.value = data.value
    }
    return snapshot.value
  }

  const touchSession = () => {
    if (snapshot.value.session.status === 'authenticated') {
      snapshot.value = {
        ...snapshot.value,
        session: {
          ...snapshot.value.session,
          lastActiveAt: new Date().toISOString()
        }
      }
    }
  }

  const expireSession = async () => {
    snapshot.value = await $fetch<AuthSessionSnapshot>('/api/auth/sign-out', { method: 'POST' })
  }

  const signIn = async (credentials: AuthCredentials) => {
    snapshot.value = await $fetch<AuthSessionSnapshot>('/api/auth/sign-in', {
      method: 'POST',
      body: credentials
    })

    await syncSnapshot()

    return snapshot.value
  }

  const signOut = async () => {
    snapshot.value = await $fetch<AuthSessionSnapshot>('/api/auth/sign-out', { method: 'POST' })
    await syncSnapshot()
  }

  return {
    user,
    session,
    sessionStatus,
    isAuthenticated,
    sessionStatusLabel,
    permissions,
    hasPermission,
    canAccessAny,
    canAccessAll,
    getLandingRoute,
    touchSession,
    expireSession,
    signIn,
    signOut,
    refreshSession: syncSnapshot
  }
}
