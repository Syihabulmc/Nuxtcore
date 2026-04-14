export default defineAppConfig({
  brand: {
    name: 'Nuxtcore',
    description: 'Fullstack enterprise Nuxt starter with parity-first structure',
    tagline: 'Reusable, modular, dashboard-oriented'
  },
  navigation: {
    sidebar: [
      { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-layout-dashboard' },
      { label: 'Users', to: '/dashboard/users', icon: 'i-lucide-users' },
      { label: 'Settings', to: '/dashboard/settings', icon: 'i-lucide-settings' }
    ]
  }
})
