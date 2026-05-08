'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/animations'
import faqData from '@/data/faq.json'
import type { FaqItem } from '@/types'

const items = faqData as FaqItem[]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 md:py-32" style={{ background: '#F8F9FA' }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Заголовок */}
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
              вопросы и ответы
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
            Часто спрашивают
          </h2>
        </motion.div>

        {/* Аккордеон — линейный, без карточек */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={staggerItem}
              style={{
                borderTop: '1px solid rgba(44,62,80,0.09)',
                borderBottom: idx === items.length - 1 ? '1px solid rgba(44,62,80,0.09)' : 'none',
              }}
            >
              <button
                className="w-full flex items-start justify-between text-left py-5 md:py-7 gap-4 md:gap-6 group"
                onClick={() => setOpen(open === item.id ? null : item.id)}
                style={{ minHeight: '44px' }}
              >
                {/* Номер */}
                <span
                  className="flex-shrink-0 leading-none"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: open === item.id ? '#D8B4A0' : 'rgba(44,62,80,0.18)',
                    minWidth: '48px',
                    transition: 'color 0.25s ease',
                    lineHeight: 1,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Вопрос */}
                <span
                  className="flex-1 font-semibold leading-snug transition-colors duration-250"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                    color: open === item.id ? '#2C3E50' : '#5D6F83',
                    fontWeight: 600,
                  }}
                >
                  {item.question}
                </span>

                {/* Индикатор */}
                <span
                  className="flex-shrink-0 mt-1"
                  style={{
                    display: 'block',
                    width: '18px',
                    height: '1px',
                    background: open === item.id ? '#4A6FA5' : 'rgba(44,62,80,0.25)',
                    transition: 'all 0.3s ease',
                    transform: open === item.id ? 'none' : 'none',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '1px',
                      height: open === item.id ? '0' : '18px',
                      background: 'rgba(44,62,80,0.25)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'height 0.3s ease',
                    }}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="pb-6 md:pb-8 pl-0 md:pl-9"
                      style={{
                        color: '#5D6F83',
                        fontFamily: 'var(--font-open-sans)',
                        fontSize: 'clamp(0.88rem, 2vw, 0.97rem)',
                        lineHeight: 1.85,
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
