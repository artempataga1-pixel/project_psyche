'use client'

import {
  useRef, useState, useEffect, useCallback,
  type MouseEvent, type ReactNode, type CSSProperties,
} from 'react'

const IDENTITY = '1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1'
const MAX_R = 0.2, MIN_R = -0.2, MAX_S = 1, MIN_S = 0.975

const OVERLAY_COLORS = [
  'rgba(216,180,160,0.6)',
  'rgba(216,180,160,0.35)',
  'rgba(74,111,165,0.45)',
  'rgba(74,111,165,0.25)',
  'rgba(248,249,250,0.3)',
  'rgba(168,200,238,0.3)',
  'rgba(216,180,160,0.2)',
  'transparent',
  'transparent',
  'rgba(248,249,250,0.18)',
]

const KEYFRAMES = [...Array(10)].map((_, i) => `
  @keyframes holo${i + 1} {
    0%,100% { transform: rotate(${i * 10}deg); }
    50%     { transform: rotate(${(i + 1) * 10}deg); }
  }
`).join('')

function getRect(el: HTMLElement | null) {
  const r = el?.getBoundingClientRect()
  return { l: r?.left ?? 0, r: r?.right ?? 0, t: r?.top ?? 0, b: r?.bottom ?? 0 }
}

function buildMatrix(cx: number, cy: number, l: number, r: number, t: number, b: number) {
  const xc = (l + r) / 2, yc = (t + b) / 2
  const sx = MAX_S - (MAX_S - MIN_S) * Math.abs(xc - cx) / (xc - l)
  const sy = MAX_S - (MAX_S - MIN_S) * Math.abs(yc - cy) / (yc - t)
  const sz = MAX_S - (MAX_S - MIN_S) * (Math.abs(xc - cx) + Math.abs(yc - cy)) / (xc - l + yc - t)
  const rx1 = 0.25 * ((yc - cy) / yc - (xc - cx) / xc)
  const rx2 = MAX_R - (MAX_R - MIN_R) * Math.abs(r - cx) / (r - l)
  const ry2 = MAX_R - (MAX_R - MIN_R) * (t - cy) / (t - b)
  const rz0 = -(MAX_R - (MAX_R - MIN_R) * Math.abs(r - cx) / (r - l))
  const rz1 = 0.2 - 0.8 * (t - cy) / (t - b)
  return `${sx},0,${rz0},0,${rx1},${sy},${rz1},0,${rx2},${ry2},${sz},0,0,0,0,1`
}

function oppositeMatrix(m: string, cy: number, t: number, b: number, enter?: boolean) {
  const mul = enter ? -1 : 1, weak = enter ? 0.7 : 4
  const oppY = b - cy + t
  return m.split(',').map((v, i) => {
    if ([2, 4, 8].includes(i)) return String(-parseFloat(v) * mul / weak)
    if ([0, 5, 10].includes(i)) return '1'
    if (i === 6) return String(mul * (MAX_R - (MAX_R - MIN_R) * (t - oppY) / (t - b)) / weak)
    if (i === 9) return String((MAX_R - (MAX_R - MIN_R) * (t - oppY) / (t - b)) / weak)
    return v
  }).join(',')
}

interface HolographicButtonProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function HolographicButton({
  children, className = '', style, onClick, href, disabled, type,
}: HolographicButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [matrix, setMatrix] = useState(IDENTITY)
  const [overlayPos, setOverlayPos] = useState(0)
  const [noInOut, setNoInOut] = useState(true)
  const [idle, setIdle] = useState(false)
  const [ready, setReady] = useState(false)
  const [hovered, setHovered] = useState(false)
  const lastM = useRef(IDENTITY)
  const tReady = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const clear = () => timers.current.forEach(clearTimeout)

  const go = useCallback((m: string) => { lastM.current = m; setMatrix(m) }, [])

  const onEnter = useCallback((e: MouseEvent) => {
    clear()
    setIdle(false)
    setHovered(true)
    const { l, r, t, b } = getRect(ref.current)
    const xc = (l + r) / 2, yc = (t + b) / 2
    setNoInOut(false)
    timers.current.push(setTimeout(() => setNoInOut(true), 350))
    requestAnimationFrame(() => requestAnimationFrame(() =>
      setOverlayPos((Math.abs(xc - e.clientX) + Math.abs(yc - e.clientY)) / 1.5)
    ))
    const m = buildMatrix(e.clientX, e.clientY, l, r, t, b)
    go(oppositeMatrix(m, e.clientY, t, b, true))
    tReady.current = false
    timers.current.push(setTimeout(() => { tReady.current = true }, 200))
    if (!ready) setReady(true)
  }, [go, ready])

  const onMove = useCallback((e: MouseEvent) => {
    const { l, r, t, b } = getRect(ref.current)
    const xc = (l + r) / 2, yc = (t + b) / 2
    timers.current.push(setTimeout(() =>
      setOverlayPos((Math.abs(xc - e.clientX) + Math.abs(yc - e.clientY)) / 1.5), 150))
    if (tReady.current) go(buildMatrix(e.clientX, e.clientY, l, r, t, b))
  }, [go])

  const onLeave = useCallback((e: MouseEvent) => {
    setHovered(false)
    const { t, b } = getRect(ref.current)
    go(oppositeMatrix(lastM.current, e.clientY, t, b))
    timers.current.push(setTimeout(() => go(IDENTITY), 200))
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setNoInOut(false)
      timers.current.push(setTimeout(() => setOverlayPos(p => -p / 4), 150))
      timers.current.push(setTimeout(() => setOverlayPos(0), 300))
      timers.current.push(setTimeout(() => { setIdle(true); setNoInOut(true) }, 500))
    }))
  }, [go])

  useEffect(() => () => clear(), [])

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      disabled={disabled}
      type={!href ? (type ?? 'button') : undefined}
      className={className}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        transform: `perspective(500px) matrix3d(${matrix})`,
        transition: ready
          ? 'transform 180ms ease-out, filter 200ms ease, box-shadow 200ms ease'
          : 'filter 200ms ease, box-shadow 200ms ease',
        willChange: 'transform',
        filter: hovered ? 'brightness(1.25)' : 'brightness(1)',
        boxShadow: hovered
          ? `${(style?.boxShadow ?? '')}, 0 0 28px rgba(216,180,160,0.35), 0 0 8px rgba(255,255,255,0.15)`
          : (style?.boxShadow as string) ?? 'none',
      }}
    >
      <style>{KEYFRAMES}</style>

      {/* Контент */}
      <span style={{ position: 'relative', zIndex: 2, display: 'contents' }}>
        {children}
      </span>

      {/* Голографический оверлей */}
      <span aria-hidden style={{
        position: 'absolute', inset: 0,
        mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 3,
        overflow: 'hidden',
        borderRadius: 'inherit',
      }}>
        {OVERLAY_COLORS.map((color, i) => (
          <span key={i} style={{
            position: 'absolute',
            inset: '-150%',
            transform: `rotate(${overlayPos + i * 10}deg)`,
            transformOrigin: 'center center',
            transition: !noInOut ? 'transform 200ms ease-out' : 'none',
            animation: !idle ? 'none' : `holo${i + 1} 5s infinite`,
            willChange: 'transform',
            background: color,
            filter: 'blur(10px)',
            opacity: 0.7,
          }} />
        ))}
      </span>
    </Tag>
  )
}
