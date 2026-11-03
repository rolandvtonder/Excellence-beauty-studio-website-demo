import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {brand, whatsapp, type PageId} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {linkClick} from '../lib/nav';
import {lockScroll, scrollToHash, startScroll} from '../lib/scroll';
import {Footer} from './Footer';
import {Icon} from './Icon';
import {Menu} from './Menu';
import {PageCover} from './PageCover';

/**
 * Everything every page shares: the scroll loop, the wordmark, the Menu and
 * Book buttons, the slab menu, the page-change cover, footer and grain.
 */
export function Layout({page, children}: {page: PageId; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => startScroll(reduced), [reduced]);

  useEffect(() => lockScroll(open), [open]);

  // Hash links: on load (e.g. /services/#braids) and same-page menu jumps.
  useEffect(() => {
    if (location.hash) {
      const h = location.hash;
      document.fonts?.ready.then(() => scrollToHash(h, true));
    }
    // From the menu, let the slabs start closing before the page moves.
    const onHash = (e: Event) => {
      const wait = openRef.current ? 300 : 0;
      setOpen(false);
      window.setTimeout(() => scrollToHash((e as CustomEvent<string>).detail), wait);
    };
    window.addEventListener('ex:hash', onHash);
    return () => window.removeEventListener('ex:hash', onHash);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.getElementById('menu-button')?.focus({preventScroll: true});
  }, []);

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[80] -translate-y-24 bg-bone px-4 py-3 text-ink focus:translate-y-0">
        Skip to content
      </a>

      <a
        href="/"
        onClick={linkClick}
        inert={open}
        className="fixed top-5 left-5 z-[55] text-white mix-blend-difference md:top-7 md:left-14"
        aria-label={`${brand.full} — home`}
      >
        <span className="display block text-[22px] leading-none tracking-[0.2em]">{brand.name}</span>
        <span className="caps block text-[9px] leading-[2.2] tracking-[0.42em]">Beauty studio</span>
      </a>

      <button
        id="menu-button"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="menu"
        className={`caps fixed top-4 right-4 z-[55] flex min-h-11 items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-6 md:right-8 ${
          open ? 'bg-ink text-bone' : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`} aria-hidden>
          +
        </span>
      </button>

      <a
        href={whatsapp()}
        target="_blank"
        rel="noopener"
        // The menu carries its own booking line, so this steps aside while it is open.
        inert={open}
        className={`caps fixed right-4 bottom-4 z-[55] flex min-h-11 items-center gap-3 bg-bone px-6 py-3.5 text-ink shadow-[0_10px_40px_rgb(0_0_0/0.35)] transition-[background-color,color,opacity,translate] duration-500 ease-silk hover:bg-red hover:text-white md:right-8 md:bottom-7 md:px-8 ${
          open ? 'pointer-events-none translate-y-6 opacity-0' : ''
        }`}
      >
        <Icon name="whatsapp" />
        <span>
          Book on <em className="normal-case">WhatsApp</em>
        </span>
      </a>

      <main id="main" inert={open} tabIndex={-1} className="outline-none">
        {children}
      </main>
      <div inert={open}>
        <Footer />
      </div>

      <Menu open={open} page={page} onClose={close} />
      <PageCover />
      <div className="grain" aria-hidden />
    </>
  );
}
