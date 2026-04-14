import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const usersModule: EnterpriseModuleDefinition = {
  name: 'users',
  description: 'Users and identity administration module for profile and access management',
  routeBase: '/dashboard/users',
  permissions: ['users:read', 'users:write']
}
