'use client'

import { motion, type Variants } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { methods as content } from '@/content/methods'

/* ── SVG зарисовки (тёмная тема) ── */

const SketchPalette = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Палитра */}
    <path d="M14 38 Q10 20 24 12 Q38 4 52 14 Q66 24 60 40 Q56 52 44 54 Q38 56 36 50 Q34 44 28 46 Q18 50 14 38Z" opacity="0.85" />
    {/* Пятна краски */}
    <circle cx="24" cy="22" r="3.5" opacity="0.7" />
    <circle cx="36" cy="16" r="3.5" opacity="0.7" />
    <circle cx="48" cy="20" r="3.5" opacity="0.7" />
    <circle cx="54" cy="32" r="3.5" opacity="0.7" />
    <circle cx="50" cy="44" r="3.5" opacity="0.65" />
    {/* Кисть */}
    <path d="M8 62 L24 46" opacity="0.75" strokeWidth="2" />
    <path d="M8 62 Q6 66 10 64 Q14 68 12 62Z" opacity="0.65" />
    <path d="M20 50 L28 42" opacity="0.5" />
  </svg>
)

const SketchBrain = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Полушарие мозга */}
    <path d="M36 60 L36 18 Q36 8 46 10 Q58 12 60 24 Q62 36 54 44 Q50 50 44 52 Q40 54 36 60Z" opacity="0.8" />
    <path d="M36 60 L36 18 Q36 8 26 10 Q14 12 12 24 Q10 36 18 44 Q22 50 28 52 Q32 54 36 60Z" opacity="0.8" />
    {/* Извилины */}
    <path d="M24 24 Q30 20 36 24 Q42 20 48 24" opacity="0.55" />
    <path d="M20 34 Q28 30 36 34 Q44 30 52 34" opacity="0.5" />
    <path d="M22 44 Q30 40 36 44 Q42 40 50 44" opacity="0.45" />
    {/* Стрелки — мысли */}
    <path d="M58 14 Q64 10 66 16" opacity="0.6" strokeWidth="1.3" />
    <path d="M64 10 L66 16 L60 14" opacity="0.6" strokeWidth="1.3" />
    <path d="M60 26 Q66 24 68 30" opacity="0.5" strokeWidth="1.3" />
    <path d="M66 24 L68 30 L62 28" opacity="0.5" strokeWidth="1.3" />
  </svg>
)

const SketchCards = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Карта сзади */}
    <rect x="8" y="16" width="32" height="46" rx="4" opacity="0.5" transform="rotate(-12 24 39)" />
    {/* Карта по центру */}
    <rect x="20" y="14" width="32" height="46" rx="4" opacity="0.65" />
    {/* Карта спереди */}
    <rect x="32" y="10" width="32" height="46" rx="4" opacity="0.8" transform="rotate(10 48 33)" />
    {/* Символ на карте */}
    <path d="M42 28 Q48 24 52 30 Q56 36 50 40 Q44 44 42 38 Q40 32 42 28Z" opacity="0.6" transform="rotate(10 47 34)" />
    <line x1="47" y1="44" x2="47" y2="50" opacity="0.5" transform="rotate(10 47 47)" />
  </svg>
)

const SketchPlant = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {/* Стебель */}
    <path d="M36 62 Q36 48 34 36 Q32 24 36 14" opacity="0.75" />
    {/* Листья */}
    <path d="M34 38 Q22 32 16 22 Q22 20 30 28 Q34 32 34 38Z" opacity="0.8" />
    <path d="M34 30 Q46 24 52 14 Q46 12 38 20 Q34 24 34 30Z" opacity="0.8" />
    <path d="M35 48 Q24 46 18 38 Q24 34 32 42 Q34 44 35 48Z" opacity="0.7" />
    <path d="M35 44 Q46 40 52 32 Q46 28 38 36 Q35 40 35 44Z" opacity="0.7" />
    {/* Капли аромата */}
    <path d="M52 56 Q52 52 54 52 Q56 52 56 56 Q56 60 52 60 Q48 60 48 56 Q48 52 52 52Z" opacity="0.55" />
    <path d="M44 50 Q44 47 46 47 Q47 47 47 50 Q47 53 44 53 Q41 53 41 50Z" opacity="0.45" />
    <path d="M58 48 Q58 46 59.5 46 Q61 46 61 48 Q61 50 58 50Z" opacity="0.4" />
  </svg>
)

const sketches = [SketchPalette, SketchBrain, SketchCards, SketchPlant]

const CornerMark = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 10, left: 10 },
    tr: { top: 10, right: 10, transform: 'rotate(90deg)' },
    bl: { bottom: 10, left: 10, transform: 'rotate(-90deg)' },
    br: { bottom: 10, right: 10, transform: 'rotate(180deg)' },
  }
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      stroke="rgba(216,180,160,0.2)" strokeWidth="1"
      style={{ position: 'absolute', ...map[position] }}
    >
      <path d="M1 13 L1 1 L13 1" />
    </svg>
  )
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: {
      delay: i * 0.14,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

function MethodCard({ item, idx }: { item: typeof content.items[0]; idx: number }) {
  const Sketch = sketches[idx]
  return (
    <motion.div
      custom={idx}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: 'clamp(20px, 4vw, 36px) clamp(18px, 4vw, 32px) clamp(20px, 4vw, 32px)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      {/* Номер */}
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-cormorant)',
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          color: 'rgba(216,180,160,0.6)',
          marginBottom: '16px',
        }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* Заголовок */}
      <h3
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.3rem, 2vw, 1.55rem)',
          fontWeight: 600,
          color: '#F8F9FA',
          lineHeight: 1.2,
          marginBottom: '12px',
        }}
      >
        {item.title}
      </h3>

      {/* Описание */}
      <p
        style={{
          fontFamily: 'var(--font-open-sans)',
          fontSize: '0.9rem',
          color: 'rgba(248,249,250,0.55)',
          lineHeight: 1.75,
        }}
      >
        {item.body}
      </p>

      {/* Зарисовка + линия внизу */}
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ width: '28px', height: '1px', background: 'rgba(216,180,160,0.3)', marginBottom: '4px' }} />
        <div
          style={{
            color: '#D8B4A0',
            opacity: 0.5,
            transform: 'rotate(6deg)',
            pointerEvents: 'none',
            flexShrink: 0,
          }}
        >
          <Sketch />
        </div>
      </div>
    </motion.div>
  )
}

export default function Methods() {
  return (
    <section id="methods" className="py-20 md:py-32" style={{ background: '#1C2B3A' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span style={{ display: 'block', width: '36px', height: '1px', background: 'rgba(216,180,160,0.5)' }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: 'rgba(216,180,160,0.7)', fontFamily: 'var(--font-inter)' }}
            >
              инструменты
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="font-bold flex-shrink-0"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.8rem, 5vw, 4rem)',
                color: '#F8F9FA',
                lineHeight: 1.1,
              }}
            >
              {content.title}
            </h2>
            <p
              className="min-w-0"
              style={{
                color: 'rgba(248,249,250,0.45)',
                maxWidth: '380px',
                fontFamily: 'var(--font-open-sans)',
                lineHeight: 1.75,
                fontSize: '0.97rem',
                flexShrink: 1,
              }}
            >
              {content.subtitle}
            </p>
          </div>
        </motion.div>

        {/* 2×2 сетка: на мобиле 1 колонка, на md+ 2 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {content.items.map((item, i) => (
            <MethodCard key={i} item={item} idx={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
