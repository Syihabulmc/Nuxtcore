<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

export interface DetailListItem {
  label: string
  value: string | number | boolean | null | undefined
  hint?: string
  icon?: string
  to?: RouteLocationRaw
}

defineProps<{
  items: readonly DetailListItem[]
}>()

const formatValue = (value: DetailListItem['value']) => {
  if (value === true) {
    return 'Enabled'
  }

  if (value === false) {
    return 'Disabled'
  }

  if (value === null || value === undefined || value === '') {
    return '—'
  }

  return String(value)
}
</script>

<template>
  <dl class="grid gap-3 sm:grid-cols-2">
    <div
      v-for="item in items"
      :key="item.label"
      class="rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 dark:border-slate-800/80 dark:bg-slate-900/60"
    >
      <dt class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        <UIcon v-if="item.icon" :name="item.icon" class="h-3.5 w-3.5" />
        <span>{{ item.label }}</span>
      </dt>
      <dd class="mt-2 text-sm font-medium text-slate-900 dark:text-white">
        <NuxtLink v-if="item.to" :to="item.to" class="hover:text-primary-600 dark:hover:text-primary-400">
          {{ formatValue(item.value) }}
        </NuxtLink>
        <span v-else>{{ formatValue(item.value) }}</span>
      </dd>
      <p v-if="item.hint" class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {{ item.hint }}
      </p>
    </div>
  </dl>
</template>
