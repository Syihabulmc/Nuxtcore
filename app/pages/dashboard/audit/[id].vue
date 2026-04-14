<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'

const route = useRoute()
const { hasPermission } = useAuthState()
const { auditTrailItemById, auditTrail } = useEnterpriseDirectory()

if (!hasPermission('audit:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const currentEntry = computed(() => auditTrailItemById(String(route.params.id)) ?? null)

if (!currentEntry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Audit entry not found' })
}

const detailItems = computed(() => [
  { label: 'Action', value: currentEntry.value?.action, icon: 'i-lucide-badge-info' },
  { label: 'Severity', value: currentEntry.value?.severity, icon: 'i-lucide-triangle-alert' },
  { label: 'Actor', value: currentEntry.value?.actorName, icon: 'i-lucide-user-round' },
  { label: 'Actor role', value: currentEntry.value?.actorRole, icon: 'i-lucide-shield-user' },
  { label: 'Module', value: currentEntry.value?.module, icon: 'i-lucide-layout-grid' },
  { label: 'Target', value: currentEntry.value?.targetLabel, icon: 'i-lucide-crosshair' },
  { label: 'Occurred', value: currentEntry.value ? formatDateTime(currentEntry.value.occurredAt) : null, icon: 'i-lucide-clock-3' },
  { label: 'Reference', value: currentEntry.value?.id, icon: 'i-lucide-hash' }
])

const relatedEntries = computed(() => auditTrail.filter(entry => entry.id !== currentEntry.value?.id && entry.module === currentEntry.value?.module).slice(0, 3))
</script>

<template>
  <div v-if="currentEntry" class="space-y-8">
    <PageHeader
      badge="Audit Trail"
      :title="currentEntry.title"
      :description="currentEntry.description"
    >
      <template #actions>
        <UButton variant="soft" color="neutral" to="/dashboard/audit" icon="i-lucide-arrow-left">Back to audit</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-share-2">Share record</UButton>
        <UButton icon="i-lucide-download">Export entry</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard label="Action" :value="currentEntry.action" hint="Normalized action name for traceability" icon="i-lucide-badge-info" tone="default" />
      <StatCard label="Severity" :value="currentEntry.severity" hint="Severity reflects operational impact" icon="i-lucide-triangle-alert" :tone="currentEntry.severity === 'success' ? 'success' : currentEntry.severity === 'warning' ? 'warning' : currentEntry.severity === 'danger' ? 'danger' : 'default'" />
      <StatCard label="Module" :value="currentEntry.module" hint="Audit events stay grouped by domain" icon="i-lucide-layout-grid" tone="default" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard title="Event details" description="Reusable detail layout for audit records and operational reviews.">
        <DetailList :items="detailItems" />
      </SectionCard>

      <SectionCard title="Evidence" description="Concise supporting notes for review and escalation workflows.">
        <div class="space-y-3">
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Details</p>
            <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li v-for="detail in currentEntry.details" :key="detail" class="flex items-start gap-2">
                <UIcon name="i-lucide-check-circle-2" class="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Target</p>
            <NuxtLink v-if="currentEntry.targetRoute" :to="currentEntry.targetRoute" class="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
              {{ currentEntry.targetLabel }}
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
            </NuxtLink>
            <p v-else class="mt-3 text-sm text-slate-600 dark:text-slate-300">{{ currentEntry.targetLabel }}</p>
          </div>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Related audit entries" description="Other records in the same module help preserve review context.">
      <div class="grid gap-3 md:grid-cols-3">
        <NuxtLink v-for="entry in relatedEntries" :key="entry.id" :to="`/dashboard/audit/${entry.id}`" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ entry.title }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ entry.actorName }}</p>
            </div>
            <StatusBadge :status="entry.severity" />
          </div>
        </NuxtLink>
      </div>
    </SectionCard>
  </div>

  <EmptyState
    v-else
    title="Audit entry not found"
    description="The requested audit record is not available in the starter log."
    icon="i-lucide-clipboard-x"
    to="/dashboard/audit"
    actions-label="Back to audit"
  />
</template>
