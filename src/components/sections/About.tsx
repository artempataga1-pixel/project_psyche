'use client'

import { useState, useRef, useEffect, type CSSProperties } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { about } from '@/content/about'

const photos = [
  { src: '/about-1.jpg', alt: 'Юлия на сессии',          diploma: false, pos: 'center top'  },
  { src: '/about-2.jpg', alt: 'Юлия — портрет',           diploma: false, pos: 'center top'  },
  { src: '/about-3.jpg', alt: 'Юлия — студийное фото',    diploma: false, pos: 'center top'  },
  // Дипломы — вертикальные фото, читаются нормально
  { src: '/diploma-4.jpg', alt: 'Диплом КПТ — сертификат',    diploma: true, label: 'Диплом · КПТ · 736 ч'      },
  { src: '/diploma-5.jpg', alt: 'Диплом КПТ — оценки',        diploma: true, label: 'Оценки · КПТ'              },
  { src: '/diploma-6.jpg', alt: 'Диплом Ароматерапия',        diploma: true, label: 'Диплом · Ароматерапия · 501 ч' },
  { src: '/diploma-7.jpg', alt: 'Диплом Ароматерапия — оценки', diploma: true, label: 'Оценки · Ароматерапия'   },
]

function PhotoSlider() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cw, setCw] = useState(380) // container width for gap calc

  useEffect(() => {
    function upd() { if (containerRef.current) setCw(containerRef.current.offsetWidth) }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  function go(idx: number) { setCurrent(idx) }
  function prev() { go(current === 0 ? photos.length - 1 : current - 1) }
  function next() { go(current === photos.length - 1 ? 0 : current + 1) }

  function cardStyle(index: number): CSSProperties {
    const gap = Math.min(64, cw * 0.16)
    const lift = gap * 0.8
    const isActive = index === current
    const isLeft  = (current - 1 + photos.length) % photos.length === index
    const isRight = (current + 1) % photos.length === index
    const base = 'all 0.8s cubic-bezier(.4,2,.3,1)'
    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: 'auto',
      transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
      transition: base,
    }
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(-${gap}px) translateY(-${lift}px) scale(0.85) rotateY(15deg)`,
      transition: base,
    }
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: 'auto',
      transform: `translateX(${gap}px) translateY(-${lift}px) scale(0.85) rotateY(-15deg)`,
      transition: base,
    }
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: base }
  }

  return (
    <div className="relative" style={{ aspectRatio: '3/4' }}>

      {/* Decorative offset frame */}
      <div className="absolute pointer-events-none" style={{
        top: 20, left: -16, right: 16, bottom: -20,
        borderRadius: '36px',
        border: '1px solid rgba(216,180,160,0.14)',
      }} />

      {/* 3D photo stack */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ perspective: '1000px' }}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.src + index}
            className="absolute inset-0 rounded-[32px] overflow-hidden"
            style={{
              ...cardStyle(index),
              border: '1px solid rgba(216,180,160,0.22)',
              boxShadow: '0 20px 60px rgba(44,62,80,0.14)',
            }}
            onClick={() => {
              const isLeft  = (current - 1 + photos.length) % photos.length === index
              const isRight = (current + 1) % photos.length === index
              if (isLeft) prev()
              if (isRight) next()
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              sizes="(max-width: 768px) 100vw, 500px"
            />
            {/* Diploma badge */}
            {photo.diploma && index === current && (
              <div style={{
                position: 'absolute', top: 14, left: 14, zIndex: 4,
                background: 'rgba(216,180,160,0.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 999, padding: '5px 14px',
                fontFamily: 'var(--font-inter)', fontSize: '0.72rem',
                fontWeight: 600, color: '#2C3E50',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {'label' in photo ? (photo as { label: string }).label : 'диплом'}
              </div>
            )}
            {/* Bottom gradient on portrait photos */}
            {!photo.diploma && index === current && (
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(248,249,250,0.6) 0%, transparent 100%)',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Nav arrows + dots */}
      <div className="absolute -bottom-14 left-0 right-0 flex items-center justify-between px-1 z-20">
        <button onClick={prev} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(44,62,80,0.06)',
          border: '1px solid rgba(44,62,80,0.1)',
          color: '#5D6F83', fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#D8B4A0')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(44,62,80,0.1)')}
        >‹</button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === current ? 22 : 6,
                height: 6, borderRadius: 999,
                background: i === current ? '#D8B4A0' : 'rgba(44,62,80,0.18)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={next} style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(44,62,80,0.06)',
          border: '1px solid rgba(44,62,80,0.1)',
          color: '#5D6F83', fontSize: '1rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#D8B4A0')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(44,62,80,0.1)')}
        >›</button>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32" style={{ background: '#F8F9FA', overflowX: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 mb-10 md:mb-20"
        >
          <span style={{ display: 'block', width: '36px', height: '1px', background: '#D8B4A0' }} />
          <span className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: '#D8B4A0', fontFamily: 'var(--font-inter)' }}>
            {about.badge}
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-14 md:gap-20 lg:gap-24 items-start">

          {/* Left column — photo slider */}
          <motion.div
            className="w-full sm:w-[300px] md:w-[360px] lg:w-[400px] flex-shrink-0 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhotoSlider />

            {/* Competency tags — below nav arrows */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-16 md:mt-20"
            >
              {about.tags.map(t => (
                <span key={t.label} className="text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5"
                  style={{ background: t.bg, color: t.color, fontFamily: 'var(--font-inter)', letterSpacing: '0.07em' }}>
                  {t.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — text */}
          <motion.div
            className="flex-1 pt-0 md:pt-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            <motion.h2 variants={staggerItem} className="font-bold mb-8 whitespace-pre-line" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              color: '#2C3E50', lineHeight: 1.08,
            }}>
              {about.title}
            </motion.h2>

            {about.bio.map((para, i) => (
              <motion.p key={i} variants={staggerItem} className="mb-5" style={{
                color: '#5D6F83', fontFamily: 'var(--font-open-sans)',
                fontSize: '1.05rem', lineHeight: 1.85,
              }}>
                {para}
              </motion.p>
            ))}

            <motion.blockquote variants={staggerItem} className="my-10 pl-7"
              style={{ borderLeft: '2px solid #D8B4A0' }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.3rem, 2vw, 1.55rem)',
                fontStyle: 'italic', color: '#4A6FA5', lineHeight: 1.55,
              }}>
                «Я верю, что каждый человек несёт в себе ответы. Моя задача — помочь их услышать.»
              </p>
            </motion.blockquote>

            <motion.div variants={staggerItem} className="rounded-2xl p-6 mt-2" style={{
              background: 'rgba(216,180,160,0.07)',
              border: '1px solid rgba(216,180,160,0.18)',
            }}>
              <p className="text-sm leading-relaxed" style={{
                color: '#5D6F83', fontFamily: 'var(--font-open-sans)', lineHeight: 1.75,
              }}>
                {about.credentials}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
