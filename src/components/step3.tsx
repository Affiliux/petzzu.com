// 'use client'

// import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'

// import { enUS, es, ptBR } from 'date-fns/locale'
// import { useTranslations } from 'next-intl'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { IconChevronLeft, IconChevronRight, IconLoader, IconPlus, IconTrash,IconX } from '@tabler/icons-react'

// import { CreatePrePayloadProps, MediaPreProps } from '@/typings/create'
// import { useApplication } from '@/contexts/ApplicationContext'

// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
// import { Calendar } from './ui/calendar'
// import { Input } from './ui/input'
// import RichTextEditor from './ui/text-editor'
// import { RenderImage } from './render-image'
// import { MAX_FILE_SIZE } from '../constants'
// import { useTimeline } from '../contexts/TimelineContext'
// import { toast } from '../hooks/use-toast'

// import { DateShowTypeEnum, ThemeShowTypeEnum } from '@/enums'

// const { createTimeline, updateTimeline, deleteTimelineFile, uploadTimelineFile, findOneTimeline } = useTimeline()

// interface Step3Props {
//   theme: ThemeShowTypeEnum
//   child: CreatePrePayloadProps
//   dateShowType: DateShowTypeEnum
//   setChild: Dispatch<SetStateAction<CreatePrePayloadProps>>
//   setDateShowType: Dispatch<SetStateAction<DateShowTypeEnum>>
//   onNext: () => Promise<void>
//   onBack: () => void
//   onSaveMedia: (media: FormData) => Promise<void>
//   onRemoveMedia: (id: string) => Promise<void>
//   medias: MediaPreProps[]
// }

// export const Step3 = ({
//   theme,
//   child,
//   dateShowType,
//   setChild,
//   setDateShowType,
//   onNext,
//   onBack,
//   onSaveMedia,
//   onRemoveMedia,
//   medias,
// }: Step3Props) => {
//   const t = useTranslations()

//   const { locale } = useApplication()

//   const [loading, setLoading] = useState(false)
//   const [date, setDate] = useState<Date | undefined>(child?.birth_date ? new Date(child?.birth_date) : undefined)
//   const [accordions, setAccordions] = useState([{ id: 1 }])

//   const addAccordion = async () => {
//     try {
//       const newTimeline = {
//         date: new Date().toISOString(), // Data padrão
//         title: `Lembrança ${accordions.length + 1}`, // Título padrão
//         description: '', // Descrição vazia
//       }

//       // Chama a API para criar a timeline
//       const response = await createTimeline(couple.id, newTimeline)

//       // Atualiza o estado local com o novo accordion
//       setAccordions([...accordions, { id: response.id }])
//     } catch (error) {
//       console.error('Erro ao criar timeline:', error)
//       toast({
//         variant: 'destructive',
//         title: 'Erro',
//         description: 'Não foi possível criar a timeline.',
//       })
//     }
//   }

//   const removeAccordion = async (id: number) => {
//     try {
//       // Remove a timeline da API
//       await deleteTimelineFile(couple.id, id.toString())

//       // Atualiza o estado local
//       setAccordions(accordions.filter(accordion => accordion.id !== id))
//     } catch (error) {
//       console.error('Erro ao remover timeline:', error)
//       toast({
//         variant: 'destructive',
//         title: 'Erro',
//         description: 'Não foi possível remover a timeline.',
//       })
//     }
//   }

//   async function onSubmit() {
//     setLoading(true)

//     try {
//       await onNext()
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function onRemove(id: string) {
//     setLoading(true)

//     try {
//       await onRemoveMedia(id)
//     } catch (error) {
//       console.error(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function onSelectFiles(event: ChangeEvent<HTMLInputElement>) {
//     event.preventDefault()
//     setLoading(true)

//     try {
//       if (!event.target.files) return
//       const new_files = Array.from(event.target.files)

//       if (medias?.length + new_files.length > 1) {
//         toast({
//           variant: 'destructive',
//           title: 'Image Error!!',
//           description: t('steps.step2.input.errors.maxFiles'),
//         })

//         return
//       }

//       await Promise.all(
//         new_files.map(async file => {
//           if (file.size === 0) {
//             toast({
//               variant: 'destructive',
//               title: 'Image Error!!',
//               description: t('steps.step4.input.errors.empty'),
//             })
//           } else if (file.size > MAX_FILE_SIZE) {
//             toast({
//               variant: 'destructive',
//               title: 'Image Error!!',
//               description: t('steps.step4.input.errors.big-size'),
//             })
//           } else if (!file.type.startsWith('image/')) {
//             toast({
//               variant: 'destructive',
//               title: 'Image Error!!',
//               description: t('steps.step4.input.errors.not-image'),
//             })
//           } else {
//             const formData = new FormData()
//             formData.append('file', file)
//             await onSaveMedia(formData)
//           }
//         }),
//       )
//     } catch (error: any) {
//       console.error(error)

//       toast({
//         title: t('steps.step4.toast.error-save.title'),
//         description: t('steps.step4.toast.error-save.description'),
//         variant: 'destructive',
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const formSchema = z.object({
//     coupleName: z
//       .string()
//       .min(2, {
//         message: t('steps.step1.input.errors.min'),
//       })
//       .max(100, {
//         message: t('steps.step1.input.errors.max'),
//       }),
//     description: z
//       .string()
//       .min(2, {
//         message: t('steps.step1.input.errors.min'),
//       })
//       .max(100, {
//         message: t('steps.step1.input.errors.max'),
//       }),
//     message: z.string().optional(),
//   })

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     mode: 'onChange',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       child_: couple.coupleName ?? '',
//       message: couple.message ?? '',
//     },
//   })

//   const VALUE = couple.message
//     ?.replaceAll('<p>', '')
//     .replaceAll('</p>', '')
//     .replaceAll('<em>', '')
//     .replaceAll('</em>', '')
//     .replaceAll('<strong>', '')
//     .replaceAll('</strong>', '')
//     .replaceAll('<s>', '')
//     .replaceAll('</s>', '')

//   useEffect(() => {
//     if (date) setCouple({ ...couple, startDate: date.toISOString() })
//   }, [date])

//   return (
//     <div className='relative flex flex-col gap-4 z-50 w-full mt-8'>
//       <div className='flex flex-col lg:flex-row lg:gap-4 gap-8'>
//         <Accordion type='single' collapsible className='w-full'>
//           {accordions.map((accordion, index) => (
//             <AccordionItem key={accordion.id} value={`accordion-${accordion.id}`}>
//               <AccordionTrigger noUnderline>Lembrança {index + 1}</AccordionTrigger>
//               <AccordionContent>
//                 <div className='flex flex-col gap-4 mb-4'>
//                   <Input
//                     {...register(`coupleName-${accordion.id}`)}
//                     id={`coupleName-${accordion.id}`}
//                     placeholder={t('steps.step1.input.placeholder')}
//                     type='text'
//                     autoFocus={true}
//                     autoComplete='off'
//                     className='w-full'
//                     onChange={async e => {
//                       const newTitle = e.target.value
//                       setCouple({
//                         ...couple,
//                         [`coupleName-${accordion.id}`]: newTitle,
//                       })

//                       // Atualiza a timeline na API
//                       try {
//                         await updateTimeline(accordion.id, {
//                           date: couple.startDate, // Mantém a data existente
//                           title: newTitle,
//                           description: couple[`message-${accordion.id}`] || '',
//                         })
//                       } catch (error) {
//                         console.error('Erro ao atualizar timeline:', error)
//                       }
//                     }}
//                   />

//                   <div className='flex flex-col 2xl:flex-row gap-4 w-full'>
//                     <div className='relative sm:w-full 2xl:w-1/2'>
//                       <RichTextEditor
//                         placeholder={t('steps.step2.input.placeholder')}
//                         value={couple[`message-${accordion.id}`] ?? ''}
//                         step3={true}
//                         onChange={async e => {
//                           const newDescription = e
//                           setCouple({ ...couple, [`message-${accordion.id}`]: newDescription })

//                           // Atualiza a timeline na API
//                           try {
//                             await updateTimeline(accordion.id, {
//                               date: couple.startDate, // Mantém a data existente
//                               title: couple[`coupleName-${accordion.id}`] || '',
//                               description: newDescription,
//                             })
//                           } catch (error) {
//                             console.error('Erro ao atualizar timeline:', error)
//                           }
//                         }}
//                       />
//                       <p className='absolute bottom-2 right-3 text-xs text-neutral-400'>
//                         {VALUE?.length ?? 0}/{theme === ThemeShowTypeEnum.DEFAULT ? 750 : 400}
//                       </p>
//                     </div>
//                     <Calendar
//                       mode='single'
//                       locale={locale === 'pt-BR' ? ptBR : locale === 'es' ? es : enUS}
//                       captionLayout='dropdown'
//                       className='rounded-md border border-neutral-300 flex items-center justify-center relative z-50 sm:w-full 2xl:w-1/2 h-full'
//                       selected={date}
//                       onSelect={setDate}
//                       fromYear={1950}
//                       toYear={new Date().getFullYear()}
//                     />
//                   </div>
//                 </div>

//                 {/* Upload de fotos */}
//                 <div className='relative border-2 border-neutral-800 border-dashed rounded-lg px-8 py-8' id='dropzone'>
//                   <input
//                     type='file'
//                     accept='image/*'
//                     size={100 * 1024 * 1024}
//                     className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20'
//                     onChange={onSelectFiles}
//                   />
//                   <div className='text-center'>
//                     <h3 className='mt-2 text-sm font-medium text-white'>
//                       <label htmlFor='file-upload' className='relative cursor-pointer'>
//                         <span>{t('steps.step2.input.picture.title')}</span>
//                       </label>
//                     </h3>
//                     <p className='mt-1 text-xs text-gray-500'>{t('steps.step2.input.picture.title')}</p>
//                   </div>
//                   <div className='grid grid-cols-4 gap-4 mt-8'>
//                     {medias?.map(file => (
//                       <div
//                         key={file.id}
//                         className='image-item rounded-md relative z-30 w-[50px] h-[50px] lg:w-[65px] lg:h-[65px]'
//                       >
//                         <RenderImage
//                           src={file.url}
//                           alt={file.id}
//                           className='rounded-lg w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] object-cover'
//                           height={65}
//                           width={65}
//                         />
//                         <button
//                           onClick={() => onRemove(file.id)}
//                           disabled={loading}
//                           className='absolute -top-2 left-[40px] lg:left-[55px] p-1 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black flex items-center cursor-pointer justify-center'
//                         >
//                           <IconX size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className='mt-4 flex justify-end'>
//                   <button
//                     type='button'
//                     onClick={() => removeAccordion(accordion.id)}
//                     className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2'
//                   >
//                     <IconTrash className='mr-2' />
//                     Excluir
//                   </button>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//       <button
//         type='button'
//         onClick={addAccordion}
//         className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-offset-2'
//       >
//         <IconPlus className='mr-2' />
//         Nova lembrança
//       </button>

//       <div className='flex items-center justify-between gap-4 mt-4'>
//         <button
//           type='button'
//           onClick={onBack}
//           disabled={loading}
//           className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
//             loading ? 'opacity-50' : ''
//           }`}
//         >
//           <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
//             <>
//               <IconChevronLeft size={20} className='mr-4' />
//               {t('steps.step2.back')}
//             </>
//           </span>
//         </button>
//         <button
//           onClick={handleSubmit(onSubmit)}
//           disabled={loading || (theme !== ThemeShowTypeEnum.DEFAULT && !couple.startDate)}
//           className={`relative w-full inline-flex h-[3.2rem] overflow-hidden rounded-lg p-[2px] border border-neutral-800 focus:outline-none focus:ring-0 ${
//             loading || (theme !== ThemeShowTypeEnum.DEFAULT && !couple.startDate) ? 'opacity-50' : ''
//           }`}
//         >
//           <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-3 py-1 text-sm font-semibold text-white backdrop-blur-3xl'>
//             {loading ? (
//               <IconLoader size={20} className='animate-spin' />
//             ) : theme === ThemeShowTypeEnum.DEFAULT ? (
//               <>
//                 {date ? t('steps.step3.button') : t('config.skip')}
//                 <IconChevronRight size={20} className='ml-4' />
//               </>
//             ) : (
//               <>
//                 {t('steps.step3.button')}
//                 <IconChevronRight size={20} className='ml-4' />
//               </>
//             )}
//           </span>
//         </button>
//       </div>
//     </div>
//   )
// }
