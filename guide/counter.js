// "N visitor" under each guide page. GitHub Pages keeps no statistics, so
// the count lives in Abacus (abacus.jasoncameron.dev, free, no account),
// one counter per page. A browser is counted once per page: after its first
// visit it only reads the number. Nothing is shown if the service is down.
(function () {
  var el = document.getElementById('visitors');
  if (!el || !window.fetch) return;
  var page = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  var flag = 'cn-guide-seen-' + page;
  var seen = false;
  try { seen = localStorage.getItem(flag) === '1'; } catch (e) {}
  var url = 'https://abacus.jasoncameron.dev/' + (seen ? 'get' : 'hit') +
    '/calculator-note-guide/' + page;
  fetch(url)
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || typeof d.value !== 'number') return;
      try { localStorage.setItem(flag, '1'); } catch (e) {}
      el.textContent = d.value.toLocaleString('id-ID') + ' visitor';
      el.hidden = false;
    })
    .catch(function () {});
})();
