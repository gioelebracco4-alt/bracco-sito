// BraccoBrand — interazioni del sito: intestazione, menu, ricerca, video, griglia stufe
// con filtri, scheda prodotto, carosello categorie e messaggio WhatsApp.
// I contenuti arrivano da products.js (window.BRACCO).
(function () {
  var B = window.BRACCO;
  var body = document.body;

  // ---------- Utilità ----------
  function euro(n, decimals) {
    var parts = n.toFixed(decimals ? 2 : 0).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',') + ' €';
  }
  function wa(text) { return 'https://wa.me/' + B.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function byId(id) { return B.products.filter(function (p) { return p.id === id; })[0]; }
  var typeLabel = { pellet: 'Pellet', combinata: 'Legna e pellet', legna: 'Legna' };

  // ---------- Intestazione ----------
  var header = document.getElementById('header');
  var hero = document.querySelector('.hero');
  function updateHeader() {
    var limit = hero ? hero.offsetHeight - 80 : 40;
    header.classList.toggle('is-solid', window.scrollY > limit || body.classList.contains('is-locked'));
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();

  // ---------- Pannelli: menu e ricerca ----------
  var lastFocus = null;
  function openPanel(panel, trigger, scrim) {
    lastFocus = trigger;
    panel.hidden = false;
    if (scrim) scrim.hidden = false;
    body.classList.add('is-locked');
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function () {
      panel.classList.add('is-open');
      if (scrim) scrim.classList.add('is-open');
    });
    updateHeader();
  }
  function closePanel(panel, trigger, scrim, keepFocus) {
    panel.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    body.classList.remove('is-locked');
    setTimeout(function () { panel.hidden = true; if (scrim) scrim.hidden = true; }, 300);
    updateHeader();
    if (!keepFocus && lastFocus) lastFocus.focus();
  }

  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('drawer-scrim');
  var menuOpen = document.getElementById('menu-open');
  function closeMenu(keepFocus) { closePanel(drawer, menuOpen, scrim, keepFocus); }
  menuOpen.addEventListener('click', function () {
    openPanel(drawer, menuOpen, scrim);
    document.getElementById('menu-close').focus();
  });
  document.getElementById('menu-close').addEventListener('click', function () { closeMenu(); });
  scrim.addEventListener('click', function () { closeMenu(); });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { closeMenu(true); });
  });
  document.getElementById('drawer-count').textContent = B.products.length + ' modelli';

  var search = document.getElementById('search');
  var searchOpen = document.getElementById('search-open');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var empty = document.getElementById('search-empty');
  var entries = B.products.map(function (p) {
    return { t: p.name, d: p.kind + (p.price ? ' · ' + euro(p.price) : ''), k: p.brand + ' ' + typeLabel[p.type] + ' stufa', product: p.id };
  }).concat(B.categories.map(function (c) {
    return { t: c.name, d: c.text, k: 'categoria', category: c };
  })).concat([
    { t: 'Combustione sorgiva', d: 'Tecnologia Dielle della Borea Hybrid', k: 'pulizia cenere braciere', href: '#sorgiva' },
    { t: 'Conto Termico 3.0', d: 'Incentivi zona per zona nella scheda di ogni stufa', k: 'incentivo gse', href: '#stufe' },
    { t: 'Contatti', d: 'Telefono, WhatsApp, email e showroom', k: 'petralia soprana mappa', href: '#contatti' }
  ]);
  function renderSearch() {
    var q = input.value.trim().toLowerCase();
    var list = entries.filter(function (e) { return !q || (e.t + ' ' + e.d + ' ' + e.k).toLowerCase().indexOf(q) !== -1; });
    results.innerHTML = '';
    list.forEach(function (e) {
      var li = document.createElement('li');
      var a = el('a', null, e.t);
      a.href = e.href || (e.product ? '#stufe' : e.category && e.category.filter ? '#stufe' : wa('Vorrei informazioni su: ' + e.t));
      if (e.category && !e.category.filter) { a.target = '_blank'; a.rel = 'noopener'; }
      a.appendChild(el('small', null, e.d));
      a.addEventListener('click', function (ev) {
        closeSearch(true);
        if (e.product) { ev.preventDefault(); openSheet(e.product); }
        if (e.category && e.category.filter) setFilter(e.category.filter);
      });
      li.appendChild(a);
      results.appendChild(li);
    });
    empty.hidden = list.length > 0;
  }
  function closeSearch(keepFocus) { closePanel(search, searchOpen, null, keepFocus); }
  searchOpen.addEventListener('click', function () {
    input.value = '';
    renderSearch();
    openPanel(search, searchOpen, null);
    input.focus();
  });
  document.getElementById('search-close').addEventListener('click', function () { closeSearch(); });
  input.addEventListener('input', renderSearch);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!drawer.hidden) closeMenu();
    else if (!search.hidden) closeSearch();
  });

  // ---------- Video di apertura ----------
  var video = document.getElementById('hero-video');
  var pause = document.getElementById('pause');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setPaused(paused) {
    if (paused) video.pause(); else { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', paused ? 'Riprendi il video' : 'Metti in pausa il video');
    pause.querySelector('.i-pause').hidden = paused;
    pause.querySelector('.i-play').hidden = !paused;
  }
  if (reduce) { video.removeAttribute('autoplay'); setPaused(true); }
  pause.addEventListener('click', function () { setPaused(!video.paused); });

  // ---------- Griglia stufe con filtri ----------
  var filtersBox = document.getElementById('filters');
  var tiles = document.getElementById('tiles');
  var current = 'tutte';
  B.filters.forEach(function (f) {
    var count = f.id === 'tutte' ? B.products.length : B.products.filter(function (p) { return p.type === f.id; }).length;
    var b = el('button', 'chip', f.label);
    b.type = 'button';
    b.dataset.filter = f.id;
    b.appendChild(el('small', null, String(count)));
    b.addEventListener('click', function () { setFilter(f.id); });
    filtersBox.appendChild(b);
  });
  function setFilter(id) {
    current = id;
    filtersBox.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === id)); });
    renderTiles();
  }
  function renderTiles() {
    tiles.innerHTML = '';
    B.products.filter(function (p) { return current === 'tutte' || p.type === current; }).forEach(function (p) {
      var card = el('article', 'product');
      var btn = el('button', 'tile');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Apri la scheda di ' + p.name);
      var img = document.createElement('img');
      img.src = p.img;
      img.alt = p.name + ', ' + p.kind.toLowerCase();
      img.loading = 'lazy';
      img.style.objectPosition = p.pos || '50% 50%';
      btn.appendChild(img);
      if (p.listPrice) btn.appendChild(el('span', 'tile__badge', 'Risparmi ' + euro(p.listPrice - p.price)));
      btn.appendChild(el('span', 'pill pill--glass tile__label', p.name));
      btn.addEventListener('click', function () { openSheet(p.id, btn); });
      card.appendChild(btn);
      var info = el('div', 'product__info');
      info.appendChild(el('span', 'product__kind', p.brand + ' · ' + typeLabel[p.type]));
      var price = el('span', 'product__price', p.price ? euro(p.price) : 'Prezzo su richiesta');
      if (p.listPrice) price.appendChild(el('s', null, euro(p.listPrice)));
      info.appendChild(price);
      card.appendChild(info);
      tiles.appendChild(card);
    });
  }
  setFilter('tutte');
  document.querySelectorAll('[data-filter]').forEach(function (a) {
    if (a.classList.contains('chip')) return;
    a.addEventListener('click', function () { setFilter(a.dataset.filter); });
  });

  // ---------- Scheda prodotto ----------
  var sheet = document.getElementById('sheet');
  var sheetBody = document.getElementById('sheet-body');
  var sheetOpener = null;
  function section(title, node) {
    var s = el('section');
    s.appendChild(el('h4', null, title));
    s.appendChild(node);
    return s;
  }
  function table(rows, numCol) {
    var wrap = el('div', 'table-wrap');
    var t = el('table', 'kv');
    var tb = document.createElement('tbody');
    rows.forEach(function (r) {
      var tr = document.createElement('tr');
      tr.appendChild(el('th', null, r[0]));
      var td = el('td', numCol ? 'num' : null, r[1]);
      tr.appendChild(td);
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    wrap.appendChild(t);
    return wrap;
  }
  function list(items) {
    var ul = el('ul', 'list');
    items.forEach(function (i) { ul.appendChild(el('li', null, i)); });
    return ul;
  }
  function openSheet(id, opener) {
    var p = byId(id);
    if (!p) return;
    sheetOpener = opener || null;
    sheetBody.innerHTML = '';
    var media = el('figure', 'sheet__media');
    var img = document.createElement('img');
    img.src = p.img;
    img.alt = p.name + ' in un ambiente';
    img.style.objectPosition = p.pos || '50% 50%';
    media.appendChild(img);
    sheetBody.appendChild(media);

    var b = el('div', 'sheet__body');
    var head = el('div', 'sheet__head');
    head.appendChild(el('p', 'eyebrow', p.brand + (p.line ? ' · ' + p.line : '')));
    var h = el('h3', 'sheet__title', p.name);
    h.id = 'sheet-title';
    head.appendChild(h);
    head.appendChild(el('p', 'sheet__kind', p.kind));
    b.appendChild(head);

    var price = el('div', 'sheet__price');
    price.appendChild(el('strong', null, p.price ? euro(p.price) : 'Prezzo su richiesta'));
    if (p.listPrice) {
      price.appendChild(el('s', null, euro(p.listPrice)));
      price.appendChild(el('em', null, 'Risparmi ' + euro(p.listPrice - p.price)));
    }
    b.appendChild(price);
    if (p.tagline || p.text) b.appendChild(el('p', 'sheet__text', [p.tagline, p.text].filter(Boolean).join(' ')));
    if (p.highlights) {
      var tags = el('ul', 'tags');
      p.highlights.forEach(function (x) { tags.appendChild(el('li', null, x)); });
      b.appendChild(tags);
    }
    if (p.finishes) {
      b.appendChild(section('Colori e prezzi di listino', table(p.finishes.map(function (f) {
        return [f.name + ' · cod. ' + f.code, euro(f.list)];
      }), true)));
    }
    if (p.specs) b.appendChild(section('Dati tecnici', table(p.specs)));
    if (p.features) b.appendChild(section('Comfort e tecnologia', list(p.features)));
    if (p.standard) b.appendChild(section('Dotazione di serie', list(p.standard)));
    if (p.optional) {
      b.appendChild(section('Optional', table(p.optional.map(function (o) { return [o[0], euro(o[1])]; }), true)));
    }
    if (p.incentive) {
      var zones = el('div', 'zones');
      ['A', 'B', 'C', 'D', 'E', 'F'].forEach(function (z, i) {
        var d = el('div');
        d.appendChild(el('span', null, 'Zona ' + z));
        d.appendChild(el('strong', null, euro(p.incentive[i], true)));
        zones.appendChild(d);
      });
      var inc = section('Conto Termico 3.0 · incentivo per zona climatica', zones);
      inc.appendChild(el('p', 'sheet__note', 'Importi indicativi riportati nella scheda del produttore, da verificare per la singola pratica. L\'incentivo non è uno sconto immediato sul prezzo: riconoscimento e importo dipendono dai requisiti dell\'intervento e dalla valutazione del GSE.'));
      b.appendChild(inc);
    }
    if (p.listPrice || p.finishes) b.appendChild(el('p', 'sheet__note', 'Prezzi IVA inclusa. Il prezzo in evidenza è il prezzo BraccoBrand; i prezzi per colore sono quelli di listino del produttore.'));

    var ctas = el('div', 'sheet__ctas');
    var w = el('a', 'pill pill--green', 'Chiedi su WhatsApp');
    w.href = wa('Buongiorno, vorrei informazioni sulla ' + p.name + (p.price ? ' a ' + euro(p.price) : '') + '.');
    w.target = '_blank';
    w.rel = 'noopener';
    ctas.appendChild(w);
    if (p.official) {
      var o = el('a', 'pill pill--line', 'Scheda del produttore');
      o.href = p.official;
      o.target = '_blank';
      o.rel = 'noopener';
      ctas.appendChild(o);
    }
    b.appendChild(ctas);
    sheetBody.appendChild(b);
    if (!sheet.open) sheet.showModal();
    sheetBody.scrollTop = 0;
  }
  function closeSheet() { sheet.close(); }
  document.getElementById('sheet-close').addEventListener('click', closeSheet);
  sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });
  sheet.addEventListener('close', function () { if (sheetOpener) sheetOpener.focus(); });
  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { openSheet(b.dataset.open, b); });
  });
  // Link diretto a una scheda: #stufa-margaret, #stufa-ketty, …
  var m = /^#stufa-([a-z0-9-]+)$/.exec(location.hash);
  if (m) openSheet(m[1]);

  // ---------- Categorie ----------
  var icons = {
    pellet: '<circle cx="14" cy="30" r="2"/><circle cx="20" cy="33" r="2"/><circle cx="26" cy="30" r="2"/><path d="M20 26 C27 20 25 12 20 5 C15 12 13 20 20 26Z"/>',
    legna: '<path d="M20 22 C26 17 24 11 20 5 C16 11 14 17 20 22Z"/><path d="M6 28 L34 34 M6 34 L34 28"/>',
    piastrelle: '<rect x="5" y="5" width="13" height="13"/><rect x="22" y="5" width="13" height="13"/><rect x="5" y="22" width="13" height="13"/><rect x="22" y="22" width="13" height="13"/>',
    'arredo-bagno': '<circle cx="20" cy="12" r="7"/><path d="M8 24 H32 A12 10 0 0 1 8 24Z"/><path d="M20 34 V38"/>',
    sanitari: '<path d="M10 6 H24 V18 H10Z"/><path d="M8 18 H32 A12 12 0 0 1 20 30 H18 V36 H12 V28 A10 10 0 0 1 8 18Z"/>',
    rubinetterie: '<path d="M8 34 V22 A8 8 0 0 1 16 14 H30 V20"/><path d="M14 10 H22 M18 10 V14"/><path d="M30 24 V26 M30 30 V32"/>',
    'mobili-bagno': '<rect x="6" y="10" width="28" height="24"/><path d="M20 10 V34 M16 20 V24 M24 20 V24"/><path d="M6 6 H34"/>',
    parquet: '<path d="M4 12 L20 4 L36 12 L20 20Z"/><path d="M4 20 L20 28 L36 20 M4 28 L20 36 L36 28"/>'
  };
  var track = document.getElementById('track');
  B.categories.forEach(function (c, i) {
    var a = el('article', 'story');
    var shape = el('div', 'story__shape');
    shape.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true">' + (icons[c.id] || '') + '</svg>';
    a.appendChild(shape);
    var copy = el('div', 'story__copy');
    copy.appendChild(el('p', 'story__num', String(i + 1).padStart(2, '0') + ' / ' + String(B.categories.length).padStart(2, '0')));
    copy.appendChild(el('h3', 'story__title', c.name));
    copy.appendChild(el('p', 'story__text', c.text));
    var link = el('a', 'pill pill--outline', c.filter ? 'Vedi i modelli' : 'Chiedi su WhatsApp');
    if (c.filter) {
      link.href = '#stufe';
      link.addEventListener('click', function () { setFilter(c.filter); });
    } else {
      link.href = wa('Vorrei informazioni su: ' + c.name.toLowerCase());
      link.target = '_blank';
      link.rel = 'noopener';
    }
    copy.appendChild(link);
    a.appendChild(copy);
    track.appendChild(a);
  });
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  function step() {
    var card = track.firstElementChild;
    return card ? card.getBoundingClientRect().width + 12 : track.clientWidth;
  }
  function updateArrows() {
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();

  // ---------- Piè di pagina ----------
  var fp = document.getElementById('footer-products');
  B.products.forEach(function (p) {
    var li = document.createElement('li');
    var a = el('a', null, p.name);
    a.href = '#stufa-' + p.id;
    a.addEventListener('click', function (e) { e.preventDefault(); openSheet(p.id, a); });
    li.appendChild(a);
    fp.appendChild(li);
  });
  var fc = document.getElementById('footer-categories');
  B.categories.forEach(function (c) {
    var li = document.createElement('li');
    var a = el('a', null, c.name);
    if (c.filter) { a.href = '#stufe'; a.addEventListener('click', function () { setFilter(c.filter); }); }
    else { a.href = wa('Vorrei informazioni su: ' + c.name.toLowerCase()); a.target = '_blank'; a.rel = 'noopener'; }
    li.appendChild(a);
    fc.appendChild(li);
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Messaggio WhatsApp ----------
  var cName = document.getElementById('c-name');
  var cInterest = document.getElementById('c-interest');
  var cMessage = document.getElementById('c-message');
  var cSend = document.getElementById('c-send');
  [['', 'Scegli un prodotto o una categoria']].concat(
    B.products.map(function (p) { return [p.name, 'Stufa ' + p.name]; }),
    B.categories.filter(function (c) { return !c.filter; }).map(function (c) { return [c.name.toLowerCase(), c.name]; }),
    [['un progetto per la casa', 'Un progetto per la casa']]
  ).forEach(function (o) {
    var opt = el('option', null, o[1]);
    opt.value = o[0];
    cInterest.appendChild(opt);
  });
  function updateMessage() {
    var lines = ['Buongiorno' + (cName.value.trim() ? ', sono ' + cName.value.trim() : '') + '.'];
    if (cInterest.value) lines.push('Vorrei informazioni su: ' + cInterest.value + '.');
    if (cMessage.value.trim()) lines.push(cMessage.value.trim());
    cSend.href = wa(lines.join('\n'));
  }
  [cName, cInterest, cMessage].forEach(function (f) { f.addEventListener('input', updateMessage); f.addEventListener('change', updateMessage); });
  updateMessage();
  document.getElementById('composer').addEventListener('submit', function (e) { e.preventDefault(); });

  // ---------- Copia numero / email ----------
  var copied = document.getElementById('copied');
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy;
      function done(ok) {
        copied.textContent = ok ? 'Copiato: ' + text : 'Seleziona e copia: ' + text;
        copied.hidden = false;
        clearTimeout(done.t);
        done.t = setTimeout(function () { copied.hidden = true; }, 3000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else done(false);
    });
  });
})();
