<script setup lang="ts">
import { APP_DESCRIPTION, APP_NAME } from '@shared/constants/app'
import { computed } from 'vue'

const config = useAppConfig() as {
  brand?: {
    name?: string
    description?: string
  }
}

const { user, sessionStatusLabel, signOut, hasPermission } = useAuthState()

const title = computed(() => config.brand?.name ?? APP_NAME)
const subtitle = computed(() => config.brand?.description ?? APP_DESCRIPTION)
const initials = computed(() => user.value?.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() ?? 'NC')
const canManageUsers = computed(() => hasPermission('users:write'))

const handleSignOut = async () => {
  await signOut()
  await navigateTo('/auth/login')
}

const dropdownItems = computed(() => [
  { label: user.value?.name ?? 'Guest', type: 'label' as const },
  { label: sessionStatusLabel.value, type: 'label' as const },
  { label: 'Sign out', icon: 'i-lucide-log-out', onSelect: handleSignOut }
])
</script>

<template>
  <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
    <div class="min-w-0">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-400">
        {{ title }}
      </p>
      <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span class="truncate">{{ subtitle }}</span>
        <span class="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:inline-flex" />
        <span>{{ sessionStatusLabel }}</span>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <slot name="actions" />
      <UButton v-if="canManageUsers" to="/dashboard/users" variant="soft" color="neutral" icon="i-lucide-users" class="hidden sm:inline-flex">Users</UButton>
      <UButton icon="i-lucide-bell" variant="ghost" color="neutral" aria-label="Notifications" />
      <UDropdownMenu :items="dropdownItems">
        <UButton variant="ghost" color="neutral" class="gap-2">
          <UAvatar size="sm" :alt="user?.name ?? title" :text="initials" />
          <span class="hidden sm:inline-flex">{{ user?.role ?? 'Guest' }}</span>
        </UButton>
      </UDropdownMenu>
    </div>
  </div>
</template>
