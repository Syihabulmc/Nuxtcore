import { defineNuxtModule } from '@nuxt/kit'
import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const settingsModule: EnterpriseModuleDefinition = {
  name: 'settings',
  description: 'Application settings and preferences module for branding and operational configuration',
  routeBase: '/dashboard/settings',
  permissions: ['settings:read', 'settings:write']
}

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-settings'
  },
  setup() {}
})
