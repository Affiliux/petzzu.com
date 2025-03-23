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
  const { theme, onChangeTheme } = useApplication()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          {theme === ThemeShowTypeEnum.BLUE && <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />}
          {theme === ThemeShowTypeEnum.PINK && <span className='w-6 h-6 rounded-md bg-[#F997CD]' />}
          {theme === ThemeShowTypeEnum.GOLD && <span className='w-6 h-6 rounded-md bg-[#FFF2B3]' />}
          {theme === ThemeShowTypeEnum.GREEN && <span className='w-6 h-6 rounded-md bg-[#95BA7C]' />}
          {theme === ThemeShowTypeEnum.LILAC && <span className='w-6 h-6 rounded-md bg-[#E9D8FF]' />}
          {theme === ThemeShowTypeEnum.RED && <span className='w-6 h-6 rounded-md bg-[#FFB2B2]' />}
          {theme === ThemeShowTypeEnum.GRAY && <span className='w-6 h-6 rounded-md bg-[#D9D9D9]' />}
          <span className='sr-only'>{t('config.header.themes.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.BLUE)}>
          <span className='w-6 h-6 rounded-md bg-[#7DA2FF]' />
          <span>{t('config.header.themes.blue')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.PINK)}>
          <span className='w-6 h-6 rounded-md bg-[#F997CD]' />
          <span>{t('config.header.themes.pink')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.GOLD)}>
          <span className='w-6 h-6 rounded-md bg-[#FFF2B3]' />
          <span>{t('config.header.themes.gold')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.GREEN)}>
          <span className='w-6 h-6 rounded-md bg-[#95BA7C]' />
          <span>{t('config.header.themes.green')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.LILAC)}>
          <span className='w-6 h-6 rounded-md bg-[#E9D8FF]' />
          <span>{t('config.header.themes.lilac')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.RED)}>
          <span className='w-6 h-6 rounded-md bg-[#FFB2B2]' />
          <span>{t('config.header.themes.red')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme(ThemeShowTypeEnum.GRAY)}>
          <span className='w-6 h-6 rounded-md bg-[#D9D9D9]' />
          <span>{t('config.header.themes.gray')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
