'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { contact } from '@/content/contact'

type Variant = 'light-a' | 'light-b'

export default function Contact({ variant }: { variant?: Variant }) {
  const isLight = variant === 'light-a' || variant === 'light-b'

  const sectionBg = variant === 'light-a'
    ? '#ECF1FA'
    : variant === 'light-b'
      ? '#FDF7F4'
      : '#111D2A'

  const labelColor = isLight
    ? (variant === 'light-a' ? 'rgba(74,111,165,0.85)' : 'rgba(180,120,95,0.90)')
    : 'rgba(216,180,160,0.7)'

  const labelLineColor = isLight
    ? (variant === 'light-a' ? 'rgba(74,111,165,0.40)' : 'rgba(216,180,160,0.65)')
    : 'rgba(216,180,160,0.5)'

  const titleColor = isLight ? '#2C3E50' : '#F8F9FA'
  const bodyColor = isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.48)'
  const contactInfoTextColor = isLight ? 'rgba(44,62,80,0.75)' : 'rgba(248,249,250,0.65)'
  const contactInfoLabelColor = isLight ? 'rgba(44,62,80,0.35)' : 'rgba(248,249,250,0.25)'

  const rightPanelBg = isLight
    ? (variant === 'light-a' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.85)')
    : 'rgba(255,255,255,0.03)'
  const rightPanelBorder = isLight
    ? (variant === 'light-a' ? 'rgba(74,111,165,0.12)' : 'rgba(216,180,160,0.18)')
    : 'rgba(255,255,255,0.07)'

  const botUrl = `https://t.me/${contact.botUsername}`

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden" style={{ background: sectionBg }}>

      {/* Glow */}
      <div className="absolute pointer-events-none" style={{
        bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
        background: isLight
          ? `radial-gradient(circle, ${variant === 'light-a' ? 'rgba(74,111,165,0.06)' : 'rgba(216,180,160,0.10)'} 0%, transparent 65%)`
          : 'radial-gradient(circle, rgba(74,111,165,0.08) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 xl:gap-24 items-start">

          {/* ── Левая колонка ── */}
          <m.div
            className="flex-1"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
          >
            <m.div variants={staggerItem} className="flex items-center gap-4 mb-7">
              <span style={{ display: 'block', width: '36px', height: '1px', background: labelLineColor }} />
              <span className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: labelColor, fontFamily: 'var(--font-inter)' }}>
                начать работу
              </span>
            </m.div>

            <m.h2 variants={staggerItem} className="font-bold mb-6" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 5vw, 4rem)',
              color: titleColor, lineHeight: 1.08,
            }}>
              {contact.title}
            </m.h2>

            <m.p variants={staggerItem} className="mb-8 md:mb-12" style={{
              color: bodyColor, fontFamily: 'var(--font-open-sans)',
              lineHeight: 1.8, maxWidth: 400, fontSize: '1rem',
            }}>
              {contact.subtitle}
            </m.p>

            <m.div variants={staggerItem} className="flex flex-col gap-4 md:gap-5 mb-8 md:mb-12">
              {[
                { text: contact.address, label: 'адрес' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-5">
                  <span style={{
                    display: 'block', width: '20px', height: '1px',
                    background: 'rgba(216,180,160,0.35)', marginTop: '14px', flexShrink: 0,
                  }} />
                  <div>
                    <span className="block text-xs uppercase tracking-[0.12em] mb-1"
                      style={{ color: contactInfoLabelColor, fontFamily: 'var(--font-inter)' }}>
                      {item.label}
                    </span>
                    <span style={{ color: contactInfoTextColor, fontFamily: 'var(--font-open-sans)', fontSize: '0.97rem' }}>
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </m.div>

            <m.div variants={staggerItem} className="flex flex-wrap gap-3 mb-8 md:mb-12">
              {contact.socials.map(s => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-200 hover:opacity-100 hover:-translate-y-0.5"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9999,
                    border: `1px solid ${isLight ? 'rgba(216,180,160,0.30)' : 'rgba(216,180,160,0.18)'}`,
                    background: isLight ? 'rgba(216,180,160,0.08)' : 'rgba(216,180,160,0.06)',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.82rem',
                    color: isLight ? 'rgba(44,62,80,0.70)' : 'rgba(216,180,160,0.70)',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>{s.sublabel}</span>
                  <span style={{ fontWeight: 500 }}>{s.label}</span>
                </a>
              ))}
            </m.div>

            <m.p variants={staggerItem} style={{
              fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
              fontStyle: 'italic', color: isLight ? 'rgba(44,62,80,0.55)' : 'rgba(216,180,160,0.5)', lineHeight: 1.55, maxWidth: 360,
            }}>
              {contact.closing}
            </m.p>
          </m.div>

          {/* ── Правая колонка: бот ── */}
          <m.div
            className="w-full lg:w-[420px] flex-shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-3xl" style={{
              padding: 'clamp(28px, 5vw, 44px)',
              background: rightPanelBg,
              border: `1px solid ${rightPanelBorder}`,
              backdropFilter: 'blur(16px)',
              boxShadow: isLight ? '0 4px 32px rgba(0,0,0,0.06)' : 'none',
              textAlign: 'center',
            }}>

              {/* Заголовок */}
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: labelColor,
                marginBottom: 12,
              }}>
                запись через telegram
              </p>
              <h3 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
                fontWeight: 600,
                color: titleColor,
                lineHeight: 1.2,
                marginBottom: 10,
              }}>
                Напишите боту
              </h3>
              <p style={{
                fontFamily: 'var(--font-open-sans)',
                fontSize: '0.9rem',
                color: bodyColor,
                lineHeight: 1.7,
                marginBottom: 32,
              }}>
                Бот задаст пару вопросов о вашем запросе и передаст его мне.
                Я напишу вам лично в ближайшее время.
              </p>

              {/* QR-код */}
              <div className="flex justify-center mb-8">
                <div style={{
                  padding: 12,
                  borderRadius: 16,
                  background: '#fff',
                  border: `1px solid ${isLight ? 'rgba(44,62,80,0.10)' : 'rgba(255,255,255,0.12)'}`,
                  display: 'inline-block',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}>
                  <Image
                    src="/qr-bot.png"
                    alt="QR-код Telegram-бота"
                    width={160}
                    height={160}
                    style={{ display: 'block', borderRadius: 8 }}
                  />
                </div>
              </div>

              {/* Кнопка */}
              <a
                href={botUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  display: 'flex',
                  padding: '14px 24px',
                  borderRadius: 999,
                  background: 'linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)',
                  color: '#fff',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.97rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(42,171,238,0.35)',
                  letterSpacing: '0.01em',
                  minHeight: 52,
                }}
              >
                {/* Telegram icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 13.802l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.868.757z"/>
                </svg>
                Написать боту
              </a>

              {/* Подпись */}
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.75rem',
                color: isLight ? 'rgba(44,62,80,0.30)' : 'rgba(248,249,250,0.25)',
                marginTop: 14,
              }}>
                или найдите <span style={{ fontWeight: 600 }}>@{contact.botUsername}</span> в поиске Telegram
              </p>

            </div>
          </m.div>

        </div>
      </div>
    </section>
  )
}
