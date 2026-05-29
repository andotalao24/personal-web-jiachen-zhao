export function initPubFilter() {
  const searchInput = document.querySelector('.pub-search');
  const yearButtons = document.querySelectorAll('.year-btn');
  const pubLists = document.querySelectorAll('ul.pubs');
  const pubItems = document.querySelectorAll('ul.pubs li');

  if (!searchInput || yearButtons.length === 0 || pubItems.length === 0) {
    return;
  }

  let activeYear = 'all';
  let query = '';

  const applyFilter = () => {
    pubItems.forEach((item) => {
      const title = (item.dataset.title || '').toLowerCase();
      const authors = (item.dataset.authors || '').toLowerCase();
      const year = item.closest('ul.pubs').dataset.year;
      const matchesYear = activeYear === 'all' || year === activeYear;
      const matchesQuery = query === '' || title.includes(query) || authors.includes(query);
      item.classList.toggle('hidden', !matchesYear || !matchesQuery);
    });

    pubLists.forEach((list) => {
      const visibleItems = list.querySelectorAll('li:not(.hidden)');
      const heading = list.previousElementSibling;
      const empty = visibleItems.length === 0;
      list.classList.toggle('hidden', empty);
      if (heading && heading.tagName === 'H3') {
        heading.classList.toggle('hidden', empty);
      }
    });
  };

  searchInput.addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    applyFilter();
  });

  yearButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      yearButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeYear = btn.dataset.year;
      applyFilter();
    });
  });

  applyFilter();
}
