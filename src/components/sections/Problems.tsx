'use client'

import { motion, type Variants } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { problems } from '@/content/problems'

/* ── SVG зарисовки ── */

const SketchBook = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 56 Q12 16 36 12 Q60 16 60 56" opacity="0.8" />
    <path d="M36 12 L36 58" opacity="0.6" />
    <path d="M22 22 Q28 20 34 22" opacity="0.65" />
    <path d="M22 30 Q28 28 34 30" opacity="0.55" />
    <path d="M22 38 Q28 36 34 38" opacity="0.45" />
    <path d="M38 22 Q44 20 50 22" opacity="0.65" />
    <path d="M38 30 Q44 28 50 30" opacity="0.55" />
    <path d="M38 38 Q44 36 50 38" opacity="0.45" />
    <path d="M50 8 Q54 18 48 28 Q44 22 50 8Z" opacity="0.75" />
    <path d="M48 28 L45 38" opacity="0.6" />
    <path d="M12 56 Q36 60 60 56" opacity="0.65" />
  </svg>
)

const SketchSpiral = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M36 36 Q42 28 48 34 Q54 40 46 46 Q38 52 30 44 Q22 36 28 26 Q34 16 46 20 Q58 24 58 36 Q58 50 44 54 Q30 58 20 48 Q10 38 14 24" opacity="0.85" />
    <path d="M14 24 Q10 18 16 14" opacity="0.65" />
    <line x1="56" y1="18" x2="62" y2="12" opacity="0.55" />
    <line x1="60" y1="20" x2="66" y2="16" opacity="0.45" />
    <circle cx="14" cy="58" r="2" opacity="0.55" />
    <circle cx="58" cy="56" r="2" opacity="0.45" />
  </svg>
)

const SketchDress = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M28 8 Q36 14 44 8" opacity="0.75" />
    <path d="M28 8 L20 24 L10 62 L62 62 L52 24 L44 8" opacity="0.85" />
    <path d="M10 62 Q18 54 22 62" opacity="0.5" />
    <path d="M22 62 Q30 52 34 62" opacity="0.45" />
    <path d="M34 62 Q42 54 46 62" opacity="0.45" />
    <path d="M46 62 Q54 54 62 62" opacity="0.5" />
    <path d="M28 18 Q36 22 44 18" opacity="0.55" />
    <path d="M24 26 Q36 30 48 26" opacity="0.4" />
    <path d="M33 10 Q36 8 39 10 Q36 12 33 10Z" opacity="0.7" />
  </svg>
)

const SketchStorm = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M8 28 Q16 18 24 28 Q32 38 40 28 Q48 18 56 28 Q64 38 70 28" opacity="0.85" />
    <path d="M8 40 Q16 30 24 40 Q32 50 40 40 Q48 30 56 40 Q64 50 70 40" opacity="0.7" />
    <path d="M8 52 Q16 44 24 52 Q32 60 40 52 Q48 44 56 52 Q64 60 70 52" opacity="0.5" />
    <path d="M32 8 L28 22 L34 22 L28 38" opacity="0.75" />
    <path d="M46 12 L43 22 L47 22 L44 32" opacity="0.6" />
    <path d="M16 18 Q18 12 24 14 Q24 8 32 10 Q36 6 40 10 Q46 8 46 14 Q50 16 48 20 L16 20 Z" opacity="0.6" />
  </svg>
)

const sketches = [SketchBook, SketchSpiral, SketchDress, SketchStorm]

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
      stroke="rgba(44,62,80,0.15)" strokeWidth="1"
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
    transition: { delay: i * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

function ProblemCard({ text, idx }: { text: string; idx: number }) {
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
        background: '#FDFAF7',
        border: '1px solid rgba(44,62,80,0.1)',
        borderRadius: '20px',
        padding: 'clamp(20px, 4vw, 36px) clamp(18px, 4vw, 32px) clamp(20px, 4vw, 32px)',
        boxShadow: '0 4px 24px rgba(44,62,80,0.05), inset 0 0 0 1px rgba(255,255,255,0.7)',
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
          color: '#D8B4A0',
          marginBottom: '16px',
        }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* Цитата */}
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
          fontStyle: 'italic',
          color: '#2C3E50',
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>

      {/* Зарисовка + линия в одной строке */}
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ width: '28px', height: '1px', background: 'rgba(216,180,160,0.45)', marginBottom: '4px' }} />
        <div
          style={{
            color: '#2C3E50',
            opacity: 0.45,
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

export default function Problems() {
  return (
    <section id="problems" className="py-20 md:py-32" style={{ background: '#FAF7F4' }}>
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
            <span style={{ display: 'block', width: '36px', height: '1px', background: '#D8B4A0' }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: '#D8B4A0', fontFamily: 'var(--font-inter)' }}
            >
              с этого начинается путь
            </span>
          </div>
          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 5vw, 4rem)',
              color: '#2C3E50',
              lineHeight: 1.1,
            }}
          >
            {problems.title}
          </h2>
          <p
            style={{
              color: '#5D6F83',
              maxWidth: 480,
              fontFamily: 'var(--font-open-sans)',
              lineHeight: 1.75,
            }}
          >
            {problems.subtitle}
          </p>
        </motion.div>

        {/* 2×2 сетка: на мобиле 1 колонка, на md+ 2 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {problems.items.map((text, i) => (
            <ProblemCard key={i} text={text} idx={i} />
          ))}
        </div>

        {/* Итоговая строка */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-base"
          style={{
            color: '#5D6F83',
            fontFamily: 'var(--font-open-sans)',
            fontStyle: 'italic',
          }}
        >
          Если что-то из этого отзывается — мы можем поговорить.
        </motion.p>

      </div>
    </section>
  )
}
