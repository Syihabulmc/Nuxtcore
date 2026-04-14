import { enterpriseDirectory, getEnterpriseAuditTrailItemById, getEnterpriseRoleBySlug, getEnterpriseSettingBySlug, getEnterpriseUserByEmail, getEnterpriseUserById } from '@shared/constants/directory'

export function useEnterpriseDirectory() {
  const users = enterpriseDirectory.users
  const roles = enterpriseDirectory.roles
  const settings = enterpriseDirectory.settings
  const auditTrail = enterpriseDirectory.auditTrail

  const userById = (id: string) => getEnterpriseUserById(id)
  const userByEmail = (email: string) => getEnterpriseUserByEmail(email)
  const roleBySlug = (slug: string) => getEnterpriseRoleBySlug(slug)
  const settingBySlug = (slug: string) => getEnterpriseSettingBySlug(slug)
  const auditTrailItemById = (id: string) => getEnterpriseAuditTrailItemById(id)

  return {
    users,
    roles,
    settings,
    auditTrail,
    userById,
    userByEmail,
    roleBySlug,
    settingBySlug,
    auditTrailItemById
  }
}
