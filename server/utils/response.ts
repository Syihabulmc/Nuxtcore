import type { ApiEnvelope } from '@shared/types/api'

export function createSuccessResponse<T>(data: T, message = 'OK'): ApiEnvelope<T> {
  return {
    success: true,
    message,
    data
  }
}

export function createErrorResponse(message: string, code = 'SERVER_ERROR'): ApiEnvelope<null> {
  return {
    success: false,
    message,
    error: {
      code,
      message
    },
    data: null
  }
}
