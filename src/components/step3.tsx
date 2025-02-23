import React, { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconChevronLeft, IconChevronRight, IconLoader, IconPlus, IconTrash, IconX } from '@tabler/icons-react'

import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'

import { toast } from '@/hooks/use-toast'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import RichTextEditor from './ui/text-editor'
import { useCreate } from '../contexts/CreateContext'
import { useTimeline } from '../contexts/TimelineContext'

interface Step2Props {
  child: CreatePrePayloadProps
  setChild: React.Dispatch<React.SetStateAction<CreatePrePayloadProps>>
  onNext: () => Promise<void>
  onBack: () => void
  medias: MediaPreProps[]
}

export const Step3 = ({ child, setChild, onNext, onBack, medias }: Step2Props) => {
  const { createTimeline, updateTimeline, deleteTimeline } = useTimeline()
  const { pre } = useCreate()
  const [loading, setLoading] = useState(false)

  const t = useTranslations()

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
      title: child.timeLine.map(entry => entry.title),
    },
  })

  const [timelineEntries, setTimelineEntries] = useState(child.timeLine || [])

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
    setTimelineEntries(prev => [...prev, newEntry])
    try {
      await createTimeline(pre, newEntry)
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

  return (
    <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
      <Accordion type='multiple' className='w-full'>
        {timelineEntries.map((entry, index) => (
          <AccordionItem key={entry.id} value={entry.id}>
            <AccordionTrigger>{`Lembrança ${index + 1}`}</AccordionTrigger>
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
              />
              <RichTextEditor
                value={entry.description}
                onChange={newDesc => {
                  const updatedEntry = { ...entry, description: newDesc }
                  setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                }}
                placeholder={''}
              />
              <Calendar
                mode='single'
                selected={new Date(entry.date)}
                onSelect={selectedDate => {
                  const updatedEntry = { ...entry, date: selectedDate.toISOString() }
                  setTimelineEntries(prev => prev.map(item => (item.id === entry.id ? updatedEntry : item)))
                }}
              />
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
          disabled={loading || medias?.length === 0}
          className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
            loading || medias?.length === 0 ? 'opacity-50' : ''
          }`}
        >
          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
            {loading ? (
              <IconLoader size={20} className='animate-spin' />
            ) : (
              <>
                {medias?.length ? t('steps.step4.button') : t('config.skip')}
                <IconChevronRight size={20} className='ml-4' />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  )
}
