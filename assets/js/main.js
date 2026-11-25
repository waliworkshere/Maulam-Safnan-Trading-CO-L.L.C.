/* Maulam Safnan Trading & Co. L.L.C. — page behaviour.
   Content comes from assets/js/content.js; edit text there, not here. */
(function () {
  const S = window.SITE;
  const C = S.contact;
  let lang = 'en';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = n => `<svg class="ico"><use href="#i-${n}"/></svg>`;
  const T = k => S.text[lang][k] ?? S.text.en[k] ?? '';

  /* ---------- hero water-network animation ---------- */
  const routes = [
    ['mid', 'M 740 -220 V 255 Q 740 305 790 305 H 1850', -2],
    ['mid', 'M 1150 -220 V 385 Q 1150 435 1200 435 H 1850', -6],
    ['mid', 'M -240 690 H 1070 Q 1120 690 1120 740 V 1100', -5],
    ['main', 'M -240 560 H 590 Q 650 560 650 500 V 415 Q 650 355 710 355 H 1850', -5],
    ['main', 'M 1060 -220 V 165 Q 1060 225 1120 225 H 1430 Q 1490 225 1490 285 V 800 Q 1490 860 1550 860 H 1850', -1],
    ['main', 'M -240 790 H 815 Q 875 790 875 730 V 625 Q 875 565 935 565 H 1850', -8]
  ];
  const ns = 'http://www.w3.org/2000/svg', root = $('#network-routes');
  for (const [level, d, delay] of routes) {
    const g = document.createElementNS(ns, 'g'); g.setAttribute('class', level);
    for (const kind of ['shell', 'bore', 'rim', 'stream', 'core']) {
      const p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); p.setAttribute('class', kind);
      if (kind === 'stream' || kind === 'core') p.style.animationDelay = (delay + (kind === 'core' ? -0.14 : 0)) + 's';
      g.appendChild(p);
    }
    root.appendChild(g);
  }

  /* ---------- contact details ---------- */
  const waBase = 'https://wa.me/' + C.whatsapp;
  const waDisplay = '+' + C.whatsapp.replace(/^968(\d{2})(\d{3})(\d{3})$/, '968 $1 $2 $3');
  function applyContacts() {
    $$('[data-wa]').forEach(a => a.href = waBase);
    $$('[data-wa-msg]').forEach(a => a.href = waBase + '?text=' + encodeURIComponent(T('waMsg')));
    $$('[data-wa-text]').forEach(s => s.textContent = waDisplay);
    $$('[data-tel]').forEach(a => a.href = 'tel:' + C.phones[+a.dataset.tel].tel);
    $$('[data-tel-text]').forEach(s => s.textContent = C.phones[+s.dataset.telText].display);
    $('#phoneList').innerHTML = C.phones.map(p => `<a class="ltr" href="tel:${p.tel}">${esc(p.display)}</a>`).join('');
    $('#emailList').innerHTML = C.emails.map(e => `<a class="ltr" href="mailto:${e}">${esc(e)}</a>`).join('');
    $('#ftContact').innerHTML =
      C.phones.map(p => `<li><a class="ltr" href="tel:${p.tel}">${esc(p.display)}</a></li>`).join('') +
      C.emails.map(e => `<li><a class="ltr" href="mailto:${e}">${esc(e)}</a></li>`).join('') +
      `<li>${T('ctAddrV').replace(/<br>/g, ', ')}</li>`;
    $('#mapLink').href = C.mapLink;
  }
  // load the map only when it comes near the screen
  const mapFrame = $('#mapFrame');
  const mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(C.mapEmbedQuery) + '&z=16&output=embed';
  if ('IntersectionObserver' in window) {
    const mo = new IntersectionObserver(es => { if (es[0].isIntersecting) { mapFrame.src = mapSrc; mo.disconnect(); } }, { rootMargin: '400px' });
    mo.observe(mapFrame);
  } else mapFrame.src = mapSrc;

  /* ---------- section builders ---------- */
  function buildServices() {
    $('#svcGrid').innerHTML = S.services.map((s, i) => `
      <article class="svc reveal in">
        <div class="ph"><img loading="lazy" src="${s.img}" alt="${esc(s.title[lang])}"><span class="num">${String(i + 1).padStart(2, '0')}</span></div>
        <div class="svc-body"><h3>${esc(s.title[lang])}</h3><ul>${s.items[lang].map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      </article>`).join('');
    $('#svcSel').innerHTML = S.services.map(s => `<option>${esc(s.title[lang])}</option>`).join('') + `<option>${esc(T('fmOther'))}</option>`;
  }

  function buildWhy() {
    $('#whyTrack').innerHTML = S.why.map(w => `
      <article class="wcard"><div class="ic">${icon(w.icon)}</div><h3>${esc(w.title[lang])}</h3><p>${esc(w.text[lang])}</p></article>`).join('');
    updateWhy();
  }

  let filter = 'all';
  function buildProjects() {
    const fact = (k, v) => `<div><small>${T(k)}</small><b>${v}</b></div>`;
    $('#prGrid').innerHTML = S.projects.map(p => {
      const st = p.status === 'ongoing' ? T('stOngoing') : T('stCompleted');
      const val = lang === 'ar' ? `<span class="ltr">${p.value}</span> ${T('currency')}` : `${T('currency')} <span class="ltr">${p.value}</span>`;
      return `
      <article class="pcard" data-status="${p.status}">
        <div class="ph"><img loading="lazy" src="${p.img}" alt=""><span class="badge ${p.status}">${st}</span></div>
        <div class="pbody">
          <span class="pref ltr">${esc(p.ref)}</span>
          <h3>${esc(p.title[lang])}</h3>
          <div class="ptype">${esc(p.type[lang])}</div>
          <p class="pdesc">${esc(p.desc[lang])}</p>
          <div class="pfacts">
            <div class="val"><small>${T('lblValue')}</small><b>${val}</b></div>
            ${fact('lblDuration', esc(p.duration[lang]))}
            ${fact('lblStatus', st)}
            ${fact('lblStart', `<span class="ltr">${p.start}</span>`)}
            ${fact('lblFinish', `<span class="ltr">${p.finish}</span>`)}
          </div>
          <div class="pclient">${icon('building-2')}<span>${T('lblClient')}: ${lang === 'ar' ? 'نماء لخدمات المياه' : 'Nama Water Services (NWS)'}</span></div>
        </div>
      </article>`;
    }).join('');
    const n = s => S.projects.filter(p => s === 'all' || p.status === s).length;
    $('#cAll').textContent = n('all'); $('#cOn').textContent = n('ongoing'); $('#cDone').textContent = n('completed');
    applyFilter();
  }
  function applyFilter() {
    $$('#prGrid .pcard').forEach(c => c.hidden = !(filter === 'all' || c.dataset.status === filter));
    $$('#prFilters button').forEach(b => { b.classList.toggle('on', b.dataset.f === filter); b.setAttribute('aria-selected', b.dataset.f === filter); });
  }
  $$('#prFilters button').forEach(b => b.addEventListener('click', () => { filter = b.dataset.f; applyFilter(); }));

  function buildCerts() {
    $('#ceGrid').innerHTML = S.certs.map((c, i) => `
      <button type="button" class="ccard reveal in" data-i="${i}">
        <span class="th"><img loading="lazy" src="${c.thumb}" alt=""></span>
        <span>
          <h3>${esc(c.title[lang])}</h3>
          <div class="sub">${esc(c.sub[lang])}</div>
          <div class="iss">${esc(c.issuer[lang])}</div>
          <span class="vd">${icon('badge-check')}${T('ceValid')} <span class="ltr">${c.valid}</span></span>
          <div class="vw">${icon('zoom-in')}${T('ceView')}${c.pages.length > 1 ? ` (${c.pages.length} ${T('cePages')})` : ''}</div>
        </span>
      </button>`).join('');
    $$('#ceGrid .ccard').forEach(b => b.addEventListener('click', () => openLb(+b.dataset.i, 0)));
  }

  /* ---------- Why-us slider ---------- */
  const track = $('#whyTrack'), prev = $('#whyPrev'), next = $('#whyNext'), dots = $('#whyDots');
  function step() { const c = track.querySelector('.wcard'); return c ? c.getBoundingClientRect().width + 20 : 300; }
  function perView() { const c = track.querySelector('.wcard'); return c ? Math.max(1, Math.round(track.clientWidth / (c.getBoundingClientRect().width + 20))) : 3; }
  function pos() { return Math.abs(track.scrollLeft); }
  function updateWhy() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = pos() <= 2; next.disabled = pos() >= max;
    const pages = Math.max(1, S.why.length - perView() + 1);
    const cur = Math.min(pages - 1, Math.round(pos() / step()));
    if (dots.children.length !== pages) dots.innerHTML = Array.from({ length: pages }, () => '<i></i>').join('');
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur));
  }
  const dir = () => (document.documentElement.dir === 'rtl' ? -1 : 1);
  prev.addEventListener('click', () => track.scrollBy({ left: -step() * dir() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() * dir() }));
  track.addEventListener('scroll', () => requestAnimationFrame(updateWhy), { passive: true });
  addEventListener('resize', updateWhy);
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') track.scrollBy({ left: step() });
    if (e.key === 'ArrowLeft') track.scrollBy({ left: -step() });
  });

  /* ---------- certificate lightbox ---------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbPrev = $('#lbPrev'), lbNext = $('#lbNext');
  let lbC = 0, lbP = 0, lastFocus = null;
  function showLb() {
    const c = S.certs[lbC];
    lbImg.src = c.pages[lbP]; lbImg.alt = c.title[lang];
    lbCap.textContent = c.title[lang] + ' — ' + c.sub[lang] + (c.pages.length > 1 ? `  (${lbP + 1}/${c.pages.length})` : '');
    lbPrev.hidden = lbNext.hidden = c.pages.length < 2;
  }
  function openLb(i, p) { lastFocus = document.activeElement; lbC = i; lbP = p; showLb(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('#lbClose').focus(); }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.removeAttribute('src'); if (lastFocus) lastFocus.focus(); }
  const turn = d => { const n = S.certs[lbC].pages.length; lbP = (lbP + d + n) % n; showLb(); };
  $('#lbClose').addEventListener('click', closeLb);
  lbPrev.addEventListener('click', () => turn(-1));
  lbNext.addEventListener('click', () => turn(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') turn(dir());
    if (e.key === 'ArrowLeft') turn(-dir());
  });

  /* ---------- language ---------- */
  const btn = $('#langBtn');
  function setLang(l) {
    lang = l;
    const ar = l === 'ar';
    document.documentElement.lang = l; document.documentElement.dir = ar ? 'rtl' : 'ltr';
    $$('[data-t]').forEach(n => { const v = T(n.dataset.t); if (v) n.innerHTML = v; });
    $$('[data-ph]').forEach(n => n.placeholder = T(n.dataset.ph));
    btn.textContent = ar ? 'English' : 'العربية';
    document.title = T('docTitle');
    buildServices(); buildWhy(); buildProjects(); buildCerts(); applyContacts();
    track.scrollLeft = 0; updateWhy();
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  btn.addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));
  let saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved === 'ar' || (!saved && (navigator.language || '').startsWith('ar')) ? 'ar' : 'en');

  /* ---------- menu, header, form, misc ---------- */
  const menuBtn = $('#menuBtn'), links = $('#links');
  menuBtn.addEventListener('click', () => { const o = links.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
  links.addEventListener('click', e => { if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });
  const hdr = $('#hdr');
  addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 10), { passive: true });

  $('#qform').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const t = `*Enquiry — Maulam Safnan website*\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nCompany: ${f.get('company') || '-'}\nService: ${f.get('service')}\n\n${f.get('msg')}`;
    window.open(waBase + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
  });

  const wf = $('#waFloat');
  setTimeout(() => { wf.classList.add('tip'); setTimeout(() => wf.classList.remove('tip'), 5000); }, 4000);
  $('#yr').textContent = new Date().getFullYear();

  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' }) : null;
  $$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
})();
