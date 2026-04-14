export interface ApiError {
  code: string
  message: string
  details?: unknown
}

export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  error?: ApiError
}

export interface HealthPayload {
  service: string
  description: string
  environment: string
  nodeVersion: string
  uptimeSeconds: number
  timestamp: string
  status: 'ok' | 'degraded'
}
