'use client'

import { useEffect } from 'react'

export const UtmifyRedirect = ({ redirectUrl }: { redirectUrl: string }) => {
  useEffect(() => {
    if (!redirectUrl) return

    const setBackRedirect = (url: string) => {
      let urlBackRedirect = url
      urlBackRedirect += (urlBackRedirect.includes('?') ? '&' : '?') + document.location.search.replace('?', '')

      history.pushState({}, '', location.href)
      history.pushState({}, '', location.href)
      history.pushState({}, '', location.href)

      const handlePopState = () => {
        console.log('onpopstate', urlBackRedirect)
        setTimeout(() => {
          window.location.href = urlBackRedirect
        }, 1)
      }

      window.addEventListener('popstate', handlePopState)

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }

    setBackRedirect(redirectUrl)
  }, [redirectUrl])

  return null
}
