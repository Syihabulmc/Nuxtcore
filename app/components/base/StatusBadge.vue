<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    status: string
    color?: 'neutral' | 'primary' | 'success' | 'warning' | 'error'
  }>(),
  {
    color: undefined
  }
)

const normalized = computed(() => props.status.toLowerCase())

const color = computed(() => {
  if (props.color) {
    return props.color
  }

  if (normalized.value.includes('active') || normalized.value.includes('enabled') || normalized.value.includes('available')) {
    return 'success'
  }

  if (normalized.value.includes('pending') || normalized.value.includes('review') || normalized.value.includes('planned')) {
    return 'warning'
  }

  if (normalized.value.includes('locked') || normalized.value.includes('disabled') || normalized.value.includes('expired')) {
    return 'error'
  }

  return 'neutral'
})
</script>

<template>
  <UBadge :color="color" variant="soft">
    {{ status }}
  </UBadge>
</template>
