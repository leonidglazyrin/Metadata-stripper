import { renderToStaticMarkup } from 'react-dom/server';
import Landing from './Landing';

/** Static HTML for the landing page. The server swaps __SITE_URL__ for the real origin. */
export function render() {
  return renderToStaticMarkup(<Landing siteUrl="__SITE_URL__" />);
}
