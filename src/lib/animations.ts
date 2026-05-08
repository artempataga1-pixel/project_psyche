import type { Variants } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7 } },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12 } },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

// Viewport настройки для whileInView
export const viewportOnce = { once: true, margin: '-80px' }
