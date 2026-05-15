'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { about } from '@/content/about'

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32" style={{ background: '#F8F9FA', overflowX: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Badge */}
        <m.div
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
        </m.div>

        <div className="flex flex-col md:flex-row gap-14 md:gap-20 lg:gap-24 items-start">

          {/* Left column — photo slider */}
          <m.div
            className="w-full sm:w-[300px] md:w-[360px] lg:w-[400px] flex-shrink-0 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Static portrait photo */}
            <div className="relative" style={{
              aspectRatio: '3/4',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid rgba(216,180,160,0.22)',
              boxShadow: '0 20px 60px rgba(44,62,80,0.14)',
            }}>
              <Image
                src="/about-1.jpg"
                alt="Юлия"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(248,249,250,0.6) 0%, transparent 100%)',
              }} />
            </div>

            {/* Competency tags */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-6 md:mt-8"
            >
              {about.tags.map(t => (
                <span key={t.label} className="text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5"
                  style={{ background: t.bg, color: t.color, fontFamily: 'var(--font-inter)', letterSpacing: '0.07em' }}>
                  {t.label}
                </span>
              ))}
            </m.div>
          </m.div>

          {/* Right column — text */}
          <m.div
            className="flex-1 pt-0 md:pt-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            <m.h2 variants={staggerItem} className="font-bold mb-8 whitespace-pre-line" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              color: '#2C3E50', lineHeight: 1.08,
            }}>
              {about.title}
            </m.h2>

            {about.bio.map((para, i) => (
              <m.p key={i} variants={staggerItem} className="mb-5" style={{
                color: '#5D6F83', fontFamily: 'var(--font-open-sans)',
                fontSize: '1.05rem', lineHeight: 1.85,
              }}>
                {para}
              </m.p>
            ))}

            <m.blockquote variants={staggerItem} className="my-10 pl-7"
              style={{ borderLeft: '2px solid #D8B4A0' }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.3rem, 2vw, 1.55rem)',
                fontStyle: 'italic', color: '#4A6FA5', lineHeight: 1.55,
              }}>
                «Я верю, что каждый человек несёт в себе ответы. Моя задача — помочь их услышать.»
              </p>
            </m.blockquote>

            <m.div variants={staggerItem} className="rounded-2xl p-6 mt-2" style={{
              background: 'rgba(216,180,160,0.07)',
              border: '1px solid rgba(216,180,160,0.18)',
            }}>
              <p className="text-sm leading-relaxed" style={{
                color: '#5D6F83', fontFamily: 'var(--font-open-sans)', lineHeight: 1.75,
              }}>
                {about.credentials}
              </p>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
