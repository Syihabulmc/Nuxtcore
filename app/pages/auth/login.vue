<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <AuthCard
    badge="Authentication"
    title="Sign in to Nuxtcore"
    description="Use the production-shaped login surface to continue into the dashboard foundation."
  >
    <AuthSignInForm />

    <template #footer>
      <div class="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <span>Parity-first authentication placeholder.</span>
        <NuxtLink to="/" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          Return to overview
        </NuxtLink>
      </div>
    </template>
  </AuthCard>
</template>
