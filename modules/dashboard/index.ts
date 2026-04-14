import { defineNuxtModule } from '@nuxt/kit'
import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const dashboardModule: EnterpriseModuleDefinition = {
  name: 'dashboard',
  description: 'Dashboard overview and operational widgets module for enterprise administration',
  routeBase: '/dashboard',
  permissions: ['dashboard:read']
}

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-dashboard'
  },
  setup() {}
})
