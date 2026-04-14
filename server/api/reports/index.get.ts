import { createSuccessResponse } from '../../utils/response'
import { enterpriseReportOverview } from '@shared/utils/reporting'

export default defineEventHandler(() => {
  return createSuccessResponse(enterpriseReportOverview(), 'Report catalog ready')
})
