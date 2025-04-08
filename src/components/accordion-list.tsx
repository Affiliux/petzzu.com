'use client'

import React, { ChangeEvent, useState } from 'react'

import { enUS, es, ptBR } from 'date-fns/locale'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { useTimeline } from '@/contexts/TimelineContext'

import { toast } from '@/hooks/use-toast'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import RichTextEditor from './ui/text-editor'
import { RenderImage } from './render-image'
import { MAX_FILE_SIZE } from '../constants'
import { useApplication } from '../contexts/ApplicationContext'
import { useCreate } from '../contexts/CreateContext'
import type { CreateTimelinePayloadProps, PreWebsiteProps, TimelineEntryProps } from '../typings/timeline'

import { ThemeShowTypeEnum } from '@/enums'

interface AccordionListProps {
  theme: ThemeShowTypeEnum
  pet: PreWebsiteProps
  setPet: React.Dispatch<React.SetStateAction<PreWebsiteProps>>
  onSaveMedia: (timelineId: string, media: FormData) => Promise<void>
  onRemoveMedia: (timelineId: string, mediaId: string) => Promise<void>
}

const AccordionList = ({ theme, pet, setPet, onSaveMedia, onRemoveMedia }: AccordionListProps) => {
  const t = useTranslations()
  const { locale } = useApplication()
  const { pre } = useCreate()

  const { onCreateTimeline, onUpdateTimeline, onDeleteTimelineFile, onDeleteTimeline } = useTimeline()
  const [accordions, setAccordions] = useState<TimelineEntryProps[]>(pet.timeLine || [])
  const [loading, setLoading] = useState(false)

  const addAccordion = async () => {
    try {
      const newTimeline: CreateTimelinePayloadProps = {
        date: new Date().toISOString(),
        title: `Lembrança ${accordions.length + 1}`,
        description: '',
      }

      const response = await onCreateTimeline(pre, newTimeline)

      const newEntry = response as unknown as TimelineEntryProps
      setAccordions([...accordions, newEntry])
      setPet(prev => ({
        ...prev,
        timeLine: [...(prev.timeLine || []), newEntry],
      }))
    } catch (error) {
      console.error('Erro ao criar timeline:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível criar a timeline.',
      })
    }
  }

  const removeAccordion = async (id: string) => {
    try {
      await onDeleteTimeline(id)
      setAccordions(prev => prev.filter(entry => entry.id !== id))
      setPet(prev => ({
        ...prev,
        timeLine: prev.timeLine.filter(entry => entry.id !== id),
      }))
      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Lembrança removida com sucesso.',
      })
    } catch (error) {
      console.error('Erro ao remover timeline:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível remover a timeline.',
      })
    }
  }

  async function onSelectFiles(event: ChangeEvent<HTMLInputElement>, accordionId: string) {
    event.preventDefault()
    setLoading(true)

    try {
      if (!event.target.files) return
      const new_files = Array.from(event.target.files)

      if (pet?.media?.length + new_files.length > 1) {
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
              description: t('steps.step4.input.errors.empty'),
            })
          } else if (file.size > MAX_FILE_SIZE) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step4.input.errors.big-size'),
            })
          } else if (!file.type.startsWith('image/')) {
            toast({
              variant: 'destructive',
              title: 'Image Error!!',
              description: t('steps.step4.input.errors.not-image'),
            })
          } else {
            const formData = new FormData()
            formData.append('file', file)
            await onSaveMedia(accordionId, formData)
          }
        }),
      )
    } catch (error: any) {
      console.error(error)

      toast({
        title: t('steps.step4.toast.error-save.title'),
        description: t('steps.step4.toast.error-save.description'),
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const onRemoveMedia = async (timelineId: string, mediaId: string) => {
    try {
      await onRemoveMedia(timelineId, mediaId)

      setPet(prev => ({
        ...prev,
        timeLine: prev.timeLine.map(entry =>
          entry.id === timelineId ? { ...entry, media: entry.media.filter(file => file.id !== mediaId) } : entry,
        ),
      }))
    } catch (error) {
      console.error('Erro ao remover a mídia:', error)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível remover a mídia.',
      })
    }
  }

  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
    description: z
      .string()
      .min(2, {
        message: t('steps.step1.input.errors.min'),
      })
      .max(100, {
        message: t('steps.step1.input.errors.max'),
      }),
    message: z.string().optional(),
  })

  const { register, setValue, setError, clearErrors } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  return (
    <>
      <Accordion type='single' collapsible className='w-full'>
        {accordions?.map((accordion, index) => (
          <AccordionItem key={accordion.id} value={`accordion-${accordion.id}`}>
            <AccordionTrigger noUnderline>Lembrança {index + 1}</AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col gap-4 mb-4'>
                <Input
                  {...register('title')}
                  id={`title-${accordion.id}`}
                  placeholder={t('steps.step1.input.placeholder')}
                  type='text'
                  autoFocus={true}
                  autoComplete='off'
                  className='w-full'
                  onChange={async e => {
                    const newTitle = e.target.value
                    setPet(prev => ({
                      ...prev,
                      timeLine: prev.timeLine.map(entry =>
                        entry.id === accordion.id ? { ...entry, title: newTitle } : entry,
                      ),
                    }))

                    try {
                      await onUpdateTimeline(accordion.id, {
                        date: accordion.date,
                        title: newTitle,
                        description: accordion?.description,
                      })
                    } catch (error) {
                      console.error('Erro ao atualizar timeline:', error)
                    }
                  }}
                />

                <div className='flex flex-col 2xl:flex-row gap-4 w-full'>
                  <div className='relative sm:w-full 2xl:w-1/2'>
                    <RichTextEditor
                      placeholder={t('steps.step2.input.placeholder')}
                      value={accordion.description}
                      step3={true}
                      onChange={async e => {
                        const newDescription = e
                        setPet(prev => ({
                          ...prev,
                          timeLine: prev.timeLine.map(entry =>
                            entry.id === accordion.id ? { ...entry, description: newDescription } : entry,
                          ),
                        }))

                        try {
                          await onUpdateTimeline(accordion.id, {
                            date: accordion.date,
                            title: accordion.title,
                            description: newDescription,
                          })
                        } catch (error) {
                          console.error('Erro ao atualizar timeline:', error)
                        }
                      }}
                    />
                    <p className='absolute bottom-2 right-3 text-xs text-neutral-400'>
                      {accordion?.description?.length}/{theme === ThemeShowTypeEnum.DEFAULT ? 750 : 400}
                    </p>
                  </div>
                  <Calendar
                    mode='single'
                    locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
                    captionLayout='dropdown'
                    className='rounded-md border border-neutral-300 flex items-center justify-center relative z-50 sm:w-full 2xl:w-1/2 h-full'
                    selected={new Date(accordion.date)}
                    onSelect={async date => {
                      setPet(prev => ({
                        ...prev,
                        timeLine: prev.timeLine.map(entry =>
                          entry.id === accordion.id ? { ...entry, date: date.toISOString().split('T')[0] } : entry,
                        ),
                      }))

                      try {
                        await onUpdateTimeline(accordion.id, {
                          date: new Date().toISOString(),
                          title: accordion.title,
                          description: accordion.description,
                        })
                      } catch (error) {
                        console.error('Erro ao atualizar timeline:', error)
                      }
                    }}
                    fromYear={1950}
                    toYear={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className='relative border-2 border-neutral-800 border-dashed rounded-lg px-8 py-8' id='dropzone'>
                <input
                  type='file'
                  accept='image/*'
                  size={100 * 1024 * 1024}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
                  onChange={event => onSelectFiles(event, accordion.id)}
                />
                <div className='text-center'>
                  <h3 className='mt-2 text-sm font-medium text-white'>
                    <label htmlFor='file-upload' className='relative cursor-pointer'>
                      <span>{t('steps.step2.input.picture.title')}</span>
                    </label>
                  </h3>
                  <p className='mt-1 text-xs text-gray-500'>{t('steps.step2.input.picture.title')}</p>
                </div>
                <div className='grid grid-cols-4 gap-4 mt-8'>
                  {accordion?.media?.map(file => (
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
                        onClick={() => onRemoveMedia(accordion.id, file.id)}
                        disabled={loading}
                        className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-neutral-900 flex items-center cursor-pointer justify-center'
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
                  onClick={() => removeAccordion(accordion.id)}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2'
                >
                  <IconTrash className='mr-2' />
                  Excluir
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={addAccordion}
          className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2'
        >
          <IconPlus className='mr-2' />
          Nova lembrança
        </button>
      </div>
    </>
  )
}

export default AccordionList
