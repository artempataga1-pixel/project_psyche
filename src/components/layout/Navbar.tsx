'use client'

import { useState, useEffect, useRef } from 'react'
import { nav } from '@/content/nav'
import { HolographicButton } from '@/components/ui/holographic-button'

function scrollTo(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [inHero, setInHero] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isReady, setIsReady] = useState(false)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const limelightRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let prevScrolled = false, prevInHero = true
    const onScroll = () => {
      const y = window.scrollY
      const ns = y > 60, ni = y < window.innerHeight * 0.9
      if (ns !== prevScrolled) { prevScrolled = ns; setScrolled(ns) }
      if (ni !== prevInHero) { prevInHero = ni; setInHero(ni) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
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
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-[background,opacity,transform] duration-500 ${inHero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
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
        padding: 'clamp(5px,1.2vw,7px) clamp(5px,1.2vw,7px) clamp(5px,1.2vw,7px) clamp(12px,2.5vw,20px)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-center gap-3 md:gap-8">
        {/* Навигация с limelight */}
        <nav
          ref={navRef}
          className="relative flex items-center gap-3 md:gap-7"
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
              className="font-medium relative z-20"
              style={{
                fontSize: 'clamp(0.72rem, 1.8vw, 0.875rem)',
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
          className="inline-flex font-semibold rounded-full"
          style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.875rem)',
            background: 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)',
            color: '#fff',
            padding: 'clamp(8px,2vw,10px) clamp(12px,3vw,24px)',
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
  )
}
