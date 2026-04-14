<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'

const route = useRoute()
const reportSlug = computed(() => String(route.params.slug))
const reportQuery = computed(() => route.query)
const { hasPermission } = useAuthState()

if (!hasPermission('dashboard:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const { data: report } = await useFetch(() => `/api/reports/${reportSlug.value}`, {
  key: () => `nuxtcore-report-${reportSlug.value}-${JSON.stringify(reportQuery.value)}`,
  query: reportQuery,
  watch: [reportQuery]
})

const snapshot = computed(() => report.value?.data ?? null)
const exportHistory = computed(() => snapshot.value?.exportHistory ?? [])
const queuedExportHref = computed(() => snapshot.value?.exports.find(artifact => artifact.mode === 'queued')?.href ?? snapshot.value?.exports[0]?.href)

if (!snapshot.value) {
  throw createError({ statusCode: 404, statusMessage: 'Report not found' })
}
</script>

<template>
  <div v-if="snapshot" class="space-y-8">
    <PageHeader
      badge="Reports"
      :title="snapshot.title"
      :description="snapshot.description"
    >
      <template #actions>
        <UButton variant="soft" color="neutral" to="/dashboard/reports" icon="i-lucide-arrow-left">Back to reports</UButton>
        <UButton :to="snapshot.exports.find(artifact => artifact.format === 'csv')?.href" variant="soft" color="neutral" icon="i-lucide-download">Export CSV</UButton>
        <UButton :to="snapshot.exports.find(artifact => artifact.mode === 'queued')?.href" icon="i-lucide-clock-3">Queue export</UButton>
      </template>
    </PageHeader>

    <SectionCard v-if="snapshot.appliedFilters.length || snapshot.availableFilters.length" title="Report controls" description="Filters and export modes are represented as first-class report metadata.">
      <div class="grid gap-6 xl:grid-cols-2">
        <div>
          <p class="text-sm font-medium text-slate-900 dark:text-white">Available filters</p>
          <div class="mt-3 space-y-3">
            <div v-for="filter in snapshot.availableFilters" :key="filter.key" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-medium text-slate-900 dark:text-white">{{ filter.label }}</p>
                  <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ filter.description }}</p>
                </div>
                <UBadge color="neutral" variant="soft">{{ filter.kind }}</UBadge>
              </div>
              <div v-if="filter.options?.length" class="mt-3 flex flex-wrap gap-2">
                <UBadge v-for="option in filter.options" :key="option.value" color="neutral" variant="soft">{{ option.label }}</UBadge>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium text-slate-900 dark:text-white">Applied filters</p>
          <div v-if="snapshot.appliedFilters.length" class="mt-3 flex flex-wrap gap-2">
            <UBadge v-for="filter in snapshot.appliedFilters" :key="filter" color="primary" variant="soft">{{ filter }}</UBadge>
          </div>
          <p v-else class="mt-3 text-sm text-slate-500 dark:text-slate-400">No filters are currently applied to this snapshot.</p>
          <div class="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-sm font-medium text-slate-900 dark:text-white">Queued export path</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ queuedExportHref }}</p>
            <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">Queued exports return a realistic handoff payload until a background job runner is introduced.</p>
          </div>
        </div>
      </div>
    </SectionCard>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard v-for="metric in snapshot.metrics" :key="metric.label" :label="metric.label" :value="metric.value" :hint="metric.hint" :icon="metric.icon" :tone="metric.tone ?? 'default'" />
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <SectionCard v-for="section in snapshot.sections" :key="section.title" :title="section.title" :description="section.summary">
        <div v-if="section.metrics?.length" class="grid gap-3 sm:grid-cols-2">
          <div v-for="metric in section.metrics" :key="metric.label" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-medium text-slate-900 dark:text-white">{{ metric.label }}</p>
                <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ metric.hint }}</p>
              </div>
              <UBadge v-if="metric.tone" color="neutral" variant="soft">{{ metric.tone }}</UBadge>
            </div>
            <p class="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{{ metric.value }}</p>
          </div>
        </div>

        <div v-if="section.fields?.length" class="space-y-3">
          <div v-for="field in section.fields" :key="field.label" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{{ field.label }}</p>
            <p class="mt-2 text-sm font-medium text-slate-900 dark:text-white">{{ field.value ?? '—' }}</p>
            <p v-if="field.hint" class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ field.hint }}</p>
          </div>
        </div>

        <ul v-if="section.notes?.length" class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li v-for="note in section.notes" :key="note" class="flex items-start gap-2">
            <UIcon name="i-lucide-check-circle-2" class="mt-0.5 h-4 w-4 text-emerald-500" />
            <span>{{ note }}</span>
          </li>
        </ul>
      </SectionCard>
    </div>

    <SectionCard title="Export history" description="Persistent export history provides a realistic audit surface for downloads and queued runs.">
      <div class="grid gap-3 md:grid-cols-2">
        <div v-for="run in exportHistory" :key="run.id" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ run.format.toUpperCase() }} · {{ run.mode }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ run.summary }}</p>
            </div>
            <UBadge :color="run.status === 'queued' ? 'warning' : 'success'" variant="soft">{{ run.status }}</UBadge>
          </div>
          <div class="mt-4 grid gap-2 text-xs text-slate-500 dark:text-slate-400">
            <p>Requested {{ formatDateTime(run.requestedAt) }}</p>
            <p v-if="run.completedAt">Completed {{ formatDateTime(run.completedAt) }}</p>
            <p>Records: {{ run.records }}</p>
            <p>Download: {{ run.downloadHref }}</p>
          </div>
          <div v-if="run.filters.length" class="mt-3 flex flex-wrap gap-2">
            <UBadge v-for="filter in run.filters" :key="filter" color="neutral" variant="soft">{{ filter }}</UBadge>
          </div>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Export artifacts" description="Server-backed export endpoints make the report real enough for PRD coverage.">
      <div class="grid gap-3 md:grid-cols-2">
        <a v-for="artifact in snapshot.exports" :key="artifact.href" :href="artifact.href" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ artifact.label }}</p>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ artifact.description }}</p>
            </div>
            <UBadge v-if="artifact.recommended" color="success" variant="soft">Recommended</UBadge>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <UBadge color="neutral" variant="soft">{{ artifact.format }}</UBadge>
            <UBadge v-if="artifact.mode" color="neutral" variant="soft">{{ artifact.mode }}</UBadge>
          </div>
          <p v-if="artifact.permissions?.length" class="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Permissions: {{ artifact.permissions.join(', ') }}
          </p>
        </a>
      </div>
      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>Generated {{ formatDateTime(snapshot.generatedAt) }}</span>
          <UButton variant="soft" color="neutral" to="/dashboard/reports">Back to catalog</UButton>
        </div>
      </template>
    </SectionCard>
  </div>
</template>
