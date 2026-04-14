export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, canAccessAll } = useAuthState()

  if (to.path.startsWith('/auth') && isAuthenticated.value) {
    return navigateTo('/dashboard')
  }

  if (to.path.startsWith('/dashboard') && !isAuthenticated.value) {
    return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } })
  }

  if (typeof to.meta.permission === 'string' && !canAccessAll([to.meta.permission])) {
    return abortNavigation(createError({ statusCode: 403, statusMessage: 'Forbidden' }))
  }
})
