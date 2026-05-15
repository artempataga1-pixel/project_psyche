import type { Metadata } from 'next'
import { Inter, Open_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import ScrollReset from '@/components/ScrollReset'
import { LazyMotion, domAnimation } from 'framer-motion'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-open-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://psyche-and-pen.ru'),
  title: 'Юлия — психолог, арт-терапевт | мАртерапия',
  description: 'Интегративная терапия для чувствительных и творческих людей. КПТ, арт-терапия, работа с тревогой, творческими блоками, жизненными кризисами. Онлайн и очно.',
  keywords: 'психолог, арт-терапевт, КПТ, арт-терапия, тревога, онлайн терапия',
  openGraph: {
    title: 'Юлия — психолог, арт-терапевт',
    description: 'Глубинная терапия для чувствительных и творческих натур',
    url: 'https://psyche-and-pen.ru',
    siteName: 'мАртерапия',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'мАртерапия — психолог Юлия',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${openSans.variable} ${cormorant.variable}`}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </head>
      <body className="antialiased">
        <LazyMotion features={domAnimation}>
          <ScrollReset />
          {children}
        </LazyMotion>
      </body>
    </html>
  )
}
