'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'

/* ── Corner marker (same as Problems / Formats) ── */
function CornerMark({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const s = 14
  const flip = {
    tl: 'none',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1,-1)',
  }[pos]
  const placement: Record<string, string | number> = {}
  if (pos === 'tl' || pos === 'tr') placement.top = 10
  if (pos === 'bl' || pos === 'br') placement.bottom = 10
  if (pos === 'tl' || pos === 'bl') placement.left = 10
  if (pos === 'tr' || pos === 'br') placement.right = 10

  return (
    <svg
      width={s} height={s}
      viewBox="0 0 14 14"
      style={{ position: 'absolute', transform: flip, ...placement, opacity: 1 }}
    >
      <path d="M1 13 L1 1 L13 1" stroke="rgba(44,62,80,0.15)" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

/* ── SVG sketches for illustration area ── */
function SketchFeather() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#D8B4A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 68 C40 68 20 50 18 30 C16 15 30 10 40 18 C50 10 64 15 62 30 C60 50 40 68 40 68Z" opacity="0.5"/>
      <path d="M40 68 L40 20" opacity="0.35"/>
      <path d="M40 38 C34 32 28 30 24 32" opacity="0.4"/>
      <path d="M40 44 C34 38 27 36 22 38" opacity="0.35"/>
      <path d="M40 50 C35 44 29 43 25 45" opacity="0.3"/>
      <path d="M40 38 C46 32 52 30 56 32" opacity="0.4"/>
      <path d="M40 44 C46 38 53 36 58 38" opacity="0.35"/>
      <path d="M40 50 C45 44 51 43 55 45" opacity="0.3"/>
      <circle cx="40" cy="70" r="1.5" fill="#D8B4A0" opacity="0.5"/>
    </svg>
  )
}

function SketchBook() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#D8B4A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="15" width="38" height="50" rx="3" opacity="0.45"/>
      <path d="M26 15 L26 65" opacity="0.3"/>
      <path d="M30 28 L50 28" opacity="0.4"/>
      <path d="M30 35 L50 35" opacity="0.35"/>
      <path d="M30 42 L44 42" opacity="0.35"/>
      <path d="M44 42 C46 40 50 41 50 44 C50 47 46 48 44 46" opacity="0.4"/>
      <path d="M44 46 L44 42" opacity="0.35"/>
      <path d="M22 15 C20 15 18 17 18 19" opacity="0.3"/>
      <path d="M22 65 C20 65 18 63 18 61" opacity="0.3"/>
    </svg>
  )
}

function SketchStar() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#D8B4A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 14 L44 32 L62 32 L48 43 L53 61 L40 51 L27 61 L32 43 L18 32 L36 32 Z" opacity="0.4"/>
      <circle cx="40" cy="40" r="6" opacity="0.3"/>
      <path d="M40 20 L40 16" opacity="0.3"/>
      <path d="M55 25 L57 23" opacity="0.25"/>
      <path d="M60 40 L64 40" opacity="0.25"/>
      <path d="M55 55 L57 57" opacity="0.25"/>
      <path d="M25 25 L23 23" opacity="0.25"/>
      <path d="M20 40 L16 40" opacity="0.25"/>
      <path d="M25 55 L23 57" opacity="0.25"/>
    </svg>
  )
}

/* ── Article data ── */
const articles = [
  {
    id: 1,
    tag: 'творчество',
    title: 'Как творчество лечит тревогу',
    text: 'О метафорических картах, спонтанном рисунке и том, почему каракули говорят то, что словами не скажешь.',
    cta: 'Читать в канале',
    bg: 'rgba(216,180,160,0.12)',
    accent: 'rgba(216,180,160,0.35)',
    sketch: <SketchFeather />,
    sparkles: [
      { cx: 20, cy: 20, r: 3 },
      { cx: 65, cy: 30, r: 2 },
      { cx: 15, cy: 55, r: 1.5 },
      { cx: 72, cy: 58, r: 2.5 },
    ],
  },
  {
    id: 2,
    tag: 'письмо',
    title: 'Терапевтическое письмо: утренние страницы',
    text: 'Как начать диалог с собой и услышать внутреннего рассказчика — практика, доступная каждому.',
    cta: 'Читать в Telegram',
    bg: 'rgba(74,111,165,0.1)',
    accent: 'rgba(74,111,165,0.3)',
    sketch: <SketchBook />,
    sparkles: [
      { cx: 18, cy: 18, r: 2 },
      { cx: 68, cy: 22, r: 2.5 },
      { cx: 22, cy: 60, r: 1.5 },
      { cx: 64, cy: 55, r: 2 },
    ],
  },
  {
    id: 3,
    tag: 'архетипы',
    title: 'Архетипы: кто управляет вашим сценарием?',
    text: 'Бунтарь, Жертва, Творец — знакомство с внутренними персонажами, которые пишут вашу историю.',
    cta: 'Читать в канале',
    bg: 'rgba(44,62,80,0.06)',
    accent: 'rgba(44,62,80,0.2)',
    sketch: <SketchStar />,
    sparkles: [
      { cx: 16, cy: 22, r: 2 },
      { cx: 70, cy: 18, r: 3 },
      { cx: 20, cy: 58, r: 2 },
      { cx: 68, cy: 62, r: 1.5 },
    ],
  },
]

export default function Blog() {
  return (
    <section id="blog" className="py-20 md:py-32" style={{ background: '#F8F9FA' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Header */}
        <motion.div
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
              заметки и размышления
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
            Из письменного стола
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          {articles.map((article) => (
            <motion.article
              key={article.id}
              variants={staggerItem}
              className="relative flex flex-col rounded-[20px] overflow-hidden group"
              style={{
                background: '#fff',
                border: '1px solid rgba(44,62,80,0.09)',
              }}
            >
              <CornerMark pos="tl" />
              <CornerMark pos="tr" />
              <CornerMark pos="bl" />
              <CornerMark pos="br" />

              {/* Illustration area */}
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  background: article.bg,
                  height: '190px',
                  borderBottom: `1px solid ${article.accent}`,
                }}
              >
                {/* Sparkle dots */}
                <svg
                  width="100%" height="100%"
                  viewBox="0 0 88 88"
                  style={{ position: 'absolute', inset: 0, opacity: 0.6 }}
                >
                  {article.sparkles.map((s, i) => (
                    <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={article.accent} />
                  ))}
                </svg>

                {/* Decorative arc */}
                <svg
                  width="160" height="160"
                  viewBox="0 0 160 160"
                  style={{ position: 'absolute', opacity: 0.12 }}
                >
                  <circle cx="80" cy="80" r="64" stroke="#2C3E50" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                  <circle cx="80" cy="80" r="48" stroke="#2C3E50" strokeWidth="0.7" fill="none" />
                </svg>

                {/* Sketch */}
                <div
                  className="relative z-10 transition-transform duration-500"
                  style={{ transform: 'translateY(0)', }}
                >
                  <div
                    style={{
                      transition: 'transform 0.4s ease',
                    }}
                    className="group-hover:scale-110"
                  >
                    {article.sketch}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-3 p-6 flex-1">
                {/* Tag */}
                <span
                  className="text-xs font-semibold uppercase tracking-[0.12em]"
                  style={{ color: '#D8B4A0', fontFamily: 'var(--font-inter)' }}
                >
                  {article.tag}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                    fontWeight: 600,
                    color: '#2C3E50',
                    lineHeight: 1.25,
                  }}
                >
                  {article.title}
                </h3>

                {/* Text */}
                <p
                  className="flex-1"
                  style={{
                    color: '#5D6F83',
                    fontFamily: 'var(--font-open-sans)',
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                  }}
                >
                  {article.text}
                </p>

                {/* CTA */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 mt-2 group/link"
                  style={{
                    color: '#4A6FA5',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'gap 0.2s ease',
                  }}
                >
                  <span>{article.cta}</span>
                  <span
                    style={{
                      display: 'inline-block',
                      transition: 'transform 0.2s ease',
                    }}
                    className="group-hover/link:translate-x-1"
                  >→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 group"
            style={{
              color: '#5D6F83',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(44,62,80,0.15)',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            <span>Все заметки в Telegram-канале</span>
            <span className="group-hover:translate-x-1" style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
