import { APP_DESCRIPTION, APP_NAME } from '@shared/constants/app'
import { enterpriseSidebarNavigation } from '@shared/constants/modules'

export default defineAppConfig({
  brand: {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    tagline: 'Reusable, modular, dashboard-oriented'
  },
  navigation: {
    sidebar: enterpriseSidebarNavigation
  }
})
