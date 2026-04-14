import { defineNuxtModule } from '@nuxt/kit'
import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const usersModule: EnterpriseModuleDefinition = {
  name: 'users',
  description: 'Users and identity administration module for profile and access management',
  routeBase: '/dashboard/users',
  permissions: ['users:read', 'users:write']
}

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-users'
  },
  setup() {}
})
