import type {CSSProperties} from 'react';
import {Chairs} from '../components/Chairs';
import {Hero} from '../components/Hero';
import {Icon} from '../components/Icon';
import {BookBand, Eyebrow, PoleBand} from '../components/Sections';
import {photos, studioPhoto} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {linkClick} from '../lib/nav';
import {media, site} from '../lib/media';
import {mount} from '../mount';

const strip = ['cut-heart-design.jpg', 'braids-kid-side.jpg', 'cut-bun-design-2.jpg', 'braids-copper-top.jpg', 'cut-cornrow-fade.jpg'].map(
  (src) => photos.find((p) => p.src === src)!,
);

function Home() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Hero reduced={reduced} />
      <Chairs />
      <PoleBand reduced={reduced} />

      {/* The studio, in a sentence and a photo */}
      <section aria-labelledby="studio-title" className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[1.1fr_1fr] md:gap-20 md:px-14 md:py-36">
        <div className="self-center">
          <div data-reveal>
            <Eyebrow n="01">The studio</Eyebrow>
          </div>
          <h2 id="studio-title" data-reveal className="display mt-6 text-[clamp(44px,5.6vw,96px)]">
            <span className="block">Walk in sharp.</span>
            <span className="it block pl-[0.8em] text-bronze">Walk out</span>
            <span className="it block pl-[0.8em] text-bronze">excellent.</span>
          </h2>
          <p data-reveal style={{'--d': '0.1s'} as CSSProperties} className="prose-body mt-8 max-w-[520px] text-bone/80">
            Under the lit mirrors on Voortrekker Road, barbers and braiders work side by side. Bring a picture or bring an idea — a bald fade, a
            freehand swirl, cornrows into curly ponies — and we’ll take the time to get it right.
          </p>
          <a
            data-reveal
            href={site('/about/')}
            onClick={linkClick}
            className="caps mt-8 inline-flex items-center gap-3 border-b border-bone/40 pb-1 transition-[gap] duration-500 hover:gap-5"
          >
            Meet the studio <Icon name="arrow" />
          </a>
        </div>
        <figure data-reveal style={{'--d': '0.15s'} as CSSProperties} className="relative">
          <img
            src={media(studioPhoto.src)}
            alt={studioPhoto.alt}
            width={studioPhoto.w}
            height={studioPhoto.h}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          <figcaption className="caps absolute -bottom-4 left-4 bg-red px-4 py-2 text-white md:-left-6">Voortrekker Rd · Bellville</figcaption>
        </figure>
      </section>

      {/* From the chairs: a taste of the gallery */}
      <section aria-labelledby="work-title" className="border-t border-bone/10 py-24 md:py-32">
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-6 px-5 md:px-14">
          <div data-reveal>
            <Eyebrow n="02">Fresh from the chairs</Eyebrow>
            <h2 id="work-title" className="display mt-5 text-[clamp(44px,5.6vw,96px)]">
              <span className="block">Recent</span>
              <span className="it block pl-[0.8em]">work</span>
            </h2>
          </div>
          <a
            data-reveal
            href={site('/gallery/')}
            onClick={linkClick}
            className="caps inline-flex min-h-11 items-center gap-3 border border-bone/35 px-6 py-3 transition-colors hover:bg-bone hover:text-ink"
          >
            Full gallery <Icon name="arrow" />
          </a>
        </div>
        <ul className="mx-auto mt-14 grid max-w-[1680px] grid-cols-2 gap-[3px] px-5 md:grid-cols-5 md:px-14">
          {strip.map((p, n) => (
            <li key={p.src} data-reveal style={{'--d': `${n * 0.07}s`} as CSSProperties} className={n === 4 ? 'max-md:hidden' : ''}>
              <a href={site('/gallery/')} onClick={linkClick} className="group block overflow-hidden" aria-label={`${p.alt} — open gallery`}>
                <img
                  src={media(p.src)}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <BookBand reduced={reduced} />
    </div>
  );
}

mount('home', <Home />);
