<script setup lang="ts">
const highlights = [
  {
    title: 'Parity first',
    description: 'The scaffold preserves legacy flow before redesigning anything substantial.'
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
    >
      <template #actions>
        <UButton to="/auth/login" icon="i-lucide-log-in">Open auth</UButton>
        <UButton to="/dashboard" variant="soft" color="neutral" icon="i-lucide-layout-dashboard">Open dashboard</UButton>
      </template>
    </PageHeader>

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
    </SectionCard>
  </div>
</template>
