<script setup lang="ts">
import { APP_DESCRIPTION, APP_NAME } from '@shared/constants/app'
import type { NavigationItem } from '@shared/types/app'
import { enterpriseSidebarNavigation } from '@shared/constants/modules'
import { computed } from 'vue'

const config = useAppConfig() as {
  brand?: {
    name?: string
    description?: string
  }
  navigation?: {
    sidebar?: NavigationItem[]
  }
}

const route = useRoute()
const { user, isAuthenticated, canAccessAny } = useAuthState()

const items = computed<NavigationItem[]>(() => {
  const baseItems = config.navigation?.sidebar?.length ? config.navigation.sidebar : enterpriseSidebarNavigation

  return baseItems.filter((item) => {
    if (!item.permissions?.length) {
      return true
    }

    return canAccessAny(item.permissions)
  })
})

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
const title = computed(() => config.brand?.name ?? APP_NAME)
const subtitle = computed(() => config.brand?.description ?? APP_DESCRIPTION)
const sessionBadge = computed(() => isAuthenticated.value ? 'Authorized' : 'Guest')
</script>

<template>
  <div class="flex h-full flex-col gap-6 px-4 py-6 lg:px-5">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-300">
        <span class="h-2 w-2 rounded-full bg-primary-500" />
        {{ sessionBadge }} workspace
      </div>
      <div>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ title }}
        </h2>
        <p class="text-sm leading-6 text-slate-500 dark:text-slate-400">
          {{ subtitle }}
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
        <div class="min-w-0">
          <span class="block">{{ item.label }}</span>
          <span v-if="item.description" class="block truncate text-xs font-normal text-slate-400 dark:text-slate-500">
            {{ item.description }}
          </span>
        </div>
      </NuxtLink>
    </nav>

    <div class="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      <p class="text-sm font-medium text-slate-900 dark:text-white">
        {{ user?.name ?? 'Guest user' }}
      </p>
      <p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
        Navigation is filtered by the active session permissions. Extend module entries from the central registry.
      </p>
    </div>
  </div>
</template>
