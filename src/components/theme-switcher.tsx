'use client'

import { ChevronDown } from 'lucide-react'

import { useApplication } from '@/contexts/ApplicationContext'

import { ThemeShowTypeEnum } from '@/enums'

export function ThemeSwitcher() {
  const { theme, set_theme } = useApplication()

  return (
    <div className='flex flex-row items-center gap-1 md:gap-4'>
      <div className='relative group'>
        <button
          type='button'
          className='relative h-11 overflow-hidden flex items-center justify-center rounded-full p-[1px] focus:outline-none focus:ring-0'
        >
          <span className='flex h-full cursor-pointer items-center justify-center gap-2 px-3 py-1 text-sm font-medium text-black backdrop-blur-3xl'>
            {theme === ThemeShowTypeEnum.BLUE && <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />}
            {theme === ThemeShowTypeEnum.PINK && <span className='w-6 h-6 rounded-md bg-[#F997CD]' />}
            {theme === ThemeShowTypeEnum.YELLOW && <span className='w-6 h-6 rounded-md bg-[#FFF2B3]' />}

            <ChevronDown size={12} />
          </span>
        </button>

        <div className='origin-top-left lg:origin-top-right min-w-12 z-[99999] border border-neutral-200 absolute right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 rounded-lg shadow-lg bg-white ring-1 ring-white ring-opacity-5'>
          <div className='py-1 grid grid-cols-1 gap-2' role='none'>
            <button
              onClick={() => set_theme(ThemeShowTypeEnum.BLUE)}
              className={`px-4 py-1 text-start items-center inline-flex hover:bg-neutral-200`}
            >
              <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />
            </button>
            <button
              onClick={() => set_theme(ThemeShowTypeEnum.PINK)}
              className={`px-4 py-1 text-start items-center inline-flex hover:bg-neutral-200`}
            >
              <span className='w-6 h-6  rounded-md bg-[#F997CD]' />
            </button>
            <button
              onClick={() => set_theme(ThemeShowTypeEnum.YELLOW)}
              className={`px-4 py-1 text-start items-center inline-flex hover:bg-neutral-200`}
            >
              <span className='w-6 h-6  rounded-md bg-[#FFF2B3]' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
