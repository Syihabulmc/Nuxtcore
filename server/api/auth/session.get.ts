import { createAuthSnapshot } from '../../utils/auth'

export default defineEventHandler((event) => {
  return createAuthSnapshot(event)
})
