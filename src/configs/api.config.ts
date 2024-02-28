/**
 * @file Api config
 * @module config.api
 */
const rootPath = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_API_PROXY_URL as string
export default {
  GLASSON: rootPath,
}
