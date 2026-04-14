<script setup lang="ts">
import type { AuthCredentials } from '@/composables/useAuthState'

const route = useRoute()
const { isAuthenticated, signIn, sessionStatusLabel } = useAuthState()

const state = reactive<AuthCredentials>({
  email: 'admin@nuxtcore.dev',
  password: 'nuxtcore',
  remember: true
})

const pending = ref(false)
const errorMessage = ref('')

const redirectTarget = computed(() => {
  const target = route.query.redirect
  return typeof target === 'string' && target.startsWith('/') ? target : '/dashboard'
})

const submit = async () => {
  errorMessage.value = ''

  if (!state.email.trim() || !state.password.trim()) {
    errorMessage.value = 'Email and password are required.'
    return
  }

  pending.value = true

  try {
    await signIn(state)
    await navigateTo(redirectTarget.value)
  }
  catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to sign in.'
  }
  finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <UAlert
      v-if="isAuthenticated"
      color="primary"
      variant="soft"
      icon="i-lucide-circle-check-big"
      title="Session already active"
      :description="`Continue as the current user and resume at ${redirectTarget}`"
    />

    <UAlert
      color="neutral"
      variant="soft"
      icon="i-lucide-shield-check"
      :title="sessionStatusLabel"
      description="This starter uses a local session placeholder so the frontend flow stays coherent until a backend auth service is connected."
    />

    <UAlert
      v-if="errorMessage"
      color="error"
      variant="soft"
      icon="i-lucide-alert-triangle"
      :title="errorMessage"
    />

    <UForm :state="state" class="space-y-4" @submit="submit">
      <UFormField label="Work email" name="email" required>
        <UInput
          v-model="state.email"
          type="email"
          autocomplete="email"
          placeholder="admin@company.com"
        />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput
          v-model="state.password"
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
        />
      </UFormField>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <UCheckbox v-model="state.remember" label="Keep me signed in" />
        <UButton to="/" variant="ghost" color="neutral" size="sm">
          Back to overview
        </UButton>
      </div>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UButton type="submit" :loading="pending" icon="i-lucide-log-in">
          Sign in
        </UButton>
        <UButton variant="soft" color="neutral" icon="i-lucide-shield-check" disabled>
          SSO placeholder
        </UButton>
      </div>
    </UForm>
  </div>
</template>
