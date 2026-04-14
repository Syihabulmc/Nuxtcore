<script setup lang="ts">
import { APP_DESCRIPTION, APP_NAME } from '@shared/constants/app'
import { computed } from 'vue'

const config = useAppConfig() as {
  brand?: {
    name?: string
    description?: string
    tagline?: string
  }
}

const brandName = computed(() => config.brand?.name ?? APP_NAME)
const brandDescription = computed(() => config.brand?.description ?? APP_DESCRIPTION)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
    <div class="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid w-full gap-8 lg:grid-cols-[1.1fr_minmax(360px,420px)] lg:items-center">
        <section class="space-y-6">
          <div class="space-y-3">
            <p class="text-sm font-medium uppercase tracking-[0.24em] text-primary-600 dark:text-primary-400">
              Access layer
            </p>
            <h1 class="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {{ brandName }}
            </h1>
            <p class="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {{ brandDescription }}
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <SectionCard title="Parity first" description="Preserve legacy flow before expanding the system." />
            <SectionCard title="Reusable UI" description="Base components stay generic and dashboard-ready." />
            <SectionCard title="Fullstack ready" description="Server routes, shared types, and modular domain folders." />
          </div>
        </section>

        <div class="w-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
