import React, { ChangeEvent, useEffect, useState } from 'react'

import { time } from 'console'
import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CreatePrePayloadProps, MediaPreProps, NewMediaPayloadProps } from '@/typings/create'

import { toast } from '@/hooks/use-toast'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import RichTextEditor from './ui/text-editor'
import { RenderImage } from './render-image'
import { MAX_FILE_SIZE } from '../constants'
import { useApplication } from '../contexts/ApplicationContext'
import { useCreate } from '../contexts/CreateContext'
import { useTimeline } from '../contexts/TimelineContext'
import { DeleteFileResponse, UploadFileResponse } from '../typings/timeline'

interface Step3Props {
  child: CreatePrePayloadProps
  setChild: React.Dispatch<React.SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onBack: () => void
  timelineMedias: MediaPreProps[]
  onSaveMedia: (id: string, media: FormData) => Promise<UploadFileResponse>
  onRemoveMedia: (idPreTimeline: string, id: string) => Promise<void>
}

export const Step3 = ({ child, setChild, onNext, onBack, timelineMedias, onSaveMedia, onRemoveMedia }: Step3Props) => {
  const { createTimeline, updateTimeline, deleteTimeline } = useTimeline()
  const [timelineEntries, setTimelineEntries] = useState(child.timeLine || [])
  const { pre } = useCreate()
  const [loading, setLoading] = useState(false)

  const t = useTranslations()
  const { locale } = useApplication()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string().min(2, { message: 'Name must be at least 2 characters' }),
      }),
    ),
    defaultValues: {
      title: child?.timeLine?.map(entry => entry.title),
    },
  })

  const VALUE =
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

  useEffect(() => {
    setChild({ ...child, timeLine: timelineEntries })
  }, [timelineEntries])

  const handleAddTimelineEntry = async () => {
    const newEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      title: '',
      description: '',
      media: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    try {
      const response = await createTimeline(pre, newEntry)
      const updatedEntry = { ...newEntry, id: response.id }
      setTimelineEntries(prev => [...prev, updatedEntry])
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error creating timeline entry', description: error.message })
    }
  }

  const handleRemoveTimelineEntry = async (id: string) => {
    setTimelineEntries(prev => prev.filter(entry => entry.id !== id))
    try {
      await deleteTimeline(id)
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error deleting timeline entry', description: error.message })
    }
  }

  const handleUpdateTimelineEntry = async (id: string, updatedEntry: any) => {
    try {
      const response = await updateTimeline(id, updatedEntry)
      const updatedTimelineEntry = {
        ...updatedEntry,
        ...response,
      }
      setTimelineEntries(prev => prev.map(entry => (entry.id === id ? updatedTimelineEntry : entry)))
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error updating timeline entry', description: error.message })
    }
  }

  async function onSelectFiles(id: string, event: ChangeEvent<HTMLInputElement>) {
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
          description: t('steps.step2.input.errors.maxFiles'),
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
            await onSaveMedia(id, formData).then(response => {
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
            })
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

  async function onRemove(idPreTimeline: string, id: string) {
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

  const onSubmit = async () => {
    setLoading(true)
    try {
      await onNext()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const isNextButtonDisabled =
    timelineEntries.length === 0 ||
    timelineEntries.some(entry => !entry.title.trim() || !entry.date || entry.media.length === 0)

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <Accordion type='multiple' className='w-full'>
        {timelineEntries.map((entry, index) => (
          <AccordionItem key={entry.id} value={entry.id}>
            <AccordionTrigger noUnderline>{`${index + 1}° Lembrança `}</AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col gap-4'>
                <Input
                  {...register(`title.${index}`)}
                  id={`timeline.${entry.id}.title`}
                  placeholder='Title'
                  type='text'
                  autoComplete='off'
                  value={entry.title}
                  onChange={e => {
                    const updatedEntry = { ...entry, title: e.target.value }
                    setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                  }}
                  onBlur={() => handleUpdateTimelineEntry(entry.id, entry)}
                />
                <div className='relative'>
                  <RichTextEditor
                    value={entry.description}
                    onChange={newDesc => {
                      const updatedEntry = { ...entry, description: newDesc }
                      setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                    }}
                    onBlur={() => handleUpdateTimelineEntry(entry.id, entry)}
                    placeholder={''}
                  />

                  <p className='absolute bottom-2 right-3 text-xs text-neutral-900'>{VALUE?.length ?? 0}/100</p>
                </div>

                <Calendar
                  mode='single'
                  captionLayout='dropdown'
                  className={'rounded-md border border-neutral-300 flex items-center justify-center relative z-50'}
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
                <div className='relative border-2 border-neutral-800 border-dashed rounded-lg px-8 py-8' id='dropzone'>
                  <input
                    type='file'
                    accept='image/*'
                    size={100 * 1024 * 1024}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
                    onChange={e => onSelectFiles(entry.id, e)}
                  />

                  <div className='text-center'>
                    <h3 className='mt-2 text-sm font-medium text-white'>
                      <label htmlFor='file-upload' className='relative cursor-pointer'>
                        <span>{t('steps.step2.input.picture.title')}</span>
                      </label>
                    </h3>
                    <p className='mt-1 text-xs text-gray-500'>{t('steps.step3.input.placeholder')}</p>
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
                          onClick={() => onRemove(entry.id, file.id)}
                          disabled={loading}
                          className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black flex items-center cursor-pointer justify-center'
                        >
                          <IconX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    type='button'
                    onClick={() => handleRemoveTimelineEntry(entry.id)}
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2'
                  >
                    <IconTrash className='mr-2' />
                    Excluir
                  </button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className='flex justify-end'>
        <button
          type='button'
          onClick={handleAddTimelineEntry}
          className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2'
        >
          <IconPlus className='mr-2' />
          Nova lembrança
        </button>
      </div>

      <div className='flex items-center justify-between gap-4 mt-4'>
        <button
          type='button'
          onClick={onBack}
          disabled={loading}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            <>
              <IconChevronLeft size={20} className='mr-4' />
              {t('steps.step2.back')}
            </>
          </span>
        </button>
        <button
          onClick={onSubmit}
          disabled={loading || isNextButtonDisabled}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <span className='inline-flex h-full w-full  items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {t('steps.step4.button')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
