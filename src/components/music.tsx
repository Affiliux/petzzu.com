'use client'

import { useEffect } from 'react'

import { PlayerState, useYoutube } from 'react-youtube-music-player'
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolume2,
  IconVolumeOff,
} from '@tabler/icons-react'

export function Music({ url }: { url: string }) {
  const { playerDetails, actions } = useYoutube({
    id: getYoutubeVideoId(url) ?? '',
    type: 'video',
  })

  const renderVolumeIcon = () => {
    if (playerDetails.volume === 0) {
      return <IconVolumeOff size={20} color='#ffffff' />
    }
    if (playerDetails.volume <= 30) {
      return <IconVolume2 size={20} color='#ffffff' />
    }
    if (playerDetails.volume <= 60) {
      return <IconVolume size={20} color='#ffffff' />
    }
    return <IconVolume size={20} color='#ffffff' />
  }

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

    return () => {
      window.removeEventListener('click', handleUserInteraction)
    }
  }, [playerDetails.id])

  return !!url.length ? (
    <div className='p-4 lg:p-6 -mt-2 bg-black rounded-b-lg w-full'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div className='flex flex-row items-center justify-center gap-4 lg:gap-8'>
          {playerDetails.state === PlayerState.PLAYING ? (
            <button className='bg-red-600 rounded-lg p-2' onClick={actions.pauseVideo}>
              <IconPlayerPauseFilled color='#ffffff' />
            </button>
          ) : (
            <button id='play-button' className='bg-red-600 rounded-lg p-2' onClick={actions.playVideo}>
              <IconPlayerPlayFilled color='#ffffff' />
            </button>
          )}
          <div className='volume-control lg:flex flex-row items-center gap-4 hidden'>
            {renderVolumeIcon()}
            <input
              type='range'
              className='accent-white bg-gray-900 rounded-full'
              value={playerDetails.volume}
              min={0}
              max={100}
              onChange={event => actions.setVolume(event.target.valueAsNumber)}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
