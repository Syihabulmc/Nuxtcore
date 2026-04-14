<script setup lang="ts">
import { enterpriseUsers } from '@shared/constants/directory'

const route = useRoute()
const { hasPermission } = useAuthState()

if (!hasPermission('users:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const statusOptions = ['All accounts', 'Active', 'Pending review', 'Locked']
const selectedStatus = computed(() => typeof route.query.status === 'string' && statusOptions.includes(route.query.status) ? route.query.status : 'All accounts')

const filteredUsers = computed(() => selectedStatus.value === 'All accounts' ? enterpriseUsers : enterpriseUsers.filter(user => user.status === selectedStatus.value))

const userSummary = computed(() => [
  { label: 'Active accounts', value: enterpriseUsers.filter(user => user.status === 'Active').length, hint: 'Production-like directory data', icon: 'i-lucide-users' },
  { label: 'Pending review', value: enterpriseUsers.filter(user => user.status === 'Pending review').length, hint: 'Queue for approval-driven access changes', icon: 'i-lucide-badge-alert', tone: 'warning' as const },
  { label: 'Locked', value: enterpriseUsers.filter(user => user.status === 'Locked').length, hint: 'Security-sensitive accounts', icon: 'i-lucide-shield-alert', tone: 'danger' as const }
])
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Users"
      title="Identity directory"
      description="Practical starter directory for account review, access governance, and record drill-downs."
    >
      <template #actions>
        <USelect :items="statusOptions" :model-value="selectedStatus" size="sm" class="w-44" />
        <UButton variant="soft" color="neutral" icon="i-lucide-download">Export CSV</UButton>
        <UButton icon="i-lucide-user-plus">Add user</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard v-for="item in userSummary" :key="item.label" :label="item.label" :value="item.value" :hint="item.hint" :icon="item.icon" :tone="item.tone ?? 'default'" />
    </div>

    <SectionCard title="Directory list" description="Reusable list/detail pattern with clear statuses and routeable records.">
      <div class="space-y-3">
        <NuxtLink v-for="user in filteredUsers" :key="user.id" :to="`/dashboard/users/${user.id}`" class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ user.name }}</p>
              <StatusBadge :status="user.status" />
            </div>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ user.email }} · {{ user.roleLabel }} · {{ user.department }}</p>
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ user.team }} · {{ user.region }} · MFA {{ user.mfaEnabled ? 'enabled' : 'disabled' }}</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <StatusBadge :status="user.roleLabel" color="neutral" />
            <UButton variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">Open</UButton>
          </div>
        </NuxtLink>

        <EmptyState
          v-if="!filteredUsers.length"
          title="No users match this filter"
          description="Try a different status to review more records."
          icon="i-lucide-filter-x"
        />
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>All records are generated from reusable directory data for parity-first UX.</span>
          <UButton variant="soft" color="neutral" to="/dashboard/roles">Review roles</UButton>
        </div>
      </template>
    </SectionCard>
  </div>
</template>
