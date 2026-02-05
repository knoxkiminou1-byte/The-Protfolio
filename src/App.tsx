import React, { useMemo, useState } from 'react';

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
const HERO_CONTACT_URL = 'mailto:kiminou.knox@aafcbuilders.org';

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
    url: 'https://social-following-studio.vercel.app/',
    summary: 'Studio site focused on social following growth services.',
  },
];

function safeString(v: unknown): string {
  return v == null ? '' : String(v);
}

function normalizeHref(href: string): string {
  const s = safeString(href).trim();
  if (!s) return '';
  const lower = s.toLowerCase();
  if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:')) return s;
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

type PreviewProps = {
  url: string;
  title: string;
};

function Preview({ url, title }: PreviewProps) {
  const [failed, setFailed] = useState(false);
  const href = useMemo(() => normalizeHref(url), [url]);
  const src = useMemo(() => previewUrl(url), [url]);
  const domain = domainFromUrl(url);

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
              onError={() => setFailed(true)}
              className="h-full w-full object-cover"
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
  href: string;
  children: React.ReactNode;
  variant?: 'gold' | 'outline';
  ariaLabel?: string;
};

function Button({ href, children, variant = 'gold', ariaLabel }: ButtonProps) {
  const normalized = useMemo(() => normalizeHref(href), [href]);
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';

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

  return (
    <a
      href={normalized}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={base}
      style={{ ...style, ...ringStyle }}
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
  const pageBg: React.CSSProperties = {
    backgroundImage:
      'radial-gradient(1200px circle at 50% 18%, rgba(14,35,72,0.85), transparent 62%), radial-gradient(900px circle at 65% 28%, rgba(212,166,74,0.14), transparent 60%), linear-gradient(' +
      AAFC_NAVY_1 +
      ', ' +
      AAFC_NAVY_2 +
      ')',
  };

  const headerBg: React.CSSProperties = {
    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.0))',
  };

  const cardBg: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.10)',
  };

  return (
    <div className="min-h-screen" style={pageBg}>
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
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">AAFC PORTFOLIO</h1>
              <p className="mt-4 text-lg sm:text-xl" style={{ color: AAFC_GOLD, fontWeight: 700 }}>
                Live links with previews
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button href={HERO_PRIMARY_URL} variant="gold" ariaLabel="Open AAFC Builders website">
                  View our site
                </Button>
                <Button href={HERO_CONTACT_URL} variant="outline" ariaLabel="Email AAFC">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <article key={p.url} className="rounded-3xl overflow-hidden" style={cardBg}>
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
                      className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: 'rgba(212,166,74,0.16)',
                        color: AAFC_GOLD,
                        border: '1px solid rgba(212,166,74,0.38)',
                      }}
                    >
                      Live
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
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
        </main>
      </div>
    </div>
  );
}
