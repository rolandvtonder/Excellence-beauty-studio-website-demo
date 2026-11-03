import {useEffect, useRef, useState} from 'react';
import {chairs} from '../content';
import {linkClick} from '../lib/nav';
import {media} from '../lib/media';
import {Icon} from './Icon';

/**
 * The reference's fleet, as the studio's three stations: tall panels that
 * slide in from the right one after another once the section is in view,
 * each opening onto its part of the services page.
 */
export function Chairs() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="chairs-title" className="relative bg-ink">
      <h2 id="chairs-title" className="sr-only">
        What we do
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {chairs.map((c, i) => (
          <a
            key={c.id}
            href={c.href}
            onClick={linkClick}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[80svh] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: c.tint}}
          >
            <img
              src={media(c.photo)}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
              style={{objectPosition: c.pos}}
            />
            {/* The station's colour bleeds in from the bottom edge. */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(12_10_9/0.72),transparent_38%,transparent_60%,rgb(12_10_9/0.85))]" />
            <div className="absolute inset-x-0 bottom-0 h-1.5" style={{background: c.tint}} />

            <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
              <div>
                <p className="caps text-white/70">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(38px,3.6vw,64px)] text-white">
                  <span className="block">{c.name[0]}</span>
                  <span className="it block">{c.name[1]}</span>
                </h3>
              </div>
              <div className={`transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                <dl className="space-y-3">
                  {c.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/65">{k}</dt>
                      <dd className="caps text-[14px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="caps mt-6 inline-flex items-center gap-3 border-b border-white/50 pb-1 text-white transition-[gap] duration-500 group-hover:gap-5">
                  See services <Icon name="arrow" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
