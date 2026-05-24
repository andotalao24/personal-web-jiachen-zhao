// Entry point. Loaded as an ES module from index.html.
// Import components here and initialize them after the DOM is ready.

import { initPubFilter } from './components/pub-filter.js';

document.addEventListener('DOMContentLoaded', () => {
  initPubFilter();
});
