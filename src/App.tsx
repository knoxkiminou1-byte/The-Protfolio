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
      { threshold: 0.2 },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

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
          <h1 className="hero-title">Cinematic Digital Craftsmanship</h1>
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
                  <img src={previewUrl(project.url)} alt={project.name} className="preview-image h-56 w-full object-cover" loading="lazy" />
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
