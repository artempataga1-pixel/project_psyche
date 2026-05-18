'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Прокрутить наверх"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 50,
            width: 48,
            height: 48,
            borderRadius: '9999px',
            background: 'rgba(12,22,35,0.88)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(216,180,160,0.30)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.22), 0 0 12px rgba(216,180,160,0.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 11.5V4.5M8 4.5L4.5 8M8 4.5L11.5 8"
              stroke="rgba(216,180,160,0.90)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  )
}
