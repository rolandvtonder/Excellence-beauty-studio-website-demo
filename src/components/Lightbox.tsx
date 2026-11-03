import {useEffect, useRef} from 'react';
import type {Photo} from '../content';
import {lockScroll} from '../lib/scroll';
import {media} from '../lib/media';
import {Icon} from './Icon';

/**
 * Full-screen photo viewer. Arrow keys / buttons step through the current
 * filter's photos, Escape or the close button returns focus to the tile.
 */
export function Lightbox({list, index, onIndex, onClose}: {list: Photo[]; index: number; onIndex: (i: number) => void; onClose: () => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const photo = list[index];
  const step = (d: number) => onIndex((index + d + list.length) % list.length);

  useEffect(() => {
    lockScroll(true);
    closeBtn.current?.focus();
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Swipe left/right on touch screens (buttons stay as the alternative).
  const touchX = useRef<number | null>(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[65] flex flex-col bg-ink/95 backdrop-blur-sm"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caps text-bone/80" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="text-bone/45">/ {String(list.length).padStart(2, '0')}</span>
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className="caps flex min-h-11 items-center gap-3 bg-bone px-5 text-ink">
          Close <Icon name="close" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-24">
        <img key={photo.src} src={media(photo.src)} alt={photo.alt} className="max-h-full max-w-full object-contain" />
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className="absolute left-2 grid size-12 place-items-center bg-ink/60 text-bone hover:bg-bone hover:text-ink md:left-6"
        >
          <Icon name="left" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className="absolute right-2 grid size-12 place-items-center bg-ink/60 text-bone hover:bg-bone hover:text-ink md:right-6"
        >
          <Icon name="right" className="size-5" />
        </button>
      </div>

      <p className="prose-body px-5 py-5 text-center text-[16px] text-bone/80 md:px-8">{photo.alt}</p>
    </div>
  );
}
