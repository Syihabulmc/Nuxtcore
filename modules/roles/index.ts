import { defineNuxtModule } from '@nuxt/kit'
import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const rolesModule: EnterpriseModuleDefinition = {
  name: 'roles',
  description: 'Roles and permission mapping module for access control governance',
  routeBase: '/dashboard/roles',
  permissions: ['roles:read', 'roles:write']
}

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-roles'
  },
  setup() {}
})
