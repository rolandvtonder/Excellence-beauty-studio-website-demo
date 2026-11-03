import {useEffect, useRef, useState} from 'react';
import {hero} from '../content';
import {useCameraPull} from '../hooks/useCameraPull';
import {media} from '../lib/media';

const HOLD_MS = 6500;

/**
 * Home opener. The reference loops a film here; the studio has photos, so
 * they crossfade with a slow camera push instead, under the mixed
 * upright/italic headline. Scrolling on, the whole stage pulls back.
 */
export function Hero({reduced}: {reduced: boolean}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // `cycle` counts every advance; the photo on screen is cycle % length.
  const [cycle, setCycle] = useState(0);
  const count = hero.slides.length;
  const i = cycle % count;
  const prev = (cycle - 1 + count) % count;
  useCameraPull(root, stage, reduced);

  // Rotates on its own; stays on the first photo for reduced-motion visitors.
  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => setCycle((c) => c + 1), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [cycle, reduced]);

  return (
    <section ref={root} id="top" aria-label="Welcome" className="relative h-svh min-h-[620px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {hero.slides.map((s, n) => {
          // Re-keyed each time it comes on so the push restarts; the photo
          // fading out keeps its key so its push carries on under the fade.
          const key = n === i ? `a${cycle}` : n === prev && cycle > 0 ? `a${cycle - 1}` : 'idle';
          const moving = (n === i || n === prev) && !reduced;
          return (
          <div
            key={s.src}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1600ms] ease-silk ${n === i ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={n !== i}
          >
            <img
              key={key}
              src={media(s.src)}
              alt={s.alt}
              fetchPriority={n === 0 ? 'high' : 'auto'}
              loading={n === 0 ? 'eager' : 'lazy'}
              className="size-full object-cover"
              style={{
                objectPosition: s.pos,
                animation: moving ? `push ${HOLD_MS + 1600}ms linear both` : 'none',
              }}
            />
          </div>
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_10_9/0.78),rgb(12_10_9/0.25)_60%,transparent),linear-gradient(0deg,rgb(12_10_9/0.7),transparent_40%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(96px,13vh,140px)] md:px-14">
          <h1 className="display text-[clamp(50px,7.6vw,138px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {hero.lines.map((l, n) => (
              <span
                key={l.t}
                className={`block ${l.i ? 'it' : ''} ${n === 0 ? 'pl-[1.2em]' : ''} ${l.t === 'Excellence' ? 'text-bronze' : ''}`}
              >
                {l.t}
              </span>
            ))}
          </h1>
          <p className="prose-body mt-8 ml-[clamp(0px,19vw,330px)] max-w-[380px] text-[16px] text-white/90 max-md:ml-0 md:text-[17px]">
            {hero.body}
          </p>
        </div>
      </div>
    </section>
  );
}
