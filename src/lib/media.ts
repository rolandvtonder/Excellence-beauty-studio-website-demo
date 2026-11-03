const base = import.meta.env.BASE_URL;

export const media = (f: string) => `${base}media/${f}`;

/** An in-site link, e.g. site('/gallery/'), that still works when the site is served from a sub-folder (GitHub Pages). */
export const site = (path: string) => `${base}${path.replace(/^\//, '')}`;
