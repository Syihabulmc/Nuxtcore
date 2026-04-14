<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const metrics = [
  {
    label: 'Active users',
    value: formatCompactNumber(1284),
    hint: '+12% from last month',
    icon: 'i-lucide-users',
    tone: 'success' as const
  },
  {
    label: 'Open tasks',
    value: 18,
    hint: '3 pending approvals',
    icon: 'i-lucide-list-checks',
    tone: 'warning' as const
  },
  {
    label: 'Service uptime',
    value: '99.98%',
    hint: 'Stable production baseline',
    icon: 'i-lucide-shield-check',
    tone: 'success' as const
  }
]
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Dashboard"
      title="Operations overview"
      description="This page demonstrates reusable layout and base components ready for enterprise modules."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-refresh-cw">Refresh</UButton>
        <UButton icon="i-lucide-plus">Create item</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard
        v-for="metric in metrics"
        :key="metric.label"
        :label="metric.label"
        :value="metric.value"
        :hint="metric.hint"
        :icon="metric.icon"
        :tone="metric.tone"
      />
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <SectionCard title="Recent activity" description="Placeholder feed for future audit trail and workflow events.">
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">User import completed</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">12 records processed successfully</p>
            </div>
            <span class="text-sm text-slate-500 dark:text-slate-400">5m ago</span>
          </div>

          <div class="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">Permission matrix reviewed</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Role changes queued for approval</p>
            </div>
            <span class="text-sm text-slate-500 dark:text-slate-400">22m ago</span>
          </div>
        </div>
      </SectionCard>

      <EmptyState
        title="No custom widgets yet"
        description="Add charts, tables, or workflow panels here as each module evolves."
        icon="i-lucide-layout-grid"
      >
        <template #actions>
          <UButton variant="soft" color="neutral">Add widget</UButton>
        </template>
      </EmptyState>
    </div>
  </div>
</template>
