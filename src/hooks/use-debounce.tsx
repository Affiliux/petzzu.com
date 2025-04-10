'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 *
 * @name useDebounce
 * @category Hooks - useDebounce
 *
 * @param {any} value - The value to be debounced
 * @param {number} delay - The delay in milliseconds
 * @return {any} - The debounced value
 */

const useDebounce = (value: any, delay: number): any => {
  const [debounced, setDebounced] = useState(value)

  const handleDebounce = useCallback(() => {
    const handleTimeout = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => {
      clearTimeout(handleTimeout)
    }
  }, [value, delay])

  useEffect(handleDebounce, [value, delay])

  return debounced
}

export default useDebounce
