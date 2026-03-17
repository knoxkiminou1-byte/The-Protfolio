import React, { useEffect, useRef, useState } from 'react';

type Project = {
  name: string;
  url: string;
};

const PROJECTS: Project[] = [
  {
    name: 'Marchitects Builders Website',
    url: 'https://www.marchitects.builders/',
  },
  {
    name: 'Kiminou Knox Website',
    url: 'https://kiminouknox.com/',
  },
  {
    name: 'AAFC Builders Website',
    url: 'https://www.aafcbuilders.org/',
  },
  {
    name: 'Muisi Artist Website',
    url: 'https://muisi.vercel.app/',
  },
  {
    name: 'Muisi Kongo Malonga Website',
    url: 'https://www.muisikongo.com/',
  },
  {
    name: 'Linea Collective Website',
    url: 'https://www.lineaculture.com/',
  },
  {
    name: 'Ricardo Scales Piano Website',
    url: 'https://ricardoscalespiano.com/',
  },
  {
    name: 'SL Montgomery Law Website',
    url: 'https://slmontgomerylaw-upgrade.vercel.app/',
  },
  {
    name: 'DGRP Baysound Website',
    url: 'https://www.dgrpbaysound.com/',
  },
  {
    name: 'Social Following',
    url: 'https://social-following-studios.vercel.app/',
  },
  {
    name: 'Wellness Escape Website',
    url: 'https://wellness-escape-webiste.vercel.app/',
  },
  {
    name: 'Hair Two Red Website',
    url: 'https://hair-two-red.vercel.app/',
  },
  {
    name: 'Legacy Cutz (Preview Site - Barber)',
    url: 'https://legacy-cutz.vercel.app/',
  },
  {
    name: 'Dextereous (Preview Site - Barber)',
    url: 'https://dextereous.vercel.app/',
  },
  {
    name: 'Hair NQFL (Preview Site - Loctiticaion)',
    url: 'https://hair-nqfl.vercel.app/',
  },
  {
    name: '7 Day Reset Website',
    url: 'https://7-day-reset.vercel.app/',
  },
];

const ACCESS_PASSWORD = '::A@FC-Portfolio::XQ9v!3z_LunarMantis$741-ObsidianParadox%Tesseract#N0BodyWillGuessThisEver';

function previewUrl(url: string): string {
  return 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=1400';
}


function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ProjectPreview({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (imageFailed) {
    return (
      <div className="preview-image h-56 w-full bg-slate-900/90 p-6 text-white">
        <div className="flex h-full flex-col justify-between rounded-2xl border border-white/15 bg-black/20 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Live site preview</p>
            <p className="mt-2 text-lg font-semibold">{project.name}</p>
            <p className="mt-2 text-sm text-white/70">{domainFromUrl(project.url)}</p>
          </div>
          <p className="text-sm text-white/70">Open live site ↗</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={previewUrl(project.url)}
      alt={project.name}
      className="preview-image h-56 w-full object-cover"
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => PROJECTS.map(() => false));
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (passwordInput === ACCESS_PASSWORD) {
      setIsUnlocked(true);
      setPasswordError('');
      return;
    }

    setPasswordError('Nope. That password is not it.');
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index || -1);
          if (Number.isNaN(index) || index < 0) return;
          setVisibleCards((current) => {
            if (current[index]) return current;
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  if (!isUnlocked) {
    return (
      <div className="gate-screen min-h-screen px-6 py-10">
        <div className="gate-card">
          <p className="gate-alert">whoa, whoa, whoa, not so fast.</p>
          <h1 className="gate-title">What&apos;s the password to see the portfolio?</h1>
          <p className="gate-copy">Enter the access password to unlock this private showcase.</p>

          <form onSubmit={handleUnlock} className="mt-6 flex flex-col gap-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Enter password"
              className="gate-input"
              autoFocus
              required
            />
            <button type="submit" className="gate-button">
              Unlock Portfolio
            </button>
          </form>

          {passwordError ? <p className="gate-error mt-3">{passwordError}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="premium-bg min-h-screen">
      <div className="background-noise" aria-hidden="true" />
      <div className="background-vignette" aria-hidden="true" />
      <div className="background-ambient ambient-left" aria-hidden="true" />
      <div className="background-ambient ambient-right" aria-hidden="true" />
      <div className="background-ambient ambient-bottom" aria-hidden="true" />

      <div className="premium-content mx-auto max-w-[1500px] px-6 pb-20 pt-6 sm:px-8">
        <nav className="glass-nav">
          <p className="brand-mark">AAFC Premium Showcase</p>
          <p className="brand-sub">High-impact web experiences</p>
        </nav>

        <header className="hero mt-8">
          <p className="hero-badge">AAFC Premium Design Standard</p>
          <h1 className="hero-title">AAFC WEBSITE PORTFOLIO</h1>
          <p className="hero-copy">
            A curated portfolio of elite websites designed with elevated aesthetics, precision interaction, and immersive storytelling.
          </p>
        </header>

        <main className="mt-12">
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <a
                key={project.url}
                ref={(node) => (cardRefs.current[index] = node)}
                data-index={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card block overflow-hidden rounded-3xl ${visibleCards[index] ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 75}ms` }}
                aria-label={`Open ${project.name}`}
              >
                <div className="media-wrap relative">
                  <ProjectPreview project={project} />
                  <span className="image-vignette" aria-hidden="true" />
                  <span className="image-sheen" aria-hidden="true" />
                </div>

                <div className="px-6 pb-6 pt-5">
                  <h2 className="project-title">{project.name}</h2>
                  <p className="project-link">Open live site ↗</p>
                </div>
              </a>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
