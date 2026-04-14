export interface EnterpriseModuleDefinition {
  name: string
  description: string
  routeBase: string
  permissions: readonly string[]
  label?: string
  icon?: string
}
