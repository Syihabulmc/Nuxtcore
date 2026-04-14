import { createError, getQuery, getRouterParam, setHeader } from 'h3'
import { createSuccessResponse } from '../../../utils/response'
import { buildEnterpriseReportSnapshot, enterpriseReportSnapshots } from '@shared/utils/reporting'

const csvCell = (value: string | number | boolean | null | undefined) => `"${String(value ?? '').replaceAll('"', '""')}"`

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event) as Record<string, string | string[] | null | undefined>
  const format = String(query.format ?? 'json').toLowerCase()
  const mode = String(query.mode ?? 'download').toLowerCase()

  if (!slug || !(slug in enterpriseReportSnapshots)) {
    throw createError({ statusCode: 404, statusMessage: 'Report not found' })
  }

  if (format !== 'csv' && format !== 'json') {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported export format' })
  }

  if (mode !== 'download' && mode !== 'queued') {
    throw createError({ statusCode: 400, statusMessage: 'Unsupported export mode' })
  }

  const snapshot = buildEnterpriseReportSnapshot(slug as keyof typeof enterpriseReportSnapshots, { query, mode: mode as 'download' | 'queued' })

  if (mode === 'queued') {
    setHeader(event, 'content-type', 'application/json; charset=utf-8')
    return createSuccessResponse({
      slug: snapshot.slug,
      mode,
      status: 'queued',
      requestedAt: snapshot.generatedAt,
      downloadHref: `/api/reports/${slug}/export?format=${format}`,
      exportRun: snapshot.exportHistory[1],
      message: 'Export queued for processing'
    }, 'Export queued for processing')
  }

  if (format === 'csv') {
    setHeader(event, 'content-type', 'text/csv; charset=utf-8')
    setHeader(event, 'content-disposition', `attachment; filename="${slug}.csv"`)

    const rows = [
      ['section', 'metric', 'value', 'hint'].join(','),
      ...snapshot.metrics.map(metric => [snapshot.title, metric.label, metric.value, metric.hint].map(csvCell).join(',')),
      '',
      ['section', 'field', 'value', 'hint'].join(','),
      ...snapshot.sections.flatMap(section => (section.fields ?? []).map(field => [section.title, field.label, field.value ?? '', field.hint ?? ''].map(csvCell).join(',')))
    ].join('\n')

    return rows
  }

  setHeader(event, 'content-type', 'application/json; charset=utf-8')
  setHeader(event, 'content-disposition', `attachment; filename="${slug}.json"`)

  return createSuccessResponse(snapshot, 'Report export ready')
})