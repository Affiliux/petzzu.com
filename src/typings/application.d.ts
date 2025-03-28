// Definition: Application types

// Discount props with the following properties:
export type DiscountProps = {
  id: string
  name: string
  discount_basic: number
  discount_pro: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Get Discount Coupon
export interface GetDiscountPayloadProps {
  name: string
}
export interface GetDiscountResponseProps extends DiscountProps {}

// Plan props with the following properties:
export type PlanProps = {
  id: string
  title: string
  subTitle: string
  isSignature: boolean
  recurrence: string
  fileLimit: number | null
  // description: string
  sku: string
  price: number
  currency: string
  fileLimit: number
  createdAt: string
  updatedAt: string
}

// Get Plans
export interface GetPlanPayloadProps {}
export interface GetPlanResponseProps {
  plans: PlanProps[]
}

// Steps Props with the following properties:
export interface StepsProps {
  id: number
  title: string
  description: string
  checked: boolean
  skip: boolean
}

// Payment form Props with the following properties:
export interface PaymentFormProps {
  method: string
  email?: string
  phone?: string
  name?: string
  document?: string
  cardToken?: string
}

export type OrderBumpProps = {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  imageKey: string
}

export interface GetOrderBumpResponseProps {
  orderBumps: OrderBumpProps[]
}
