import type { Dispatch, ReactNode, SetStateAction } from 'react'

import type { PetResponseProps, PaymentProps } from '@/typings/pet'

export type PetProviderProps = {
  childen: ReactNode
}

export type PetContextType = {
  pet: PetResponseProps | null
  //
  set_pet: Dispatch<SetStateAction<PetResponseProps | null>>
  //
  onGetPetBySlug: (slug: string) => Promise<void>
  onGetPetById: (id: string) => Promise<void>
}
