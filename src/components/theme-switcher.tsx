'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { useApplication } from '@/contexts/ApplicationContext'

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

import { ThemeShowTypeEnum } from '@/enums'

export function ThemeSwitcher() {
  // hooks
  const t = useTranslations()

  // contexts
  const { theme, set_theme } = useApplication()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          {theme === ThemeShowTypeEnum.BLUE && <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />}
          {theme === ThemeShowTypeEnum.PINK && <span className='w-6 h-6 rounded-md bg-[#F997CD]' />}
          {theme === ThemeShowTypeEnum.YELLOW && <span className='w-6 h-6 rounded-md bg-[#FFF2B3]' />}
          {theme === ThemeShowTypeEnum.GREEN && <span className='w-6 h-6 rounded-md bg-[#95BA7C]' />}
          <span className='sr-only'>{t('config.header.themes.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => set_theme(ThemeShowTypeEnum.BLUE)}>
          <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />
          <span>{t('config.header.themes.blue')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => set_theme(ThemeShowTypeEnum.PINK)}>
          <span className='w-6 h-6 rounded-md bg-[#F997CD]' />
          <span>{t('config.header.themes.pink')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => set_theme(ThemeShowTypeEnum.YELLOW)}>
          <span className='w-6 h-6 rounded-md bg-[#FFF2B3]' />
          <span>{t('config.header.themes.yellow')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => set_theme(ThemeShowTypeEnum.GREEN)}>
          <span className='w-6 h-6 rounded-md bg-[#95BA7C]' />
          <span>verde</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
