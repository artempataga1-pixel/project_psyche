import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import './globals.css'
import ScrollReset from '@/components/ScrollReset'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://psyche-and-pen.ru'),
  title: 'Юлия — психолог, арт-терапевт | Психея и Перо',
  description: 'Интегративная терапия для чувствительных и творческих людей. КПТ, арт-терапия, работа с тревогой, творческими блоками, жизненными кризисами. Онлайн и очно.',
  keywords: 'психолог, арт-терапевт, КПТ, арт-терапия, тревога, онлайн терапия',
  openGraph: {
    title: 'Юлия — психолог, арт-терапевт',
    description: 'Глубинная терапия для чувствительных и творческих натур',
    url: 'https://psyche-and-pen.ru',
    siteName: 'Психея и Перо',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Психея и Перо — психолог Юлия',
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
    <html lang="ru" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        {/* Cormorant Garamond — элегантный серифный шрифт для заголовков */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </head>
      <body className="antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  )
}
