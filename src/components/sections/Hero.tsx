'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { hero } from '@/content/hero'
import { HolographicButton } from '@/components/ui/holographic-button'

type Variant = 'light-a' | 'light-b'

interface HeroProps {
  variant?: Variant
}

export default function Hero({ variant }: HeroProps) {
  const isLight = variant === 'light-a' || variant === 'light-b'

  const t = {
    bg: variant === 'light-a'
      ? '#ECF1FA'
      : variant === 'light-b'
        ? '#FDF7F4'
        : '#111D2A',
    bottomFade: variant === 'light-a'
      ? 'linear-gradient(to bottom, transparent, #ECF1FA)'
      : variant === 'light-b'
        ? 'linear-gradient(to bottom, transparent, #FDF7F4)'
        : 'linear-gradient(to bottom, transparent, #111D2A)',
    glowBlob1: variant === 'light-a'
      ? 'radial-gradient(circle, rgba(74,111,165,0.15) 0%, transparent 70%)'
      : variant === 'light-b'
        ? 'radial-gradient(circle, rgba(216,180,160,0.18) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(74,111,165,0.12) 0%, transparent 70%)',
    glowBlob2: variant === 'light-a'
      ? 'radial-gradient(circle, rgba(74,111,165,0.10) 0%, transparent 70%)'
      : variant === 'light-b'
        ? 'radial-gradient(circle, rgba(216,180,160,0.14) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(216,180,160,0.08) 0%, transparent 70%)',
    title: isLight ? '#2C3E50' : '#F8F9FA',
    body: isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.55)',
    label: isLight
      ? (variant === 'light-a' ? 'rgba(74,111,165,0.85)' : 'rgba(180,120,95,0.90)')
      : 'rgba(216,180,160,0.75)',
    labelLine: isLight
      ? (variant === 'light-a' ? 'rgba(74,111,165,0.40)' : 'rgba(216,180,160,0.65)')
      : 'rgba(216,180,160,0.5)',
    tagText: isLight ? 'rgba(44,62,80,0.45)' : 'rgba(248,249,250,0.35)',
    tagLine: isLight ? 'rgba(44,62,80,0.18)' : 'rgba(248,249,250,0.15)',
    secondaryBtnBorder: isLight ? 'rgba(44,62,80,0.20)' : 'rgba(248,249,250,0.18)',
    secondaryBtnColor: isLight ? 'rgba(44,62,80,0.75)' : 'rgba(248,249,250,0.75)',
    secondaryBtnBg: isLight ? 'rgba(44,62,80,0.04)' : 'rgba(255,255,255,0.04)',
    scrollLabel: isLight ? 'rgba(44,62,80,0.25)' : 'rgba(248,249,250,0.2)',
    badgeBg: isLight ? 'rgba(255,255,255,0.85)' : 'rgba(17,29,42,0.7)',
    badgeText: isLight ? 'rgba(44,62,80,0.75)' : 'rgba(248,249,250,0.8)',
    badgeBorder: isLight ? 'rgba(44,62,80,0.12)' : 'rgba(216,180,160,0.2)',
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{ background: t.bg, overflow: 'hidden' }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute pointer-events-none" style={{
        top: '-10%', right: '0%', width: '50vw', height: '50vw',
        background: t.glowBlob1,
        filter: 'blur(60px)',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '5%', left: '0%', width: '40vw', height: '40vw',
        background: t.glowBlob2,
        filter: 'blur(80px)',
      }} />
      {/* Warm glow behind photo */}
      <div className="absolute pointer-events-none hidden lg:block" style={{
        top: '10%', right: '-5%', width: '45vw', height: '80vh',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(216,180,160,0.07) 0%, transparent 65%)',
        filter: 'blur(40px)',
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: t.bottomFade }} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-[clamp(2rem,5vw,5rem)] pt-28 pb-20 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

        {/* ── Photo column (mobile: top, desktop: right) ── */}
        <m.div
          className="relative flex-shrink-0 w-full lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 320, margin: '0 auto' }}
        >
          <div className="relative rounded-[24px] overflow-hidden" style={{
            border: '1px solid rgba(216,180,160,0.2)',
            boxShadow: isLight ? '0 20px 60px rgba(0,0,0,0.12)' : '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <Image
              src="/hero-photo.jpg"
              alt="Юлия — психолог, арт-терапевт"
              width={640}
              height={480}
              priority
              sizes="(max-width: 1024px) 320px, 0px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: isLight
                ? 'linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(to right, rgba(17,29,42,0.3) 0%, transparent 30%, transparent 70%, rgba(17,29,42,0.2) 100%)',
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{
              background: isLight
                ? `linear-gradient(to top, ${variant === 'light-b' ? 'rgba(253,247,244,0.6)' : 'rgba(236,241,250,0.6)'} 0%, transparent 100%)`
                : 'linear-gradient(to top, rgba(17,29,42,0.5) 0%, transparent 100%)',
            }} />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: t.badgeBg, backdropFilter: 'blur(12px)',
                border: `1px solid ${t.badgeBorder}`,
                borderRadius: 999, padding: '6px 12px',
              }}>
                <span style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#D8B4A0', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: t.badgeText, fontWeight: 500 }}>
                  Юлия · психолог, арт-терапевт
                </span>
              </div>
            </div>
          </div>
        </m.div>

        {/* ── Text column ── */}
        <m.div
          className="flex-1 max-w-2xl lg:max-w-none w-full"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <m.div variants={staggerItem} className="mb-7 sm:mb-10">
            <span className="inline-flex items-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em]"
              style={{ color: t.label, fontFamily: 'var(--font-inter)' }}>
              <span style={{ display: 'block', width: '20px', height: '1px', background: t.labelLine, flexShrink: 0 }} />
              {hero.badge}
              <span style={{ display: 'block', width: '20px', height: '1px', background: t.labelLine, flexShrink: 0 }} />
            </span>
          </m.div>

          <m.h1 variants={staggerItem} className="font-bold mb-6 sm:mb-8" style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
            color: t.title, lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>
            {hero.title.line1}
            <br />
            <em style={{ color: '#D8B4A0', fontStyle: 'italic', fontWeight: 700 }}>
              {hero.title.line2}
            </em>
          </m.h1>

          <m.p variants={staggerItem} className="mb-8 sm:mb-12" style={{
            color: t.body, maxWidth: '420px',
            fontFamily: 'var(--font-open-sans)', lineHeight: 1.8,
            fontSize: 'clamp(0.9rem, 2.2vw, 1.125rem)',
          }}>
            {hero.subtitle}
          </m.p>

          <m.div variants={staggerItem} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14">
            <HolographicButton href="#contact"
              className="inline-flex items-center justify-center font-semibold rounded-full"
              style={{
                background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
                color: '#fff', padding: '14px 28px', fontSize: '0.95rem',
                boxShadow: '0 6px 30px rgba(74,111,165,0.45)',
                fontFamily: 'var(--font-inter)', letterSpacing: '0.01em',
                borderRadius: '9999px', display: 'inline-flex',
                minHeight: '44px',
              }}>{hero.cta.primary}</HolographicButton>
            <HolographicButton href="#about"
              className="inline-flex items-center justify-center font-medium rounded-full"
              style={{
                border: `1px solid ${t.secondaryBtnBorder}`,
                color: t.secondaryBtnColor, padding: '14px 28px',
                fontSize: '0.95rem', fontFamily: 'var(--font-inter)',
                letterSpacing: '0.01em', backdropFilter: 'blur(8px)',
                background: t.secondaryBtnBg, borderRadius: '9999px',
                display: 'inline-flex', minHeight: '44px',
              }}>{hero.cta.secondary}</HolographicButton>
          </m.div>

          <m.div variants={staggerItem} className="flex flex-wrap items-center gap-x-0 gap-y-2">
            {hero.tags.map((tag, i) => (
              <span key={tag} className="flex items-center">
                <span className="text-sm" style={{ color: t.tagText, fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }}>
                  {tag}
                </span>
                {i < hero.tags.length - 1 && (
                  <span style={{ width: '1px', height: '12px', background: t.tagLine, display: 'block', margin: '0 10px', flexShrink: 0 }} />
                )}
              </span>
            ))}
          </m.div>
        </m.div>

        {/* ── Photo column (desktop: right) ── */}
        <m.div
          className="relative flex-shrink-0 w-full lg:w-auto hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 480 }}
        >
          {/* Decorative peach ring behind photo */}
          <div className="absolute pointer-events-none" style={{
            inset: '-20px',
            borderRadius: '44px',
            background: 'radial-gradient(ellipse at 60% 30%, rgba(216,180,160,0.13) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }} />

          {/* Outer decorative frame offset */}
          <div className="absolute pointer-events-none" style={{
            top: 16, left: 16, right: -16, bottom: -16,
            borderRadius: '36px',
            border: '1px solid rgba(216,180,160,0.12)',
          }} />

          {/* Photo frame */}
          <div className="relative rounded-[32px] overflow-hidden" style={{
            border: '1px solid rgba(216,180,160,0.2)',
            boxShadow: isLight
              ? '0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.4)'
              : '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)',
          }}>
            <Image
              src="/hero-photo.jpg"
              alt="Юлия — психолог, арт-терапевт"
              width={800}
              height={600}
              priority
              sizes="(max-width: 1280px) 45vw, 480px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />

            {/* Gradient mask — left edge blends into bg */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: isLight
                ? 'linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(to right, rgba(17,29,42,0.35) 0%, transparent 25%, transparent 75%, rgba(17,29,42,0.2) 100%)',
            }} />
            {/* Gradient mask — bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{
              background: isLight
                ? `linear-gradient(to top, ${variant === 'light-b' ? 'rgba(253,247,244,0.5)' : 'rgba(236,241,250,0.5)'} 0%, transparent 100%)`
                : 'linear-gradient(to top, rgba(17,29,42,0.55) 0%, transparent 100%)',
            }} />

            {/* Floating name badge */}
            <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: t.badgeBg, backdropFilter: 'blur(12px)',
                border: `1px solid ${t.badgeBorder}`,
                borderRadius: 999, padding: '8px 16px',
              }}>
                <span style={{
                  display: 'block', width: 8, height: 8, borderRadius: '50%',
                  background: '#D8B4A0', flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: '0.8rem',
                  color: t.badgeText, fontWeight: 500,
                  letterSpacing: '0.02em',
                }}>Юлия · психолог, арт-терапевт</span>
              </div>
            </div>
          </div>

          {/* Decorative corner marks */}
          {(['tl', 'tr'] as const).map(pos => (
            <svg key={pos} width="18" height="18" viewBox="0 0 18 18"
              style={{
                position: 'absolute',
                top: pos === 'tl' ? -8 : -8,
                left: pos === 'tl' ? -8 : undefined,
                right: pos === 'tr' ? -8 : undefined,
                transform: pos === 'tr' ? 'scaleX(-1)' : 'none',
                opacity: 0.5,
              }}>
              <path d="M1 17 L1 1 L17 1" stroke="#D8B4A0" strokeWidth="1.5" fill="none" />
            </svg>
          ))}
        </m.div>

      </div>

      {/* Scroll indicator */}
      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-[0.18em]"
          style={{ color: t.scrollLabel, fontFamily: 'var(--font-inter)' }}>
          {hero.scroll}
        </span>
        <m.div
          style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(216,180,160,0.5), transparent)' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </m.div>
    </section>
  )
}
