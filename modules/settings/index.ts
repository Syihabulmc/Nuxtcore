import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const settingsModule: EnterpriseModuleDefinition = {
  name: 'settings',
  description: 'Application settings and preferences module for branding and operational configuration',
  routeBase: '/dashboard/settings',
  permissions: ['settings:read', 'settings:write']
}
