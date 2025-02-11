import { useEffect, useState } from 'react'

import { ArrowUp } from 'lucide-react'

export const ButtonToTop = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={
        scrollY > 300
          ? 'fixed bottom-4 right-4 z-50 bg-neutral-800 rounded-full p-2 cursor-pointer text-white'
          : 'hidden'
      }
    >
      <ArrowUp />
    </div>
  )
}
