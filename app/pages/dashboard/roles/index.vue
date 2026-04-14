<script setup lang="ts">
import { enterpriseRoles } from '@shared/constants/directory'

const { hasPermission } = useAuthState()

if (!hasPermission('roles:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const roleSummary = computed(() => [
  { label: 'Active roles', value: enterpriseRoles.filter(role => role.status === 'Active').length, hint: 'Roles currently assignable', icon: 'i-lucide-badge-check', tone: 'success' as const },
  { label: 'Draft roles', value: enterpriseRoles.filter(role => role.status === 'Draft').length, hint: 'Awaiting final review', icon: 'i-lucide-file-pen-line', tone: 'warning' as const },
  { label: 'Members covered', value: enterpriseRoles.reduce((total, role) => total + role.members, 0), hint: 'Directory coverage across the workspace', icon: 'i-lucide-users', tone: 'default' as const }
])
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Roles"
      title="Access governance"
      description="Practical role matrix and detail links for review-driven access management."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-file-text">Export matrix</UButton>
        <UButton icon="i-lucide-badge-plus">Create role</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard v-for="item in roleSummary" :key="item.label" :label="item.label" :value="item.value" :hint="item.hint" :icon="item.icon" :tone="item.tone" />
    </div>

    <SectionCard title="Role matrix" description="Permission-aware navigation and backend guards both source from this pattern.">
      <div class="space-y-3">
        <NuxtLink v-for="role in enterpriseRoles" :key="role.slug" :to="`/dashboard/roles/${role.slug}`" class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ role.label }}</p>
              <StatusBadge :status="role.status" />
            </div>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ role.description }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <StatusBadge v-for="permission in role.permissions.slice(0, 4)" :key="permission" :status="permission" color="neutral" />
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>{{ role.members }} members</span>
            <UButton variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">Open</UButton>
          </div>
        </NuxtLink>
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>Keep role changes explicit and reviewable to preserve parity with docs.</span>
          <UButton variant="soft" color="neutral" to="/dashboard/settings">Open settings</UButton>
        </div>
      </template>
    </SectionCard>
  </div>
</template>
