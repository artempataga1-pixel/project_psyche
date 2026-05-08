export interface Testimonial {
  id: number
  before: string
  after: string
  name: string
  age: number
  photo?: string
}

export interface PricingPlan {
  id: string
  badge: string
  title: string
  price: number
  duration: string
  description: string
  featured: boolean
}

export interface FaqItem {
  id: number
  question: string
  answer: string
}

export interface ContactFormData {
  name: string
  phone: string
  message?: string
}
