<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    to?: string
    icon?: string
    actionsLabel?: string
  }>(),
  {
    description: '',
    to: '',
    icon: 'i-lucide-inbox',
    actionsLabel: ''
  }
)
</script>

<template>
  <UCard class="border border-dashed border-slate-300 bg-transparent shadow-none dark:border-slate-700">
    <div class="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <div class="rounded-2xl bg-slate-100 p-4 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        <UIcon :name="icon" class="h-6 w-6" />
      </div>

      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          {{ title }}
        </h3>
        <p v-if="description" class="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions || to" class="flex flex-wrap items-center justify-center gap-3">
        <slot name="actions">
          <UButton v-if="to" :to="to" variant="soft" color="neutral">
            {{ actionsLabel || 'Continue' }}
          </UButton>
        </slot>
      </div>
    </div>
  </UCard>
</template>
