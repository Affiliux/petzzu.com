'use client'

import Error from 'next/error'

export const runtime = 'edge'

export default function GlobalError() {
  return (
    <html>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  )
}
