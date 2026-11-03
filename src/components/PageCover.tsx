import {useEffect, useState, type ReactNode} from 'react';
import {brand} from '../content';
import {arrivedByWipe, LEAVE} from '../lib/nav';

type Phase = 'idle' | 'leave' | 'cover' | 'reveal';

const POS: Record<Phase, string> = {
  idle: 'translate-x-[104%]',
  leave: 'translate-x-0',
  cover: 'translate-x-0',
  reveal: '-translate-x-[104%]',
};

/**
 * The page change. Leaving, the same three slabs as the menu (red, blue,
 * then ink) sweep in from the right; the next page opens under the ink one
 * and the slabs carry on out to the left, so the move reads as one wipe
 * across two pages.
 */
export function PageCover() {
  const [phase, setPhase] = useState<Phase>(() => (arrivedByWipe() ? 'cover' : 'idle'));

  useEffect(() => {
    const leave = () => setPhase('leave');
    // Back/forward can restore this page from cache mid-wipe: uncover it.
    const show = (e: PageTransitionEvent) => e.persisted && setPhase('reveal');
    window.addEventListener(LEAVE, leave);
    window.addEventListener('pageshow', show);
    return () => {
      window.removeEventListener(LEAVE, leave);
      window.removeEventListener('pageshow', show);
    };
  }, []);

  useEffect(() => {
    if (phase === 'cover') {
      // Two frames so the covered state paints before the wipe starts.
      let r2 = 0;
      const r1 = requestAnimationFrame(() => (r2 = requestAnimationFrame(() => setPhase('reveal'))));
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    if (phase === 'reveal') {
      const t = window.setTimeout(() => setPhase('idle'), 1100);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  const moving = phase === 'leave' || phase === 'reveal';
  const slab = (k: number, color: string, children?: ReactNode) => (
    <div
      className={`absolute inset-0 ${color} ${POS[phase]} ${moving ? 'transition-transform duration-[700ms] ease-wipe' : ''}`}
      // In: red first. Out: ink first, uncovering blue then red.
      style={{transitionDelay: moving ? `${phase === 'leave' ? k * 0.09 : (2 - k) * 0.08}s` : '0s'}}
    >
      {children}
    </div>
  );

  return (
    <div aria-hidden className={`fixed inset-0 z-[70] overflow-hidden ${phase === 'idle' ? 'pointer-events-none' : ''}`}>
      {slab(0, 'bg-red')}
      {slab(1, 'bg-blue')}
      {slab(
        2,
        'grid place-items-center bg-ink',
        <span className="display text-[clamp(28px,4vw,56px)] tracking-[0.2em] text-bone">{brand.name}</span>,
      )}
    </div>
  );
}
