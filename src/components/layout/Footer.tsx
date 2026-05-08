import { footer } from '@/content/footer'

export default function Footer() {
  return (
    <footer className="py-12" style={{ background: '#15202D' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10">

        {/* Разделительная линия */}
        <div
          className="mb-10"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(216,180,160,0.2), transparent)' }}
        />

        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Навигация */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {footer.links.map(l => (
              <a key={l.label} href={l.href}
                className="text-sm transition-opacity hover:opacity-100"
                style={{ color: 'rgba(248,249,250,0.4)', fontFamily: 'var(--font-inter)' }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Социальные сети */}
          <div className="flex gap-4">
            {footer.socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 transition-all duration-200 hover:opacity-100 hover:-translate-y-0.5"
                style={{ color: 'rgba(248,249,250,0.4)', fontFamily: 'var(--font-inter)' }}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Разделитель */}
        <div className="mt-10 mb-5" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

        {/* Юридическая информация */}
        <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,249,250,0.2)', fontFamily: 'var(--font-inter)' }}>
          {footer.legal.name}&nbsp;·&nbsp;ИНН&nbsp;{footer.legal.inn}&nbsp;·&nbsp;{footer.legal.address}
        </p>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(248,249,250,0.12)', fontFamily: 'var(--font-inter)' }}>
          © {footer.year} Все права защищены.
        </p>
      </div>
    </footer>
  )
}
