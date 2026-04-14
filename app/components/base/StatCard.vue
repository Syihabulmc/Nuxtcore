<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string | number
    hint?: string
    icon?: string
    tone?: 'default' | 'success' | 'warning' | 'danger'
  }>(),
  {
    hint: '',
    icon: '',
    tone: 'default'
  }
)

const toneClasses = {
  default: 'text-slate-600 dark:text-slate-300',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-rose-600 dark:text-rose-400'
} as const
</script>

<template>
  <UCard class="h-full border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-2">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ label }}
        </p>
        <div class="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ value }}
        </div>
      </div>

      <div v-if="icon" class="rounded-xl bg-slate-100 p-3 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <UIcon :name="icon" class="h-5 w-5" />
      </div>
    </div>

    <p v-if="hint" class="mt-4 text-sm" :class="toneClasses[tone]">
      {{ hint }}
    </p>
  </UCard>
</template>
