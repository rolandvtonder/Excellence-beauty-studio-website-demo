import type {CSSProperties} from 'react';
import {PageHero} from '../components/PageHero';
import {BookBand, Eyebrow, PoleBand} from '../components/Sections';
import {about, barberPhoto, brand} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {media} from '../lib/media';
import {mount} from '../mount';

function About() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHero
        index={4}
        eyebrow="About"
        lines={[{t: 'Born in'}, {t: 'the barber’s', i: true}, {t: 'chair.'}]}
        body="A barbershop that grew into a full studio — barbers and braiders side by side on Voortrekker Road, Bellville."
        photo="studio-interior.jpg"
        pos="50% 45%"
        alt="Inside the studio: lit mirrors, barber chairs and the wig wall"
        reduced={reduced}
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[1fr_1fr] md:gap-20 md:px-14 md:py-36">
        <figure data-reveal className="md:sticky md:top-28 md:self-start">
          <img src={media(barberPhoto.src)} alt={barberPhoto.alt} width={barberPhoto.w} height={barberPhoto.h} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </figure>
        <div className="self-center">
          <div data-reveal>
            <Eyebrow n="01">Our story</Eyebrow>
          </div>
          <h2 id="story-title" data-reveal className="display mt-6 text-[clamp(42px,4.8vw,84px)]">
            {about.lead}
          </h2>
          {about.body.map((t, n) => (
            <p key={n} data-reveal style={{'--d': `${0.08 * (n + 1)}s`} as CSSProperties} className="prose-body mt-6 max-w-[560px] text-bone/80">
              {t}
            </p>
          ))}
        </div>
      </section>

      <PoleBand reduced={reduced} />

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-coal py-24 md:py-32">
        <div className="mx-auto max-w-[1680px] px-5 md:px-14">
          <div data-reveal>
            <Eyebrow n="02">How we work</Eyebrow>
          </div>
          <h2 id="values-title" data-reveal className="display mt-5 text-[clamp(44px,5.4vw,92px)]">
            <span className="block">Three things</span>
            <span className="it block pl-[0.8em]">every chair</span>
          </h2>
          <ol className="mt-16 grid gap-[3px] md:grid-cols-3">
            {about.values.map((v, n) => (
              <li key={v.title} data-reveal style={{'--d': `${n * 0.1}s`} as CSSProperties} className="bg-ink p-8 md:p-10">
                <p className="caps text-bronze">0{n + 1}</p>
                <h3 className="display it mt-8 text-[clamp(36px,3vw,52px)]">{v.title}</h3>
                <p className="prose-body mt-4 text-bone/75">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
        <div data-reveal>
          <Eyebrow n="03">The team</Eyebrow>
        </div>
        <h2 id="team-title" data-reveal className="display mt-5 text-[clamp(44px,5.4vw,92px)]">
          <span className="block">The hands</span>
          <span className="it block pl-[0.8em]">behind it</span>
        </h2>
        <ul className="mt-16 grid gap-10 md:grid-cols-3 md:gap-[3px]">
          {about.team.map((m, n) => (
            <li key={m.name} data-reveal style={{'--d': `${n * 0.1}s`} as CSSProperties}>
              <div className={`overflow-hidden ${m.logo ? 'bg-black' : ''}`}>
                <img
                  src={media(m.photo)}
                  alt={m.logo ? `${brand.full} emblem: James King, your barber` : ''}
                  loading="lazy"
                  className={`aspect-[4/5] w-full ${m.logo ? 'object-contain p-6' : 'object-cover'}`}
                />
              </div>
              <div className="pt-6 md:px-2">
                <p className="caps text-bronze">{m.role}</p>
                <h3 className="display mt-2 text-[clamp(32px,2.6vw,44px)]">{m.name}</h3>
                <p className="prose-body mt-2 text-bone/75">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <BookBand reduced={reduced} />
    </div>
  );
}

mount('about', <About />);
