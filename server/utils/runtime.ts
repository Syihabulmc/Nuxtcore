export function getRuntimeSnapshot() {
  const config = useRuntimeConfig()

  return {
    appName: config.public.appName ?? 'Nuxtcore',
    appDescription: config.public.appDescription ?? 'Fullstack enterprise Nuxt starter',
    environment: config.public.environment ?? 'development',
    nodeVersion: process.version
  }
}
