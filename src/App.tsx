import { useEffect, useRef, useState } from 'react'
import blacklakeWordmark from './assets/blacklake-wordmark.png'
import blacklakeHero from './assets/blacklake-hero.png'

const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Dilemma', href: '#section-1' },
  { label: 'Sovereignty', href: '#section-2' },
  { label: 'Listen', href: '#ep' },
]

const sections = [
  {
    title: 'The current dilemma',
    body: 'Young technologists assume they understand the warfighter, but not how Washington functions. That gap means the warfighter is not served the way the work has to happen. Blacklake reorients the outside to those systems, so the people who run into the fire get better support.',
    image:
      'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?auto=format&fit=crop&w=2200&q=90',
    alt: 'A service member equipped for the field',
  },
  {
    title: 'Networked sovereignty',
    body: 'Alexandria gives companies the infrastructure to compete, and catalogs what they are building. Not by replacing the primes, but by letting thousands of companies serve nations at the speed the world moves.',
    cta: 'Listen',
    href: '#ep',
    image:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=90',
    alt: 'Shelves in a cataloged library',
  },
]

const tracks = [
  { title: 'An Unquiet Peace', src: '/ep/01-an-unquiet-peace.wav' },
  { title: 'The Long Game', src: '/ep/02-the-long-game.wav' },
  { title: 'The Quiet Professionals', src: '/ep/03-the-quiet-professionals.wav' },
  { title: 'A Beautiful Enterprise', src: '/ep/04-a-beautiful-enterprise.wav' },
  { title: 'The Ties That Bind', src: '/ep/05-the-ties-that-bind.wav' },
  { title: 'Bully in the Playground', src: '/ep/06-bully-in-the-playground.wav' },
  { title: 'The Better Angels', src: '/ep/07-the-better-angels.wav' },
]

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const minutes = Math.floor(seconds / 60)
  const remain = Math.floor(seconds % 60)
  return `${minutes}:${remain.toString().padStart(2, '0')}`
}

function Spark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 1c0 17.12-13.88 31-31 31 17.12 0 31 13.88 31 31 0-17.12 13.88-31 31-31C45.88 32 32 18.12 32 1Z" />
      <circle cx="32" cy="32" r="11" />
    </svg>
  )
}

function PlayMark({ playing }: { playing: boolean }) {
  if (playing) {
    return (
      <svg className="play-mark" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="3" y="2" width="3.2" height="12" />
        <rect x="9.8" y="2" width="3.2" height="12" />
      </svg>
    )
  }
  return (
    <svg className="play-mark" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 2.5v11l9-5.5-9-5.5Z" />
    </svg>
  )
}

function EpPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)

  const syncTime = () => {
    const audio = audioRef.current
    if (!audio) return
    setElapsed(audio.currentTime)
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
  }

  const toggle = (index: number) => {
    const audio = audioRef.current
    if (!audio) return
    if (current === index) {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        void audio.play()
        setPlaying(true)
      }
      return
    }
    audio.src = tracks[index].src
    setCurrent(index)
    setElapsed(0)
    setDuration(0)
    void audio.play()
    setPlaying(true)
  }

  const progress = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0

  return (
    <section className="ep" id="ep" aria-label="Blacklake EP">
      <p className="ep-kicker">Blacklake EP</p>
      <h2>The World Is Wide</h2>
      <ol className="track-list">
        {tracks.map((track, index) => {
          const active = current === index
          return (
            <li key={track.src} className={active ? 'is-active' : undefined}>
              <button
                type="button"
                className="track"
                onClick={() => toggle(index)}
                aria-pressed={active && playing}
                aria-label={`${active && playing ? 'Pause' : 'Play'} ${track.title}`}
              >
                <span className="track-num">0{index + 1}</span>
                <span className="track-title">{track.title}</span>
                <span className="track-side">
                  {active && <span>{formatTime(elapsed)}</span>}
                  <PlayMark playing={active && playing} />
                </span>
                {active && (
                  <span className="track-progress" aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
      <audio
        ref={audioRef}
        className="ep-audio"
        preload="none"
        onTimeUpdate={syncTime}
        onLoadedMetadata={syncTime}
        onEnded={() => setPlaying(false)}
      />
    </section>
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
          timeZone: 'America/New_York',
        }).format(new Date()),
      )
    update()
    const timer = window.setInterval(update, 30000)
    return () => window.clearInterval(timer)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className={`site-header ${menuOpen ? 'is-open' : ''}`}>
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
          {nav.map((item, index) => (
            <a href={item.href} onClick={closeMenu} key={item.label}>
              <span>0{index + 1}</span>
              {item.label}
              <Spark />
            </a>
          ))}
        </div>
      </nav>

      <section id="top" className="hero">
        <video
          className="hero-image"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={blacklakeHero}
          aria-label="Blacklake hero film"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </section>

      {sections.map((section, index) => (
        <section className="story" id={`section-${index + 1}`} key={section.title}>
          <img src={section.image} alt={section.alt} className="story-image" />
          <div className="story-shade" />
          <div className="story-content">
            <div className="story-main">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
            {section.cta && (
              <a href={section.href} className="round-link">
                <span>{section.cta}</span>
                <span>→</span>
              </a>
            )}
          </div>
          <div className="section-index">0{index + 1}</div>
        </section>
      ))}

      <EpPlayer />

      <footer>
        <p className="footer-statement">A national security holding company</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          {nav.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-bottom">
          <img src={blacklakeWordmark} alt="Blacklake" />
          <div className="footer-details">
            <p>Blacklake, Inc.<br />Washington, DC USA&nbsp; {time}</p>
            <a href="#top">Privacy &amp; Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
