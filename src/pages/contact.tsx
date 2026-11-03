import {useState, type CSSProperties, type FormEvent} from 'react';
import {Icon} from '../components/Icon';
import {PageHero} from '../components/PageHero';
import {Eyebrow, PoleBand} from '../components/Sections';
import {brand, contact, services, whatsapp} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {mount} from '../mount';

const times = ['Morning', 'Midday', 'Afternoon', 'Late afternoon', 'Any time'];

const field =
  'mt-2 block min-h-12 w-full border border-bone/25 bg-ink px-4 py-3 text-[16px] text-bone outline-none transition-colors focus:border-bone';

/**
 * A booking note, not a booking system: the form writes a WhatsApp message
 * and opens the chat with it typed in. Nothing is sent or stored by the site.
 */
function BookingForm() {
  const [error, setError] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim();
    const service = String(f.get('service') ?? '');
    const day = String(f.get('day') ?? '');
    const time = String(f.get('time') ?? '');
    const note = String(f.get('note') ?? '').trim();
    if (!name) {
      setError('Add your name so we know who’s booking.');
      (e.currentTarget.elements.namedItem('name') as HTMLInputElement).focus();
      return;
    }
    setError('');
    const when = day ? new Date(`${day}T12:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long'}) : 'the next open day';
    const msg = [`Hi Excellence, it’s ${name}.`, `I’d like to book: ${service}.`, `When: ${when}, ${time.toLowerCase()}.`, note && `Note: ${note}`]
      .filter(Boolean)
      .join('\n');
    window.open(whatsapp(msg), '_blank', 'noopener');
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 md:grid-cols-2">
      <label className="caps text-bone/80">
        Your name <span className="text-red" aria-hidden>*</span>
        <input
          name="name"
          autoComplete="name"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'name-error' : undefined}
          className={`${field} normal-case tracking-normal`}
          onBlur={(e) => e.currentTarget.value.trim() && setError('')}
        />
        {error && (
          <span id="name-error" role="alert" className="prose-body mt-2 block text-[15px] tracking-normal normal-case text-[#ff8a8f]">
            {error}
          </span>
        )}
      </label>

      <label className="caps text-bone/80">
        Service
        <select name="service" className={`${field} normal-case tracking-normal`} defaultValue={services[0].items[0].name}>
          {services.map((g) => (
            <optgroup key={g.id} label={g.title.join(' ')}>
              {g.items.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </optgroup>
          ))}
          <option>Not sure yet — need advice</option>
        </select>
      </label>

      <label className="caps text-bone/80">
        Day
        <input type="date" name="day" min={today} className={`${field} tracking-normal [color-scheme:dark]`} />
        <span className="prose-body mt-2 block text-[15px] tracking-normal normal-case text-bone/60">Leave blank for the next open day.</span>
      </label>

      <label className="caps text-bone/80">
        Time
        <select name="time" className={`${field} normal-case tracking-normal`} defaultValue="Any time">
          {times.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="caps text-bone/80 md:col-span-2">
        Anything else? <span className="text-bone/50 normal-case tracking-normal">(optional)</span>
        <textarea name="note" rows={3} placeholder="e.g. a photo of the design you want, or how many kids" className={`${field} normal-case tracking-normal`} />
      </label>

      <div className="flex flex-wrap items-center gap-5 md:col-span-2">
        <button type="submit" className="caps inline-flex min-h-12 items-center gap-3 bg-red px-8 py-4 text-white transition-colors hover:bg-[#a51f26]">
          <Icon name="whatsapp" /> Send on WhatsApp
        </button>
        <p className="prose-body text-[15px] text-bone/60">Opens WhatsApp with your message ready — we’ll reply to confirm.</p>
      </div>
    </form>
  );
}

function Contact() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();

  const ways = [
    {icon: 'whatsapp' as const, label: 'WhatsApp', value: contact.phone, href: whatsapp(), ext: true},
    {icon: 'phone' as const, label: 'Call', value: contact.phone, href: contact.phoneHref, ext: false},
    {icon: 'mail' as const, label: 'Email', value: contact.email, href: `mailto:${contact.email}`, ext: false},
  ];

  return (
    <div ref={ref}>
      <PageHero
        index={5}
        eyebrow="Book & contact"
        lines={[{t: 'Pull up'}, {t: 'a chair.', i: true}]}
        body="Book on WhatsApp, give us a call, or walk in. We’re on Voortrekker Road in Bellville."
        photo="beard-sculpt.jpg"
        pos="55% 40%"
        alt="A barber finishing a sculpted full beard"
        reduced={reduced}
      />

      {/* Quick ways to reach us */}
      <section aria-label="Contact options" className="mx-auto grid max-w-[1680px] gap-[3px] px-5 pt-16 md:grid-cols-3 md:px-14 md:pt-24">
        {ways.map((w, n) => (
          <a
            key={w.label}
            href={w.href}
            target={w.ext ? '_blank' : undefined}
            rel={w.ext ? 'noopener' : undefined}
            data-reveal
            style={{'--d': `${n * 0.08}s`} as CSSProperties}
            className={`group flex flex-col justify-between gap-10 p-7 transition-colors md:p-9 ${n === 0 ? 'bg-red text-white hover:bg-[#a51f26]' : 'bg-coal hover:bg-bone hover:text-ink'}`}
          >
            <span className="flex items-center justify-between">
              <span className="caps">{w.label}</span>
              <Icon name={w.icon} className="size-6" />
            </span>
            <span className={`display break-all ${w.label === 'Email' ? 'text-[clamp(20px,1.7vw,30px)] normal-case' : 'text-[clamp(26px,2.4vw,40px)]'}`}>{w.value}</span>
          </a>
        ))}
      </section>

      {/* Booking note */}
      <section aria-labelledby="form-title" className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-20 md:px-14 md:py-32">
        <div>
          <div data-reveal>
            <Eyebrow n="01">Book a chair</Eyebrow>
          </div>
          <h2 id="form-title" data-reveal className="display mt-5 text-[clamp(44px,5vw,88px)]">
            <span className="block">Tell us</span>
            <span className="it block pl-[0.8em]">what you want</span>
          </h2>
          <p data-reveal className="prose-body mt-6 max-w-[420px] text-bone/80">
            Fill this in and we’ll open WhatsApp with your booking message ready to send. Nothing is saved on this site.
          </p>
        </div>
        <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
          <BookingForm />
        </div>
      </section>

      <PoleBand reduced={reduced} />

      {/* Visit */}
      <section aria-labelledby="visit-title" className="bg-bone text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:grid-cols-2 md:gap-20 md:px-14 md:py-32">
          <div data-reveal>
            <Eyebrow n="02" tone="text-red">
              Visit
            </Eyebrow>
            <h2 id="visit-title" className="display mt-5 text-[clamp(44px,5vw,88px)]">
              <span className="block">{contact.street}</span>
              <span className="it block pl-[0.8em]">Bellville</span>
            </h2>
            <address className="prose-body mt-6 not-italic text-ink/80">
              {brand.full}
              <br />
              {contact.street}, {contact.area}
              <br />
              {contact.city}
            </address>
            <a
              href={contact.mapHref}
              target="_blank"
              rel="noopener"
              className="caps mt-8 inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-4 text-bone transition-colors hover:bg-red hover:text-white"
            >
              <Icon name="pin" /> Get directions
            </a>
          </div>

          <div data-reveal style={{'--d': '0.1s'} as CSSProperties}>
            <p className="caps text-red">Hours</p>
            <dl className="mt-4 border-t border-ink/20">
              {contact.hours.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-ink/20 py-5">
                  <dt className="display text-[clamp(24px,2vw,32px)]">{k}</dt>
                  <dd className="caps self-center text-right text-[13px] text-ink/80">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="caps mt-10 text-red">Follow</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="caps inline-flex min-h-11 items-center border border-ink/30 px-5 py-2 transition-colors hover:bg-ink hover:text-bone"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

mount('contact', <Contact />);
