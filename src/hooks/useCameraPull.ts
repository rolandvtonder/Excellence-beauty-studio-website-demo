import {useEffect, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The page-top transition from the reference: as you scroll past the opening
 * section, its stage blurs, dims and shrinks back — a camera pulling away —
 * rather than simply fading. Written straight to style each frame.
 */
export function useCameraPull(root: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    return onFrame(() => {
      const el = root.current;
      const st = stage.current;
      if (!el || !st) return;
      const r = el.getBoundingClientRect();
      const h = r.height || window.innerHeight;
      const p = clamp(-r.top / h);
      st.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
      st.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
    });
  }, [root, stage, reduced]);
}
