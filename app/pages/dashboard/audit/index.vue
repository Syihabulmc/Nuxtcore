<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'

const { hasPermission } = useAuthState()
const { auditTrail } = useEnterpriseDirectory()

if (!hasPermission('audit:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const sortedAuditTrail = computed(() => [...auditTrail].sort((left, right) => Date.parse(right.occurredAt) - Date.parse(left.occurredAt)))

const auditSummary = computed(() => [
  {
    label: 'Recorded events',
    value: auditTrail.length,
    hint: 'Reviewable trail for critical actions and configuration changes',
    icon: 'i-lucide-clipboard-list',
    tone: 'default' as const
  },
  {
    label: 'Login events',
    value: auditTrail.filter(item => item.action === 'login').length,
    hint: 'Session starts remain visible for operational traceability',
    icon: 'i-lucide-log-in',
    tone: 'success' as const
  },
  {
    label: 'Change events',
    value: auditTrail.filter(item => item.action !== 'login').length,
    hint: 'Approvals, updates, and config changes stay auditable',
    icon: 'i-lucide-pen-line',
    tone: 'warning' as const
  }
])

const actionLabel = (action: string) => action.replace('-', ' ')
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Audit Trail"
      title="Activity history"
      description="Reviewable enterprise event log for login, approval, and configuration changes."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-download">Export log</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-filter">Filter</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard
        v-for="item in auditSummary"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :hint="item.hint"
        :icon="item.icon"
        :tone="item.tone"
      />
    </div>

    <SectionCard title="Audit log" description="Module, actor, and target are tracked with each important event.">
      <div class="space-y-3">
        <NuxtLink
          v-for="entry in sortedAuditTrail"
          :key="entry.id"
          :to="`/dashboard/audit/${entry.id}`"
          class="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900"
        >
          <div class="min-w-0 space-y-2">
            <div class="flex flex-wrap items-center gap-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ entry.title }}</p>
              <StatusBadge :status="entry.action" color="neutral" />
              <StatusBadge :status="entry.severity" />
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ entry.description }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ entry.actorName }} · {{ entry.actorRole }} · {{ entry.module }} · {{ entry.targetLabel }}
            </p>
          </div>
          <div class="text-right text-sm text-slate-500 dark:text-slate-400">
            <p>{{ formatDateTime(entry.occurredAt) }}</p>
            <p class="mt-1 text-xs uppercase tracking-[0.16em]">{{ actionLabel(entry.action) }}</p>
          </div>
        </NuxtLink>
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>Audit coverage currently focuses on authentication, roles, settings, and account safety.</span>
          <UButton variant="soft" color="neutral" to="/dashboard/settings">Review settings</UButton>
        </div>
      </template>
    </SectionCard>
  </div>
</template>
