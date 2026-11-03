/**
 * All copy, contact details and photo lists live here. Details come from the
 * studio's Facebook page; anything marked TODO still needs the owner's check.
 */

import {site} from './lib/media';

export const brand = {
  name: 'Excellence',
  full: 'Excellence Beauty Studio',
  tagline: 'Barber & beauty studio · Bellville',
};

export const contact = {
  phone: '065 994 2117',
  phoneHref: 'tel:+27659942117',
  whatsapp: '27659942117',
  email: 'excellencebarbershop99@gmail.com',
  street: 'Voortrekker Rd',
  area: 'Bellville, 7530',
  city: 'Cape Town, South Africa',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Excellence+Beauty+Studio+Voortrekker+Rd+Bellville+7530',
  // TODO: Facebook lists the studio as "Always open"; replace with real hours.
  hours: [
    ['Walk-ins', 'Welcome'],
    ['Today’s times', 'WhatsApp to confirm'],
  ] as [string, string][],
  socials: [
    {name: 'Instagram', href: 'https://www.instagram.com/exc.ellencebeautystudio/'},
    {name: 'Facebook', href: 'https://www.facebook.com/ExcellenceBarbers/'},
  ],
};

/** A WhatsApp chat link with the message already typed in. */
export const whatsapp = (msg = 'Hi Excellence, I’d like to book a chair.') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export type PageId = 'home' | 'services' | 'gallery' | 'about' | 'contact';

export const pages: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: site('/')},
  {id: 'services', label: 'Services', href: site('/services/')},
  {id: 'gallery', label: 'Gallery', href: site('/gallery/')},
  {id: 'about', label: 'About', href: site('/about/')},
  {id: 'contact', label: 'Book & contact', href: site('/contact/')},
];

export type Photo = {src: string; w: number; h: number; alt: string; tag: 'cuts' | 'braids' | 'beard' | 'studio'};

const p = (src: string, w: number, h: number, tag: Photo['tag'], alt: string): Photo => ({src, w, h, tag, alt});

/** Every photo, in the order the gallery shows them. */
export const photos: Photo[] = [
  p('cut-swirl-design.jpg', 1440, 1440, 'cuts', 'Young client with a skin fade and a freehand swirl design'),
  p('braids-copper-side.jpg', 768, 768, 'braids', 'Copper and black feed-in braids swept to the side'),
  p('cut-twists-profile.jpg', 1440, 1440, 'cuts', 'High-top twists over a sharp taper with a cut-in hairline'),
  p('beard-sculpt.jpg', 960, 1280, 'beard', 'Barber finishing a sculpted full beard and line-up'),
  p('braids-kid-front.jpg', 768, 1024, 'braids', 'Girl with stitch cornrows into curly-ended pigtails'),
  p('cut-heart-design.jpg', 1440, 1800, 'cuts', 'Short fade with a heart shaved into the side'),
  p('braids-hoops.jpg', 768, 768, 'braids', 'Side-swept feed-in braids with gold hoop earrings'),
  p('cut-bun-design-2.jpg', 960, 960, 'cuts', 'Curly top knot over a fade with flowing razor lines'),
  p('cut-glasses-fade.jpg', 1440, 1800, 'cuts', 'Teen with a sponge-twist top and a crisp shape-up'),
  p('braids-pink-front.jpg', 768, 1024, 'braids', 'Neat straight-back cornrows from the front'),
  p('cut-beard-line.jpg', 1440, 1800, 'beard', 'Low fade with a razor part continued through the beard'),
  p('cut-cornrow-fade.jpg', 1440, 1440, 'cuts', 'Cornrows on top of a high skin fade'),
  p('braids-kid-back.jpg', 720, 960, 'braids', 'Back view of patterned cornrows into two braided ponytails'),
  p('cut-smile-beard.jpg', 1440, 1800, 'beard', 'Smiling client with a short fade and shaped beard'),
  p('cut-curly-design.jpg', 960, 960, 'cuts', 'Curly top with a wave design cut into the back'),
  p('braids-copper-top.jpg', 768, 768, 'braids', 'Top view of copper-blend knotless braids'),
  p('cut-twists-back.jpg', 1440, 1800, 'cuts', 'Twists with a drop fade from behind'),
  p('braids-long.jpg', 768, 768, 'braids', 'Long waist-length feed-in braids'),
  p('cut-skin-fade.jpg', 1440, 1800, 'cuts', 'Bald skin fade with a hard part line'),
  p('cut-curls.jpg', 720, 960, 'cuts', 'Defined curls with a tapered side'),
  p('braids-kid-side.jpg', 768, 1024, 'braids', 'Side braids into a curly-ended ponytail'),
  p('cut-beard-fade.jpg', 1440, 1800, 'beard', 'Low fade with a full, lined-up beard'),
  p('cut-smile-glasses.jpg', 1440, 1800, 'cuts', 'Smiling client with a twist top and sharp edge-up'),
  p('braids-pink-top.jpg', 1536, 2048, 'braids', 'Cornrows and box braids from above'),
  p('cut-bun-design.jpg', 960, 960, 'cuts', 'Man bun over a fade with razor-line art'),
  p('beard-trim.jpg', 768, 768, 'beard', 'Beard trim in progress at the chair'),
  p('braids-kid-top.jpg', 1536, 2048, 'braids', 'Feed-in cornrow pattern into ponytails from above'),
  p('cut-fade-side.jpg', 1440, 1800, 'cuts', 'Teen with a tapered afro and a cut-in part'),
  p('cut-braids-front.jpg', 1440, 1440, 'cuts', 'Short cornrows with a squared-off line-up'),
  p('braids-long-2.jpg', 768, 960, 'braids', 'Long feed-in braids, side view'),
];

export const studioPhoto: Photo = p('studio-interior.jpg', 1440, 1440, 'studio', 'Inside the studio: lit mirrors, barber chairs and the wig wall');
export const barberPhoto: Photo = p('barber-portrait.jpg', 1440, 1800, 'studio', 'A barber standing behind a client with a fresh line-up');

/** Headline lines; `i` lines are set in italic. */
export const hero = {
  lines: [
    {t: 'Sharp cuts.'},
    {t: 'Clean lines.', i: true},
    {t: 'Braids with'},
    {t: 'Excellence', i: true},
  ],
  body: 'Barber and beauty studio on Voortrekker Road, Bellville. Fades, freehand designs, beard work, braids and cornrows — for men, women and kids.',
  slides: [
    {src: 'studio-interior.jpg', pos: '50% 50%', alt: 'Inside Excellence Beauty Studio: lit mirrors and barber chairs'},
    {src: 'beard-sculpt.jpg', pos: '60% 45%', alt: 'A barber finishing a sculpted beard'},
    {src: 'braids-copper-side.jpg', pos: '50% 40%', alt: 'Copper feed-in braids'},
    {src: 'cut-twists-profile.jpg', pos: '55% 40%', alt: 'Twists over a sharp taper'},
  ],
};

export type Chair = {
  id: string;
  name: [string, string];
  photo: string;
  pos: string;
  specs: [string, string][];
  href: string;
  tint: string;
};

/** The three panels on the home page. */
export const chairs: Chair[] = [
  {
    id: 'cuts',
    name: ['The barber', 'Chair'],
    photo: 'cut-swirl-design.jpg',
    pos: '50% 40%',
    specs: [['Speciality', 'Skin fades & designs'], ['For', 'Men, women & kids']],
    href: site('/services/#cuts'),
    tint: '#c4262e',
  },
  {
    id: 'braids',
    name: ['The braid', 'Bar'],
    photo: 'braids-kid-front.jpg',
    pos: '50% 30%',
    specs: [['Speciality', 'Cornrows & feed-ins'], ['Finish', 'Knotless, curls, ponies']],
    href: site('/services/#braids'),
    tint: '#2a5aa8',
  },
  {
    id: 'beard',
    name: ['Beard &', 'Line-up'],
    photo: 'beard-sculpt.jpg',
    pos: '50% 55%',
    specs: [['Speciality', 'Sculpt & shape-up'], ['Tools', 'Razor, clippers, care']],
    href: site('/services/#beard'),
    tint: '#b39d77',
  },
];

export type Service = {name: string; note: string; price?: string};
export type ServiceGroup = {id: string; title: [string, string]; intro: string; photo: Photo; items: Service[]};

/**
 * Service menu. TODO: prices aren't published on Facebook — add each one as
 * e.g. `price: 'R120'`. Items without a price show "Ask us".
 */
export const services: ServiceGroup[] = [
  {
    id: 'cuts',
    title: ['Cuts &', 'Fades'],
    intro: 'Clipper work done slowly and blended clean, from a low taper to a bald skin fade.',
    photo: photos.find((x) => x.src === 'cut-skin-fade.jpg')!,
    items: [
      {name: 'Skin / bald fade', note: 'Low, mid or high, blended to the skin'},
      {name: 'Taper & drop fade', note: 'Soft sides that keep length on top'},
      {name: 'Brush cut', note: 'One length all over, edged up'},
      {name: 'Twists & sponge top', note: 'Defined coils on top of any fade'},
      {name: 'Cut & wash', note: 'Any cut, finished with a wash'},
    ],
  },
  {
    id: 'designs',
    title: ['Designs &', 'Line-ups'],
    intro: 'Freehand razor art and sharp edges: hearts, swirls, waves and parts, cut to your idea.',
    photo: photos.find((x) => x.src === 'cut-bun-design-2.jpg')!,
    items: [
      {name: 'Line-up / shape-up', note: 'Hairline, temples and nape squared off'},
      {name: 'Hard part', note: 'A razor line through the side'},
      {name: 'Freehand design', note: 'Swirls, hearts, waves — bring a picture'},
    ],
  },
  {
    id: 'beard',
    title: ['Beard', 'Work'],
    intro: 'Trimmed, shaped and lined, so the beard sits right with the cut.',
    photo: photos.find((x) => x.src === 'cut-beard-fade.jpg')!,
    items: [
      {name: 'Beard trim & shape', note: 'Length taken down and evened out'},
      {name: 'Beard line-up', note: 'Cheek and neck lines with the razor'},
      {name: 'Cut & beard combo', note: 'Your cut and beard in one sitting'},
    ],
  },
  {
    id: 'braids',
    title: ['Braids &', 'Cornrows'],
    intro: 'Neat parts, even tension and patterns that last — straight-backs to feed-ins with curls.',
    photo: photos.find((x) => x.src === 'braids-hoops.jpg')!,
    items: [
      {name: 'Straight-back cornrows', note: 'Clean rows from front to back'},
      {name: 'Feed-in braids', note: 'Side-swept or styled, natural or extension'},
      {name: 'Knotless / box braids', note: 'Any length, black or colour blends'},
      {name: 'Cornrows for men', note: 'Short rows paired with a fade'},
    ],
  },
  {
    id: 'kids',
    title: ['Kids’', 'Styles'],
    intro: 'Patient hands for little ones: first fades, designs and braided ponies with curly ends.',
    photo: photos.find((x) => x.src === 'braids-kid-side.jpg')!,
    items: [
      {name: 'Kids’ cut', note: 'Fades and tapers for young clients'},
      {name: 'Kids’ braids & ponies', note: 'Patterned cornrows into ponytails'},
    ],
  },
];

export const about = {
  // TODO: owner to confirm/replace this story copy.
  lead: 'A barbershop that grew into a full studio.',
  body: [
    'Excellence started as a barber’s chair on Voortrekker Road — James King’s chair, the one on our emblem. Word got around about clean fades and patient freehand designs, and the studio grew around it.',
    'Today the same floor holds barbers and braiders side by side. Men come in for skin fades and beard work, women and girls for cornrows and feed-ins, and kids for their first proper cut. Lit mirrors, music on, and everyone leaves sharper than they came.',
  ],
  values: [
    {title: 'Precision', text: 'Blends without lines, parts without wobble, edges you can check in the mirror.'},
    {title: 'Patience', text: 'We take the time a style needs, whether that’s a ten-minute line-up or an afternoon of braids.'},
    {title: 'Everyone', text: 'Men, women and kids, walk-in or booked. Pull up a seat.'},
  ],
  team: [
    {name: 'James King', role: 'Barber', note: 'Fades, line-ups and freehand designs.', photo: 'logo.jpg', logo: true},
    // TODO: add each stylist's name; the photo shows their work, not them.
    {name: 'The braid team', role: 'Braiders', note: 'Cornrows, feed-ins and knotless braids.', photo: 'braids-copper-top.jpg', logo: false},
    {name: 'The barbers', role: 'Barbers', note: 'Skin fades, beards and cut & wash.', photo: 'barber-portrait.jpg', logo: false},
  ],
};
