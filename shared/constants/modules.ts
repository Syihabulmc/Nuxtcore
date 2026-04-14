import type { EnterpriseModuleDefinition } from '@shared/types/module'

export const enterpriseModules: readonly EnterpriseModuleDefinition[] = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    description: 'Dashboard overview and operational widgets module for enterprise administration',
    routeBase: '/dashboard',
    permissions: ['dashboard:read'],
    icon: 'i-lucide-layout-dashboard'
  },
  {
    name: 'users',
    label: 'Users',
    description: 'Users and identity administration module for profile and access management',
    routeBase: '/dashboard/users',
    permissions: ['users:read', 'users:write'],
    icon: 'i-lucide-users'
  },
  {
    name: 'roles',
    label: 'Roles',
    description: 'Roles and permission mapping module for access control governance',
    routeBase: '/dashboard/roles',
    permissions: ['roles:read', 'roles:write'],
    icon: 'i-lucide-badge-check'
  },
  {
    name: 'settings',
    label: 'Settings',
    description: 'Application settings and preferences module for branding and operational configuration',
    routeBase: '/dashboard/settings',
    permissions: ['settings:read', 'settings:write'],
    icon: 'i-lucide-settings'
  },
  {
    name: 'audit',
    label: 'Audit Trail',
    description: 'Audit trail module for reviewable event history, approvals, and configuration changes',
    routeBase: '/dashboard/audit',
    permissions: ['audit:read'],
    icon: 'i-lucide-clipboard-list'
  },
  {
    name: 'reports',
    label: 'Reports',
    description: 'Reporting and export surfaces for operational snapshots, downloadable summaries, and future BI wiring',
    routeBase: '/dashboard/reports',
    permissions: ['dashboard:read'],
    icon: 'i-lucide-chart-column'
  },
  {
    name: 'auth',
    label: 'Auth',
    description: 'Authentication and session management module for login, logout, and session control',
    routeBase: '/auth',
    permissions: ['auth:read', 'auth:write'],
    icon: 'i-lucide-log-in'
  }
] as const

export const enterpriseSidebarNavigation = enterpriseModules
  .filter(module => module.name !== 'auth')
  .map(module => ({
    label: module.label ?? module.name,
    to: module.routeBase,
    icon: module.icon,
    description: module.description,
    permissions: module.permissions
  }))
