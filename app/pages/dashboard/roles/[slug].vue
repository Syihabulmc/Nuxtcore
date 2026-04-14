<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'
import { enterpriseRoles } from '@shared/constants/directory'

const route = useRoute()
const { hasPermission } = useAuthState()
const { roleBySlug } = useEnterpriseDirectory()

if (!hasPermission('roles:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const currentRole = computed(() => roleBySlug(String(route.params.slug)) ?? null)

if (!currentRole.value) {
  throw createError({ statusCode: 404, statusMessage: 'Role not found' })
}

const statusTone = computed(() => currentRole.value?.status === 'Active' ? 'success' : currentRole.value?.status === 'Draft' ? 'warning' : 'primary')

const detailItems = computed(() => [
  { label: 'Slug', value: currentRole.value?.slug, icon: 'i-lucide-hash' },
  { label: 'Members', value: currentRole.value?.members ?? 0, icon: 'i-lucide-users' },
  { label: 'Owner', value: currentRole.value?.owner, icon: 'i-lucide-user-cog' },
  { label: 'Updated', value: currentRole.value ? formatDateTime(currentRole.value.updatedAt) : null, icon: 'i-lucide-clock-3' }
])

const siblingRoles = computed(() => enterpriseRoles.filter(role => role.slug !== currentRole.value?.slug).slice(0, 3))
</script>

<template>
  <div v-if="currentRole" class="space-y-8">
    <PageHeader
      badge="Roles"
      :title="currentRole.label"
      :description="currentRole.description"
    >
      <template #actions>
        <UButton variant="soft" color="neutral" to="/dashboard/roles" icon="i-lucide-arrow-left">Back to roles</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-scan-search">Audit usage</UButton>
        <UButton icon="i-lucide-badge-plus">Adjust permissions</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard label="Status" :value="currentRole.status" :hint="`${currentRole.members} assigned members`" icon="i-lucide-badge-check" :tone="statusTone" />
      <StatCard label="Permissions" :value="currentRole.permissions.length" hint="Defined from the module registry" icon="i-lucide-key-round" tone="default" />
      <StatCard label="Owner" :value="currentRole.owner" hint="Named ownership keeps review flows explicit" icon="i-lucide-user-round-cog" tone="default" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard title="Role details" description="Re-usable detail panel for role governance and approvals.">
        <DetailList :items="detailItems" />
      </SectionCard>

      <SectionCard title="Permission matrix" description="Concrete permissions that map directly to navigation and route guards.">
        <div class="space-y-3">
          <StatusBadge v-for="permission in currentRole.permissions" :key="permission" :status="permission" color="neutral" />
        </div>
        <template #footer>
          <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span>Changes should be reviewed before activating a new access set.</span>
            <UButton variant="soft" color="neutral" to="/dashboard/settings">Policy settings</UButton>
          </div>
        </template>
      </SectionCard>
    </div>

    <SectionCard title="Related roles" description="Useful for comparing scope during governance reviews.">
      <div class="grid gap-3 md:grid-cols-3">
        <NuxtLink v-for="role in siblingRoles" :key="role.slug" :to="`/dashboard/roles/${role.slug}`" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ role.label }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ role.description }}</p>
            </div>
            <StatusBadge :status="role.status" />
          </div>
        </NuxtLink>
      </div>
    </SectionCard>
  </div>

  <EmptyState
    v-else
    title="Role not found"
    description="The requested role does not exist in the starter directory."
    icon="i-lucide-badge-x"
    to="/dashboard/roles"
    actions-label="Back to roles"
  />
</template>
