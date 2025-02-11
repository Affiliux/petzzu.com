'use client'

import React, { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ListIcon } from 'lucide-react'
import { Dancing_Script } from 'next/font/google'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { PlayerState, useYoutube } from 'react-youtube-music-player'
import { IconChecks, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react'

import { CoupleResponseProps } from '@/typings/couple'
import { MediaPreProps } from '@/typings/create'

const dancing = Dancing_Script({
  weight: '700',
  subsets: ['latin'],
})

interface NetflixThemeProps {
  couple: CoupleResponseProps
}

export const NetflixTheme = ({ couple }: NetflixThemeProps) => {
  const t = useTranslations()

  const { playerDetails, actions } = useYoutube({
    id: getYoutubeVideoId(couple.yt_song) ?? '',
    type: 'video',
  })

  const [selected_image, set_selected_image] = useState<MediaPreProps>({} as MediaPreProps)

  const handleUserInteraction = () => {
    window.removeEventListener('click', handleUserInteraction)
  }

  function getYoutubeVideoId(url: string) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  useEffect(() => {
    if (!playerDetails.id) return

    window.addEventListener('click', handleUserInteraction)
    actions.setVolume(50)
    actions.pauseVideo()

    return () => {
      window.removeEventListener('click', handleUserInteraction)
    }
  }, [playerDetails.id])

  useEffect(() => {
    if (couple.media && couple.media.length > 0) set_selected_image(couple.media[0])
    else set_selected_image({} as MediaPreProps)
  }, [couple])

  return (
    <div className='h-full min-h-screen w-full bg-transparent overflow-hidden bg-[#141414]'>
      <div className='flex items-center justify-between px-6 pt-4 pb-3 bg-[#141414] w-full'>
        <div className='flex items-center justify-center w-full space-x-4'>
          <Image src='/images/netflix-logo.png' alt='Netflix Logo' width={160} height={40} unoptimized />
        </div>
      </div>

      <section className='relative h-full'>
        <div className='absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent z-20 h-[85vh] lg:h-[80vh]' />
        <div
          className='absolute inset-0 bg-cover bg-center h-[85vh] lg:h-[80vh] z-10'
          style={
            !!selected_image.url
              ? { backgroundImage: `url(${selected_image.url})`, backgroundPosition: 'center top' }
              : undefined
          }
        />

        <div className='relative z-50 p-6 md:p-12 pt-[35vh] lg:pt-[35vh]'>
          <h1 className={`${dancing.className} text-5xl font-bold mb-2`}>{couple?.coupleName}</h1>

          {couple?.coupleName && couple?.message && (
            <>
              {couple.startDate && (
                <div className='flex flex-row items-center gap-4'>
                  <p className='text-lg text-center text-green-500 font-medium'>
                    {t('themes.netflix.since')} {format(new Date(couple.startDate), 'dd/MM/yyy', { locale: ptBR })}
                  </p>

                  <div className='flex flex-row items-center gap-2'>
                    <div className='w-5 h-5'>
                      <svg
                        id='maturity-rating-497'
                        viewBox='0 0 100 100'
                        className='svg-icon svg-icon-maturity-rating-497 '
                      >
                        <path
                          id='Fill-24'
                          fill='#009C4C'
                          d='M92.381 0H7.622A7.622 7.622 0 000 7.62v84.758A7.623 7.623 0 007.622 100h84.76A7.619 7.619 0 00100 92.378V7.62A7.618 7.618 0 0092.381 0'
                        ></path>
                        <path id='Fill-25' fill='#FFFEFD' d='M35 71.857V29h11.75v34.576h18.862v8.281H35'></path>
                      </svg>
                    </div>

                    <div className='border border-neutral-500 rounded-sm bg-[#141414] px-1 text-white text-xs'>HD</div>
                  </div>
                </div>
              )}

              <div className='flex flex-row items-center gap-2 my-6'>
                <div className='w-6 h-6'>
                  <svg viewBox='0 0 28 30' className='svg-icon svg-icon-top-10-badge'>
                    <rect x='0' width='28' height='30' rx='3' fill='#e50914'></rect>
                    <path
                      d='M16.8211527,22.1690594 C17.4133103,22.1690594 17.8777709,21.8857503 18.2145345,21.3197261 C18.5512982,20.7531079 18.719977,19.9572291 18.719977,18.9309018 C18.719977,17.9045745 18.5512982,17.1081018 18.2145345,16.5414836 C17.8777709,15.9754594 17.4133103,15.6921503 16.8211527,15.6921503 C16.2289952,15.6921503 15.7645345,15.9754594 15.427177,16.5414836 C15.0904133,17.1081018 14.9223285,17.9045745 14.9223285,18.9309018 C14.9223285,19.9572291 15.0904133,20.7531079 15.427177,21.3197261 C15.7645345,21.8857503 16.2289952,22.1690594 16.8211527,22.1690594 M16.8211527,24.0708533 C15.9872618,24.0708533 15.2579042,23.8605988 14.6324861,23.4406836 C14.0076618,23.0207685 13.5247891,22.4262352 13.1856497,21.6564897 C12.8465103,20.8867442 12.6766436,19.9786109 12.6766436,18.9309018 C12.6766436,17.8921018 12.8465103,16.9857503 13.1856497,16.2118473 C13.5247891,15.4379442 14.0076618,14.8410352 14.6324861,14.4205261 C15.2579042,14.0006109 15.9872618,13.7903564 16.8211527,13.7903564 C17.6544497,13.7903564 18.3844012,14.0006109 19.0098194,14.4205261 C19.6352376,14.8410352 20.1169224,15.4379442 20.4566558,16.2118473 C20.7952012,16.9857503 20.9656618,17.8921018 20.9656618,18.9309018 C20.9656618,19.9786109 20.7952012,20.8867442 20.4566558,21.6564897 C20.1169224,22.4262352 19.6352376,23.0207685 19.0098194,23.4406836 C18.3844012,23.8605988 17.6544497,24.0708533 16.8211527,24.0708533'
                      fill='#FFFFFF'
                    ></path>
                    <polygon
                      fill='#FFFFFF'
                      points='8.86676 23.9094206 8.86676 16.6651418 6.88122061 17.1783055 6.88122061 14.9266812 11.0750267 13.8558085 11.0750267 23.9094206'
                    ></polygon>
                    <path
                      d='M20.0388194,9.42258545 L20.8085648,9.42258545 C21.1886861,9.42258545 21.4642739,9.34834303 21.6353285,9.19926424 C21.806383,9.05077939 21.8919103,8.83993091 21.8919103,8.56731273 C21.8919103,8.30122788 21.806383,8.09572485 21.6353285,7.94961576 C21.4642739,7.80410061 21.1886861,7.73104606 20.8085648,7.73104606 L20.0388194,7.73104606 L20.0388194,9.42258545 Z M18.2332436,12.8341733 L18.2332436,6.22006424 L21.0936558,6.22006424 C21.6323588,6.22006424 22.0974133,6.31806424 22.4906012,6.51465818 C22.8831952,6.71125212 23.1872921,6.98684 23.4028921,7.34142182 C23.6178982,7.69659758 23.7259952,8.10522788 23.7259952,8.56731273 C23.7259952,9.04246424 23.6178982,9.45762788 23.4028921,9.8122097 C23.1872921,10.1667915 22.8831952,10.4429733 22.4906012,10.6389733 C22.0974133,10.8355673 21.6323588,10.9335673 21.0936558,10.9335673 L20.0388194,10.9335673 L20.0388194,12.8341733 L18.2332436,12.8341733 Z'
                      fill='#FFFFFF'
                    ></path>
                    <path
                      d='M14.0706788,11.3992752 C14.3937818,11.3992752 14.6770909,11.322063 14.9212,11.1664509 C15.1653091,11.0114327 15.3553697,10.792863 15.4913818,10.5107418 C15.6279879,10.2286206 15.695697,9.90136 15.695697,9.52717818 C15.695697,9.1535903 15.6279879,8.82573576 15.4913818,8.54361455 C15.3553697,8.26149333 15.1653091,8.04351758 14.9212,7.88790545 C14.6770909,7.73288727 14.3937818,7.65508121 14.0706788,7.65508121 C13.7475758,7.65508121 13.4642667,7.73288727 13.2201576,7.88790545 C12.9760485,8.04351758 12.7859879,8.26149333 12.6499758,8.54361455 C12.5139636,8.82573576 12.4456606,9.1535903 12.4456606,9.52717818 C12.4456606,9.90136 12.5139636,10.2286206 12.6499758,10.5107418 C12.7859879,10.792863 12.9760485,11.0114327 13.2201576,11.1664509 C13.4642667,11.322063 13.7475758,11.3992752 14.0706788,11.3992752 M14.0706788,12.9957842 C13.5634545,12.9957842 13.0995879,12.9090691 12.6784848,12.7344509 C12.2573818,12.5604267 11.8915152,12.3163176 11.5808848,12.0027176 C11.2708485,11.6891176 11.0314909,11.322063 10.8634061,10.9003661 C10.6953212,10.479263 10.6115758,10.0213358 10.6115758,9.52717818 C10.6115758,9.03302061 10.6953212,8.57568727 10.8634061,8.1539903 C11.0314909,7.73288727 11.2708485,7.36523879 11.5808848,7.05163879 C11.8915152,6.73803879 12.2573818,6.49452364 12.6784848,6.31990545 C13.0995879,6.14588121 13.5634545,6.05857212 14.0706788,6.05857212 C14.577903,6.05857212 15.0417697,6.14588121 15.4628727,6.31990545 C15.8839758,6.49452364 16.2498424,6.73803879 16.5604727,7.05163879 C16.871103,7.36523879 17.1098667,7.73288727 17.2779515,8.1539903 C17.4460364,8.57568727 17.5297818,9.03302061 17.5297818,9.52717818 C17.5297818,10.0213358 17.4460364,10.479263 17.2779515,10.9003661 C17.1098667,11.322063 16.871103,11.6891176 16.5604727,12.0027176 C16.2498424,12.3163176 15.8839758,12.5604267 15.4628727,12.7344509 C15.0417697,12.9090691 14.577903,12.9957842 14.0706788,12.9957842'
                      fill='#FFFFFF'
                    ></path>
                    <polygon
                      fill='#FFFFFF'
                      points='8.4639503 12.8342327 6.65837455 13.2666206 6.65837455 7.77862061 4.65323515 7.77862061 4.65323515 6.22012364 10.4690897 6.22012364 10.4690897 7.77862061 8.4639503 7.77862061'
                    ></polygon>
                  </svg>
                </div>

                <p className='font-bold text-xl'>{t('themes.netflix.top-10')}</p>
              </div>

              <p
                className='text-gray-300 max-w-xl mb-6'
                dangerouslySetInnerHTML={
                  couple?.message
                    ? {
                        __html: couple.message,
                      }
                    : undefined
                }
              />

              <div className='flex space-x-4'>
                {playerDetails.state === PlayerState.PLAYING ? (
                  <button
                    onClick={actions.pauseVideo}
                    className='bg-white text-black px-6 py-2 rounded font-semibold flex items-center gap-2'
                  >
                    <IconPlayerPauseFilled size={20} /> {t('themes.netflix.pause')}
                  </button>
                ) : (
                  <button
                    onClick={actions.playVideo}
                    className='bg-white text-black px-6 py-2 rounded font-semibold flex items-center gap-2'
                  >
                    <IconPlayerPlayFilled size={20} /> {t('themes.netflix.play')}
                  </button>
                )}
                <button className='bg-gray-700 bg-opacity-50 px-6 py-2 rounded font-semibold flex items-center gap-2'>
                  <IconChecks size={20} /> {t('themes.netflix.favorite')}
                </button>
              </div>

              {!!couple.media.length && (
                <div className='relative py-12 md:py-24'>
                  <div className='flex items-center gap-2'>
                    <ListIcon size={24} />
                    <h2 className='text-2xl font-bold text-white'>{t('themes.netflix.ep-title')}</h2>
                  </div>

                  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
                    {couple.media.map((media, index) => (
                      <div
                        key={index}
                        className='relative w-[160px] lg:w-[200px] h-[160px] lg:h-[200px] cursor-pointer'
                        onClick={() => set_selected_image(media)}
                      >
                        <div className='absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent'></div>
                        <div className='border border-neutral-500 rounded-sm bg-[#141414] px-1 text-white text-xs absolute bottom-3 right-2'>
                          HD
                        </div>

                        <Image
                          alt={media.id}
                          src={media.url}
                          width={200}
                          height={200}
                          className='object-cover object-top w-[160px] lg:w-[200px] h-[160px] lg:h-[200px]'
                          priority
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
