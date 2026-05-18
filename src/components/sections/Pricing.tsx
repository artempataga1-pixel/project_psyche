'use client'

import { m, type Variants } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { HolographicButton } from '@/components/ui/holographic-button'
import { pricingSection } from '@/content/pricing'

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
    filter: 'blur(10px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.18,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}
import pricingData from '@/data/pricing.json'
import type { PricingPlan } from '@/types'

const plans = pricingData as PricingPlan[]

const sectionText = pricingSection

type Variant = 'light-a' | 'light-b'

interface PricingProps {
  variant?: Variant
}

export default function Pricing({ variant }: PricingProps) {
  const isLight = variant === 'light-a' || variant === 'light-b'

  const sectionBg = variant === 'light-a'
    ? '#ECF1FA'
    : variant === 'light-b'
      ? '#FDF7F4'
      : '#111D2A'

  const labelColor = isLight
    ? (variant === 'light-a' ? 'rgba(74,111,165,0.85)' : 'rgba(180,120,95,0.90)')
    : 'rgba(216,180,160,0.7)'

  const labelLineColor = isLight
    ? (variant === 'light-a' ? 'rgba(74,111,165,0.40)' : 'rgba(216,180,160,0.65)')
    : 'rgba(216,180,160,0.5)'

  const titleColor = isLight ? '#2C3E50' : '#F8F9FA'
  const bodyColor = isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.45)'

  const cardBg = (featured: boolean) => {
    if (isLight) {
      return featured
        ? 'linear-gradient(160deg, rgba(74,111,165,0.10) 0%, rgba(58,90,138,0.06) 100%)'
        : '#FFFFFF'
    }
    return featured
      ? 'linear-gradient(160deg, rgba(74,111,165,0.22) 0%, rgba(58,90,138,0.15) 100%)'
      : 'rgba(255,255,255,0.03)'
  }

  const cardBorder = (featured: boolean) => {
    if (isLight) {
      return featured
        ? '1px solid rgba(74,111,165,0.30)'
        : `1px solid ${variant === 'light-a' ? 'rgba(74,111,165,0.14)' : 'rgba(216,180,160,0.22)'}`
    }
    return featured
      ? '1px solid rgba(74,111,165,0.4)'
      : '1px solid rgba(255,255,255,0.07)'
  }

  const cardShadow = (featured: boolean) => {
    if (isLight) {
      return featured
        ? '0 24px 60px rgba(74,111,165,0.12), inset 0 1px 0 rgba(255,255,255,0.5)'
        : '0 2px 16px rgba(0,0,0,0.05)'
    }
    return featured
      ? '0 24px 60px rgba(74,111,165,0.2), inset 0 1px 0 rgba(255,255,255,0.07)'
      : 'none'
  }

  const cardTitleColor = isLight ? '#2C3E50' : '#F8F9FA'
  const cardBodyColor = isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.45)'
  const cardPriceBorderColor = isLight ? 'rgba(44,62,80,0.08)' : 'rgba(255,255,255,0.06)'

  const cardNonFeaturedCtaBorder = isLight
    ? `1px solid ${variant === 'light-a' ? 'rgba(74,111,165,0.25)' : 'rgba(216,180,160,0.35)'}`
    : '1px solid rgba(255,255,255,0.1)'

  const cardNonFeaturedCtaColor = isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.6)'

  return (
    <section id="pricing" className="py-20 md:py-32" style={{ background: sectionBg }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Заголовок */}
        <m.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65 }}
          className="mb-12 md:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span style={{ display: 'block', width: '36px', height: '1px', background: labelLineColor }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: labelColor, fontFamily: 'var(--font-inter)' }}
            >
              стоимость
            </span>
            <span style={{ display: 'block', width: '36px', height: '1px', background: labelLineColor }} />
          </div>
          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.8rem, 5vw, 4rem)',
              color: titleColor,
              lineHeight: 1.1,
            }}
          >
            {sectionText.title}
          </h2>
          <p
            style={{
              color: bodyColor,
              maxWidth: 480,
              fontFamily: 'var(--font-open-sans)',
              lineHeight: 1.75,
              fontSize: '0.97rem',
              margin: '0 auto',
            }}
          >
            {sectionText.subtitle}
          </p>
        </m.div>

        {/* Тарифы: мобиле 1 кол, sm 2 кол (первые 2 и 1 ниже), md 3 кол */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 md:mb-8">
          {plans.map((plan, i) => (
            <m.div
              key={plan.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="rounded-3xl overflow-hidden flex flex-col relative"
              style={{
                background: cardBg(plan.featured),
                border: cardBorder(plan.featured),
                boxShadow: cardShadow(plan.featured),
              }}
            >
              {/* Верхняя светящаяся линия */}
              <div
                style={{
                  height: '1px',
                  background: plan.featured
                    ? 'linear-gradient(90deg, transparent, rgba(107,142,199,0.8), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(216,180,160,0.2), transparent)',
                }}
              />

              {plan.featured && (
                <div
                  className="absolute top-5 right-5 text-xs font-semibold uppercase tracking-[0.12em] rounded-full px-3 py-1"
                  style={{
                    background: isLight ? 'rgba(74,111,165,0.12)' : 'rgba(74,111,165,0.3)',
                    color: isLight ? '#3A5A8A' : 'rgba(168,200,238,0.9)',
                    fontFamily: 'var(--font-inter)',
                    border: isLight ? '1px solid rgba(74,111,165,0.25)' : '1px solid rgba(74,111,165,0.35)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col gap-5 md:gap-6 flex-1" style={{ padding: 'clamp(16px, 4vw, 32px)', paddingTop: plan.featured ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(1.25rem, 3vw, 2rem)' }}>
                {/* Название */}
                <div>
                  {!plan.featured && (
                    <span
                      className="block text-xs font-semibold uppercase tracking-[0.12em] mb-3"
                      style={{
                        color: isLight ? 'rgba(180,120,95,0.90)' : 'rgba(216,180,160,0.5)',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.65rem',
                      fontWeight: 600,
                      color: cardTitleColor,
                      lineHeight: 1.1,
                    }}
                  >
                    {plan.title}
                  </h3>
                </div>

                {/* Цена */}
                <div className="pb-6 flex flex-col gap-1" style={{ borderBottom: `1px solid ${cardPriceBorderColor}` }}>
                  {plan.priceOnline === plan.priceOffline ? (
                    /* Одинаковая цена */
                    <div className="flex items-end gap-1">
                      <span style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(2.5rem, 7vw, 3.5rem)',
                        fontWeight: 700,
                        color: plan.featured ? '#A8C8EE' : (isLight ? '#2C3E50' : '#F8F9FA'),
                        lineHeight: 0.95,
                      }}>
                        {plan.priceOnline.toLocaleString('ru-RU')}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem',
                        color: plan.featured ? 'rgba(168,200,238,0.5)' : (isLight ? 'rgba(44,62,80,0.35)' : 'rgba(248,249,250,0.3)'),
                        paddingBottom: '4px',
                      }}>₽</span>
                    </div>
                  ) : (
                    /* Разные цены онлайн/очно */
                    <div className="flex flex-col gap-1.5">
                      {[
                        { label: 'онлайн', price: plan.priceOnline, savings: plan.savingsOnline },
                        { label: 'очно',   price: plan.priceOffline, savings: plan.savingsOffline },
                      ].map(row => (
                        <div key={row.label} className="flex items-baseline gap-2 flex-wrap">
                          <span style={{
                            fontFamily: 'var(--font-cormorant)',
                            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                            fontWeight: 700,
                            color: plan.featured ? '#A8C8EE' : (isLight ? '#2C3E50' : '#F8F9FA'),
                            lineHeight: 1,
                          }}>
                            {row.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-inter)', fontSize: '0.72rem',
                            color: isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.35)',
                            textTransform: 'uppercase', letterSpacing: '0.08em',
                          }}>
                            {row.label}
                            {row.savings ? ` · экономия ${row.savings.toLocaleString('ru-RU')} ₽` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Длительность + описание */}
                <div className="flex-1 flex flex-col gap-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.1em]"
                    style={{
                      color: plan.featured
                        ? (isLight ? '#4A6FA5' : 'rgba(168,200,238,0.6)')
                        : (isLight ? 'rgba(180,120,95,0.80)' : 'rgba(216,180,160,0.45)'),
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {plan.duration}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: cardBodyColor,
                      fontFamily: 'var(--font-open-sans)',
                      lineHeight: 1.7,
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* CTA */}
                <HolographicButton
                  href="#contact"
                  className="inline-flex justify-center text-sm font-semibold rounded-full py-3.5"
                  style={{
                    background: plan.featured
                      ? 'linear-gradient(135deg, #4A6FA5 0%, #3A5A8A 100%)'
                      : 'transparent',
                    color: plan.featured ? '#fff' : cardNonFeaturedCtaColor,
                    fontFamily: 'var(--font-inter)',
                    boxShadow: plan.featured ? '0 6px 20px rgba(74,111,165,0.35)' : 'none',
                    border: plan.featured ? 'none' : cardNonFeaturedCtaBorder,
                    letterSpacing: '0.01em',
                    borderRadius: '9999px',
                  }}
                >
                  {sectionText.cta}
                </HolographicButton>
              </div>
            </m.div>
          ))}
        </div>

        {/* Что входит */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl flex items-start gap-4 md:gap-5"
          style={{
            padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 32px)',
            background: isLight ? 'rgba(216,180,160,0.08)' : 'rgba(216,180,160,0.05)',
            border: isLight
              ? `1px solid ${variant === 'light-a' ? 'rgba(74,111,165,0.14)' : 'rgba(216,180,160,0.22)'}`
              : '1px solid rgba(216,180,160,0.12)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.5rem',
              color: 'rgba(216,180,160,0.4)',
              flexShrink: 0,
              lineHeight: 1,
              marginTop: '2px',
            }}
          >
            ✦
          </span>
          <p
            style={{
              color: isLight ? 'rgba(44,62,80,0.65)' : 'rgba(248,249,250,0.45)',
              fontFamily: 'var(--font-open-sans)',
              lineHeight: 1.75,
              fontSize: '0.93rem',
            }}
          >
            <strong style={{ color: 'rgba(216,180,160,0.7)', fontWeight: 600 }}>Что входит в каждую сессию:&nbsp;</strong>
            {sectionText.includes}
          </p>
        </m.div>

      </div>
    </section>
  )
}
