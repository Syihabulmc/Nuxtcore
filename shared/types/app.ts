export interface BrandInfo {
  name: string
  description: string
  tagline?: string
}

export type AuthSessionStatus = 'anonymous' | 'authenticated' | 'expired'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  permissions: readonly string[]
}

export interface AuthSession {
  id: string
  status: AuthSessionStatus
  expiresAt?: string
  lastActiveAt: string
}

export type AccountStatus = 'Active' | 'Pending review' | 'Locked'
export type RoleStatus = 'Active' | 'Draft' | 'Under review'
export type SettingStatus = 'Enabled' | 'Locked' | 'Planned'
export type AuditEventAction = 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'login' | 'config-change'
export type AuditEventSeverity = 'info' | 'success' | 'warning' | 'danger'

export interface UserDirectoryItem extends AuthUser {
  status: AccountStatus
  title: string
  department: string
  team: string
  region: string
  joinedAt: string
  lastActiveAt: string
  roleSlug: string
  roleLabel: string
  mfaEnabled: boolean
}

export interface RoleDirectoryItem {
  slug: string
  label: string
  description: string
  status: RoleStatus
  permissions: readonly string[]
  members: number
  owner: string
  updatedAt: string
}

export interface SettingField {
  key: string
  label: string
  value: string | number | boolean
  hint?: string
  editable?: boolean
}

export interface SettingSectionItem {
  slug: string
  label: string
  description: string
  status: SettingStatus
  updatedAt: string
  fields: readonly SettingField[]
}

export interface AuditTrailItem {
  id: string
  action: AuditEventAction
  severity: AuditEventSeverity
  title: string
  description: string
  actorName: string
  actorRole: string
  module: string
  targetLabel: string
  targetRoute?: string
  occurredAt: string
  details: readonly string[]
}

export type ReportExportFormat = 'csv' | 'json'
export type ReportTone = 'default' | 'success' | 'warning' | 'danger'
export type ReportFilterKind = 'date' | 'select'
export type ReportExportMode = 'download' | 'queued'
export type ReportExportStatus = 'completed' | 'queued'

export interface ReportMetric {
  label: string
  value: string | number
  hint: string
  icon?: string
  tone?: ReportTone
}

export interface ReportSectionField {
  label: string
  value: string | number | boolean | null
  hint?: string
  icon?: string
}

export interface ReportSection {
  title: string
  summary: string
  metrics?: readonly ReportMetric[]
  fields?: readonly ReportSectionField[]
  notes?: readonly string[]
}

export interface ReportFilterOption {
  label: string
  value: string
}

export interface ReportFilterDefinition {
  key: string
  label: string
  kind: ReportFilterKind
  description: string
  placeholder?: string
  options?: readonly ReportFilterOption[]
}

export interface ReportExportArtifact {
  label: string
  format: ReportExportFormat
  href: string
  description: string
  recommended?: boolean
  mode?: ReportExportMode
  permissions?: readonly string[]
}

export interface ReportExportRun {
  id: string
  format: ReportExportFormat
  mode: ReportExportMode
  status: ReportExportStatus
  requestedAt: string
  completedAt?: string
  records: number
  downloadHref: string
  summary: string
  filters: readonly string[]
  notes: readonly string[]
}

export interface EnterpriseReportSnapshot {
  slug: string
  title: string
  description: string
  generatedAt: string
  appliedFilters: readonly string[]
  availableFilters: readonly ReportFilterDefinition[]
  metrics: readonly ReportMetric[]
  sections: readonly ReportSection[]
  exports: readonly ReportExportArtifact[]
  exportHistory: readonly ReportExportRun[]
}

export interface EnterpriseReportOverviewItem {
  slug: string
  title: string
  description: string
  route: string
  permissions: readonly string[]
  status: string
  lastGeneratedAt: string
  exportFormats: readonly ReportExportFormat[]
  exportPermissions: readonly string[]
  exportHistoryCount: number
}

export interface EnterpriseReportOverviewPayload {
  generatedAt: string
  metrics: readonly ReportMetric[]
  reports: readonly EnterpriseReportOverviewItem[]
}

export interface AuthSessionSnapshot {
  user: AuthUser | null
  session: AuthSession
  landingRoute: string
  sessionStatusLabel: string
  permissions: readonly string[]
  source: 'client' | 'server'
}

export interface NavigationItem {
  label: string
  to: string
  icon?: string
  description?: string
  permissions?: readonly string[]
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}
