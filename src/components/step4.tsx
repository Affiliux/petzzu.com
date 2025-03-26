'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'

import { set } from 'date-fns'
import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { v4 as uuidv4 } from 'uuid'
import { IconChevronLeft, IconChevronRight, IconLoader, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import type { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
import type { TimelineEntryProps, UploadFileResponseProps } from '@/typings/timeline'
import { useApplication } from '@/contexts/ApplicationContext'
import { useCreate } from '@/contexts/CreateContext'
import { useTimeline } from '@/contexts/TimelineContext'

import { toast } from '@/hooks/use-toast'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { ModalContent } from './ui/animated-modal'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Label } from './ui/label'
import RichTextEditor from './ui/text-editor'
import AnimatedModal from './modal'
import { RenderImage } from './render-image'

import { MAX_FILE_SIZE } from '@/constants'

interface Step4Props {
  isEdit?: boolean
  child: CreatePrePayloadProps
  setChild: React.Dispatch<React.SetStateAction<CreatePrePayloadProps>>
  onSaveMedia: (id: string, media: FormData) => Promise<UploadFileResponseProps>
  onRemoveMedia: (idPreTimeline: string, id: string) => Promise<void>
  onNext: () => Promise<void>
  onBack: () => void
}

export const Step4 = ({ isEdit, child, setChild, onNext, onBack, onSaveMedia, onRemoveMedia }: Step4Props) => {
  // hooks
  const t = useTranslations()

  // contexts
  const { locale } = useApplication()
  const { pre } = useCreate()
  const { onCreateTimeline, onUpdateTimeline, onDeleteTimeline } = useTimeline()

  // states
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntryProps[]>(child.timeLine || [])
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<TimelineEntryProps | null>(null)

  // variables
  const VALUE_MESSAGE =
    child.timeLine?.map(entry => entry.description) ||
    ''
      ?.replaceAll('<p>', '')
      .replaceAll('</p>', '')
      .replaceAll('<em>', '')
      .replaceAll('</em>', '')
      .replaceAll('<strong>', '')
      .replaceAll('</strong>', '')
      .replaceAll('<s>', '')
      .replaceAll('</s>', '')

  const IS_NEXT_DISABLED =
    timelineEntries?.length === 0 ||
    timelineEntries?.some(entry => !entry?.title?.trim() || !entry?.date || entry?.media?.length === 0)

  async function handleAddTimelineEntry() {
    try {
      const newEntry = {
        id: uuidv4(),
        date: timelineEntries.length === 0 ? child?.birth_date : new Date().toISOString(),
        title: '',
        description: '',
        media: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const response = await onCreateTimeline(pre, newEntry)

      const updatedEntry = { ...newEntry, id: response.id }
      setTimelineEntries(prev => [...prev, updatedEntry])
    } catch (error) {
      console.error(error)
    }
  }

  async function handleRemoveTimelineEntry(id: string) {
    try {
      await onDeleteTimeline(id)
      setTimelineEntries(prev => prev.filter(entry => entry.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  async function handleUpdateTimelineEntry(id: string, updatedEntry: any) {
    try {
      const response = await onUpdateTimeline(id, updatedEntry)

      const updatedTimelineEntry = {
        ...updatedEntry,
        ...response,
      }

      setTimelineEntries(prev => prev.map(entry => (entry.id === id ? updatedTimelineEntry : entry)))
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSelectFiles(id: string, event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      if (!event.target.files) return
      const new_files = Array.from(event.target.files)
      const entry = timelineEntries.find(entry => entry.id === id)

      if (entry && entry.media.length + new_files.length > 4) {
        toast({
          variant: 'destructive',
          title: 'Image Error!!',
          description: t('steps.step3.input.errors.maxFiles'),
        })

        return
      }

      await Promise.all(
        new_files.map(async file => {
          if (file.size === 0) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.empty'),
            })
          } else if (file.size > MAX_FILE_SIZE) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.big-size'),
            })
          } else if (!file.type.startsWith('image/')) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step3.input.errors.not-image'),
            })
          } else {
            const formData = new FormData()
            formData.append('file', file)

            const response = await onSaveMedia(id, formData)
            if (response) {
              setTimelineEntries(prev =>
                prev.map(entry =>
                  entry.id === id
                    ? {
                        ...entry,
                        media: [
                          ...entry.media,
                          { id: response?.id, url: URL.createObjectURL(file), key: '', createdAt: '', updatedAt: '' },
                        ],
                      }
                    : entry,
                ),
              )
            }
          }
        }),
      )
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('steps.step3.toast.error-save.title'),
        description: t('steps.step3.toast.error-save.description'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleRemove(idPreTimeline: string, id: string) {
    setLoading(true)

    try {
      await onRemoveMedia(idPreTimeline, id)

      setTimelineEntries(prev =>
        prev.map(entry =>
          entry.id === idPreTimeline ? { ...entry, media: entry.media.filter(media => media.id !== id) } : entry,
        ),
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit() {
    setLoading(true)

    try {
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setChild({ ...child, timeLine: timelineEntries })
  }, [timelineEntries])

  return (
    <>
      <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
        <div className='mb-4'>
          <button
            type='button'
            onClick={handleAddTimelineEntry}
            disabled={loading}
            className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white-100 px-3 py-1 text-sm font-semibold text-neutral-900 backdrop-blur-3xl'>
              <>
                <IconPlus size={20} className='mr-4' />
                {t('steps.step4.accordion.actions.new')}
              </>
            </span>
          </button>
        </div>

        <Accordion type='multiple'>
          {timelineEntries.map((entry, index) => (
            <AccordionItem
              key={entry.id}
              value={entry.id}
              className='border border-b-neutral-200/60 border-neutral-200/60 w-full shadow-lg shadow-neutral-200/30 rounded-lg mb-2'
            >
              <AccordionTrigger className='p-4' noUnderline>
                {entry.title.length ? entry.title : `${index + 1}° ${t('steps.step4.accordion.title')}`}
              </AccordionTrigger>

              <AccordionContent className='p-4'>
                <div className='flex flex-col gap-6'>
                  <div className='relative flex flex-col gap-2'>
                    <Label className='font-semibold text-neutral-900'>{t('steps.step4.name.label')}</Label>
                    <Input
                      id={`timeline.${entry.id}.title`}
                      placeholder={t('steps.step4.name.placeholder')}
                      type='text'
                      autoComplete='off'
                      value={entry.title}
                      onBlur={() => handleUpdateTimelineEntry(entry.id, entry)}
                      onChange={e => {
                        const updatedEntry = { ...entry, title: e.target.value }
                        setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                      }}
                    />
                  </div>

                  <div className='relative flex flex-col gap-2'>
                    <Label className='font-semibold text-neutral-900'>{t('steps.step4.message.label')}</Label>
                    <RichTextEditor
                      value={entry.description}
                      onChange={newDesc => {
                        const updatedEntry = { ...entry, description: newDesc }
                        setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                      }}
                      onBlur={() => handleUpdateTimelineEntry(entry.id, entry)}
                      placeholder={t('steps.step4.message.placeholder')}
                    />

                    <p className='absolute bottom-2 right-3 text-xs text-neutral-900'>
                      {VALUE_MESSAGE?.length ?? 0}/100
                    </p>
                  </div>

                  <div className='relative flex flex-col gap-2'>
                    <Label className='font-semibold text-neutral-900'>{t('steps.step4.date.label')}</Label>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown'
                      className={
                        'rounded-md border border-neutral-200/60 flex items-center justify-center relative z-50'
                      }
                      locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
                      selected={new Date(entry.date)}
                      onSelect={selectedDate => {
                        const updatedEntry = { ...entry, date: selectedDate?.toISOString() }
                        setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                        handleUpdateTimelineEntry(entry.id, updatedEntry)
                      }}
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                    />
                  </div>

                  <div className='relative flex flex-col gap-2'>
                    <Label className='font-semibold text-neutral-900'>{t('steps.step4.images.label')}</Label>
                    <div
                      className='relative border-2 border-neutral-200/60 border-dashed rounded-lg px-8 py-8'
                      id='dropzone'
                    >
                      <input
                        multiple
                        type='file'
                        accept='image/*'
                        size={100 * 1024 * 1024}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
                        onChange={e => handleSelectFiles(entry.id, e)}
                      />

                      <div className='text-center mt-4'>
                        <p className='mt-1 text-xs text-gray-500'>{t('steps.step4.images.placeholder')}</p>
                        <p className='mt-1 text-xs text-gray-500'>{t('steps.step4.images.max')}</p>
                      </div>

                      <div className='grid grid-cols-4 gap-4 mt-8'>
                        {entry.media.map(file => (
                          <div
                            key={file.id}
                            className='image-item rounded-md relative z-30 w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]'
                          >
                            <RenderImage
                              src={file.url}
                              alt={file.id}
                              className='rounded-lg w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] object-cover'
                              height={65}
                              width={65}
                            />

                            <button
                              onClick={() => handleRemove(entry.id, file.id)}
                              disabled={loading}
                              className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-neutral-900 flex items-center cursor-pointer justify-center'
                            >
                              <IconX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      onClick={() => {
                        setEntryToDelete(entry)
                        setIsOpen(true)
                      }}
                      disabled={loading}
                      className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
                        loading ? 'opacity-50' : ''
                      }`}
                    >
                      <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white-100 px-3 py-1 text-sm font-semibold text-neutral-900 backdrop-blur-3xl'>
                        <>
                          <IconTrash size={20} className='mr-4' />
                          {t('steps.step4.accordion.actions.delete')}
                        </>
                      </span>
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='flex items-center justify-between gap-4 mt-4'>
          <button
            type='button'
            onClick={onBack}
            disabled={loading}
            className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
              <>
                <IconChevronLeft size={20} className='mr-4' />
                {t('steps.step4.back')}
              </>
            </span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span className='inline-flex h-full w-full  items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
              {loading ? (
                <IconLoader size={20} className='animate-spin' />
              ) : (
                <>
                  {isEdit
                    ? t('pages.account.pages.edit.actions.next')
                    : IS_NEXT_DISABLED
                      ? t('steps.step4.skip')
                      : t('steps.step4.button')}
                  <IconChevronRight size={20} className='ml-4' />
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <h4 className='text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8'>
            {t('steps.step4.modal.title')} ? {' '}
            {entryToDelete?.title && (
              <span className='block mt-2 text-base font-normal'>&ldquo;{entryToDelete?.title}&rdquo;</span>
            )}
          </h4>
          <div className='flex flex-col items-center gap-4 w-full'>
            <button
              type='button'
              onClick={() => {
                handleRemoveTimelineEntry(entryToDelete?.id)
                setIsOpen(false)
                window.scrollTo(0, 0)
              }}
              className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0`}
            >
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                {t('steps.step4.modal.actions.delete')}
              </span>
            </button>
            <button
              type='button'
              onClick={e => {
                e.preventDefault()
                setIsOpen(false)
              }}
              className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-200/60 focus:outline-none focus:ring-0`}
            >
              <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-theme-100 px-3 py-1 text-sm font-semibold text-theme-600 backdrop-blur-3xl'>
                {t('steps.step4.modal.actions.cancel')}
              </span>
            </button>
          </div>
        </ModalContent>
      </AnimatedModal>
    </>
  )
}
