'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nav } from '@/content/nav'
import { HolographicButton } from '@/components/ui/holographic-button'

function scrollTo(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop + 60, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [inHero, setInHero] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isReady, setIsReady] = useState(false)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setInHero(y < window.innerHeight * 0.9)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const limelight = limelightRef.current
    if (!limelight) return

    if (hoveredIndex === null) {
      limelight.style.opacity = '0'
      return
    }

    const activeItem = linkRefs.current[hoveredIndex]
    if (!activeItem) return

    const itemWidth = activeItem.offsetWidth
    limelight.style.width = `${itemWidth}px`
    limelight.style.left = `${activeItem.offsetLeft}px`
    limelight.style.opacity = '1'

    if (!isReady) {
      setTimeout(() => setIsReady(true), 50)
    }
  }, [hoveredIndex, isReady])

  return (
    <>
      {/* ── Desktop: floating glass pill ── */}
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-500 ${inHero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{
          background: scrolled
            ? 'rgba(12, 22, 35, 0.88)'
            : 'rgba(12, 22, 35, 0.55)',
          backdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '9999px',
          boxShadow: scrolled
            ? '0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)'
            : '0 4px 24px rgba(0,0,0,0.2)',
          padding: '7px 7px 7px 20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <div className="flex items-center gap-8">
          {/* Навигация с limelight */}
          <nav
            ref={navRef}
            className="relative flex items-center gap-7"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Limelight bar */}
            <div
              ref={limelightRef}
              style={{
                position: 'absolute',
                top: '-7px',
                left: '-999px',
                width: '0px',
                height: '3px',
                borderRadius: '9999px',
                background: '#D8B4A0',
                boxShadow: '0 0 10px rgba(216,180,160,0.9), 0 0 24px rgba(216,180,160,0.5)',
                opacity: 0,
                transition: isReady
                  ? 'left 0.3s cubic-bezier(0.22,1,0.36,1), width 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease'
                  : 'opacity 0.2s ease',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {/* Конус света */}
              <div style={{
                position: 'absolute',
                left: '-40%',
                top: '3px',
                width: '180%',
                height: '52px',
                background: 'linear-gradient(to bottom, rgba(216,180,160,0.25) 0%, transparent 100%)',
                clipPath: 'polygon(8% 100%, 28% 0, 72% 0, 92% 100%)',
                pointerEvents: 'none',
              }} />
            </div>

            {nav.links.map((l, index) => (
              <a
                key={l.href}
                ref={el => { linkRefs.current[index] = el }}
                href={l.href}
                className="text-sm font-medium relative z-20"
                style={{
                  color: hoveredIndex === index
                    ? 'rgba(248,249,250,0.95)'
                    : 'rgba(248,249,250,0.55)',
                  fontFamily: 'var(--font-inter)',
                  transition: 'color 0.2s ease',
                  paddingTop: '4px',
                  paddingBottom: '4px',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={e => { e.preventDefault(); scrollTo(l.href) }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <HolographicButton
            href="#contact"
            onClick={() => { scrollTo('#contact') }}
            className="inline-flex text-sm font-semibold rounded-full"
            style={{
              background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
              color: '#fff',
              padding: '10px 24px',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 4px 16px rgba(74,111,165,0.4)',
              flexShrink: 0,
              borderRadius: '9999px',
            }}
          >
            {nav.cta}
          </HolographicButton>
        </div>
      </header>

      {/* ── Mobile: full-width bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(12,22,35,0.92)' : 'rgba(12,22,35,0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="flex items-center justify-end px-5 h-16">
          <button
            className="p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Меню"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <span className="block h-px transition-all duration-300" style={{
                background: '#F8F9FA',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }} />
              <span className="block h-px transition-all duration-300" style={{
                background: '#F8F9FA',
                opacity: menuOpen ? 0 : 1,
              }} />
              <span className="block h-px transition-all duration-300" style={{
                background: '#F8F9FA',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: 'rgba(12,22,35,0.98)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <nav className="flex flex-col px-6 py-5 gap-5">
                {nav.links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="text-base py-1"
                    style={{ color: 'rgba(248,249,250,0.75)', fontFamily: 'var(--font-inter)' }}
                    onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo(l.href) }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="inline-flex justify-center text-sm font-semibold rounded-full mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
                    color: '#fff',
                    padding: '12px 28px',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo('#contact') }}
                >
                  {nav.cta}
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
