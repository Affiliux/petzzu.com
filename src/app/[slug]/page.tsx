// 'use client'

// import React, { use, useEffect, useState } from 'react'

// import { LoaderIcon } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useTranslations } from 'next-intl'

// import { useChild } from '@/contexts/ChildContext'

// import { useQueryParams } from '@/hooks/use-query-params'

// import { PixPayment } from '@/components/pix'
// import { SuccessModal } from '@/components/success'

// import { DefaultTheme } from './components/default'

// import { ThemeShowTypeEnum } from '@/enums'

// export default function Page({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = use(params)
//   const queryParams = useQueryParams()
//   const router = useRouter()
//   const t = useTranslations()

//   const { child, handleGetChildBySlug } = useChild()
//   console.log('child', child)

//   const [view, set_view] = useState<boolean>(false)
//   const [payment, set_payment] = useState<boolean>(false)
//   const [success, set_success] = useState<boolean>(false)
//   const [loading, set_loading] = useState<boolean>(false)

//   async function onGetBySlug(slug: string) {
//     set_loading(true)

//     try {
//       await handleGetChildBySlug(slug)
//     } catch (error: any) {
//       console.error(error)

//       if (error.message === 'Website not found') {
//         router.replace('/')
//       }
//     } finally {
//       set_loading(false)
//     }
//   }

//   useEffect(() => {
//     if (child && child.inactiveReason === 'Awaiting payment') {
//       if (child.urlPayment && child.urlPayment.includes('https')) {
//         router.replace(child.urlPayment)
//       } else if (child.urlPayment && !child.urlPayment.includes('https')) {
//         set_payment(true)
//       }
//     }
//   }, [child])

//   useEffect(() => {
//     onGetBySlug(slug)
//   }, [slug])

//   useEffect(() => {
//     if (queryParams && queryParams?.afterPayment === 'true') set_success(true)
//   }, [queryParams])

//   return (
//     <div className='relative bg-blue-300 h-full min-h-screen'>
//       {loading && (
//         <div className='h-screen w-full flex flex-col items-center justify-center text-center py-8'>
//           <LoaderIcon className='w-16 h-16 text-red-400 animate-spin' />
//         </div>
//       )}

//       {child && !loading && (
//         <>
//           {child.themeShowType === ThemeShowTypeEnum.YELLOW && <DefaultTheme child={child} />}
//         </>
//       )}

//       {child && (success || payment || (!view && child.themeShowType === ThemeShowTypeEnum.YELLOW)) && (
//         <div className='fixed top-0 h-full left-0 right-0 bottom-0 w-full overflow-hidden z-50'>
//           <div className='fixed top-0 inset-0 z-[997] grid h-full lg:h-screen w-full min-h-screen lg:place-items-center bg-black bg-opacity-95 backdrop-blur-lg transition-opacity duration-300'>
//             <div className='sticky top-10 m-4 py-8 px-4 lg:px-8 w-3/4 z-[999] lg:w-2/5 min-w-[90%] max-w-[90%] h-auto lg:max-h-[90vh] lg:min-w-[35%] lg:max-w-[35%] flex flex-col items-center justify-center rounded-lg shadow-sm'>
//               {payment ? (
//                 <>
//                   {child.qrCode64 && !child.qrCodeUrl && (
//                     <PixPayment payment={child} onCheckPayment={() => onGetBySlug(slug)} />
//                   )}
//                 </>
//               ) : success ? (
//                 <SuccessModal
//                   child={child}
//                   onClose={() => {
//                     if (child.themeShowType === ThemeShowTypeEnum.YELLOW) set_view(true)
//                     set_success(false)
//                   }}
//                 />
//               ) : !view && child.themeShowType === ThemeShowTypeEnum.YELLOW ? (
//                 <div className='animate-bounce'>
//                   <button
//                     onClick={() => set_view(true)}
//                     className='inline-flex h-14 animate-shimmer items-center justify-center rounded-md border border-red-300 bg-[linear-gradient(110deg,#5c1a1a,45%,#ff4545,55%,#7a2323)] bg-[length:200%_100%] px-8 font-bold text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50'
//                   >
//                     {t('themes.default.surprise')}
//                   </button>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import React, { use, useState } from 'react'

import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useChild } from '@/contexts/ChildContext'

import { useQueryParams } from '@/hooks/use-query-params'

import { PixPayment } from '@/components/pix'
import { SuccessModal } from '@/components/success'

import { DefaultTheme } from './components/default'

import { ThemeShowTypeEnum } from '@/enums'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const queryParams = useQueryParams()
  const router = useRouter()
  const t = useTranslations()

  const { child, handleGetChildBySlug } = useChild()

  const [view, set_view] = useState<boolean>(false)
  const [payment, set_payment] = useState<boolean>(false)
  const [success, set_success] = useState<boolean>(false)
  const [loading, set_loading] = useState<boolean>(false)

  function getFormattedAge(birthDate?: string): string {
    if (!birthDate) return ''

    const birth = new Date(birthDate)
    const today = new Date()
    const differenceInTime = today.getTime() - birth.getTime()
    const daysOld = Math.floor(differenceInTime / (1000 * 60 * 60 * 24))

    if (daysOld < 30) {
      return `${daysOld} day${daysOld !== 1 ? 's' : ''}`
    } else if (daysOld < 365) {
      const months = Math.floor(daysOld / 30)
      return `${months} month${months !== 1 ? 's' : ''}`
    } else {
      const years = Math.floor(daysOld / 365)
      return `${years} year${years !== 1 ? 's' : ''}`
    }
  }

  async function onGetBySlug(slug: string) {
    set_loading(true)

    try {
      await handleGetChildBySlug(slug)
    } catch (error: any) {
      console.error(error)

      if (error.message === 'Website not found') {
        router.replace('/')
      }
    } finally {
      set_loading(false)
    }
  }

  return (
    <div className='relative bg-blue-300 h-full min-h-screen'>
      {loading && (
        <div className='h-screen w-full flex flex-col items-center justify-center text-center py-8'>
          <LoaderIcon className='w-16 h-16 text-red-400 animate-spin' />
        </div>
      )}

      {child && !loading && (
        <>
          {child.themeShowType === ThemeShowTypeEnum.YELLOW && <DefaultTheme child={child} />}
          <div className='p-4 text-center text-xl font-bold'>Age: {getFormattedAge(child?.birth_date)}</div>
        </>
      )}
    </div>
  )
}
