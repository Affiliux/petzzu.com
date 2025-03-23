'use client'

import { useEffect, useState } from 'react'

/**
 *
 * @name useQueryParams
 * @category Hooks - useQueryParams
 *
 * @return {Record<string, string>} - The query parameters
 */

export function useQueryParams(): Record<string, string> {
  const [params, setParams] = useState<Record<string, string>>({})
  const [update, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      setParams(Object.fromEntries(searchParams.entries()))
    } else {
      setUpdate(prev => !prev)
    }
  }, [update])

  return params
}
