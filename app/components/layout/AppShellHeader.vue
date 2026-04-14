<script setup lang="ts">
import { APP_DESCRIPTION, APP_NAME } from '@shared/constants/app'

const config = useAppConfig() as {
  brand?: {
    name?: string
    description?: string
  }
}

const title = computed(() => config.brand?.name ?? APP_NAME)
const subtitle = computed(() => config.brand?.description ?? APP_DESCRIPTION)
</script>

<template>
  <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
    <div class="min-w-0">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-400">
        {{ title }}
      </p>
      <p class="truncate text-sm text-slate-500 dark:text-slate-400">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-2">
      <slot name="actions" />
      <UButton icon="i-lucide-bell" variant="ghost" color="neutral" aria-label="Notifications" />
      <UAvatar size="sm" alt="Nuxtcore" text="NC" />
    </div>
  </div>
</template>
