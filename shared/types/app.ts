export interface BrandInfo {
  name: string
  description: string
  tagline?: string
}

export interface NavigationItem {
  label: string
  to: string
  icon?: string
  description?: string
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}
