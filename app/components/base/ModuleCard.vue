<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    to: string
    icon?: string
    badge?: string
    permissions?: readonly string[]
  }>(),
  {
    icon: 'i-lucide-square-stack',
    badge: '',
    permissions: () => []
  }
)
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block rounded-2xl border border-slate-200/70 bg-white p-4 transition hover:border-primary-300 hover:shadow-sm dark:border-slate-800/80 dark:bg-slate-950/40"
  >
    <div class="mb-4 flex items-start justify-between gap-4">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition group-hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-300">
        <UIcon :name="icon" class="h-5 w-5" />
      </div>
      <UBadge v-if="badge" color="neutral" variant="soft">
        {{ badge }}
      </UBadge>
    </div>

    <p class="font-semibold text-slate-900 dark:text-white">
      {{ title }}
    </p>
    <p class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
      {{ description }}
    </p>

    <div v-if="permissions.length" class="mt-4 flex flex-wrap gap-2">
      <UBadge
        v-for="permission in permissions"
        :key="permission"
        color="neutral"
        variant="soft"
        class="text-[11px]"
      >
        {{ permission }}
      </UBadge>
    </div>
  </NuxtLink>
</template>
