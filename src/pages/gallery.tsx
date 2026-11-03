import {useRef, useState, type CSSProperties} from 'react';
import {Lightbox} from '../components/Lightbox';
import {PageHero} from '../components/PageHero';
import {BookBand} from '../components/Sections';
import {photos, type Photo} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {media} from '../lib/media';
import {mount} from '../mount';

const filters: {id: 'all' | Photo['tag']; label: string}[] = [
  {id: 'all', label: 'All work'},
  {id: 'cuts', label: 'Cuts & designs'},
  {id: 'braids', label: 'Braids'},
  {id: 'beard', label: 'Beards'},
];

function Gallery() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const [open, setOpen] = useState(-1);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const list = filter === 'all' ? photos : photos.filter((p) => p.tag === filter);

  const close = () => {
    const back = open;
    setOpen(-1);
    tiles.current[back]?.focus({preventScroll: true});
  };

  return (
    <div ref={ref}>
      <PageHero
        index={3}
        eyebrow="Gallery"
        lines={[{t: 'Fresh from'}, {t: 'the chairs.', i: true}]}
        body="Fades, freehand designs, beards and braids — all done in the studio on Voortrekker Road. Tap a photo to see it full size."
        photo="cut-swirl-design.jpg"
        pos="55% 40%"
        alt="Young client with a skin fade and a freehand swirl design"
        reduced={reduced}
      />

      <section aria-label="Photos" className="mx-auto max-w-[1680px] px-5 py-16 md:px-14 md:py-24">
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.id === 'all' ? photos.length : photos.filter((p) => p.tag === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`caps inline-flex min-h-11 items-center gap-2 border px-5 py-2 transition-colors ${
                  filter === f.id ? 'border-bone bg-bone text-ink' : 'border-bone/25 text-bone hover:border-bone'
                }`}
              >
                {f.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <ul key={filter} className="mt-10 columns-2 gap-[3px] md:columns-3 xl:columns-4">
          {list.map((p, n) => (
            <li key={p.src} data-reveal style={{'--d': `${(n % 4) * 0.06}s`} as CSSProperties} className="mb-[3px] break-inside-avoid">
              <button
                ref={(el) => {
                  tiles.current[n] = el;
                }}
                type="button"
                onClick={() => setOpen(n)}
                className="group relative block w-full cursor-zoom-in overflow-hidden"
                aria-label={`View larger: ${p.alt}`}
              >
                <img
                  src={media(p.src)}
                  alt=""
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {open >= 0 && <Lightbox list={list} index={open} onIndex={setOpen} onClose={close} />}

      <BookBand reduced={reduced} />
    </div>
  );
}

mount('gallery', <Gallery />);
