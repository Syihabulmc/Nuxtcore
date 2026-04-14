<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: '',
    description: ''
  }
)
</script>

<template>
  <UCard class="h-full border border-slate-200/70 bg-white/90 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70">
    <template v-if="title || description" #header>
      <div class="space-y-1">
        <h3 v-if="title" class="text-base font-semibold text-slate-900 dark:text-white">
          {{ title }}
        </h3>
        <p v-if="description" class="text-sm leading-6 text-slate-600 dark:text-slate-300">
          {{ description }}
        </p>
      </div>
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
