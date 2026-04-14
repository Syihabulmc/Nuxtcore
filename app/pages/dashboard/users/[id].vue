<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'
import { enterpriseUsers } from '@shared/constants/directory'

const route = useRoute()
const { hasPermission } = useAuthState()
const { userById } = useEnterpriseDirectory()

const currentUser = computed(() => userById(String(route.params.id)) ?? null)

if (!hasPermission('users:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

if (!currentUser.value) {
  throw createError({ statusCode: 404, statusMessage: 'User not found' })
}

const statusTone = computed(() => currentUser.value?.status === 'Active' ? 'success' : currentUser.value?.status === 'Pending review' ? 'warning' : 'danger')

const detailItems = computed(() => [
  { label: 'Email', value: currentUser.value?.email, icon: 'i-lucide-mail' },
  { label: 'Role', value: currentUser.value?.roleLabel, icon: 'i-lucide-badge-check', to: currentUser.value ? `/dashboard/roles/${currentUser.value.roleSlug}` : undefined },
  { label: 'Department', value: currentUser.value?.department, icon: 'i-lucide-building-2' },
  { label: 'Team', value: currentUser.value?.team, icon: 'i-lucide-users' },
  { label: 'Region', value: currentUser.value?.region, icon: 'i-lucide-globe' },
  { label: 'MFA', value: currentUser.value?.mfaEnabled ?? false, icon: 'i-lucide-shield-check' },
  { label: 'Joined', value: currentUser.value ? formatDateTime(currentUser.value.joinedAt) : null, icon: 'i-lucide-calendar-days' },
  { label: 'Last active', value: currentUser.value ? formatDateTime(currentUser.value.lastActiveAt) : null, icon: 'i-lucide-clock-3' }
])

const peers = computed(() => enterpriseUsers.filter(user => user.id !== currentUser.value?.id).slice(0, 3))
</script>

<template>
  <div v-if="currentUser" class="space-y-8">
    <PageHeader
      badge="Users"
      :title="currentUser.name"
      :description="currentUser.title"
    >
      <template #actions>
        <UButton variant="soft" color="neutral" to="/dashboard/users" icon="i-lucide-arrow-left">Back to users</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-mail">Send reminder</UButton>
        <UButton icon="i-lucide-user-cog">Edit profile</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard label="Account status" :value="currentUser.status" :hint="`${currentUser.role} · ${currentUser.department}`" icon="i-lucide-shield-user" :tone="statusTone" />
      <StatCard label="Permissions" :value="currentUser.permissions.length" hint="Inherited from the assigned role" icon="i-lucide-key-round" tone="default" />
      <StatCard label="MFA" :value="currentUser.mfaEnabled ? 'Enabled' : 'Disabled'" hint="Security posture visible in the detail view" icon="i-lucide-shield-check" :tone="currentUser.mfaEnabled ? 'success' : 'warning'" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard title="Account details" description="Production-shaped identity surface with reusable field groups and role linkage.">
        <DetailList :items="detailItems" />
      </SectionCard>

      <SectionCard title="Access summary" description="Useful for approvals and support handoffs.">
        <div class="space-y-4">
          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Direct permissions</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <StatusBadge v-for="permission in currentUser.permissions" :key="permission" :status="permission" color="neutral" />
            </div>
          </div>

          <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Related accounts</p>
            <div class="mt-3 space-y-3">
              <NuxtLink v-for="peer in peers" :key="peer.id" :to="`/dashboard/users/${peer.id}`" class="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm dark:bg-slate-950/60">
                <div>
                  <p class="font-medium text-slate-900 dark:text-white">{{ peer.name }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ peer.roleLabel }} · {{ peer.region }}</p>
                </div>
                <StatusBadge :status="peer.status" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>

  <EmptyState
    v-else
    title="User not found"
    description="The requested user record is not part of the starter directory."
    icon="i-lucide-user-x"
    to="/dashboard/users"
    actions-label="Back to users"
  />
</template>
