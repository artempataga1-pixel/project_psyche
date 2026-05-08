'use client'

import { motion, type Variants } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { formats as content } from '@/content/formats'

/* ── SVG зарисовки ── */

const SketchSession = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="26" cy="18" r="7" opacity="0.8" />
    <path d="M14 46 Q14 32 26 32 Q38 32 38 46" opacity="0.75" />
    <path d="M8 54 L8 48 Q8 44 12 44 L60 44 Q64 44 64 48 L64 54" opacity="0.7" />
    <path d="M8 54 Q8 58 12 58 L60 58 Q64 58 64 54" opacity="0.7" />
    <line x1="8" y1="50" x2="64" y2="50" opacity="0.4" />
    <path d="M46 28 Q46 18 58 18 Q68 18 68 26 Q68 34 58 34 Q52 34 48 30" opacity="0.65" />
    <circle cx="46" cy="31" r="1.5" opacity="0.55" />
    <circle cx="44" cy="34" r="1" opacity="0.45" />
    <path d="M58 22 L59 25 L62 25 L59.5 27 L60.5 30 L58 28 L55.5 30 L56.5 27 L54 25 L57 25 Z" opacity="0.5" />
  </svg>
)

const SketchCircle = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="36" cy="36" r="22" opacity="0.35" strokeDasharray="3 4" />
    <circle cx="36" cy="10" r="4" opacity="0.75" />
    <path d="M30 22 Q36 18 42 22" opacity="0.6" />
    <circle cx="60" cy="24" r="4" opacity="0.75" />
    <path d="M52 34 Q56 28 62 32" opacity="0.6" />
    <circle cx="60" cy="50" r="4" opacity="0.75" />
    <path d="M52 46 Q56 52 62 48" opacity="0.6" />
    <circle cx="36" cy="62" r="4" opacity="0.75" />
    <path d="M30 52 Q36 56 42 52" opacity="0.6" />
    <circle cx="12" cy="50" r="4" opacity="0.75" />
    <circle cx="12" cy="24" r="4" opacity="0.75" />
    <circle cx="36" cy="36" r="6" opacity="0.5" />
    <path d="M36 30 L36 42 M30 36 L42 36" opacity="0.4" />
  </svg>
)

const SketchMap = () => (
  <svg width="88" height="88" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18 Q10 12 16 12 L56 12 Q62 12 62 18 L62 58 Q62 64 56 64 L16 64 Q10 64 10 58 Z" opacity="0.7" />
    <path d="M10 18 Q16 20 22 18 Q22 12 16 12" opacity="0.5" />
    <path d="M62 18 Q56 20 50 18 Q50 12 56 12" opacity="0.5" />
    <path d="M20 52 Q24 44 20 36 Q16 28 24 22 Q32 16 36 24 Q40 32 48 28 Q56 24 54 36 Q52 44 56 50" opacity="0.65" strokeDasharray="2 3" />
    <circle cx="20" cy="52" r="3" opacity="0.75" />
    <circle cx="36" cy="24" r="3" opacity="0.65" />
    <circle cx="56" cy="50" r="3" opacity="0.75" />
    <path d="M44 54 L48 46 L52 54 L48 52 Z" opacity="0.6" />
  </svg>
)

const sketches = [SketchSession, SketchCircle, SketchMap]

const CornerMark = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const map: Record<string, React.CSSProperties> = {
    tl: { top: 10, left: 10 },
    tr: { top: 10, right: 10, transform: 'rotate(90deg)' },
    bl: { bottom: 10, left: 10, transform: 'rotate(-90deg)' },
    br: { bottom: 10, right: 10, transform: 'rotate(180deg)' },
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
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
    transition: {
      delay: i * 0.14,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export default function Formats() {
  return (
    <section id="formats" className="py-20 md:py-32" style={{ background: '#FAF7F4' }}>
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
            <span className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: '#D8B4A0', fontFamily: 'var(--font-inter)' }}>
              как мы работаем
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-bold flex-shrink-0" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 5vw, 4rem)',
              color: '#2C3E50',
              lineHeight: 1.1,
            }}>
              {content.title}
            </h2>
            <p className="min-w-0" style={{
              color: '#5D6F83',
              maxWidth: '360px',
              fontFamily: 'var(--font-open-sans)',
              lineHeight: 1.75,
              fontSize: '0.97rem',
              flexShrink: 1,
            }}>
              {content.subtitle}
            </p>
          </div>
        </motion.div>

        {/* 3 равные карточки: мобиле 1 кол, sm 2 кол, md 3 кол */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {content.items.map((item, idx) => {
            const Sketch = sketches[idx]
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative flex flex-col"
                style={{
                  background: '#FDFAF7',
                  border: '1px solid rgba(44,62,80,0.1)',
                  borderRadius: '20px',
                  padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 28px) clamp(18px, 4vw, 28px)',
                  boxShadow: '0 4px 24px rgba(44,62,80,0.05), inset 0 0 0 1px rgba(255,255,255,0.7)',
                }}
              >
                <CornerMark position="tl" />
                <CornerMark position="tr" />
                <CornerMark position="bl" />
                <CornerMark position="br" />

                {/* Номер */}
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  color: '#D8B4A0',
                  marginBottom: '16px',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Заголовок */}
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                  fontWeight: 600,
                  color: '#2C3E50',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                }}>
                  {item.title}
                </h3>

                {/* Описание */}
                <p style={{
                  fontFamily: 'var(--font-open-sans)',
                  fontSize: '0.88rem',
                  color: '#5D6F83',
                  lineHeight: 1.75,
                  flex: 1,
                }}>
                  {item.desc}
                </p>

                {/* Зарисовка + деталь */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: '28px', height: '1px', background: 'rgba(216,180,160,0.45)', marginBottom: '8px' }} />
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#D8B4A0',
                    }}>
                      {item.detail}
                    </span>
                  </div>
                  <div style={{
                    color: '#2C3E50',
                    opacity: 0.45,
                    transform: 'rotate(6deg)',
                    pointerEvents: 'none',
                    flexShrink: 0,
                  }}>
                    <Sketch />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
