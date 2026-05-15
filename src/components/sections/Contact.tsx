'use client'

import { useState, useEffect, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import { contact } from '@/content/contact'

/* ── Calendly types ── */
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: {
        url: string
        prefill?: { name?: string; customAnswers?: Record<string, string> }
      }) => void
    }
  }
}

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? '#'

/* ── Time slots ── */
const SLOTS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00']

const MONTH_RU = [
  'Январь','Февраль','Март','Апрель','Май','Июнь',
  'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',
]
const DAY_RU = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

/* ── Helpers ── */
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function formatDateRu(d: Date) {
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

type Variant = 'light-a' | 'light-b'

/* ── Calendar ── */
function BookingCalendar({
  onSelect,
  variant,
}: {
  onSelect: (date: Date, time: string) => void
  variant?: Variant
}) {
  const isLight = variant === 'light-a' || variant === 'light-b'
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = new Date(year, month, 1).getDay() // 0=Sun
  const startOffset = (firstDow + 6) % 7 // Mon=0

  function prevMonth() {
    setSelectedDate(null); setSelectedTime(null)
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    setSelectedDate(null); setSelectedTime(null)
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  function pickDay(day: number) {
    const d = new Date(year, month, day)
    if (d < today || d.getDay() === 0) return
    setSelectedDate(d); setSelectedTime(null)
  }

  function pickTime(t: string) {
    setSelectedTime(t)
    if (selectedDate) onSelect(selectedDate, t)
  }

  const canPrev = !(year === today.getFullYear() && month === today.getMonth())

  const navColor = isLight ? 'rgba(44,62,80,0.65)' : undefined
  const monthYearColor = isLight ? 'rgba(44,62,80,0.90)' : 'rgba(248,249,250,0.85)'
  const dayLabelColor = isLight ? 'rgba(44,62,80,0.35)' : 'rgba(248,249,250,0.25)'
  const stepDividerBg = isLight ? 'rgba(44,62,80,0.08)' : 'rgba(255,255,255,0.07)'

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          disabled={!canPrev}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: canPrev ? 'rgba(216,180,160,0.12)' : 'transparent',
            color: canPrev
              ? (navColor ?? 'rgba(248,249,250,0.6)')
              : (isLight ? 'rgba(44,62,80,0.20)' : 'rgba(248,249,250,0.15)'),
            border: 'none', cursor: canPrev ? 'pointer' : 'default',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >‹</button>
        <span style={{
          fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', fontWeight: 600,
          color: monthYearColor,
        }}>
          {MONTH_RU[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(216,180,160,0.12)',
            color: navColor ?? 'rgba(248,249,250,0.6)',
            border: 'none', cursor: 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >›</button>
      </div>

      {/* Day names */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: 4 }}>
        {DAY_RU.map(d => (
          <div key={d} style={{
            textAlign: 'center', fontSize: '0.7rem', fontFamily: 'var(--font-inter)',
            color: dayLabelColor, paddingBottom: 4,
            fontWeight: 600, letterSpacing: '0.05em',
          }}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const date = new Date(year, month, day)
          const isPast = date < today
          const isSun = date.getDay() === 0
          const disabled = isPast || isSun
          const isSelected = selectedDate !== null && isSameDay(date, selectedDate)
          const isToday = isSameDay(date, today)

          return (
            <button
              key={day}
              onClick={() => pickDay(day)}
              disabled={disabled}
              style={{
                width: '100%', aspectRatio: '1', borderRadius: '50%',
                border: isToday && !isSelected ? '1px solid rgba(216,180,160,0.35)' : 'none',
                background: isSelected
                  ? '#D8B4A0'
                  : 'transparent',
                color: disabled
                  ? (isLight ? 'rgba(44,62,80,0.18)' : 'rgba(248,249,250,0.12)')
                  : isSelected
                    ? '#111D2A'
                    : (isLight ? 'rgba(44,62,80,0.75)' : 'rgba(248,249,250,0.7)'),
                fontSize: '0.82rem', fontFamily: 'var(--font-inter)',
                fontWeight: isSelected ? 700 : 400,
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >{day}</button>
          )
        })}
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {selectedDate && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: 'hidden', marginTop: 20 }}
          >
            <div style={{
              height: 1,
              background: stepDividerBg,
              marginBottom: 16,
            }} />
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 600,
              color: 'rgba(216,180,160,0.6)', textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: 10,
            }}>
              {formatDateRu(selectedDate)}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SLOTS.map(t => {
                const active = t === selectedTime
                return (
                  <button
                    key={t}
                    onClick={() => pickTime(t)}
                    style={{
                      padding: '6px 14px', borderRadius: 999,
                      border: `1px solid ${active ? '#D8B4A0' : (isLight ? 'rgba(44,62,80,0.15)' : 'rgba(255,255,255,0.12)')}`,
                      background: active ? 'rgba(216,180,160,0.18)' : 'transparent',
                      color: active ? '#D8B4A0' : (isLight ? 'rgba(44,62,80,0.60)' : 'rgba(248,249,250,0.55)'),
                      fontFamily: 'var(--font-inter)', fontSize: '0.82rem',
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}
                  >{t}</button>
                )
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Input style helper ── */
const inputBase = (focused: boolean, isLight: boolean): React.CSSProperties => ({
  background: isLight
    ? (focused ? 'rgba(44,62,80,0.06)' : 'rgba(44,62,80,0.03)')
    : (focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)'),
  border: `1px solid ${focused ? 'rgba(216,180,160,0.35)' : (isLight ? 'rgba(44,62,80,0.12)' : 'rgba(255,255,255,0.08)')}`,
  borderRadius: 14,
  color: isLight ? '#2C3E50' : '#F8F9FA',
  padding: '14px 18px',
  fontSize: '0.93rem',
  width: '100%',
  outline: 'none',
  fontFamily: 'var(--font-open-sans)',
  transition: 'border-color 0.2s, background 0.2s',
  resize: 'none' as const,
})

/* ── Main component ── */
export default function Contact({ variant }: { variant?: Variant }) {
  type Step = 'calendar' | 'form' | 'success'
  const [step, setStep] = useState<Step>('calendar')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', concern: '' })
  const [focused, setFocused] = useState<string | null>(null)
  const [calendlyReady, setCalendlyReady] = useState(false)

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

  const stepIndicatorSubColor = isLight ? 'rgba(44,62,80,0.30)' : 'rgba(248,249,250,0.25)'
  const stepDividerBg = isLight ? 'rgba(44,62,80,0.08)' : 'rgba(255,255,255,0.08)'
  const stepSubtitleColor = isLight ? 'rgba(44,62,80,0.55)' : 'rgba(248,249,250,0.55)'
  const calendarNoticeColor = isLight ? 'rgba(44,62,80,0.25)' : 'rgba(248,249,250,0.2)'

  /* listen for Calendly booking confirmed */
  const handleCalendlyEvent = useCallback((e: MessageEvent) => {
    if (e.data?.event === 'calendly.event_scheduled') {
      setStep('success')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleCalendlyEvent)
    const t = setInterval(() => {
      if (window.Calendly) { setCalendlyReady(true); clearInterval(t) }
    }, 300)
    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
      clearInterval(t)
    }
  }, [handleCalendlyEvent])

  function openCalendly() {
    if (!window.Calendly || CALENDLY_URL === '#') return
    const dateStr = selectedDate ? formatDateRu(selectedDate) : ''
    window.Calendly.initPopupWidget({
      url: CALENDLY_URL,
      prefill: {
        name: form.name,
        customAnswers: {
          a1: [
            dateStr && selectedTime ? `Предпочтительное время: ${dateStr}, ${selectedTime}` : '',
            form.concern ? `Запрос: ${form.concern}` : '',
          ].filter(Boolean).join('\n'),
        },
      },
    })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    openCalendly()
  }

  const canProceed = selectedDate !== null && selectedTime !== null

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

          {/* Left column */}
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

          {/* Right: booking card */}
          <m.div
            className="w-full lg:w-[480px] flex-shrink-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-3xl" style={{
              padding: 'clamp(20px, 5vw, 40px)',
              background: rightPanelBg,
              border: `1px solid ${rightPanelBorder}`,
              backdropFilter: 'blur(16px)',
              minHeight: 420,
              boxShadow: isLight ? '0 4px 32px rgba(0,0,0,0.06)' : 'none',
            }}>

              <AnimatePresence mode="wait">

                {/* ── Step 1: Calendar ── */}
                {step === 'calendar' && (
                  <m.div key="calendar"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#D8B4A0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700, color: '#111D2A', fontFamily: 'var(--font-inter)',
                      }}>1</div>
                      <div style={{ flex: 1, height: 1, background: stepDividerBg }} />
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        border: `1px solid ${isLight ? 'rgba(44,62,80,0.15)' : 'rgba(255,255,255,0.12)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', color: stepIndicatorSubColor, fontFamily: 'var(--font-inter)',
                      }}>2</div>
                    </div>

                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem',
                      fontStyle: 'italic', color: stepSubtitleColor, marginBottom: 20,
                    }}>
                      Выберите удобный день и время
                    </p>

                    <BookingCalendar onSelect={(d, t) => {
                      setSelectedDate(d); setSelectedTime(t)
                    }} variant={variant} />

                    {/* Next button */}
                    <m.div
                      animate={{ opacity: canProceed ? 1 : 0, y: canProceed ? 0 : 8 }}
                      transition={{ duration: 0.25 }}
                      style={{ marginTop: 24, pointerEvents: canProceed ? 'auto' : 'none' }}
                    >
                      <button
                        onClick={() => setStep('form')}
                        style={{
                          width: '100%', padding: '14px 0', borderRadius: 999,
                          background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
                          color: '#fff', border: 'none', cursor: 'pointer',
                          fontFamily: 'var(--font-inter)', fontSize: '0.93rem', fontWeight: 600,
                          boxShadow: '0 8px 28px rgba(74,111,165,0.35)',
                          letterSpacing: '0.02em',
                          transition: 'opacity 0.2s, box-shadow 0.2s',
                          minHeight: '44px',
                        }}
                      >
                        Продолжить →
                      </button>
                    </m.div>
                  </m.div>
                )}

                {/* ── Step 2: Form ── */}
                {step === 'form' && (
                  <m.div key="form"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Step indicator */}
                    <div className="flex items-center gap-3 mb-6">
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        border: '1px solid rgba(216,180,160,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', color: 'rgba(216,180,160,0.5)', fontFamily: 'var(--font-inter)',
                      }}>1</div>
                      <div style={{ flex: 1, height: 1, background: 'rgba(216,180,160,0.3)' }} />
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#D8B4A0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.7rem', fontWeight: 700, color: '#111D2A', fontFamily: 'var(--font-inter)',
                      }}>2</div>
                    </div>

                    {/* Selected date/time pill */}
                    {selectedDate && selectedTime && (
                      <div
                        className="flex items-center gap-3 mb-5 cursor-pointer group"
                        onClick={() => setStep('calendar')}
                        style={{
                          background: 'rgba(216,180,160,0.08)',
                          border: '1px solid rgba(216,180,160,0.2)',
                          borderRadius: 999, padding: '8px 16px',
                          display: 'inline-flex',
                        }}
                      >
                        <span style={{
                          color: '#D8B4A0', fontFamily: 'var(--font-inter)',
                          fontSize: '0.82rem', fontWeight: 500,
                        }}>
                          {formatDateRu(selectedDate)}, {selectedTime}
                        </span>
                        <span style={{ color: 'rgba(216,180,160,0.4)', fontSize: '0.75rem' }} className="group-hover:text-[#D8B4A0] transition-colors">
                          изменить
                        </span>
                      </div>
                    )}

                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem',
                      fontStyle: 'italic', color: stepSubtitleColor, marginBottom: 20,
                    }}>
                      Расскажите немного о себе
                    </p>

                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                      <input
                        required
                        type="text"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={inputBase(focused === 'name', isLight)}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Телефон или Telegram"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        style={inputBase(focused === 'phone', isLight)}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused(null)}
                      />
                      <textarea
                        rows={4}
                        placeholder="С чем пришли? Опишите коротко свой запрос"
                        value={form.concern}
                        onChange={e => setForm(f => ({ ...f, concern: e.target.value }))}
                        style={{ ...inputBase(focused === 'concern', isLight), resize: 'none' }}
                        onFocus={() => setFocused('concern')}
                        onBlur={() => setFocused(null)}
                      />

                      <button
                        type="submit"
                        disabled={!calendlyReady && CALENDLY_URL !== '#'}
                        style={{
                          width: '100%', padding: '14px 0', borderRadius: 999, marginTop: 4,
                          background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
                          color: '#fff', border: 'none', cursor: 'pointer',
                          fontFamily: 'var(--font-inter)', fontSize: '0.93rem', fontWeight: 600,
                          boxShadow: '0 8px 28px rgba(74,111,165,0.35)',
                          letterSpacing: '0.02em', opacity: 1,
                          transition: 'opacity 0.2s',
                          minHeight: '44px',
                        }}
                      >
                        Открыть календарь бронирования
                      </button>

                      <p style={{
                        textAlign: 'center', color: calendarNoticeColor,
                        fontFamily: 'var(--font-inter)', fontSize: '0.73rem', marginTop: 2,
                      }}>
                        Откроется окно Calendly для выбора финального слота
                      </p>
                    </form>
                  </m.div>
                )}

                {/* ── Success ── */}
                {step === 'success' && (
                  <m.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center"
                    style={{ minHeight: 360 }}
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: 'rgba(216,180,160,0.1)',
                      border: '1px solid rgba(216,180,160,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 24,
                    }}>
                      <span style={{ color: '#D8B4A0', fontSize: '1.6rem' }}>✓</span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontSize: '1.7rem',
                      color: '#D8B4A0', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.2,
                    }}>
                      Встреча забронирована
                    </p>
                    <p style={{
                      color: isLight ? 'rgba(44,62,80,0.50)' : 'rgba(248,249,250,0.4)',
                      fontFamily: 'var(--font-open-sans)',
                      fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 300,
                    }}>
                      Подтверждение придёт на вашу почту. До встречи!
                    </p>
                  </m.div>
                )}

              </AnimatePresence>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  )
}
