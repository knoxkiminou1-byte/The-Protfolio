import React, { useEffect, useRef, useState } from 'react';

type Project = {
  name: string;
  url: string;
};

const AAFC_GOLD = '#D4A64A';
const AAFC_NAVY_1 = '#060A14';
const AAFC_NAVY_2 = '#0B1630';

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

      <div className="premium-content mx-auto max-w-[1500px] px-6 pb-20 pt-10">
        <header>
          <h1 className="text-center text-4xl font-extrabold sm:text-6xl" style={{ color: AAFC_GOLD }}>
            AAFC PORTFOLIO
          </h1>
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
                </div>

                <div className="px-6 pb-6 pt-5">
                  <h2 className="text-xl font-semibold text-white">{project.name}</h2>
                </div>
              </a>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
