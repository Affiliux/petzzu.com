'use client'

import Error from 'next/error'

export const runtime = 'edge'

export default function NotFound() {
  return (
    <html>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
