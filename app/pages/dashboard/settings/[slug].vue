<script setup lang="ts">
import { formatDateTime } from '@shared/utils/format'
import { enterpriseSettings } from '@shared/constants/directory'

const route = useRoute()
const { hasPermission } = useAuthState()
const { settingBySlug } = useEnterpriseDirectory()

if (!hasPermission('settings:read')) {
  throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
}

const currentSetting = computed(() => settingBySlug(String(route.params.slug)) ?? null)

if (!currentSetting.value) {
  throw createError({ statusCode: 404, statusMessage: 'Settings section not found' })
}

const statusTone = computed(() => currentSetting.value?.status === 'Enabled' ? 'success' : currentSetting.value?.status === 'Locked' ? 'warning' : 'primary')

const detailItems = computed(() => [
  { label: 'Slug', value: currentSetting.value?.slug, icon: 'i-lucide-hash' },
  { label: 'Status', value: currentSetting.value?.status, icon: 'i-lucide-badge-info' },
  { label: 'Updated', value: currentSetting.value ? formatDateTime(currentSetting.value.updatedAt) : null, icon: 'i-lucide-clock-3' },
  { label: 'Fields', value: currentSetting.value?.fields.length ?? 0, icon: 'i-lucide-list-checks' }
])

const relatedSettings = computed(() => enterpriseSettings.filter(setting => setting.slug !== currentSetting.value?.slug).slice(0, 2))
</script>

<template>
  <div v-if="currentSetting" class="space-y-8">
    <PageHeader
      badge="Settings"
      :title="currentSetting.label"
      :description="currentSetting.description"
    >
      <template #actions>
        <UButton variant="soft" color="neutral" to="/dashboard/settings" icon="i-lucide-arrow-left">Back to settings</UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-rotate-ccw">Reset section</UButton>
        <UButton icon="i-lucide-save">Save section</UButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <StatCard label="Status" :value="currentSetting.status" :hint="`${currentSetting.fields.length} configurable values`" icon="i-lucide-toggle-right" :tone="statusTone" />
      <StatCard label="Editable fields" :value="currentSetting.fields.filter(field => field.editable).length" hint="Safe defaults keep the starter approachable" icon="i-lucide-pencil-line" tone="default" />
      <StatCard label="Updated" :value="formatDateTime(currentSetting.updatedAt)" hint="Track configuration changes in one place" icon="i-lucide-clock-3" tone="default" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard title="Section details" description="Reusable detail view for application settings and operational controls.">
        <DetailList :items="detailItems" />
      </SectionCard>

      <SectionCard title="Values" description="Structured starter data that can later become form controls.">
        <div class="space-y-3">
          <div v-for="field in currentSetting.fields" :key="field.key" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">{{ field.label }}</p>
                <p v-if="field.hint" class="text-sm text-slate-500 dark:text-slate-400">{{ field.hint }}</p>
              </div>
              <StatusBadge :status="field.editable ? 'Editable' : 'Locked'" />
            </div>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ field.value }}</p>
          </div>
        </div>
      </SectionCard>
    </div>

    <SectionCard title="Related settings" description="Adjacent sections stay linked for smoother admin navigation.">
      <div class="grid gap-3 md:grid-cols-2">
        <NuxtLink v-for="setting in relatedSettings" :key="setting.slug" :to="`/dashboard/settings/${setting.slug}`" class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">{{ setting.label }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ setting.description }}</p>
            </div>
            <StatusBadge :status="setting.status" />
          </div>
        </NuxtLink>
      </div>
    </SectionCard>
  </div>

  <EmptyState
    v-else
    title="Settings section not found"
    description="The requested configuration group is not available."
    icon="i-lucide-settings-2"
    to="/dashboard/settings"
    actions-label="Back to settings"
  />
</template>
