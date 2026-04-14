import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const dashboardModule: EnterpriseModuleDefinition = {
  name: 'dashboard',
  description: 'Dashboard overview and operational widgets module for enterprise administration',
  routeBase: '/dashboard',
  permissions: ['dashboard:read']
}
