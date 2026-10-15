import { useEffect, useState } from 'react'
import blacklakeWordmark from './assets/blacklake-wordmark.png'
import blacklakeHero from './assets/blacklake-hero.png'

const sections = [
  {
    title: 'Powering a new era',
    body: 'Reliable energy to expand prosperity, strengthen industry, and secure tomorrow.',
    cta: 'Our mission',
    image:
      'https://images.unsplash.com/photo-1544776943-641891caca4b?auto=format&fit=crop&w=2200&q=90',
  },
  {
    title: 'Energy, made at home',
    body: 'Turning the potential beneath our feet into enduring national capability.',
    cta: 'Our technology',
    image:
      'https://images.unsplash.com/photo-1781954031907-53f6a13ee28c?auto=format&fit=crop&w=2200&q=90',
  },
]

function Spark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 1c0 17.12-13.88 31-31 31 17.12 0 31 13.88 31 31 0-17.12 13.88-31 31-31C45.88 32 32 18.12 32 1Z" />
      <circle cx="32" cy="32" r="11" />
    </svg>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'America/Los_Angeles',
        }).format(new Date()),
      )
    update()
    const timer = window.setInterval(update, 30000)
    return () => window.clearInterval(timer)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Blacklake home">
          <img src={blacklakeWordmark} alt="Blacklake" />
        </a>
        <button
          className={`menu-button ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
      </header>

      <nav className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-meta">A national security holding company / Washington DC USA</div>
        <div className="menu-links">
          {['Home', 'Mission', 'Technology'].map((item, index) => (
            <a href={index ? `#section-${index}` : '#top'} onClick={closeMenu} key={item}>
              <span>0{index + 1}</span>
              {item}
              <Spark />
            </a>
          ))}
        </div>
        <a className="menu-mail" href="mailto:hello@axiom.energy">
          Contact <span>↗</span>
        </a>
      </nav>

      <section id="top" className="hero">
        <img className="hero-image" src={blacklakeHero} alt="Aircraft manufacturing floor" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p>Advanced energy / United States</p>
          <h1>Fueling human progress</h1>
        </div>
        <div className="hero-footer">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
          <span>37.7749° N&nbsp;&nbsp; 122.4194° W</span>
        </div>
      </section>

      {sections.map((section, index) => (
        <section className="story" id={`section-${index + 1}`} key={section.title}>
          <img src={section.image} alt="" className="story-image" />
          <div className="story-shade" />
          <div className="story-content">
            <div className="story-main">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
            <a href="#contact" className="round-link">
              <span>{section.cta}</span>
              <span>→</span>
            </a>
          </div>
          <div className="section-index">0{index + 1}</div>
        </section>
      ))}

      <footer id="contact">
        <p className="footer-statement">A national security holding company</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#top">Home</a>
          <a href="#section-1">Mission</a>
          <a href="#section-2">Technology</a>
        </nav>
        <div className="footer-connect">
          <a href="mailto:hello@blacklake.com">Mail ↗</a>
          <a href="#contact">LinkedIn ↗</a>
        </div>
        <div className="footer-bottom">
          <img src={blacklakeWordmark} alt="Blacklake" />
          <div className="footer-details">
            <p>Blacklake, Inc.<br />Washington, DC USA&nbsp; {time}</p>
            <a href="#contact">Privacy &amp; Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
