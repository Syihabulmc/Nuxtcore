<script setup lang="ts">
import { APP_NAME } from '@shared/constants/app'
import type { NavigationItem } from '@shared/types/app'

const config = useAppConfig() as {
  navigation?: {
    sidebar?: NavigationItem[]
  }
}

const route = useRoute()

const items = computed<NavigationItem[]>(() => config.navigation?.sidebar ?? [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' }
])

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <div class="flex h-full flex-col gap-6 px-4 py-6 lg:px-5">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300">
        <span class="h-2 w-2 rounded-full bg-primary-500" />
        Enterprise starter
      </div>
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ APP_NAME }}
        </h2>
        <p class="text-sm leading-6 text-slate-500 dark:text-slate-400">
          Modular dashboard foundation
        </p>
      </div>
    </div>

    <nav class="space-y-1">
      <NuxtLink
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors"
        :class="isActive(item.to) ? 'bg-primary-50 text-primary-700 dark:bg-primary-950 dark:text-primary-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'"
      >
        <UIcon v-if="item.icon" :name="item.icon" class="h-4 w-4" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm font-medium text-slate-900 dark:text-white">Need more modules?</p>
      <p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Add domain folders inside modules/ and keep UI components reusable.
      </p>
    </div>
  </div>
</template>
