<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const highlights = [
  {
    title: 'Legacy parity',
    description: 'The scaffold is organized to preserve existing business flow before redesign.'
  },
  {
    title: 'Reusable UI first',
    description: 'Base components are generic and can be composed across dashboard views.'
  },
  {
    title: 'Fullstack ready',
    description: 'Server utils, API routes, shared types, and module folders are already in place.'
  }
]
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      badge="Nuxt 4.4.2 + Nuxt UI 4.6.1"
      title="Nuxtcore scaffold is live"
      description="A clean foundation for a fullstack enterprise starter with dashboard conventions and modular folders."
    />

    <div class="grid gap-4 md:grid-cols-3">
      <SectionCard
        v-for="item in highlights"
        :key="item.title"
        :title="item.title"
        :description="item.description"
      />
    </div>

    <SectionCard
      title="Get started"
      description="Use the dashboard layout to start replacing legacy pages with reusable pieces."
    >
      <div class="flex flex-wrap items-center gap-3">
        <UButton to="/dashboard" icon="i-lucide-arrow-right" trailing>Open dashboard</UButton>
        <UButton to="/api/health" variant="soft" color="neutral">Health check</UButton>
      </div>

      <template #footer>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Scaffold created at {{ formatDateTime(new Date()) }}.
        </p>
      </template>
    </SectionCard>
  </div>
</template>
