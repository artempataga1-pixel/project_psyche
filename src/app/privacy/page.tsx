import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Психея и Перо',
  description:
    'Политика обработки персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».',
  robots: { index: false, follow: false },
}

const sectionStyle: React.CSSProperties = {
  borderTop: '1px solid rgba(44,62,80,0.08)',
  paddingTop: '2rem',
  marginTop: '2rem',
}

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#2C3E50',
  marginBottom: '0.85rem',
}

const pStyle: React.CSSProperties = {
  fontFamily: 'var(--font-open-sans)',
  fontSize: '1rem',
  lineHeight: 1.8,
  color: '#5D6F83',
  marginBottom: '0.75rem',
}

const liStyle: React.CSSProperties = {
  fontFamily: 'var(--font-open-sans)',
  fontSize: '1rem',
  lineHeight: 1.8,
  color: '#5D6F83',
  marginBottom: '0.35rem',
}

export default function PrivacyPage() {
  return (
    <main style={{ background: '#F8F9FA', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px 80px' }}>

        {/* Кнопка назад */}
        <a
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-inter)', fontSize: '0.85rem',
            color: '#5D6F83', textDecoration: 'none', marginBottom: '2.5rem',
            opacity: 0.7,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Назад
        </a>
        <div>
          {/* Шапка */}
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#D8B4A0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Юридические документы
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              color: '#2C3E50',
              lineHeight: 1.15,
              marginBottom: '0.5rem',
            }}
          >
            Политика конфиденциальности
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#D8B4A0' }}>
            Дата принятия: 08 мая 2025 года
          </p>

          {/* 1. Общие положения */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>1. Общие положения</h2>
            <p style={pStyle}>
              Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок сбора, хранения, использования
              и защиты персональных данных пользователей сайта <strong>[сайт]</strong> (далее — «Сайт»).
            </p>
            <p style={pStyle}>
              Политика разработана в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ
              «О персональных данных», а также Постановления Правительства РФ от 01.11.2012 № 1119
              «Об утверждении требований к защите персональных данных при их обработке в информационных системах».
            </p>
            <p style={pStyle}>
              Используя Сайт и заполняя форму записи на консультацию, вы выражаете своё согласие с условиями
              настоящей Политики. Если вы не согласны с данными условиями, пожалуйста, воздержитесь от использования Сайта.
            </p>
          </div>

          {/* 2. Оператор персональных данных */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>2. Оператор персональных данных</h2>
            <p style={pStyle}>
              Оператором персональных данных является физическое лицо, применяющее специальный налоговый режим
              «Налог на профессиональный доход» (самозанятый):
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0' }}>
              <li style={liStyle}><strong>ФИО:</strong> Погорелова Юлия Петровна</li>
              <li style={liStyle}><strong>ИНН:</strong> 773172641768</li>
              <li style={liStyle}><strong>Адрес:</strong> 117437, г. Москва, ул. Академика Волгина, д. 29, корп. 1, кв. 128</li>
              <li style={liStyle}><strong>Электронная почта:</strong> [email]</li>
              <li style={liStyle}><strong>Сайт:</strong> [сайт]</li>
            </ul>
            <p style={pStyle}>
              Далее по тексту — «Оператор».
            </p>
          </div>

          {/* 3. Состав обрабатываемых данных */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>3. Состав обрабатываемых персональных данных</h2>
            <p style={pStyle}>
              Оператор обрабатывает следующие персональные данные, добровольно предоставленные пользователем
              при заполнении формы записи на консультацию:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0' }}>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                имя (или псевдоним) пользователя;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                номер телефона и/или имя пользователя в мессенджере Telegram;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                краткое описание запроса или темы, с которой пользователь обращается за консультацией.
              </li>
            </ul>
            <p style={pStyle}>
              Оператор не собирает специальные категории персональных данных (расовая принадлежность,
              национальность, политические взгляды, религиозные убеждения, состояние здоровья,
              биометрические данные) без отдельного явного согласия субъекта.
            </p>
            <p style={pStyle}>
              Оператор также может получать технические данные, автоматически передаваемые браузером
              (IP-адрес, тип браузера, время посещения Сайта) в целях технического обеспечения работы Сайта.
              Указанные данные не позволяют идентифицировать пользователя и не рассматриваются Оператором
              как персональные данные.
            </p>
          </div>

          {/* 4. Цель и правовое основание */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>4. Цели и правовые основания обработки</h2>
            <p style={pStyle}>
              Персональные данные обрабатываются исключительно в следующих целях:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0' }}>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                обработка заявки пользователя на психологическую консультацию, арт-терапевтическую
                сессию или иную услугу, представленную на Сайте;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                связь с пользователем для согласования даты, времени, формата и условий проведения
                консультации;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                исполнение обязательств в рамках договора оказания психологических консультационных
                услуг (публичной оферты), размещённой на Сайте.
              </li>
            </ul>
            <p style={pStyle}>
              Правовым основанием обработки персональных данных является согласие субъекта персональных данных
              (ч. 1 ст. 6, ч. 1 ст. 9 Федерального закона № 152-ФЗ «О персональных данных»).
            </p>
            <p style={pStyle}>
              Отправка формы записи на Сайте является выражением явного и добровольного согласия пользователя
              на обработку его персональных данных в указанных целях.
            </p>
          </div>

          {/* 5. Передача третьим лицам */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>5. Передача персональных данных третьим лицам</h2>
            <p style={pStyle}>
              Оператор не передаёт персональные данные пользователей третьим лицам, за исключением случаев,
              прямо предусмотренных действующим законодательством Российской Федерации (в том числе по
              обоснованному требованию уполномоченных государственных органов).
            </p>
            <p style={pStyle}>
              Персональные данные не используются в рекламных, маркетинговых или иных коммерческих целях
              третьих лиц, не продаются и не передаются на основании возмездных соглашений.
            </p>
          </div>

          {/* 6. Хранение и сроки */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>6. Хранение данных и сроки обработки</h2>
            <p style={pStyle}>
              Персональные данные хранятся в форме, позволяющей определить субъекта персональных данных,
              не дольше, чем этого требуют цели их обработки.
            </p>
            <p style={pStyle}>
              Обработка персональных данных прекращается в следующих случаях:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0' }}>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                по истечении трёх лет с момента последнего обращения пользователя за услугами Оператора;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                при отзыве субъектом персональных данных своего согласия на обработку.
              </li>
            </ul>
            <p style={pStyle}>
              После прекращения обработки персональные данные уничтожаются или обезличиваются в порядке,
              предусмотренном действующим законодательством.
            </p>
          </div>

          {/* 7. Защита данных */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>7. Защита персональных данных</h2>
            <p style={pStyle}>
              Оператор принимает необходимые организационные и технические меры для защиты персональных
              данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования,
              копирования, предоставления, распространения, а также от иных неправомерных действий
              в отношении персональных данных.
            </p>
            <p style={pStyle}>
              Доступ к персональным данным пользователей имеет только Оператор лично.
            </p>
          </div>

          {/* 8. Права субъекта */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>8. Права субъекта персональных данных</h2>
            <p style={pStyle}>
              В соответствии со ст. 14–17 Федерального закона № 152-ФЗ пользователь имеет право:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0.75rem 0' }}>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                получить информацию об обработке своих персональных данных (состав данных, цели, сроки,
                источники получения, круг лиц, имеющих к ним доступ);
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                потребовать уточнения, блокирования или уничтожения своих персональных данных
                в случае, если они являются неполными, устаревшими, неточными или обрабатываются
                незаконно;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                отозвать согласие на обработку персональных данных в любой момент;
              </li>
              <li style={{ ...liStyle, paddingLeft: '1rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#D8B4A0' }}>—</span>
                обратиться с жалобой в Роскомнадзор (Федеральная служба по надзору в сфере связи,
                информационных технологий и массовых коммуникаций) в случае нарушения своих прав.
              </li>
            </ul>
            <p style={pStyle}>
              Для реализации своих прав пользователь вправе направить обращение Оператору по электронной
              почте: <strong>[email]</strong>. Оператор обязуется рассмотреть обращение
              в течение 30 дней с момента его получения.
            </p>
          </div>

          {/* 9. Файлы cookie */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>9. Файлы cookie</h2>
            <p style={pStyle}>
              Сайт может использовать технологии cookie и аналогичные технологии отслеживания
              для обеспечения корректной работы технических функций Сайта. Cookie не используются
              для сбора, обработки или передачи персональных данных пользователей третьим лицам.
            </p>
            <p style={pStyle}>
              Пользователь вправе настроить свой браузер таким образом, чтобы отклонять файлы cookie
              или получать уведомления о них. Отключение cookie может повлиять на работоспособность
              отдельных функций Сайта.
            </p>
          </div>

          {/* 10. Изменения */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>10. Изменения политики конфиденциальности</h2>
            <p style={pStyle}>
              Оператор оставляет за собой право вносить изменения в настоящую Политику без предварительного
              уведомления пользователей. Новая редакция Политики вступает в силу с момента её размещения
              на Сайте, если иное не предусмотрено новой редакцией.
            </p>
            <p style={pStyle}>
              Пользователю рекомендуется периодически проверять настоящую страницу на предмет внесённых
              изменений. Продолжение использования Сайта после публикации изменений означает принятие
              новой редакции Политики.
            </p>
          </div>

          {/* 11. Контакты */}
          <div style={sectionStyle}>
            <h2 style={h2Style}>11. Контактные данные оператора</h2>
            <p style={pStyle}>
              По всем вопросам, связанным с обработкой персональных данных, пользователь может обратиться
              к Оператору:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={liStyle}><strong>Электронная почта:</strong> [email]</li>
              <li style={liStyle}><strong>Почтовый адрес:</strong> 117437, г. Москва, ул. Академика Волгина, д. 29, корп. 1, кв. 128</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
