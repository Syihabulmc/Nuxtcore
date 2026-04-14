import type {
  EnterpriseReportOverviewItem,
  EnterpriseReportOverviewPayload,
  EnterpriseReportSnapshot,
  ReportExportArtifact,
  ReportExportFormat,
  ReportExportMode,
  ReportExportRun,
  ReportFilterDefinition,
  ReportMetric,
  ReportSection,
  ReportSectionField
} from '@shared/types/app'
import {
  enterpriseAuditTrail,
  enterpriseRoles,
  enterpriseSettings,
  enterpriseUsers
} from '@shared/constants/directory'
import { enterpriseModules } from '@shared/constants/modules'
import { formatDateTime } from './format'

const now = new Date().toISOString()

type ReportQueryInput = Record<string, string | string[] | null | undefined>

type ReportBuilderContext = {
  query?: ReportQueryInput
  mode?: ReportExportMode
}

const makeMetric = (label: string, value: string | number, hint: string, icon?: string, tone?: ReportMetric['tone']): ReportMetric => ({
  label,
  value,
  hint,
  icon,
  tone
})

const makeField = (label: string, value: string | number | boolean | null, hint?: string, icon?: string): ReportSectionField => ({
  label,
  value,
  hint,
  icon
})

const makeFilter = (key: string, label: string, description: string, kind: ReportFilterDefinition['kind'], options?: ReportFilterDefinition['options'], placeholder?: string): ReportFilterDefinition => ({
  key,
  label,
  kind,
  description,
  options,
  placeholder
})

const makeExports = (slug: string, title: string, permissions: readonly string[]): ReportExportArtifact[] => ([
  {
    label: 'CSV export',
    format: 'csv',
    href: `/api/reports/${slug}/export?format=csv`,
    description: `Download ${title.toLowerCase()} as a structured CSV snapshot.`,
    recommended: true,
    mode: 'download',
    permissions
  },
  {
    label: 'JSON export',
    format: 'json',
    href: `/api/reports/${slug}/export?format=json`,
    description: `Fetch ${title.toLowerCase()} as machine-readable JSON for integrations.`,
    mode: 'download',
    permissions
  },
  {
    label: 'Queued export',
    format: 'json',
    href: `/api/reports/${slug}/export?format=json&mode=queued`,
    description: `Queue ${title.toLowerCase()} and receive a realistic export run stub.`,
    mode: 'queued',
    permissions
  }
])

const makeExportRun = ({
  slug,
  format,
  mode,
  records,
  filters,
  completedAt = now,
  summary
}: {
  slug: string
  format: ReportExportFormat
  mode: ReportExportMode
  records: number
  filters: readonly string[]
  completedAt?: string
  summary: string
}): ReportExportRun => ({
  id: `${slug}-${format}-${mode}-${records}`,
  format,
  mode,
  status: mode === 'queued' ? 'queued' : 'completed',
  requestedAt: now,
  completedAt: mode === 'queued' ? undefined : completedAt,
  records,
  downloadHref: `/api/reports/${slug}/export?format=${format}${mode === 'queued' ? '&mode=queued' : ''}`,
  summary,
  filters,
  notes: mode === 'queued'
    ? ['Queued export stub returns immediately with traceable run metadata.', 'A background worker can later replace this deterministic handoff.']
    : ['Download is generated from the same report source of truth.', 'CSV and JSON artifacts stay aligned with the rendered snapshot.']
})

const getQueryValue = (query: ReportQueryInput | undefined, key: string): string | undefined => {
  const value = query?.[key]
  if (value === null || value === undefined) {
    return undefined
  }

  if (Array.isArray(value)) {
    return value[0] ?? undefined
  }

  return String(value)
}

const toFilterSummary = (label: string, value: string | undefined) => value ? `${label}: ${value}` : undefined

const dateOrNull = (value: string | undefined): Date | null => {
  if (!value) {
    return null
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const formatRange = (from?: string, to?: string) => {
  const range = [from, to].filter(Boolean).join(' → ')
  return range || 'All time'
}

const buildOperationsOverview = (context: ReportBuilderContext = {}): EnterpriseReportSnapshot => {
  const from = getQueryValue(context.query, 'from')
  const to = getQueryValue(context.query, 'to')
  const moduleFilter = getQueryValue(context.query, 'module')
  const auditTrail = enterpriseAuditTrail.filter((item) => {
    const occurredAt = dateOrNull(item.occurredAt)
    const afterFrom = !from || (occurredAt ? occurredAt >= new Date(from) : true)
    const beforeTo = !to || (occurredAt ? occurredAt <= new Date(to) : true)
    const moduleMatch = !moduleFilter || item.module.toLowerCase() === moduleFilter.toLowerCase()
    return afterFrom && beforeTo && moduleMatch
  })

  const filters = [
    toFilterSummary('Date range', formatRange(from, to)),
    toFilterSummary('Module', moduleFilter ?? 'All modules')
  ].filter((item): item is string => Boolean(item))

  return {
    slug: 'operations-overview',
    title: 'Operations overview',
    description: 'A reusable reporting surface that combines module coverage, account health, and review-ready audit signals.',
    generatedAt: now,
    appliedFilters: filters,
    availableFilters: [
      makeFilter('from', 'From', 'Start the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('to', 'To', 'End the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('module', 'Module', 'Narrow the report to a module in the audit trail.', 'select', enterpriseModules.map(module => ({ label: module.label ?? module.name, value: module.label ?? module.name })), 'All modules')
    ],
    metrics: [
      makeMetric('Active accounts', enterpriseUsers.filter(user => user.status === 'Active').length, 'Current directory members with live access', 'i-lucide-users', 'success'),
      makeMetric('Pending approvals', enterpriseUsers.filter(user => user.status === 'Pending review').length, 'Accounts waiting on explicit review', 'i-lucide-badge-alert', 'warning'),
      makeMetric('Audit events', auditTrail.length, 'Logged actions available for export and review', 'i-lucide-clipboard-list', 'default')
    ],
    sections: [
      {
        title: 'Module coverage',
        summary: 'Core enterprise modules are represented through the central registry and can be extended without reshaping the report shell.',
        metrics: enterpriseModules.map(module => makeMetric(module.label ?? module.name, module.permissions.length, module.description, module.icon, 'default')),
        notes: [
          'The report is driven from reusable module metadata.',
          'Reports can be added by extending the central registry and server stub.'
        ]
      },
      {
        title: 'Operational posture',
        summary: 'This section provides a compact, export-friendly summary for session, directory, and audit workflows.',
        fields: [
          makeField('Users', enterpriseUsers.length, 'Directory records in the starter dataset', 'i-lucide-users'),
          makeField('Roles', enterpriseRoles.length, 'Role definitions available for access governance', 'i-lucide-badge-check'),
          makeField('Settings sections', enterpriseSettings.length, 'Structured application configuration groups', 'i-lucide-settings-2'),
          makeField('Latest activity', formatDateTime(auditTrail[0]?.occurredAt ?? now), 'Most recent recorded event within the active filter set', 'i-lucide-clock-3')
        ]
      }
    ],
    exports: makeExports('operations-overview', 'Operations overview', ['dashboard:read']),
    exportHistory: [
      makeExportRun({ slug: 'operations-overview', format: 'csv', mode: 'download', records: auditTrail.length, filters, summary: `CSV export for ${auditTrail.length} filtered audit event(s).` }),
      makeExportRun({ slug: 'operations-overview', format: 'json', mode: 'queued', records: auditTrail.length, filters, summary: `Queued JSON export for ${auditTrail.length} filtered audit event(s).` })
    ]
  }
}

const buildAccessGovernance = (context: ReportBuilderContext = {}): EnterpriseReportSnapshot => {
  const from = getQueryValue(context.query, 'from')
  const to = getQueryValue(context.query, 'to')
  const status = getQueryValue(context.query, 'status')
  const rolePermissions = enterpriseRoles.filter((role) => {
    const updatedAt = dateOrNull(role.updatedAt)
    const afterFrom = !from || (updatedAt ? updatedAt >= new Date(from) : true)
    const beforeTo = !to || (updatedAt ? updatedAt <= new Date(to) : true)
    const statusMatch = !status || role.status.toLowerCase() === status.toLowerCase()
    return afterFrom && beforeTo && statusMatch
  })
  const filters = [
    toFilterSummary('Date range', formatRange(from, to)),
    toFilterSummary('Status', status ?? 'All statuses')
  ].filter((item): item is string => Boolean(item))

  return {
    slug: 'access-governance',
    title: 'Access governance',
    description: 'Reusable export surface for role-based review, approvals, and permission matrix handoff.',
    generatedAt: now,
    appliedFilters: filters,
    availableFilters: [
      makeFilter('from', 'From', 'Start the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('to', 'To', 'End the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('status', 'Status', 'Narrow the report to a role status.', 'select', [
        { label: 'Active', value: 'Active' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Under review', value: 'Under review' }
      ], 'All statuses')
    ],
    metrics: [
      makeMetric('Active roles', rolePermissions.filter(role => role.status === 'Active').length, 'Assignable roles in the workspace', 'i-lucide-badge-check', 'success'),
      makeMetric('Draft roles', rolePermissions.filter(role => role.status === 'Draft').length, 'Pending review before activation', 'i-lucide-file-pen-line', 'warning'),
      makeMetric('Total permissions', Array.from(new Set(rolePermissions.flatMap(role => role.permissions))).length, 'Unique permissions represented across roles', 'i-lucide-key-round', 'default')
    ],
    sections: [
      {
        title: 'Role coverage',
        summary: 'Role data is arranged for governance review and can easily be serialized as an export artifact.',
        metrics: rolePermissions.map(role => makeMetric(role.label, role.permissions.length, `${role.members} member(s) assigned`, 'i-lucide-users', role.status === 'Active' ? 'success' : 'warning'))
      },
      {
        title: 'Permission audit trail',
        summary: 'The current directory shows which permissions are exercised by each role, keeping export payloads easy to validate.',
        fields: rolePermissions.map(role => makeField(role.label, role.status, `Last updated ${formatDateTime(role.updatedAt)}`, 'i-lucide-badge-info'))
      }
    ],
    exports: makeExports('access-governance', 'Access governance', ['roles:read']),
    exportHistory: [
      makeExportRun({ slug: 'access-governance', format: 'csv', mode: 'download', records: rolePermissions.length, filters, summary: `CSV export for ${rolePermissions.length} filtered role(s).` }),
      makeExportRun({ slug: 'access-governance', format: 'json', mode: 'queued', records: rolePermissions.length, filters, summary: `Queued JSON export for ${rolePermissions.length} filtered role(s).` })
    ]
  }
}

const buildDirectoryExport = (context: ReportBuilderContext = {}): EnterpriseReportSnapshot => {
  const from = getQueryValue(context.query, 'from')
  const to = getQueryValue(context.query, 'to')
  const status = getQueryValue(context.query, 'status')
  const region = getQueryValue(context.query, 'region')
  const userRows = enterpriseUsers.filter((user) => {
    const joinedAt = dateOrNull(user.joinedAt)
    const afterFrom = !from || (joinedAt ? joinedAt >= new Date(from) : true)
    const beforeTo = !to || (joinedAt ? joinedAt <= new Date(to) : true)
    const statusMatch = !status || user.status.toLowerCase() === status.toLowerCase()
    const regionMatch = !region || user.region.toLowerCase() === region.toLowerCase()
    return afterFrom && beforeTo && statusMatch && regionMatch
  })
  const filters = [
    toFilterSummary('Date range', formatRange(from, to)),
    toFilterSummary('Status', status ?? 'All statuses'),
    toFilterSummary('Region', region ?? 'All regions')
  ].filter((item): item is string => Boolean(item))

  return {
    slug: 'directory-export',
    title: 'Directory export',
    description: 'Account-level export surface with enough detail to support CSV handoff and integration testing.',
    generatedAt: now,
    appliedFilters: filters,
    availableFilters: [
      makeFilter('from', 'From', 'Start the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('to', 'To', 'End the report at this date.', 'date', undefined, 'YYYY-MM-DD'),
      makeFilter('status', 'Status', 'Filter the directory by account state.', 'select', [
        { label: 'Active', value: 'Active' },
        { label: 'Pending review', value: 'Pending review' },
        { label: 'Locked', value: 'Locked' }
      ], 'All statuses'),
      makeFilter('region', 'Region', 'Filter the export by region.', 'select', [
        { label: 'APAC', value: 'APAC' },
        { label: 'EMEA', value: 'EMEA' },
        { label: 'NA', value: 'NA' }
      ], 'All regions')
    ],
    metrics: [
      makeMetric('Accounts', userRows.length, 'Total directory records in the filtered export', 'i-lucide-users', 'default'),
      makeMetric('MFA enabled', userRows.filter(user => user.mfaEnabled).length, 'Accounts with stronger security posture', 'i-lucide-shield-check', 'success'),
      makeMetric('Locked accounts', userRows.filter(user => user.status === 'Locked').length, 'Security-sensitive records to review', 'i-lucide-shield-alert', 'danger')
    ],
    sections: [
      {
        title: 'Directory inventory',
        summary: 'The report is structured like a future export job, but backed by deterministic starter data.',
        fields: userRows.map(user => makeField(user.name, user.status, `${user.roleLabel} · ${user.region} · MFA ${user.mfaEnabled ? 'enabled' : 'disabled'}`, 'i-lucide-id-card'))
      },
      {
        title: 'Export readiness',
        summary: 'This surface is intentionally cohesive enough for PRD coverage while remaining a server stub.',
        notes: [
          'The payload can be reused for a background export pipeline later.',
          'CSV and JSON endpoints share the same report source of truth.'
        ]
      }
    ],
    exports: makeExports('directory-export', 'Directory export', ['users:read']),
    exportHistory: [
      makeExportRun({ slug: 'directory-export', format: 'csv', mode: 'download', records: userRows.length, filters, summary: `CSV export for ${userRows.length} filtered account(s).` }),
      makeExportRun({ slug: 'directory-export', format: 'json', mode: 'queued', records: userRows.length, filters, summary: `Queued JSON export for ${userRows.length} filtered account(s).` })
    ]
  }
}

export const enterpriseReportSnapshots = {
  'operations-overview': buildOperationsOverview,
  'access-governance': buildAccessGovernance,
  'directory-export': buildDirectoryExport
} as const

export const enterpriseReportOverview = (): EnterpriseReportOverviewPayload => ({
  generatedAt: now,
  metrics: [
    makeMetric('Published reports', 4, 'Composable report surfaces ready for reuse', 'i-lucide-chart-column', 'success'),
    makeMetric('Export formats', 2, 'CSV and JSON stubs cover practical handoff needs', 'i-lucide-download', 'default'),
    makeMetric('Data sources', 4, 'Users, roles, settings, and audit trail are represented', 'i-lucide-database', 'warning')
  ],
  reports: enterpriseReportOverviewList()
})

export const enterpriseReportOverviewList = (): EnterpriseReportOverviewItem[] => {
  const reportSnapshots = Object.entries(enterpriseReportSnapshots).map(([slug, builder]) => ({
    slug,
    snapshot: builder()
  }))

  return reportSnapshots.map(({ slug, snapshot }) => ({
    slug,
    title: snapshot.title,
    description: snapshot.description,
    route: `/dashboard/reports/${slug}`,
    permissions: snapshot.exports[0]?.permissions ?? [],
    status: slug === 'directory-export' ? 'Preview' : 'Ready',
    lastGeneratedAt: snapshot.generatedAt,
    exportFormats: snapshot.exports.map(artifact => artifact.format),
    exportPermissions: snapshot.exports.flatMap(artifact => artifact.permissions ?? []),
    exportHistoryCount: snapshot.exportHistory.length
  }))
}

export const buildEnterpriseReportSnapshot = (slug: keyof typeof enterpriseReportSnapshots, context: ReportBuilderContext = {}): EnterpriseReportSnapshot => enterpriseReportSnapshots[slug](context)
