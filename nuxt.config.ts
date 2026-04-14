import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-04-14',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      appName: 'Nuxtcore',
      appDescription: 'Parity-first fullstack enterprise starter',
      environment: process.env.NODE_ENV ?? 'development'
    }
  },
  alias: {
    '@shared': resolve('./shared'),
    '@modules': resolve('./modules')
  },
  imports: {
    dirs: ['shared/utils']
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxtcore fullstack enterprise starter' }
      ]
    }
  }
})
