<script setup lang="ts">
import { APP_DESCRIPTION } from '@shared/constants/app'
import { formatDateTime } from '@shared/utils/format'
import { enterpriseModules, enterpriseSidebarNavigation } from '@shared/constants/modules'

const { user, session, sessionStatusLabel, permissions, getLandingRoute, hasPermission } = useAuthState()

const moduleSummaries = enterpriseModules.map(module => ({
  ...module,
  accessible: module.permissions.every(permission => hasPermission(permission))
}))

const visibleNavigation = computed(() => enterpriseSidebarNavigation.filter(item => !item.permissions?.length || item.permissions.some(permission => permissions.value.includes(permission))))
const activeModules = computed(() => moduleSummaries.filter(module => module.accessible))
const inaccessibleModules = computed(() => moduleSummaries.filter(module => !module.accessible))
const recommendedRoute = computed(() => getLandingRoute())
const lastActive = computed(() => session.value.lastActiveAt)
const expiresAt = computed(() => session.value.expiresAt ?? '')
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Dashboard"
      title="Operations overview"
      description="Production-shaped starter surface for module navigation, activity, and session visibility."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-refresh-cw">Refresh</UButton>
        <UButton :to="recommendedRoute" variant="soft" color="neutral" icon="i-lucide-arrow-right">Open landing</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard
        label="Accessible modules"
        :value="activeModules.length"
        :hint="`${moduleSummaries.length - activeModules.length} modules await more permissions`"
        icon="i-lucide-grid-2x2"
        tone="success"
      />
      <StatCard
        label="Active session"
        :value="sessionStatusLabel"
        :hint="user ? `${user.name} · ${user.role}` : 'No active user session yet.'"
        icon="i-lucide-shield-check"
        tone="default"
      />
      <StatCard
        label="Navigation items"
        :value="visibleNavigation.length"
        :hint="APP_DESCRIPTION"
        icon="i-lucide-list-tree"
        tone="warning"
      />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
      <SectionCard title="Module registry" description="Navigation and dashboard surfaces are sourced from the central module registry.">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ModuleCard
            v-for="module in moduleSummaries"
            :key="module.name"
            :title="module.label ?? module.name"
            :description="module.description"
            :to="module.routeBase"
            :icon="module.icon"
            :badge="module.accessible ? 'Available' : 'Restricted'"
            :permissions="module.permissions"
          />
        </div>
      </SectionCard>

      <SectionCard title="Session status" description="Auth state is a placeholder, but the session surface is shaped for a real backend later.">
        <div class="space-y-4">
          <UAlert
            color="primary"
            variant="soft"
            icon="i-lucide-shield-check"
            :title="sessionStatusLabel"
            :description="user ? `${user.name} · ${user.role}` : 'No active user session yet.'"
          />

          <dl class="grid gap-3 text-sm">
            <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <dt class="text-slate-500 dark:text-slate-400">User</dt>
              <dd class="font-medium text-slate-900 dark:text-white">{{ user?.email ?? 'Guest' }}</dd>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <dt class="text-slate-500 dark:text-slate-400">Last active</dt>
              <dd class="font-medium text-slate-900 dark:text-white">{{ formatDateTime(lastActive) }}</dd>
            </div>
            <div v-if="expiresAt" class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900">
              <dt class="text-slate-500 dark:text-slate-400">Expires</dt>
              <dd class="font-medium text-slate-900 dark:text-white">{{ formatDateTime(expiresAt) }}</dd>
            </div>
          </dl>
        </div>
      </SectionCard>
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <SectionCard title="Permission-aware navigation" description="The sidebar is built from the module registry and filtered against active permissions.">
        <div class="space-y-3">
          <NuxtLink
            v-for="item in visibleNavigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-900"
          >
            <div class="flex items-center gap-3">
              <UIcon :name="item.icon || 'i-lucide-square-stack'" class="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">{{ item.label }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</p>
              </div>
            </div>
            <UBadge color="neutral" variant="soft">Visible</UBadge>
          </NuxtLink>
        </div>
      </SectionCard>

      <SectionCard title="Module access gaps" description="Use this as a staging area for the next permissions to wire up from backend roles.">
        <div v-if="inaccessibleModules.length" class="space-y-3">
          <div
            v-for="module in inaccessibleModules"
            :key="module.name"
            class="rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">{{ module.label ?? module.name }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ module.description }}</p>
              </div>
              <UBadge color="warning" variant="soft">Restricted</UBadge>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <UBadge v-for="permission in module.permissions" :key="permission" color="neutral" variant="soft" class="text-[11px]">
                {{ permission }}
              </UBadge>
            </div>
          </div>
        </div>
        <EmptyState
          v-else
          title="All module permissions are available"
          description="This demo session can access every documented enterprise module."
          icon="i-lucide-badge-check"
        />
      </SectionCard>
    </div>

    <div class="grid gap-4 xl:grid-cols-2">
      <SectionCard title="Recent activity" description="Activity feed reserved for audit trail, approvals, and workflow events.">
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
        title="No domain widgets configured yet"
        description="Add charts, tables, or workflow panels here as each module evolves."
        icon="i-lucide-layout-grid"
        to="/dashboard/users"
        actions-label="Explore users"
      />
    </div>
  </div>
</template>
