import axios from 'axios'

export function setupAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 200000,
  })

  return api
}

const api = setupAPIClient()
export { api }
