import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from './components/Layout';
import type {PageId} from './content';
import './index.css';

// Scroll-driven openers depend on position; start each page at the top
// (a #hash on the URL is still honoured by Layout).
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/** Each page's entry file calls this with its own content. */
export function mount(page: PageId, content: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout page={page}>{content}</Layout>
    </StrictMode>,
  );
}
