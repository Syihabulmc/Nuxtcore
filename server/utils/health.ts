import { createSuccessResponse } from './response'
import { getRuntimeSnapshot } from './runtime'

export function createHealthResponse() {
  const runtime = getRuntimeSnapshot()

  return createSuccessResponse(
    {
      service: runtime.appName,
      description: runtime.appDescription,
      environment: runtime.environment,
      nodeVersion: runtime.nodeVersion,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      status: 'ok' as const
    },
    'Service healthy'
  )
}
