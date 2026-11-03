import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {brand, contact, pages, whatsapp, type PageId} from '../content';
import {linkClick} from '../lib/nav';
import {media} from '../lib/media';

/**
 * The menu: three slabs wipe in from the right one after another — the
 * barber pole's red, then blue, then bone — and the bone one stays to hold
 * the pages. Hovering a page ripples it (an SVG turbulence + displacement
 * filter whose strength and phase are animated per frame).
 */
export function Menu({open, page, onClose}: {open: boolean; page: PageId; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 7).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  // Escape closes; focus moves into the menu once the slabs have arrived.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: red → blue → bone, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away, with a dim so the page reads as set aside */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-red')} style={delay(0)} />
      <div className={slab('bg-blue')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-bone px-8 pt-24 pb-8 text-ink')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {pages.map((item, i) => {
            const current = item.id === page;
            return (
              <li
                key={item.id}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={(e) => {
                    if (current) {
                      e.preventDefault();
                      onClose();
                    } else linkClick(e);
                  }}
                  className={`display relative inline-flex items-center gap-3 py-1 text-[clamp(34px,3.2vw,50px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-40' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {current && <span className="size-2.5 shrink-0 rounded-full bg-red" aria-hidden />}
                  <span className={current ? 'it' : ''}>{item.label}</span>
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/55">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-4">
            <img src={media('logo.jpg')} alt={`${brand.full} logo`} width={72} height={73} className="size-[72px] rounded-full object-cover" />
            <div>
              <p className="caps text-ink/60">Book a chair</p>
              <a href={whatsapp()} target="_blank" rel="noopener" className="display text-[26px] hover:text-red">
                {contact.phone}
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {contact.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener" className="caps py-2 text-ink/80 hover:text-red">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
