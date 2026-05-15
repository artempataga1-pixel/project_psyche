'use client'

import { m } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { CircularTestimonials } from '@/components/ui/circular-testimonials'
import testimonialsData from '@/data/testimonials.json'
import type { Testimonial } from '@/types'

const items = testimonialsData as Testimonial[]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32" style={{ background: '#FAF7F4' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Заголовок */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65 }}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span style={{ display: 'block', width: '36px', height: '1px', background: '#D8B4A0' }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: '#D8B4A0', fontFamily: 'var(--font-inter)' }}
            >
              результаты работы
            </span>
          </div>
          <h2
            className="font-bold"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 5vw, 4rem)',
              color: '#2C3E50',
              lineHeight: 1.1,
            }}
          >
            Истории трансформаций
          </h2>
        </m.div>

        {/* CircularTestimonials в тёмном контейнере */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14"
          style={{
            background: '#1C2B3A',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
          }}
        >
          <CircularTestimonials
            testimonials={items}
          />
        </m.div>

      </div>
    </section>
  )
}
