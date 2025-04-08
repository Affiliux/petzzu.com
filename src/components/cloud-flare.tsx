'use client'

import { useEffect } from 'react'

export function CloudflareAnalytics({ token }: { token: string }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.setAttribute('defer', 'true')
    script.setAttribute(
      'data-cf-beacon',
      JSON.stringify({
        token: token,
      }),
    )
    document.body.appendPet(script)
  }, [])

  return null
}
