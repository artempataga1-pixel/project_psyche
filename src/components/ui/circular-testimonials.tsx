'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { m, AnimatePresence, useInView, type Variants } from 'framer-motion'

export interface CircularTestimonialItem {
  id: number
  before: string
  after: string
  name: string
  age: number
  photo?: string
}

interface CircularTestimonialsProps {
  testimonials: CircularTestimonialItem[]
  autoplay?: boolean
  autoplayInterval?: number
  colors?: {
    arcStroke?: string
    accentCircle?: string
    before?: string
    after?: string
    name?: string
    arrowBg?: string
    arrowIcon?: string
    arrowHoverBg?: string
    divider?: string
  }
}

function ageLabel(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return `${n} лет`
  if (mod10 === 1) return `${n} год`
  if (mod10 >= 2 && mod10 <= 4) return `${n} года`
  return `${n} лет`
}

const ArrowIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left'
      ? <><path d="M11 4L6 9L11 14" /></>
      : <><path d="M7 4L12 9L7 14" /></>
    }
  </svg>
)

export function CircularTestimonials({
  testimonials,
  autoplay = false,
  autoplayInterval = 5000,
  colors = {},
}: CircularTestimonialsProps) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const arcRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(arcRef, { margin: '0px' })

  const {
    arcStroke       = 'rgba(216,180,160,0.18)',
    accentCircle    = 'rgba(74,111,165,0.15)',
    before          = 'rgba(248,249,250,0.5)',
    after           = '#F8F9FA',
    name            = '#D8B4A0',
    arrowBg         = 'rgba(255,255,255,0.07)',
    arrowIcon       = 'rgba(248,249,250,0.6)',
    arrowHoverBg    = 'rgba(74,111,165,0.3)',
    divider         = 'rgba(216,180,160,0.25)',
  } = colors

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir)
    setActive(i => (i + dir + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  // autoplay намеренно убран — только кнопка вперёд
  useEffect(() => { void autoplay; void autoplayInterval }, [])

  const current = testimonials[active]

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
  const variants: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40, filter: 'blur(8px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease } },
    exit: (d: number) => ({ opacity: 0, x: -d * 40, filter: 'blur(8px)', transition: { duration: 0.3 } }),
  }

  return (
    <div className="relative w-full flex items-center gap-8 md:gap-16">

      {/* ── Декоративная часть ── */}
      <div className="relative flex-shrink-0 hidden md:flex items-center justify-center" style={{ width: 220, height: 220 }}>
        {/* Статичные круги */}
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="absolute inset-0">
          <circle cx="110" cy="110" r="100" stroke={arcStroke} strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="110" cy="110" r="76" stroke={arcStroke} strokeWidth="0.75" />
        </svg>

        {/* Вращающаяся дуга — анимация только когда секция видна */}
        <m.svg
          ref={arcRef}
          width="220" height="220" viewBox="0 0 220 220" fill="none"
          className="absolute inset-0"
          animate={isInView ? { rotate: 360 } : false}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '110px', originY: '110px' }}
        >
          {/* Дуга ~120° */}
          <path
            d="M 110 10 A 100 100 0 0 1 205 155"
            stroke="rgba(216,180,160,0.55)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Светящаяся точка на конце дуги */}
          <circle cx="205" cy="155" r="4" fill="rgba(216,180,160,0.8)" />
          <circle cx="205" cy="155" r="7" fill="rgba(216,180,160,0.15)" />
        </m.svg>

        {/* Центральный круг с фото */}
        <m.div
          key={active}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: 100,
            height: 100,
            border: '2px solid rgba(216,180,160,0.4)',
            boxShadow: '0 0 0 4px rgba(216,180,160,0.08)',
            background: accentCircle,
          }}
        >
          {current.photo ? (
            <Image
              src={current.photo}
              alt={current.name}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="100px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2.8rem',
                fontStyle: 'italic',
                color: '#D8B4A0',
                lineHeight: 1,
              }}>
                {current.name[0]}
              </span>
            </div>
          )}
        </m.div>

        {/* Маленькие точки на окружности */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i === 0 ? 6 : 4,
              height: i === 0 ? 6 : 4,
              background: i === 0 ? '#D8B4A0' : 'rgba(216,180,160,0.25)',
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%)
                rotate(${deg}deg)
                translateY(-100px)
              `,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* ── Контент ── */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {/* До */}
            <div className="mb-6">
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(216,180,160,0.55)',
                marginBottom: '10px',
              }}>
                До
              </span>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                fontStyle: 'italic',
                color: before,
                lineHeight: 1.45,
              }}>
                «{current.before}»
              </p>
            </div>

            {/* Разделитель со стрелкой */}
            <div className="flex items-center gap-4 mb-6">
              <div style={{ flex: 1, height: '1px', background: divider }} />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10 H16 M11 5 L16 10 L11 15" stroke={divider} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ flex: 1, height: '1px', background: divider }} />
            </div>

            {/* После */}
            <div>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(74,111,165,0.7)',
                marginBottom: '10px',
              }}>
                После
              </span>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                color: after,
                lineHeight: 1.45,
              }}>
                «{current.after}»
              </p>
            </div>

            {/* Имя */}
            <div className="flex items-center gap-3 mt-8">
              <div style={{ width: 28, height: '1px', background: 'rgba(216,180,160,0.3)' }} />
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: name,
              }}>
                {current.name}, {ageLabel(current.age)}
              </span>
            </div>
          </m.div>
        </AnimatePresence>

        {/* Навигация */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{ width: 40, height: 40, background: arrowBg, color: arrowIcon }}
            onMouseEnter={e => (e.currentTarget.style.background = arrowHoverBg)}
            onMouseLeave={e => (e.currentTarget.style.background = arrowBg)}
          >
            <ArrowIcon dir="left" />
          </button>
          <button
            onClick={() => go(1)}
            className="flex items-center justify-center rounded-full transition-all duration-200"
            style={{ width: 40, height: 40, background: arrowBg, color: arrowIcon }}
            onMouseEnter={e => (e.currentTarget.style.background = arrowHoverBg)}
            onMouseLeave={e => (e.currentTarget.style.background = arrowBg)}
          >
            <ArrowIcon dir="right" />
          </button>

          {/* Прогресс */}
          <div className="flex items-center gap-2 ml-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                style={{
                  width: i === active ? 28 : 8,
                  height: 2,
                  borderRadius: 2,
                  background: i === active ? '#D8B4A0' : 'rgba(216,180,160,0.2)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.7rem',
            color: 'rgba(248,249,250,0.25)',
            letterSpacing: '0.08em',
            marginLeft: 'auto',
          }}>
            {String(active + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
