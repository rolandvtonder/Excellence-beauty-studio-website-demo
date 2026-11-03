import type {CSSProperties} from 'react';
import {Icon} from '../components/Icon';
import {PageHero} from '../components/PageHero';
import {BookBand, Eyebrow} from '../components/Sections';
import {services, whatsapp} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {goTo} from '../lib/nav';
import {media} from '../lib/media';
import {mount} from '../mount';

function Services() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHero
        index={2}
        eyebrow="Services"
        lines={[{t: 'The cut,'}, {t: 'the line,', i: true}, {t: 'the braid.'}]}
        body="Everything we do in the chair, from a ten-minute line-up to an afternoon of feed-ins. Tap any service to book it on WhatsApp."
        photo="cut-twists-profile.jpg"
        pos="55% 35%"
        alt="Twists over a sharp taper with a cut-in hairline"
        reduced={reduced}
      />

      {/* Jump list */}
      <nav aria-label="Service groups" className="border-b border-bone/10">
        <ul className="mx-auto flex max-w-[1680px] flex-wrap gap-2 px-5 py-5 md:px-14">
          {services.map((g) => (
            <li key={g.id} className="shrink-0">
              <a
                href={`#${g.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(`#${g.id}`);
                }}
                className="caps inline-flex min-h-11 items-center border border-bone/25 px-4 py-2 whitespace-nowrap transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                {g.title.join(' ')}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`${g.id}-title`}
          className="mx-auto grid max-w-[1680px] scroll-mt-20 gap-10 border-b border-bone/10 px-5 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20 md:px-14 md:py-28"
        >
          <figure data-reveal className="md:sticky md:top-28 md:self-start">
            <img src={media(g.photo.src)} alt={g.photo.alt} width={g.photo.w} height={g.photo.h} loading="lazy" className="aspect-[4/5] w-full object-cover max-md:aspect-[4/3]" />
          </figure>

          <div>
            <div data-reveal>
              <Eyebrow n={`0${gi + 1}`}>{g.title.join(' ')}</Eyebrow>
            </div>
            <h2 id={`${g.id}-title`} data-reveal className="display mt-5 text-[clamp(46px,5.4vw,92px)]">
              <span className="block">{g.title[0]}</span>
              <span className="it block pl-[0.8em]">{g.title[1]}</span>
            </h2>
            <p data-reveal className="prose-body mt-6 max-w-[540px] text-bone/80">
              {g.intro}
            </p>

            <ul className="mt-12 border-t border-bone/15">
              {g.items.map((s, n) => (
                <li key={s.name} data-reveal style={{'--d': `${n * 0.05}s`} as CSSProperties} className="border-b border-bone/15">
                  <a
                    href={whatsapp(`Hi Excellence, I’d like to book: ${s.name}.`)}
                    target="_blank"
                    rel="noopener"
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 transition-colors hover:bg-bone/[0.04] md:px-3"
                  >
                    <span className="display text-[clamp(26px,2.3vw,38px)] transition-colors group-hover:text-bronze">{s.name}</span>
                    <span className="caps text-right text-[13px] text-bone">{s.price ?? 'Ask us'}</span>
                    <span className="prose-body text-[16px] text-bone/70">{s.note}</span>
                    <span className="caps inline-flex items-center justify-end gap-2 text-bronze">
                      Book <Icon name="arrow" className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <BookBand reduced={reduced} />
    </div>
  );
}

mount('services', <Services />);
