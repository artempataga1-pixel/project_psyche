import Navbar       from '@/components/layout/Navbar'
import Footer       from '@/components/layout/Footer'
import Hero         from '@/components/sections/Hero'
import Problems     from '@/components/sections/Problems'
import About        from '@/components/sections/About'
import Methods      from '@/components/sections/Methods'
import Formats      from '@/components/sections/Formats'
import Pricing      from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ          from '@/components/sections/FAQ'
import Blog         from '@/components/sections/Blog'
import Contact      from '@/components/sections/Contact'
import ScrollToTop  from '@/components/ScrollToTop'

function Fade({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden
      style={{
        height: 40,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
        marginTop: -20,
        marginBottom: -20,
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero variant="light-b" />
        <Fade from="#FDF7F4" to="#FAF7F4" />
        <Problems />
        <Fade from="#FAF7F4" to="#F8F9FA" />
        <About />
        <Fade from="#F8F9FA" to="#FBF2EE" />
        <Methods variant="light-b" />
        <Fade from="#FBF2EE" to="#FAF7F4" />
        <Formats />
        <Fade from="#FAF7F4" to="#FDF7F4" />
        <Pricing variant="light-b" />
        <Fade from="#FDF7F4" to="#FAF7F4" />
        <Testimonials />
        <Fade from="#FAF7F4" to="#F8F9FA" />
        <FAQ />
        <Fade from="#F8F9FA" to="#F8F9FA" />
        <Blog />
        <Fade from="#F8F9FA" to="#FDF7F4" />
        <Contact variant="light-b" />
      </main>
      <Footer variant="light-b" />
      <ScrollToTop />
    </>
  )
}
