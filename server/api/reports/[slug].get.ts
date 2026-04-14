import { createError, getQuery, getRouterParam } from 'h3'
import { createSuccessResponse } from '../../utils/response'
import { buildEnterpriseReportSnapshot, enterpriseReportSnapshots } from '@shared/utils/reporting'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event) as Record<string, string | string[] | null | undefined>

  if (!slug || !(slug in enterpriseReportSnapshots)) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  const snapshot = buildEnterpriseReportSnapshot(slug as keyof typeof enterpriseReportSnapshots, { query })

  return createSuccessResponse(snapshot, 'Report snapshot ready')
})
