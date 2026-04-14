import type { AuditTrailItem, RoleDirectoryItem, SettingSectionItem, UserDirectoryItem } from '@shared/types/app'

export const enterpriseUsers: readonly UserDirectoryItem[] = [
  {
    id: 'user-ayu',
    name: 'Ayu Pratama',
    email: 'admin@nuxtcore.dev',
    role: 'Administrator',
    permissions: ['dashboard:read', 'users:read', 'users:write', 'roles:read', 'roles:write', 'settings:read', 'settings:write', 'audit:read'],
    status: 'Active',
    title: 'Platform Administrator',
    department: 'Operations',
    team: 'Core Platform',
    region: 'APAC',
    joinedAt: '2025-01-08T10:00:00.000Z',
    lastActiveAt: '2026-04-14T10:58:00.000Z',
    roleSlug: 'administrator',
    roleLabel: 'Administrator',
    mfaEnabled: true
  },
  {
    id: 'user-rafi',
    name: 'Rafi Nugraha',
    email: 'supervisor@nuxtcore.dev',
    role: 'Supervisor',
    permissions: ['dashboard:read', 'users:read', 'roles:read', 'settings:read'],
    status: 'Pending review',
    title: 'Access Operations Lead',
    department: 'Customer Success',
    team: 'Service Desk',
    region: 'EMEA',
    joinedAt: '2025-03-14T08:30:00.000Z',
    lastActiveAt: '2026-04-14T09:42:00.000Z',
    roleSlug: 'supervisor',
    roleLabel: 'Supervisor',
    mfaEnabled: true
  },
  {
    id: 'user-mira',
    name: 'Mira Putri',
    email: 'operator@nuxtcore.dev',
    role: 'Operator',
    permissions: ['dashboard:read', 'users:read'],
    status: 'Locked',
    title: 'Support Operator',
    department: 'Support',
    team: 'Incident Desk',
    region: 'NA',
    joinedAt: '2024-11-21T13:15:00.000Z',
    lastActiveAt: '2026-04-13T18:20:00.000Z',
    roleSlug: 'operator',
    roleLabel: 'Operator',
    mfaEnabled: false
  },
  {
    id: 'user-dimas',
    name: 'Dimas Wicaksono',
    email: 'auditor@nuxtcore.dev',
    role: 'Auditor',
    permissions: ['dashboard:read', 'roles:read', 'settings:read'],
    status: 'Active',
    title: 'Security Auditor',
    department: 'Governance',
    team: 'Risk Review',
    region: 'APAC',
    joinedAt: '2024-09-05T07:45:00.000Z',
    lastActiveAt: '2026-04-14T07:12:00.000Z',
    roleSlug: 'auditor',
    roleLabel: 'Auditor',
    mfaEnabled: true
  }
]

export const enterpriseRoles: readonly RoleDirectoryItem[] = [
  {
    slug: 'administrator',
    label: 'Administrator',
    description: 'Full access role for platform owners and release managers.',
    status: 'Active',
    permissions: ['dashboard:read', 'users:read', 'users:write', 'roles:read', 'roles:write', 'settings:read', 'settings:write'],
    members: 1,
    owner: 'Ayu Pratama',
    updatedAt: '2026-04-14T10:12:00.000Z'
  },
  {
    slug: 'supervisor',
    label: 'Supervisor',
    description: 'Operational governance role for approvals and account review.',
    status: 'Under review',
    permissions: ['dashboard:read', 'users:read', 'roles:read', 'settings:read'],
    members: 1,
    owner: 'Rafi Nugraha',
    updatedAt: '2026-04-13T16:25:00.000Z'
  },
  {
    slug: 'operator',
    label: 'Operator',
    description: 'Limited access role for frontline support and incident handling.',
    status: 'Active',
    permissions: ['dashboard:read', 'users:read'],
    members: 1,
    owner: 'Mira Putri',
    updatedAt: '2026-04-12T09:40:00.000Z'
  },
  {
    slug: 'auditor',
    label: 'Auditor',
    description: 'Read-only oversight role for audit and policy review.',
    status: 'Draft',
    permissions: ['dashboard:read', 'roles:read', 'settings:read', 'audit:read'],
    members: 1,
    owner: 'Dimas Wicaksono',
    updatedAt: '2026-04-11T14:18:00.000Z'
  }
]

export const enterpriseSettings: readonly SettingSectionItem[] = [
  {
    slug: 'branding',
    label: 'Branding',
    description: 'Public branding and workspace presentation defaults.',
    status: 'Enabled',
    updatedAt: '2026-04-14T09:00:00.000Z',
    fields: [
      { key: 'appName', label: 'Application name', value: 'Nuxtcore', editable: true },
      { key: 'tagline', label: 'Tagline', value: 'Reusable, modular, dashboard-oriented', editable: true },
      { key: 'supportEmail', label: 'Support email', value: 'support@nuxtcore.dev', editable: true }
    ]
  },
  {
    slug: 'security',
    label: 'Security',
    description: 'Session, access, and review settings for the starter environment.',
    status: 'Locked',
    updatedAt: '2026-04-13T18:45:00.000Z',
    fields: [
      { key: 'sessionPolicy', label: 'Session policy', value: '12h idle / 7d remember-me', editable: false },
      { key: 'mfaRequired', label: 'MFA required', value: true, editable: false },
      { key: 'approvalMode', label: 'Approval mode', value: 'Permission review', editable: false }
    ]
  },
  {
    slug: 'operations',
    label: 'Operations',
    description: 'Delivery and workflow preferences that shape the admin experience.',
    status: 'Planned',
    updatedAt: '2026-04-10T11:30:00.000Z',
    fields: [
      { key: 'auditLogRetention', label: 'Audit log retention', value: '90 days', editable: true },
      { key: 'featureFlags', label: 'Feature flags', value: 3, editable: true },
      { key: 'maintenanceMode', label: 'Maintenance mode', value: false, editable: true }
    ]
  }
] as const

export const enterpriseAuditTrail: readonly AuditTrailItem[] = [
  {
    id: 'audit-login-admin',
    action: 'login',
    severity: 'success',
    title: 'Admin login recorded',
    description: 'Successful session start for the administrator demo account.',
    actorName: 'Ayu Pratama',
    actorRole: 'Administrator',
    module: 'Auth',
    targetLabel: 'admin@nuxtcore.dev',
    targetRoute: '/dashboard/users/user-ayu',
    occurredAt: '2026-04-14T10:58:00.000Z',
    details: ['Session cookie issued', 'MFA verified', 'Landing route resolved to dashboard']
  },
  {
    id: 'audit-role-update-supervisor',
    action: 'update',
    severity: 'warning',
    title: 'Role permissions reviewed',
    description: 'Supervisor role access set was reviewed before activation.',
    actorName: 'Rafi Nugraha',
    actorRole: 'Supervisor',
    module: 'Roles',
    targetLabel: 'Supervisor role',
    targetRoute: '/dashboard/roles/supervisor',
    occurredAt: '2026-04-14T09:40:00.000Z',
    details: ['Permission matrix compared against policy', 'Review status kept pending', 'No write access added']
  },
  {
    id: 'audit-settings-config',
    action: 'config-change',
    severity: 'info',
    title: 'Branding settings adjusted',
    description: 'Workspace branding defaults were updated for the starter shell.',
    actorName: 'Ayu Pratama',
    actorRole: 'Administrator',
    module: 'Settings',
    targetLabel: 'Branding section',
    targetRoute: '/dashboard/settings/branding',
    occurredAt: '2026-04-14T09:00:00.000Z',
    details: ['Application name confirmed', 'Support email aligned to workspace', 'Tagline refreshed']
  },
  {
    id: 'audit-approval-access',
    action: 'approve',
    severity: 'success',
    title: 'Access change approved',
    description: 'Read-only oversight role was accepted for policy review.',
    actorName: 'Dimas Wicaksono',
    actorRole: 'Auditor',
    module: 'Roles',
    targetLabel: 'Auditor role',
    targetRoute: '/dashboard/roles/auditor',
    occurredAt: '2026-04-13T14:18:00.000Z',
    details: ['Scope matched audit policies', 'No operational permissions added', 'Change is traceable in history']
  },
  {
    id: 'audit-user-lock-mira',
    action: 'reject',
    severity: 'danger',
    title: 'Access lock request rejected',
    description: 'Rejected a duplicate lock action because the account was already locked.',
    actorName: 'Ayu Pratama',
    actorRole: 'Administrator',
    module: 'Users',
    targetLabel: 'Mira Putri',
    targetRoute: '/dashboard/users/user-mira',
    occurredAt: '2026-04-13T18:20:00.000Z',
    details: ['Account already in locked state', 'No duplicate state change persisted', 'Operator notified of existing status']
  }
] as const

export const enterpriseDemoCredentials = enterpriseUsers.map(user => ({
  email: user.email,
  password: 'nuxtcore',
  userId: user.id
}))

export const enterpriseDirectory = {
  users: enterpriseUsers,
  roles: enterpriseRoles,
  settings: enterpriseSettings,
  auditTrail: enterpriseAuditTrail
} as const

export const getEnterpriseUserByEmail = (email: string) => enterpriseUsers.find(user => user.email === email)
export const getEnterpriseUserById = (id: string) => enterpriseUsers.find(user => user.id === id)
export const getEnterpriseRoleBySlug = (slug: string) => enterpriseRoles.find(role => role.slug === slug)
export const getEnterpriseSettingBySlug = (slug: string) => enterpriseSettings.find(setting => setting.slug === slug)
export const getEnterpriseAuditTrailItemById = (id: string) => enterpriseAuditTrail.find(item => item.id === id)
