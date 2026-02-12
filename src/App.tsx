import React, { useEffect, useMemo, useRef, useState } from 'react';

type Project = {
  name: string;
  url: string;
  summary: string;
};

const AAFC_GOLD = '#D4A64A';
const AAFC_NAVY_1 = '#070B14';
const AAFC_NAVY_2 = '#0B1630';
const AAFC_NAVY_3 = '#0E2348';

const HEADER_CTA_URL = 'https://www.aafcbuilders.org/';
const HERO_PRIMARY_URL = 'https://www.aafcbuilders.org/';
const HERO_CONTACT_URL = 'mailto:hello@aafcbuilders.org';
const CONTACT_EMAIL = 'hello@aafcbuilders.org';

const PROJECTS: Project[] = [
  {
    name: 'Marchitects Builders',
    url: 'https://www.marchitects.builders/',
    summary: 'Local business site designed for trust and lead conversion.',
  },
  {
    name: 'Kiminou Knox',
    url: 'https://kiminouknox.com/',
    summary: 'Personal site for writing, projects, and professional identity.',
  },
  {
    name: 'AAFC Builders',
    url: 'https://www.aafcbuilders.org/',
    summary: 'Agency and program hub for community-forward digital builds.',
  },
  {
    name: 'Muisi',
    url: 'https://muisi.vercel.app/',
    summary: 'Seasonal dancer website for Muisi Kongo Malonga.',
  },
  {
    name: 'Muisi Kongo Malonga',
    url: 'https://www.muisikongo.com/',
    summary: 'Website for artist Muisi Kongo Malonga',
  },
  {
    name: 'Linea Collective',
    url: 'https://www.lineaculture.com/',
    summary: 'Collective site built to communicate mission, work, and credibility.',
  },
  {
    name: 'Ricardo Scales Piano',
    url: 'https://ricardoscalespiano.com/',
    summary: 'Booking-focused musician site with clean navigation.',
  },
  {
    name: 'SL Montgomery Law (Preview)',
    url: 'https://slmontgomerylaw-upgrade.vercel.app/',
    summary: 'Modern law firm preview build with strong messaging.',
  },
  {
    name: 'DGRP Baysound',
    url: 'https://www.dgrpbaysound.com/',
    summary: 'Music brand site with clear identity and contact path.',
  },
  {
    name: 'Social Following Studio',
    url: 'https://social-following-studios.vercel.app/',
    summary: 'Updated studio site focused on social following growth services.',
  },
  {
    name: "Wellness Escape Coach, Marti Shaw's website",
    url: 'https://wellness-escape-webiste.vercel.app/',
    summary: 'Wellness coaching website with a calm, personal brand experience.',
  },
];

function safeString(v: unknown): string {
  return v == null ? '' : String(v);
}

function normalizeHref(href: string): string {
  const s = safeString(href).trim();
  if (!s) return '';
  const lower = s.toLowerCase();
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('#')
  )
    return s;
  return 'https://' + s;
}

function domainFromUrl(url: string): string {
  const normalized = normalizeHref(url);
  try {
    return new URL(normalized).hostname;
  } catch {
    return String(normalized).replace(/^https?:\/\//, '').split('/')[0];
  }
}

function previewUrl(url: string): string {
  const normalized = normalizeHref(url);
  return 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(normalized) + '?w=1400';
}

function alternatePreviewUrls(url: string): string[] {
  const normalized = normalizeHref(url);
  const encoded = encodeURIComponent(normalized);
  return [
    previewUrl(url),
    `https://image.thum.io/get/width/1400/noanimate/${normalized}`,
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`,
  ];
}

function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const platform = navigator.platform || '';
  const userAgent = navigator.userAgent || '';
  const applePlatforms = ['MacIntel', 'MacPPC', 'Mac68K', 'iPhone', 'iPad', 'iPod'];
  return applePlatforms.includes(platform) || /Mac|iPhone|iPad|iPod/i.test(userAgent);
}

function buildMailtoUrl(to: string, subject: string, body: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ''}`;
}

function buildGmailUrl(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
  });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

type PreviewProps = {
  url: string;
  title: string;
};

function Preview({ url, title }: PreviewProps) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const href = useMemo(() => normalizeHref(url), [url]);
  const sources = useMemo(() => alternatePreviewUrls(url), [url]);
  const src = sources[sourceIndex];
  const domain = domainFromUrl(url);
  const failed = sourceIndex >= sources.length;

  useEffect(() => {
    setSourceIndex(0);
  }, [url]);

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        {!failed ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
            <img
              src={src}
              alt={'Preview of ' + title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setSourceIndex((value) => value + 1)}
              className="preview-image h-full w-full object-cover"
            />
          </a>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 grid place-items-center"
            style={{
              backgroundImage:
                'radial-gradient(700px circle at 30% 20%, rgba(212,166,74,0.18), transparent 60%), radial-gradient(700px circle at 70% 30%, rgba(14,35,72,0.55), transparent 65%), linear-gradient(' +
                AAFC_NAVY_2 +
                ', ' +
                AAFC_NAVY_3 +
                ')',
              textDecoration: 'none',
            }}
          >
            <div className="text-center px-5">
              <div
                className="mx-auto h-12 w-12 rounded-2xl grid place-items-center font-black"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                {domain.slice(0, 1).toUpperCase()}
              </div>
              <div className="mt-3 text-sm font-semibold text-white">Preview unavailable</div>
              <div className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.70)' }}>
                {domain}
              </div>
            </div>
          </a>
        )}

        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              color: 'rgba(255,255,255,0.92)',
              backgroundColor: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {domain}
          </span>
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: 'gold' | 'outline';
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

function Button({ href = '#', children, variant = 'gold', ariaLabel, onClick }: ButtonProps) {
  const normalized = useMemo(() => normalizeHref(href), [href]);
  const base =
    'cta-button inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

  const style: React.CSSProperties =
    variant === 'gold'
      ? {
          backgroundColor: AAFC_GOLD,
          color: 'black',
          border: '1px solid rgba(0,0,0,0.15)',
        }
      : {
          backgroundColor: 'transparent',
          color: AAFC_GOLD,
          border: '1px solid rgba(212,166,74,0.55)',
        };

  const ringStyle: React.CSSProperties = {
    boxShadow: '0 0 0 2px rgba(212,166,74,0.18)',
  };

  const isExternal = normalized.startsWith('http://') || normalized.startsWith('https://');
  const rel = isExternal ? 'noopener noreferrer' : undefined;
  const target = isExternal ? '_blank' : undefined;

  return (
    <a
      href={normalized}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={base}
      style={{ ...style, ...ringStyle }}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function LogoMark() {
  const goldGrad: React.CSSProperties = {
    backgroundImage: 'linear-gradient(180deg, #F7D27D, ' + AAFC_GOLD + ')',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <div className="flex items-center gap-3">
      <div className="leading-none">
        <div className="text-2xl font-black tracking-tight" style={goldGrad}>
          AAFC
        </div>
        <div className="mt-1 h-[2px] w-16" style={{ backgroundColor: AAFC_GOLD, opacity: 0.75 }} />
      </div>
    </div>
  );
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
      { threshold: 0.14, rootMargin: '0px 0px -30px 0px' },
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const pageBg: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(1200px circle at 50% 16%, rgba(14,35,72,0.88), transparent 62%), radial-gradient(750px circle at 16% 24%, rgba(212,166,74,0.12), transparent 64%), radial-gradient(1000px circle at 86% 44%, rgba(81,116,188,0.16), transparent 66%), linear-gradient(' +
      AAFC_NAVY_1 +
      ', ' +
      AAFC_NAVY_2 +
      ')',
  };

  const headerBg: React.CSSProperties = {
    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.0))',
  };

  const cardBg: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 24px 55px rgba(8, 14, 30, 0.28), inset 0 1px 0 rgba(255,255,255,0.09)',
    backdropFilter: 'blur(12px)',
  };

  const handleContactNavigation = (subject: string, body: string) => {
    if (isApplePlatform()) {
      window.location.href = buildMailtoUrl(CONTACT_EMAIL, subject, body);
      return;
    }

    window.open(buildGmailUrl(CONTACT_EMAIL, subject, body), '_blank', 'noopener,noreferrer');
  };

  const handleContactClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    handleContactNavigation('AAFC Builders inquiry', '');
  };

  const handleContactSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = safeString(formData.get('name')).trim();
    const email = safeString(formData.get('email')).trim();
    const message = safeString(formData.get('message')).trim();
    const subject = name ? `AAFC Builders contact form - ${name}` : 'AAFC Builders contact form';
    const bodyLines = [
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      '',
      message,
    ].filter(Boolean);
    handleContactNavigation(subject, bodyLines.join('\n'));
  };

  return (
    <div className="premium-bg min-h-screen" style={pageBg}>
      <div className="background-noise" aria-hidden="true" />
      <div className="background-vignette" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 pb-14">
        <header className="pt-8 pb-10" style={headerBg}>
          <div className="flex items-center justify-between gap-4">
            <LogoMark />
            <Button href={HEADER_CTA_URL} variant="gold" ariaLabel="Open AAFC Builders">
              Partner with us
            </Button>
          </div>

          <div className="mt-10 text-center">
            <div className="mx-auto max-w-4xl">
              <h1
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
                style={{ textShadow: '0 8px 35px rgba(0,0,0,0.55)' }}
              >
                AAFC PORTFOLIO
              </h1>
              <p className="mt-4 text-lg sm:text-xl" style={{ color: AAFC_GOLD, fontWeight: 700 }}>
                Fresh live links with updated hero sections
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={HERO_PRIMARY_URL} variant="gold" ariaLabel="Open AAFC Builders website">
                  View our site
                </Button>
                <Button href={HERO_CONTACT_URL} variant="outline" ariaLabel="Email AAFC" onClick={handleContactClick}>
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {PROJECTS.map((p, index) => (
              <article
                key={p.url}
                ref={(node) => (cardRefs.current[index] = node)}
                data-index={index}
                className={`project-card rounded-3xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
                  visibleCards[index] ? 'is-visible' : ''
                }`}
                style={{ ...cardBg, transitionDelay: `${index * 75}ms` }}
              >
                <div className="p-4">
                  <Preview url={p.url} title={p.name} />
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold leading-tight text-white">{p.name}</div>
                      <div className="mt-1 text-xs break-all" style={{ color: 'rgba(255,255,255,0.66)' }}>
                        {normalizeHref(p.url)}
                      </div>
                    </div>
                    <span
                      className="live-badge shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                      style={{
                        backgroundColor: 'rgba(212,166,74,0.14)',
                        color: AAFC_GOLD,
                        border: '1px solid rgba(212,166,74,0.38)',
                      }}
                    >
                      <span className="live-dot" aria-hidden="true" />
                      Live
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-7" style={{ color: 'rgba(255,255,255,0.74)', fontWeight: 300 }}>
                    {p.summary}
                  </p>

                  <div className="mt-4">
                    <Button href={p.url} variant="gold" ariaLabel={'Open ' + p.name}>
                      Open site
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section id="contact" className="mt-14 rounded-3xl px-6 py-10" style={cardBg}>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">Contact AAFC Builders</h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Share your project details and we will route your message to the right team member. Apple users will
                  open their Mail app, and everyone else will be routed to Gmail to send to {CONTACT_EMAIL}.
                </p>
                <div className="mt-5">
                  <Button href={HERO_CONTACT_URL} variant="outline" ariaLabel="Email AAFC" onClick={handleContactClick}>
                    Email us now
                  </Button>
                </div>
              </div>

              <form className="grid gap-4" onSubmit={handleContactSubmit}>
                <label className="grid gap-2 text-sm font-semibold text-white">
                  Name
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgba(212,166,74,0.6)]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-white">
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgba(212,166,74,0.6)]"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-white">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project."
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgba(212,166,74,0.6)]"
                  />
                </label>
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
                    style={{
                      backgroundColor: AAFC_GOLD,
                      color: 'black',
                      border: '1px solid rgba(0,0,0,0.15)',
                    }}
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
