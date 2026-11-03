import {useRef} from 'react';
import {useCameraPull} from '../hooks/useCameraPull';
import {media} from '../lib/media';

type Line = {t: string; i?: boolean};

/**
 * The opener for the inner pages: one photo, a numbered eyebrow and a
 * mixed upright/italic headline, with the same camera pull-back on scroll.
 */
export function PageHero({
  index,
  eyebrow,
  lines,
  body,
  photo,
  pos = '50% 40%',
  alt,
  reduced,
}: {
  index: number;
  eyebrow: string;
  lines: Line[];
  body: string;
  photo: string;
  pos?: string;
  alt: string;
  reduced: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useCameraPull(root, stage, reduced);

  return (
    <section ref={root} id="top" className="relative h-[86svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img src={media(photo)} alt={alt} fetchPriority="high" className="size-full object-cover" style={{objectPosition: pos}} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_10_9/0.82),rgb(12_10_9/0.3)_65%,transparent),linear-gradient(0deg,rgb(12_10_9/0.85),transparent_45%)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(40px,9vh,96px)] md:px-14">
          <p className="caps flex items-center gap-4 text-bronze">
            <span>0{index}</span>
            <span className="h-px w-10 bg-bronze/60" aria-hidden />
            <span>{eyebrow}</span>
          </p>
          <h1 className="display mt-5 text-[clamp(52px,8vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {lines.map((l, n) => (
              <span key={l.t} className={`block ${l.i ? 'it' : ''} ${n === 1 ? 'pl-[0.9em]' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          <p className="prose-body mt-6 max-w-[460px] text-[16px] text-white/90 md:text-[17px]">{body}</p>
        </div>
      </div>
    </section>
  );
}
