import {brand, contact, pages, whatsapp} from '../content';
import {useFitText} from '../hooks/useFitText';
import {linkClick} from '../lib/nav';
import {media} from '../lib/media';
import {Icon} from './Icon';

/** Shared footer: emblem, visit/contact details, pages, and the edge-to-edge wordmark. */
export function Footer() {
  const word = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink pt-16 pb-28 md:pb-24">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-10 md:px-14">
        <img src={media('logo.jpg')} alt={`${brand.full} logo: Excellence Barbershop, James King, your barber`} width={160} height={163} loading="lazy" className="size-40 object-cover" />

        <div>
          <p className="caps text-bronze">Visit</p>
          <address className="prose-body mt-3 not-italic text-bone/85">
            {brand.full}
            <br />
            {contact.street}
            <br />
            {contact.area}
          </address>
          <a href={contact.mapHref} target="_blank" rel="noopener" className="caps mt-3 inline-flex items-center gap-2 py-2 text-bone hover:text-bronze">
            Open in Maps <Icon name="arrow" />
          </a>
        </div>

        <div>
          <p className="caps text-bronze">Book & ask</p>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={whatsapp()} target="_blank" rel="noopener" className="prose-body inline-flex items-center gap-3 py-1.5 hover:text-bronze">
                <Icon name="whatsapp" /> WhatsApp {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="prose-body inline-flex items-center gap-3 py-1.5 hover:text-bronze">
                <Icon name="phone" /> Call {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="prose-body inline-flex items-center gap-3 py-1.5 break-all hover:text-bronze">
                <Icon name="mail" /> {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="caps text-bronze">Pages</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {pages.map((p) => (
              <li key={p.id}>
                <a href={p.href} onClick={linkClick} className="prose-body inline-block py-1.5 hover:text-bronze">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-5">
            {contact.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener" className="caps py-2 text-bone/80 hover:text-bronze">
                {s.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto mt-16 max-w-[1680px] px-5 md:px-14" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.8] text-bone/[0.07]">
          {brand.name}
        </span>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1680px] flex-wrap justify-between gap-3 px-5 md:px-14">
        <p className="caps text-bone/55">© 2026 {brand.full}</p>
        <p className="caps text-bone/55">{brand.tagline}</p>
      </div>
    </footer>
  );
}
