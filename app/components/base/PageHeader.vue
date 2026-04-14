<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    badge?: string
  }>(),
  {
    description: '',
    badge: ''
  }
)
</script>

<template>
  <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div class="space-y-2">
      <p v-if="badge" class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
        {{ badge }}
      </p>
      <div class="space-y-1">
        <h1 class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ title }}
        </h1>
        <p v-if="description" class="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          {{ description }}
        </p>
      </div>
    </div>

    <div v-if="$slots.actions" class="flex flex-wrap items-center gap-3">
      <slot name="actions" />
    </div>
  </header>
</template>
