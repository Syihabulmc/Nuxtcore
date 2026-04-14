<script setup lang="ts">
const { hasPermission } = useAuthState()

if (!hasPermission('dashboard:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const route = useRoute()
const filterState = reactive({
  from: '',
  to: '',
  module: '',
  status: '',
  region: ''
})

const buildQuery = computed(() => ({
  ...(filterState.from ? { from: filterState.from } : {}),
  ...(filterState.to ? { to: filterState.to } : {}),
  ...(filterState.module ? { module: filterState.module } : {}),
  ...(filterState.status ? { status: filterState.status } : {}),
  ...(filterState.region ? { region: filterState.region } : {})
}))

const activeReportSlug = computed(() => String(route.params.slug ?? 'operations-overview'))

const { data: catalog, refresh: refreshCatalog } = await useFetch('/api/reports', {
  key: 'nuxtcore-reports-catalog'
})

const { data: report, refresh: refreshReport } = await useFetch(() => `/api/reports/${activeReportSlug.value}`, {
  key: () => `nuxtcore-report-${activeReportSlug.value}-${JSON.stringify(buildQuery.value)}`,
  query: buildQuery,
  watch: [buildQuery]
})

const reportMetrics = computed(() => catalog.value?.data.metrics ?? [])
const reportItems = computed(() => catalog.value?.data.reports ?? [])
const snapshot = computed(() => report.value?.data ?? null)
const availableFilterMap = computed(() => snapshot.value?.availableFilters ?? [])

const filterFieldValue = (key: string) => (filterState as Record<string, string>)[key] ?? ''

const applyFilters = async () => {
  await refreshReport()
}

const clearFilters = async () => {
  filterState.from = ''
  filterState.to = ''
  filterState.module = ''
  filterState.status = ''
  filterState.region = ''
  await refreshReport()
}

const refreshAll = async () => {
  await Promise.all([refreshCatalog(), refreshReport()])
}
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Reports"
      title="Reporting and export surfaces"
      description="A practical dashboard for report cataloging, snapshot detail, and export handoff."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-refresh-cw" @click="refreshAll">Refresh catalog</UButton>
        <UButton to="/dashboard/reports/operations-overview" icon="i-lucide-chart-column">Open report</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard v-for="metric in reportMetrics" :key="metric.label" :label="metric.label" :value="metric.value" :hint="metric.hint" :icon="metric.icon" :tone="metric.tone ?? 'default'" />
    </div>

    <SectionCard title="Report filters" description="Date range and reporting filters are wired into the snapshot request, mirroring a production-ready control surface.">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div v-for="filter in availableFilterMap" :key="filter.key" class="space-y-2">
          <p class="text-sm font-medium text-slate-900 dark:text-white">{{ filter.label }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ filter.description }}</p>
          <UInput
            v-if="filter.kind === 'date'"
            v-model="(filterState as any)[filter.key]"
            type="date"
            :placeholder="filter.placeholder"
          />
          <USelectMenu
            v-else-if="filter.kind === 'select'"
            v-model="(filterState as any)[filter.key]"
            :items="filter.options ?? []"
            :placeholder="filter.placeholder"
            value-attribute="value"
            option-attribute="label"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>Filters update the server snapshot and export artifacts.</span>
          <div class="flex gap-2">
            <UButton variant="soft" color="neutral" @click="clearFilters">Clear filters</UButton>
            <UButton @click="applyFilters">Apply filters</UButton>
          </div>
        </div>
      </template>
    </SectionCard>

    <SectionCard v-if="snapshot?.appliedFilters.length" title="Applied filters" description="The current snapshot records the active filter context for reproducible exports.">
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="filter in snapshot.appliedFilters" :key="filter" color="neutral" variant="soft">{{ filter }}</UBadge>
      </div>
    </SectionCard>

    <SectionCard title="Report catalog" description="Reusable list surface for current and future reporting modules.">
      <div class="space-y-3">
        <NuxtLink
          v-for="report in reportItems"
          :key="report.slug"
          :to="report.route"
          class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ report.title }}</p>
              <StatusBadge :status="report.status" />
            </div>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ report.description }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <UBadge v-for="format in report.exportFormats" :key="format" color="neutral" variant="soft" class="text-[11px] uppercase tracking-wide">{{ format }}</UBadge>
              <UBadge v-if="report.exportHistoryCount" color="primary" variant="soft" class="text-[11px] uppercase tracking-wide">{{ report.exportHistoryCount }} history</UBadge>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>{{ report.lastGeneratedAt }}</span>
            <UButton variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">Open</UButton>
          </div>
        </NuxtLink>
      </div>
    </SectionCard>
  </div>
</template>
