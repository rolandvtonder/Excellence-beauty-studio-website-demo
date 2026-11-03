import {useEffect, useRef, type CSSProperties, type ReactNode} from 'react';
import {brand, contact, whatsapp} from '../content';
import {onFrame} from '../lib/scroll';
import {media} from '../lib/media';
import {Icon} from './Icon';

/** A band of barber-pole stripes that turns as the page scrolls past it. */
export function PoleBand({reduced, className = 'h-3'}: {reduced: boolean; className?: string}) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) return;
    return onFrame(() => {
      if (el.current) el.current.style.backgroundPosition = `${(window.scrollY * 0.35).toFixed(1)}px 0`;
    });
  }, [reduced]);
  return <div ref={el} className={`pole ${className}`} aria-hidden />;
}

/** Numbered small-caps label used above section headings. */
export function Eyebrow({n, children, tone = 'text-bronze'}: {n?: string; children: ReactNode; tone?: string}) {
  return (
    <p className={`caps flex items-center gap-4 ${tone}`}>
      {n && <span>{n}</span>}
      {n && <span className="h-px w-10 bg-current opacity-60" aria-hidden />}
      <span>{children}</span>
    </p>
  );
}

/** Primary and secondary booking buttons. */
export function BookButtons({light = false}: {light?: boolean}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={whatsapp()}
        target="_blank"
        rel="noopener"
        className="caps inline-flex min-h-12 items-center gap-3 bg-red px-7 py-4 text-white transition-colors hover:bg-[#a51f26]"
      >
        <Icon name="whatsapp" /> Book on WhatsApp
      </a>
      <a
        href={contact.phoneHref}
        className={`caps inline-flex min-h-12 items-center gap-3 border px-7 py-4 transition-colors ${
          light ? 'border-ink/30 text-ink hover:bg-ink hover:text-bone' : 'border-bone/35 text-bone hover:bg-bone hover:text-ink'
        }`}
      >
        <Icon name="phone" /> Call {contact.phone}
      </a>
    </div>
  );
}

/** The closing call to book, shared by every page: the emblem, a line, and the buttons. */
export function BookBand({reduced}: {reduced: boolean}) {
  return (
    <section aria-labelledby="book-title" className="relative overflow-hidden bg-bone text-ink">
      <PoleBand reduced={reduced} />
      <div className="mx-auto grid max-w-[1680px] items-center gap-12 px-5 py-24 md:grid-cols-[1fr_auto] md:px-14 md:py-32">
        <div data-reveal>
          <Eyebrow tone="text-red">Walk-ins welcome</Eyebrow>
          <h2 id="book-title" className="display mt-5 text-[clamp(46px,6.4vw,112px)]">
            <span className="block">Your chair</span>
            <span className="it block pl-[0.9em]">is waiting.</span>
          </h2>
          <p className="prose-body mt-6 max-w-[520px] text-ink/80">
            Message us on WhatsApp with the style you want and a time that suits you — we’ll confirm your chair. {contact.street}, {contact.area}.
          </p>
          <div className="mt-9">
            <BookButtons light />
          </div>
        </div>
        <img
          data-reveal
          style={{'--d': '0.15s'} as CSSProperties}
          src={media('logo.jpg')}
          alt={`${brand.full} emblem`}
          width={360}
          height={366}
          loading="lazy"
          className="w-[min(360px,70vw)] justify-self-center shadow-[0_30px_80px_rgb(12_10_9/0.35)]"
        />
      </div>
    </section>
  );
}
