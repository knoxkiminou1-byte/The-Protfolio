import React, { useEffect, useRef, useState } from 'react';

type Project = {
  name: string;
  url: string;
  summary: string;
  category: string;
};

const AAFC_GOLD = '#D4A64A';
const AAFC_NAVY_1 = '#060A14';
const AAFC_NAVY_2 = '#0B1630';

const PROJECTS: Project[] = [
  {
    name: 'Marchitects Builders Website',
    url: 'https://www.marchitects.builders/',
    summary: 'Construction and architecture site with conversion-first structure and authority cues.',
    category: 'Construction',
  },
  {
    name: 'Kiminou Knox Website',
    url: 'https://kiminouknox.com/',
    summary: 'Personal brand site balancing writing, visual direction, and audience clarity.',
    category: 'Personal Brand',
  },
  {
    name: 'AAFC Builders Website',
    url: 'https://www.aafcbuilders.org/',
    summary: 'Agency hub showcasing mission-driven digital work across many industries.',
    category: 'Agency',
  },
  {
    name: 'Muisi Artist Website',
    url: 'https://muisi.vercel.app/',
    summary: 'Artist-forward showcase with elegant visuals and narrative-led content blocks.',
    category: 'Artist',
  },
  {
    name: 'Muisi Kongo Malonga Website',
    url: 'https://www.muisikongo.com/',
    summary: 'Creative profile website highlighting projects, media, and cultural artistry.',
    category: 'Artist',
  },
  {
    name: 'Linea Collective Website',
    url: 'https://www.lineaculture.com/',
    summary: 'Collective-focused website communicating artistic vision and community outcomes.',
    category: 'Culture',
  },
  {
    name: 'Ricardo Scales Piano Website',
    url: 'https://ricardoscalespiano.com/',
    summary: 'Performance-centered music website with booking support and clean information hierarchy.',
    category: 'Music',
  },
  {
    name: 'SL Montgomery Law Website',
    url: 'https://slmontgomerylaw-upgrade.vercel.app/',
    summary: 'Law firm presentation built for credibility, conversion, and clear legal service messaging.',
    category: 'Law',
  },
  {
    name: 'DGRP Baysound Website',
    url: 'https://www.dgrpbaysound.com/',
    summary: 'Music identity platform with polished storytelling and direct fan engagement touchpoints.',
    category: 'Music',
  },
  {
    name: 'Recent Rolling Card Game',
    url: 'https://social-following-studios.vercel.app/',
    summary: 'Interactive gaming concept with bold cards, momentum, and social-ready visual flow.',
    category: 'Gaming',
  },
  {
    name: 'Wellness Escape Website',
    url: 'https://wellness-escape-webiste.vercel.app/',
    summary: 'Wellness brand experience focused on appointments, trust, and an easy booking path.',
    category: 'Wellness',
  },
  {
    name: 'Hair Two Red Website',
    url: 'https://hair-two-red.vercel.app/',
    summary: 'Beauty and salon experience with visual storytelling and service-forward sections.',
    category: 'Beauty',
  },
];

function previewUrl(url: string): string {
  return 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=1400';
}

export default function App() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => PROJECTS.map(() => false));
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

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
      { threshold: 0.15 },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const pageBg: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(1400px circle at 50% 8%, rgba(30,63,124,0.56), transparent 62%), radial-gradient(900px circle at 10% 24%, rgba(212,166,74,0.13), transparent 60%), linear-gradient(' +
      AAFC_NAVY_1 +
      ', ' +
      AAFC_NAVY_2 +
      ')',
  };

  return (
    <div className="premium-bg min-h-screen" style={pageBg}>
      <div className="background-noise" aria-hidden="true" />
      <div className="background-vignette" aria-hidden="true" />
      <div className="background-aurora" aria-hidden="true" />

      <div className="premium-content mx-auto max-w-[1500px] px-6 pb-20 pt-8">
        <header className="hero-shell rounded-3xl p-6 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">AAFC Project Reel</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl" style={{ color: AAFC_GOLD }}>
            AAFC PORTFOLIO
          </h1>
          <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
            Premium portfolio collection across law, wellness, beauty, music, artists, gaming, and local businesses.
            Clean captions only — no direct links shown.
          </p>

          <div className="video-stage mt-7 overflow-hidden rounded-2xl border border-white/20">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-video h-[220px] w-full object-cover sm:h-[360px]"
              poster={previewUrl('https://www.aafcbuilders.org/')}
            >
              <source
                src="https://cdn.coverr.co/videos/coverr-busy-traffic-in-a-city-at-night-1579/1080p.mp4"
                type="video/mp4"
              />
            </video>
            <div className="video-overlay">
              <span className="rounded-full border border-white/35 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/80">
                Portfolio Preview
              </span>
            </div>
          </div>
        </header>

        <main className="mt-10">
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
                style={{ transitionDelay: `${index * 60}ms` }}
                aria-label={`Open ${project.name}`}
              >
                <div className="relative">
                  <img src={previewUrl(project.url)} alt={project.name} className="preview-image h-52 w-full object-cover" loading="lazy" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">
                    {project.category}
                  </span>
                </div>

                <div className="px-6 pb-6 pt-5">
                  <h2 className="text-xl font-semibold text-white">{project.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/75">{project.summary}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em]" style={{ color: AAFC_GOLD }}>
                    Website showcase
                  </p>
                </div>
              </a>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
