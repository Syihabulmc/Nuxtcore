<script setup lang="ts">
import { enterpriseSettings } from '@shared/constants/directory'

const { hasPermission } = useAuthState()

if (!hasPermission('settings:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const settingsSummary = computed(() => [
  { label: 'Enabled sections', value: enterpriseSettings.filter(section => section.status === 'Enabled').length, hint: 'Ready for operational use', icon: 'i-lucide-toggle-right', tone: 'success' as const },
  { label: 'Locked sections', value: enterpriseSettings.filter(section => section.status === 'Locked').length, hint: 'Restricted starter defaults', icon: 'i-lucide-lock', tone: 'warning' as const },
  { label: 'Planned sections', value: enterpriseSettings.filter(section => section.status === 'Planned').length, hint: 'Next expansion candidates', icon: 'i-lucide-clipboard-list', tone: 'default' as const }
])
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Settings"
      title="Application configuration"
      description="Reusable settings sections with list and detail surfaces for later form wiring."
    >
      <template #actions>
        <UButton variant="soft" color="neutral" icon="i-lucide-rotate-ccw">Reset</UButton>
        <UButton icon="i-lucide-save">Save changes</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard v-for="item in settingsSummary" :key="item.label" :label="item.label" :value="item.value" :hint="item.hint" :icon="item.icon" :tone="item.tone" />
    </div>

    <SectionCard title="Settings sections" description="Structured admin content keeps the starter reusable and easy to extend.">
      <div class="space-y-3">
        <NuxtLink v-for="setting in enterpriseSettings" :key="setting.slug" :to="`/dashboard/settings/${setting.slug}`" class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-4 dark:bg-slate-900">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ setting.label }}</p>
              <StatusBadge :status="setting.status" />
            </div>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ setting.description }}</p>
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">{{ setting.fields.length }} values · Updated {{ setting.updatedAt }}</p>
          </div>
          <UButton variant="ghost" color="neutral" size="xs" trailing-icon="i-lucide-arrow-right">Open</UButton>
        </NuxtLink>
      </div>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>Global settings stay separate from module-specific preferences.</span>
          <UButton variant="soft" color="neutral" to="/dashboard/users">Review users</UButton>
        </div>
      </template>
    </SectionCard>
  </div>
</template>
