/**
 * Page-to-page transition. Leaving: the cover slabs wipe in over the page,
 * then the browser loads the next page. Arriving: if we came from a wipe,
 * the next page starts covered and the slabs wipe away.
 */

import type {MouseEvent} from 'react';

export const LEAVE = 'ex:leave';
const FLAG = 'ex-wipe';
/** How long the wipe-in takes before the next page loads (ms). */
export const WIPE_MS = 760;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function goTo(href: string) {
  const url = new URL(href, location.href);
  // Same page, different hash: just scroll.
  if (url.pathname === location.pathname) {
    window.dispatchEvent(new CustomEvent('ex:hash', {detail: url.hash || '#top'}));
    return;
  }
  if (reduced()) {
    location.href = url.href;
    return;
  }
  window.dispatchEvent(new Event(LEAVE));
  try {
    sessionStorage.setItem(FLAG, '1');
  } catch {
    /* storage blocked: the next page simply skips the wipe-out */
  }
  window.setTimeout(() => {
    location.href = url.href;
  }, WIPE_MS);
}

/** True once, on the page we arrived at through a wipe. */
export function arrivedByWipe(): boolean {
  try {
    const v = sessionStorage.getItem(FLAG) === '1';
    sessionStorage.removeItem(FLAG);
    return v && !reduced();
  } catch {
    return false;
  }
}

/** onClick for internal links: modifier-clicks and new tabs keep normal behaviour. */
export function linkClick(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.currentTarget;
  if (a.target && a.target !== '_self') return;
  e.preventDefault();
  goTo(a.href);
}
