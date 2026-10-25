/* 劉展麟 個人品牌網站 — 內容全部來自 data/site.json，改內容只需編輯該檔。 */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); };
  var ext = 'target="_blank" rel="noopener"';
  // 子頁（例如 /v/a/）在 <body data-base="../../"> 指定根目錄，資料與圖片共用同一份。
  var BASE = (document.body && document.body.getAttribute('data-base')) || '';
  var asset = function (u) { return (!u || /^(https?:)?\/\//.test(u) || u.charAt(0) === '/') ? u : BASE + u; };
  var fmtDate = function (s) { return String(s || '').replace(/-/g, '.'); };

  var ICON = {
    home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
    map: '<path d="M9 3 3 5.5v15.5l6-2.5 6 2.5 6-2.5V3l-6 2.5zM9 3v15.5M15 5.5V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 6.5h8v3H8z"/><circle cx="9" cy="13" r="1"/><circle cx="12" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><circle cx="9" cy="17" r="1"/><circle cx="12" cy="17" r="1"/><circle cx="15" cy="17" r="1"/>',
    line: '<path d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s6-3.5 8.2-6.1c1.5-1.6 2.2-3.2 2.2-4.8C22.4 6.6 17.5 3 12 3z"/>',
    fb: '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7h3l.5-4h-3.5V9c0-.6.4-1 1-1z"/>',
    tiktok: '<path d="M16.5 3c.4 2.3 1.9 3.9 4 4.2v3.4a8 8 0 0 1-4-1.2v6.3A5.8 5.8 0 1 1 10.7 10v3.5a2.4 2.4 0 1 0 2.4 2.4V3z"/>',
    web: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
    arrow: '<path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M8 5.5v13l11-6.5z"/>'
  };
  var svg = function (n, cls) { return '<svg class="' + (cls || 'ic') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICON[n] || '') + '</svg>'; };

  function render(d) {
    // stats
    var st = $('[data-render="stats"]');
    if (st) st.innerHTML = d.stats.map(function (s) {
      return '<div class="stat reveal' + (s.feature ? ' feature' : '') + '"><div class="stat-big">' + esc(s.big) + '</div><div class="stat-label">' + esc(s.label) + '</div>' + (s.note ? '<div class="stat-note">' + esc(s.note) + '</div>' : '') + '</div>';
    }).join('');
    // story
    var so = $('[data-render="story"]');
    if (so && d.story) so.innerHTML = '<li class="story-head">台北 → 基隆</li>' + d.story.map(function (s) {
      return '<li><span class="s-age">' + esc(s.age) + '</span><span class="s-title">' + esc(s.title) + '</span><span class="s-desc">' + esc(s.desc) + '</span></li>';
    }).join('');
    // press
    var pr = $('[data-render="press"]');
    // 由新到舊排序（date: YYYY-MM-DD；沒有日期的排最後）
    var press = (d.press || []).slice().sort(function (a, b) { return (b.date || '0').localeCompare(a.date || '0'); });
    if (pr) pr.innerHTML = press.map(function (p, i) {
      var media = p.thumb
        ? '<img src="' + esc(asset(p.thumb)) + '" alt="" loading="lazy" width="800" height="450" onerror="this.parentNode.classList.add(\'noimg\');this.remove()">'
        : '';
      return '<a class="press-card reveal' + (i === 0 ? ' is-latest' : '') + '" href="' + esc(p.url) + '" ' + ext + '>' +
        '<div class="press-media' + (p.thumb ? '' : ' noimg') + '"><span class="press-fallback">' + esc(p.outlet) + '</span>' + media +
        (p.video ? '<span class="play" aria-label="影片">' + svg('play') + '</span>' : '') + '</div>' +
        '<div class="press-body"><div class="press-meta"><span class="outlet">' + esc(p.outlet) + '</span>' + (p.video ? '<span class="tag">影音</span>' : '<span class="tag">報導</span>') + (p.date ? '<time class="date" datetime="' + esc(p.date) + '">' + esc(fmtDate(p.date)) + '</time>' : '') + '</div>' +
        '<h3>' + esc(p.title) + '</h3>' + (p.note ? '<p class="press-note">' + esc(p.note) + '</p>' : '') +
        '<span class="more">' + (p.video ? '觀看影片' : '閱讀報導') + svg('arrow') + '</span></div></a>';
    }).join('');
    // awards timeline
    var aw = $('[data-render="awards"]'), gallery = [];
    if (aw && d.awards && d.awards.groups) aw.innerHTML = d.awards.groups.map(function (g) {
      return '<div class="era reveal"><div class="era-head"><h3>' + esc(g.era) + '</h3>' + (g.sub ? '<span>' + esc(g.sub) + '</span>' : '') + '</div><ol class="tl">' +
        (g.items || []).map(function (it) {
          var photos = (it.photos || []).map(function (ph) {
            var i = gallery.push(ph) - 1;
            return '<button class="tl-photo" data-lb="' + i + '" aria-label="放大：' + esc(ph.caption) + '"><img src="' + esc(asset(ph.thumb || ph.src)) + '" alt="' + esc(ph.caption) + '" loading="lazy"></button>';
          }).join('');
          return '<li class="tl-item reveal"><span class="tl-dot" aria-hidden="true"></span>' +
            (it.year ? '<div class="tl-year">' + esc(it.year) + '</div>' : '') +
            '<h4>' + esc(it.title) + '</h4>' + (it.org ? '<p class="tl-org">' + esc(it.org) + '</p>' : '') + (it.detail ? '<p class="tl-detail">' + esc(it.detail) + '</p>' : '') +
            (photos ? '<div class="tl-photos n' + Math.min((it.photos || []).length, 3) + '">' + photos + '</div>' : '') + '</li>';
        }).join('') + '</ol></div>';
    }).join('');
    // services
    var sv = $('[data-render="services"]');
    if (sv) sv.innerHTML = d.services.map(function (s) {
      return '<a class="svc reveal" href="' + esc(s.url) + '" ' + ext + '><span class="svc-ic">' + svg(s.icon) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.desc) + '</p><span class="more">' + esc(s.cta) + svg('arrow') + '</span></a>';
    }).join('');
    // about
    var ab = $('[data-render="about"]'), b = d.bio;
    if (ab && b) ab.innerHTML =
      '<div class="about-text reveal"><div class="sec-head left"><span class="kicker">ABOUT</span><h2>關於展麟</h2><span class="gold-rule"></span></div>' +
      '<div class="about-lead"><figure class="fam"><img src="' + esc(asset(b.family.src)) + '" alt="' + esc(b.family.alt) + '" loading="lazy"></figure><p class="lead">' + esc(b.lead) + '</p></div>' +
      b.paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      '<ul class="promises">' + b.promises.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>' +
      '<figure class="about-photo reveal"><img src="' + esc(asset(b.lifestyle.src)) + '" alt="' + esc(b.lifestyle.alt) + '" loading="lazy"><figcaption>' + esc(b.lifestyle.caption) + '</figcaption></figure>';
    // social
    var so2 = $('[data-render="social"]');
    if (so2) so2.innerHTML = d.social.map(function (s) {
      return '<a class="soc reveal" href="' + esc(s.url) + '" ' + ext + '><span class="soc-ic">' + svg(s.icon) + '</span><span class="soc-t"><b>' + esc(s.title) + '</b><small>' + esc(s.sub) + '</small></span>' + svg('arrow', 'ic go') + '</a>';
    }).join('');
    var rv = $('[data-render="review"]');
    if (rv && d.review) rv.innerHTML = '<a class="review reveal" href="' + esc(d.review.url) + '" ' + ext + '><span class="stars">' + [1,2,3,4,5].map(function(){return svg('star');}).join('') + '</span><span><b>' + esc(d.review.title) + '</b><small>' + esc(d.review.sub) + '</small></span><span class="more">前往 Google 評論' + svg('arrow') + '</span></a>';

    setupLightbox(gallery);
    setupReveal();
  }

  function setupLightbox(items) {
    var lb = $('#lightbox'); if (!lb) return;
    var img = $('img', lb), cap = $('figcaption', lb), cur = 0, last = null;
    function show(i) { cur = (i + items.length) % items.length; img.src = asset(items[cur].src); img.alt = items[cur].caption || ''; cap.textContent = items[cur].caption || ''; }
    function open(i) { last = document.activeElement; show(i); lb.hidden = false; document.body.classList.add('lb-open'); $('.lb-close', lb).focus(); }
    function close() { lb.hidden = true; document.body.classList.remove('lb-open'); if (last) last.focus(); }
    document.addEventListener('click', function (e) { var t = e.target.closest('[data-lb]'); if (t) open(+t.getAttribute('data-lb')); });
    $('.lb-close', lb).onclick = close; $('.lb-prev', lb).onclick = function () { show(cur - 1); }; $('.lb-next', lb).onclick = function () { show(cur + 1); };
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
    var x0 = null; lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  function setupReveal() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach(function (e) { io.observe(e); });
  }

  // header shadow on scroll
  window.addEventListener('scroll', function () { document.body.classList.toggle('scrolled', window.scrollY > 10); }, { passive: true });

  fetch(BASE + 'data/site.json', { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(render).catch(function (e) {
    console.error('site.json 載入失敗', e); setupReveal();
  });
})();
