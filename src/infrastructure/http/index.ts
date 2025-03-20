import axios, { AxiosError } from 'axios'

import { delete_cookie, get_cookie, set_cookie } from '../cache/cookies'

import { NEXT_REFRESH_TOKEN, NEXT_USER_TOKEN } from '@/constants'

let isRefreshing = false
let failedRequestsQueue = [] as any

export function setupAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
  })

  api.interceptors.request.use(async config => {
    const token = await get_cookie(NEXT_USER_TOKEN)

    if (!config.headers.Authorization && token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    async (error: AxiosError | any) => {
      if (error.response.status === 401) {
        const token = await get_cookie(NEXT_REFRESH_TOKEN)
        const originalConfig = error.config

        if (!isRefreshing && token) {
          isRefreshing = true

          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}auth/refresh`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
              const { access_token, refresh_token } = response.data

              set_cookie(NEXT_USER_TOKEN, access_token)
              set_cookie(NEXT_REFRESH_TOKEN, refresh_token)

              originalConfig.headers.Authorization = `Bearer ${access_token}`

              failedRequestsQueue.forEach((request: any) => request.onSuccess(access_token))
              failedRequestsQueue = []
            })
            .catch(err => {
              failedRequestsQueue.forEach((request: any) => request.onFailure(err))
              failedRequestsQueue = []

              delete_cookie(NEXT_USER_TOKEN)
              delete_cookie(NEXT_REFRESH_TOKEN)

              window.location.href = 'auth'
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      }

      return Promise.reject(error)
    },
  )

  return api
}

const api = setupAPIClient()
export { api }
