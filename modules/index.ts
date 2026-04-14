import { defineNuxtModule } from '@nuxt/kit'
import { enterpriseModules, enterpriseSidebarNavigation } from '@shared/constants/modules'

export { enterpriseModules, enterpriseSidebarNavigation }

export default defineNuxtModule({
  meta: {
    name: 'nuxtcore-modules'
  },
  setup() {}
})
