/**
 * @file GlassOn API service
 * @module service.GlassOn
 */

import axios, { AxiosInstance, Method as AxiosMethod } from 'axios'
import { BAD_REQUEST } from '@/constants/error'
import { GlassOnResponseStatus } from '@/hooks/enums'
import API_CONFIG from '@/configs/api.config'

const GlassOn = axios.create({
  baseURL: API_CONFIG.GLASSON,
  withCredentials: true
})

GlassOn.interceptors.response.use(
  (response) => {
    const headerJson = response.headers['content-type'].includes('json')
    const unSuccess = response.data.status !== GlassOnResponseStatus.Success
    if (headerJson && unSuccess) {
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    const errorJSON = error.toJSON()
    const errorInfo = {
      ...errorJSON,
      config: error.config,
      code: errorJSON.status || error.response?.status || BAD_REQUEST,
      message: error.response?.data?.error || error.response?.statusText || errorJSON.message
    }
    console.debug('axios error:', error)
    return Promise.reject(errorInfo)
  }
)

type Method = Exclude<Lowercase<AxiosMethod>, 'unlink' | 'purge' | 'link'> | 'request'
const overwrite = (method: Method) => {
  return <T = any>(
    ...args: Parameters<AxiosInstance[typeof method]>
  ): Promise<GlassOnResult<T>> => {
    return (GlassOn[method] as any)(...args)
  }
}

export default {
  $: GlassOn,
  request: overwrite('request'),
  head: overwrite('head'),
  get: overwrite('get'),
  post: overwrite('post'),
  put: overwrite('put'),
  patch: overwrite('patch'),
  delete: overwrite('delete'),
  options: overwrite('options')
}
