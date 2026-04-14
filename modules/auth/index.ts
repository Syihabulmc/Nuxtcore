import { defineNuxtModule } from '@nuxt/kit'
import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const authModule: EnterpriseModuleDefinition = {
  name: 'auth',
  description: 'Authentication and session management module for login, logout, and session control',
  routeBase: '/auth',
  permissions: ['auth:read', 'auth:write']
}

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-auth'
  },
  setup() {}
})
