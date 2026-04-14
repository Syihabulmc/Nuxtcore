<script setup lang="ts">
withDefaults(
  defineProps<{
    badge?: string
    title: string
    description?: string
  }>(),
  {
    badge: '',
    description: ''
  }
)
</script>

<template>
  <UCard class="border border-slate-200/70 shadow-2xl shadow-slate-900/5 dark:border-slate-800/80">
    <template #header>
      <div class="space-y-2">
        <p v-if="badge" class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
          {{ badge }}
        </p>
        <div class="space-y-1">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">
            {{ title }}
          </h2>
          <p v-if="description" class="text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ description }}
          </p>
        </div>
      </div>
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
