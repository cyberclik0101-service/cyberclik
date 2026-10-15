/* ═══════════════════════════════════════════════════════════════
   CYBERCLIK — script.js
   Moteur immersif du site vitrine 6 étoiles
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Utilitaires ─────────────────────────────────────────── */
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE    = window.matchMedia("(pointer: fine)").matches;
  const clamp   = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp    = (a, b, t) => a + (b - a) * t;

  const C = window.CYBERCLIK || null;

  /* ═══════════════════════════════════════════════════════════
     1. PRÉLOADER
  ═══════════════════════════════════════════════════════════ */
  const preloader = $("#preloader");
  const preFill   = $("#preloader-fill");
  let preDone = false;

  function finishPreloader() {
    if (preDone) return;
    preDone = true;
    if (preFill) preFill.style.width = "100%";
    setTimeout(() => {
      if (preloader) preloader.classList.add("done");
      document.body.classList.add("loaded");
      startSlogan();
    }, 250);
  }
  if (preloader) {
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + 8 + Math.random() * 16);
      if (preFill) preFill.style.width = p + "%";
      if (p >= 100) { clearInterval(tick); setTimeout(finishPreloader, 200); }
    }, 90);
    window.addEventListener("load", () => setTimeout(finishPreloader, 500));
    setTimeout(finishPreloader, 4200); // filets de sécurité
  } else {
    startSlogan();
  }

  /* ═══════════════════════════════════════════════════════════
     2. SLOGAN ANIMÉ — décodage cybernétique
  ═══════════════════════════════════════════════════════════ */
  const GLYPHS = "▓▒░<>/\\|#$&@%0123456789ABCDEF";

  function scrambleWord(el, delay) {
    const finalText = el.dataset.final || el.textContent;
    const len = finalText.length;
    if (REDUCED) { el.textContent = finalText; return; }
    const dur = 620 + len * 90;
    const t0 = performance.now() + delay;
    function frame(now) {
      if (now < t0) { requestAnimationFrame(frame); return; }
      const t = (now - t0) / dur;
      const solved = Math.floor(clamp(t, 0, 1) * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const ch = finalText[i];
        if (ch === " ") { out += " "; continue; }
        out += i < solved ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  function startSlogan() {
    $$(".hero-slogan .w").forEach((el, i) => scrambleWord(el, i * 240));
  }

  /* ═══════════════════════════════════════════════════════════
     3. BARRE DE PROGRESSION + HEADER
  ═══════════════════════════════════════════════════════════ */
  const progressBar = $("#scroll-progress");
  const header = $("#site-header");
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      if (header) header.classList.toggle("scrolled", y > 40);
      heroParallax(y);
      galleryScrollParallax();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── Scrollspy ───────────────────────────────────────────── */
  const spySections = ["hero", "services", "galerie", "reseaux", "contact"]
    .map(id => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window && spySections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id === "hero" ? "top" : e.target.id;
        $$(".nav-link").forEach(l => l.classList.toggle("active", l.dataset.section === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spySections.forEach(s => spy.observe(s));
  }

  /* ═══════════════════════════════════════════════════════════
     4. MENU MOBILE
  ═══════════════════════════════════════════════════════════ */
  const burger = $("#burger");
  const mobileMenu = $("#mobile-menu");
  function setMenu(open) {
    if (!burger || !mobileMenu) return;
    burger.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", () => setMenu(!mobileMenu.classList.contains("open")));
  $$(".mobile-link").forEach(l => l.addEventListener("click", () => setMenu(false)));

  /* ═══════════════════════════════════════════════════════════
     5. PARTicules du HERO
  ═══════════════════════════════════════════════════════════ */
  const canvas = $("#particles");
  const heroEl = $("#hero");
  let particles = [], rafP = null, heroVisible = true, dpr = 1;

  function sizeCanvas() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  }

  function makeParticles() {
    if (!canvas) return;
    const n = FINE ? 70 : 36;
    const colors = ["255,215,0", "168,105,255", "255,255,255"];
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (0.6 + Math.random() * 1.9) * dpr,
      vy: -(0.08 + Math.random() * 0.35) * dpr,
      vx: (Math.random() - 0.5) * 0.18 * dpr,
      a: 0.15 + Math.random() * 0.55,
      tw: Math.random() * Math.PI * 2,
      c: colors[(Math.random() * colors.length) | 0]
    }));
  }

  function drawParticles() {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.y += p.vy; p.x += p.vx; p.tw += 0.03;
      if (p.y < -8) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width; }
      if (p.x < -8) p.x = canvas.width + 8;
      if (p.x > canvas.width + 8) p.x = -8;
      const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.c + "," + alpha.toFixed(3) + ")";
      ctx.fill();
    }
    rafP = requestAnimationFrame(drawParticles);
  }

  function startParticles() {
    if (REDUCED || !canvas) return;
    sizeCanvas(); makeParticles();
    if (rafP) cancelAnimationFrame(rafP);
    rafP = requestAnimationFrame(drawParticles);
  }

  if (canvas && "IntersectionObserver" in window) {
    new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      if (heroVisible && !document.hidden) startParticles();
      else if (rafP) { cancelAnimationFrame(rafP); rafP = null; }
    }, { threshold: 0.05 }).observe(heroEl || canvas);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (rafP) { cancelAnimationFrame(rafP); rafP = null; } }
    else if (heroVisible) startParticles();
  });
  window.addEventListener("resize", () => { sizeCanvas(); makeParticles(); });
  startParticles();

  /* ── Parallax HERO (léger) ───────────────────────────────── */
  const heroContent = $(".hero-content");
  function heroParallax(y) {
    if (REDUCED || !heroContent) return;
    if (y < window.innerHeight * 1.2) {
      heroContent.style.transform = "translateY(" + (y * 0.18) + "px)";
    }
  }

  /* ═══════════════════════════════════════════════════════════
     6. REVEAL ON SCROLL
  ═══════════════════════════════════════════════════════════ */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("visible"));
  }

  /* ═══════════════════════════════════════════════════════════
     7. TILT 3D (cartes services)
  ═══════════════════════════════════════════════════════ */
  if (FINE && !REDUCED) {
    $$(".tilt").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
        card.style.transform = "perspective(900px) rotateX(" + ((0.5 - py) * 7).toFixed(2) +
          "deg) rotateY(" + ((px - 0.5) * 9).toFixed(2) + "deg) translateY(-6px)";
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     8. GALERIE + FILTRES + PARALLAX
  ═══════════════════════════════════════════════════════════ */
  const grid      = $("#gallery-grid");
  const filtersEl = $("#gallery-filters");
  let filteredItems = [];

  function buildGallery() {
    if (!grid) return;
    if (!C || !Array.isArray(C.gallery) || !C.gallery.length) {
      grid.innerHTML = '<p class="gallery-noscript">Aucune affiche trouvée. Ajoutez des entrées dans <code>content/content.js</code>.</p>';
      return;
    }
    // Filtres
    if (filtersEl) {
      (C.categories || ["tous"]).forEach(cat => {
        const b = document.createElement("button");
        b.className = "g-filter" + (cat === "tous" ? " active" : "");
        b.type = "button";
        b.dataset.cat = cat;
        b.textContent = (C.labels && C.labels[cat]) || cat;
        b.addEventListener("click", () => {
          $$(".g-filter", filtersEl).forEach(x => x.classList.remove("active"));
          b.classList.add("active");
          renderGrid(cat);
        });
        filtersEl.appendChild(b);
      });
    }
    renderGrid("tous");
  }

  function renderGrid(cat) {
    if (!grid) return;
    grid.innerHTML = "";
    filteredItems = C.gallery.filter(g => cat === "tous" || g.cat === cat);
    filteredItems.forEach((g, i) => {
      const fig = document.createElement("figure");
      fig.className = "g-item" + (g.tall ? " tall" : "");
      fig.tabIndex = 0;
      fig.dataset.idx = i;
      fig.dataset.speed = (0.05 + (i % 4) * 0.03).toFixed(3);
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "Agrandir : " + g.title);
      fig.innerHTML =
        '<div class="g-media">' +
          '<img src="' + g.src + '" alt="' + g.title.replace(/"/g, "&quot;") +
          '" loading="lazy" decoding="async">' +
          '<span class="g-zoom" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.8-5.8M10.5 8v5M8 10.5h5"/></svg>' +
          "</span>" +
        "</div>" +
        '<figcaption class="g-caption">' +
          '<span class="g-cat">' + (((C.labels || {})[g.cat]) || g.cat) + "</span>" +
          '<span class="g-title">' + g.title + "</span>" +
          '<span class="g-desc">' + g.desc + "</span>" +
        "</figcaption>";
      fig.addEventListener("click", () => openLightbox(i));
      fig.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); } });
      grid.appendChild(fig);
    });
    // Apparition en cascade
    const items = $$(".g-item", grid);
    if (REDUCED || !("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("in"));
    } else {
      const gio = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            setTimeout(() => el.classList.add("in"), (parseInt(el.dataset.idx, 10) % 4) * 70);
            gio.unobserve(el);
          }
        });
      }, { threshold: 0.08 });
      items.forEach(el => gio.observe(el));
    }
    galleryScrollParallax();
  }

  /* Parallax au scroll (translateY sur l'image) */
  let pTick = false;
  function galleryScrollParallax() {
    if (REDUCED || !grid || !grid.children.length) return;
    if (pTick) return;
    pTick = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      for (const el of grid.children) {
        const img = el.querySelector("img");
        if (!img) continue;
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const center = r.top + r.height / 2 - vh / 2;
        const shift = clamp(center * -parseFloat(el.dataset.speed || 0.06), -26, 26);
        img.style.transform = "translateY(" + shift.toFixed(1) + "px) scale(1.04)";
      }
      pTick = false;
    });
  }
  buildGallery();

  /* ═══════════════════════════════════════════════════════════
     9. LIGHTBOX
  ═══════════════════════════════════════════════════════════ */
  const lb       = $("#lightbox");
  const lbImg    = $("#lb-img");
  const lbTitle  = $("#lb-title");
  const lbDesc   = $("#lb-desc");
  const lbCount  = $("#lb-counter");
  let lbIndex = 0, lbOpen = false, lastFocus = null;

  function lbRender() {
    const g = filteredItems[lbIndex];
    if (!g) return;
    lbImg.src = g.src;
    lbImg.alt = g.title;
    lbTitle.textContent = g.title;
    lbDesc.textContent = g.desc;
    lbCount.textContent = (lbIndex + 1) + " / " + filteredItems.length;
  }
  function openLightbox(i) {
    if (!lb || !filteredItems.length) return;
    lbIndex = i;
    lastFocus = document.activeElement;
    lbRender();
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("open"));
    lbOpen = true;
    document.body.style.overflow = "hidden";
    const closeBtn = $("#lb-close");
    if (closeBtn) closeBtn.focus();
  }
  function closeLightbox() {
    if (!lb || !lbOpen) return;
    lb.classList.remove("open");
    setTimeout(() => { lb.hidden = true; }, 320);
    lbOpen = false;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function lbStep(d) {
    if (!filteredItems.length) return;
    lbIndex = (lbIndex + d + filteredItems.length) % filteredItems.length;
    lbRender();
  }
  if (lb) {
    $("#lb-close").addEventListener("click", closeLightbox);
    $("#lb-prev").addEventListener("click", () => lbStep(-1));
    $("#lb-next").addEventListener("click", () => lbStep(1));
    lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", e => {
      if (!lbOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbStep(-1);
      if (e.key === "ArrowRight") lbStep(1);
    });
    // Swipe tactile
    let tx = null;
    lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => {
      if (tx === null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 48) lbStep(dx > 0 ? -1 : 1);
      tx = null;
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════
     10. COMPTEURS
  ═══════════════════════════════════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (REDUCED) { el.textContent = target + suffix; return; }
    const t0 = performance.now(), dur = 1600;
    (function f(now) {
      const t = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    $$(".counter").forEach(el => cio.observe(el));
  } else {
    $$(".counter").forEach(el => { el.textContent = (el.dataset.target || "0") + (el.dataset.suffix || ""); });
  }

  /* ═══════════════════════════════════════════════════════════
     11. FORMULAIRE DE CONTACT
  ═══════════════════════════════════════════════════════════ */
  const form = $("#contact-form");
  if (form) {
    const fields = {
      nom:     { el: $("#cf-nom"),     test: v => v.trim().length >= 2,            msg: "Votre nom est requis (2 caractères min.)." },
      email:   { el: $("#cf-email"),   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: "Adresse email invalide." },
      message: { el: $("#cf-message"), test: v => v.trim().length >= 10,            msg: "Détaillez un peu votre projet (10 caractères min.)." }
    };
    Object.values(fields).forEach(f => {
      f.el.addEventListener("input", () => {
        const wrap = f.el.closest(".field");
        if (f.test(f.el.value)) { wrap.classList.remove("invalid"); wrap.querySelector(".field-error").textContent = ""; }
      });
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      let ok = true, firstBad = null;
      Object.values(fields).forEach(f => {
        const wrap = f.el.closest(".field");
        const valid = f.test(f.el.value);
        wrap.classList.toggle("invalid", !valid);
        wrap.querySelector(".field-error").textContent = valid ? "" : f.msg;
        if (!valid && !firstBad) firstBad = f.el;
        ok = ok && valid;
      });
      if (!ok) { if (firstBad) firstBad.focus(); return; }
      // Mode démo : on confirme et on propose le relais WhatsApp
      const wa = C && C.brand ? C.brand.waNumber : "2250767441771";
      const txt = "Bonjour CyberClik ! Je suis " + fields.nom.el.value.trim() +
        " (" + fields.email.el.value.trim() + "). " + fields.message.el.value.trim();
      const waLink = $("#form-wa-link");
      if (waLink) waLink.href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(txt);
      const success = $("#form-success");
      form.querySelectorAll(".field, .btn-submit, .form-note").forEach(n => { n.style.display = "none"; });
      if (success) { success.hidden = false; success.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" }); }
      form.reset();
    });
  }

  /* ═══════════════════════════════════════════════════════════
     12. CARTE INTERACTIVE ABIDJAN
  ═══════════════════════════════════════════════════════════ */
  const map = $("#abidjan-map");
  if (map) {
    const viewport = $("#map-viewport");
    const wrap = $("#map-wrap");
    const tooltip = $("#map-tooltip");
    const panel = $("#map-panel");
    const panelTitle = $("#map-panel-title");
    const panelDesc  = $("#map-panel-desc");

    const DISTRICTS = [
      { name: "Yopougon",     x: 118, y: 300, desc: "Pôle commercial de l'ouest : boutiques, PME, services." },
      { name: "Adjamé",       x: 228, y: 396, desc: "Cœur historique et marchés : visibilité maximale garantie." },
      { name: "Attécubé",     x: 330, y: 452, desc: "Zone portuaire ouest et activités logistiques." },
      { name: "Abobo",        x: 398, y: 300, desc: "Grand bassin de consommateurs — campagnes locales ciblées." },
      { name: "Plateau",      x: 470, y: 420, desc: "Siège de CyberClik. Le cœur financier d'Abidjan." },
      { name: "Treichville",  x: 452, y: 476, desc: "Énergie, nightlife, restaurants : le quartier qui ne dort jamais." },
      { name: "Marcory",      x: 556, y: 452, desc: "Artères commerçantes et quartiers résidentiels premium." },
      { name: "Port-Bouët",   x: 626, y: 494, desc: "Zone portuaire et industrielle de l'est." },
      { name: "Cocody",       x: 556, y: 322, desc: "Villa, Angré, Riviera : notre terrain de jeu préféré." },
      { name: "Riviera",      x: 648, y: 358, desc: "Bord de lagune, villas et affaires." },
      { name: "Bingerville",  x: 762, y: 330, desc: "Étendue est de la métropole : couvert, comme partout." }
    ];

    const g = $("#map-districts");
    const NS = "http://www.w3.org/2000/svg";
    DISTRICTS.forEach(d => {
      const grp = document.createElementNS(NS, "g");
      grp.setAttribute("class", "map-district");
      grp.dataset.name = d.name;
      const halo = document.createElementNS(NS, "circle");
      halo.setAttribute("class", "d-halo"); halo.setAttribute("cx", d.x); halo.setAttribute("cy", d.y); halo.setAttribute("r", 15);
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("class", "d-dot"); dot.setAttribute("cx", d.x); dot.setAttribute("cy", d.y); dot.setAttribute("r", 5);
      const txt = document.createElementNS(NS, "text");
      txt.setAttribute("x", d.x); txt.setAttribute("y", d.y - 14);
      txt.textContent = d.name.toUpperCase();
      grp.appendChild(halo); grp.appendChild(dot); grp.appendChild(txt);
      grp.addEventListener("mouseenter", e => showTip(e, d));
      grp.addEventListener("mousemove", e => moveTip(e));
      grp.addEventListener("mouseleave", hideTip);
      grp.addEventListener("click", e => {
        e.stopPropagation();
        $$(".map-district", g).forEach(x => x.classList.remove("active"));
        grp.classList.add("active");
        if (panel) {
          panelTitle.textContent = d.name;
          panelDesc.textContent = d.desc;
          panel.hidden = false;
        }
      });
      g.appendChild(grp);
    });
    $("#map-panel-close").addEventListener("click", () => { panel.hidden = true; $$(".map-district", g).forEach(x => x.classList.remove("active")); });

    // Tooltip
    function showTip(e, d) {
      if (!tooltip) return;
      tooltip.textContent = d.name + " — Couverture CyberClik ✓";
      tooltip.hidden = false;
      moveTip(e);
    }
    function moveTip(e) {
      if (!tooltip || tooltip.hidden || !wrap) return;
      const r = wrap.getBoundingClientRect();
      tooltip.style.left = clamp(e.clientX - r.left, 70, r.width - 70) + "px";
      tooltip.style.top = (e.clientY - r.top) + "px";
    }
    function hideTip() { if (tooltip) tooltip.hidden = true; }

    // Zoom & pan
    let scale = 1, tx = 0, ty = 0, dragging = false, sx = 0, sy = 0, stx = 0, sty = 0;
    const MIN = 1, MAX = 3;

    function apply() {
      if (scale <= 1.001) { scale = 1; tx = 0; ty = 0; }
      tx = clamp(tx, 900 * (1 - scale), 0);
      ty = clamp(ty, 620 * (1 - scale), 0);
      viewport.setAttribute("transform", "translate(" + tx.toFixed(1) + " " + ty.toFixed(1) + ") scale(" + scale.toFixed(3) + ")");
    }
    function svgPoint(e) {
      const pt = map.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(map.getScreenCTM().inverse());
    }
    function zoomAt(px, py, factor) {
      const ns = clamp(scale * factor, MIN, MAX);
      tx = px - (px - tx) * (ns / scale);
      ty = py - (py - ty) * (ns / scale);
      scale = ns;
      apply();
    }
    $("#map-in").addEventListener("click", () => zoomAt(450, 310, 1.35));
    $("#map-out").addEventListener("click", () => zoomAt(450, 310, 1 / 1.35));
    $("#map-reset").addEventListener("click", () => { scale = 1; tx = 0; ty = 0; apply(); });

    map.addEventListener("wheel", e => {
      e.preventDefault();
      const p = svgPoint(e);
      zoomAt(p.x, p.y, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    }, { passive: false });

    map.addEventListener("pointerdown", e => {
      dragging = true; sx = e.clientX; sy = e.clientY; stx = tx; sty = ty;
      map.classList.add("grabbing");
      map.setPointerCapture(e.pointerId);
    });
    map.addEventListener("pointermove", e => {
      if (!dragging) return;
      const ctm = map.getScreenCTM();
      tx = stx + (e.clientX - sx) / ctm.a;
      ty = sty + (e.clientY - sy) / ctm.d;
      apply();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(ev =>
      map.addEventListener(ev, () => { dragging = false; map.classList.remove("grabbing"); })
    );

    apply();
  }

  /* ═══════════════════════════════════════════════════════════
     13. CURSEUR PERSONNALISÉ
  ═══════════════════════════════════════════════════════════ */
  if (FINE && !REDUCED) {
    const dot = $("#cursor-dot"), ring = $("#cursor-ring");
    if (dot && ring) {
      let mx = -100, my = -100, rx = -100, ry = -100, rafC = null;
      document.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = "translate(" + (mx - 3.5) + "px," + (my - 3.5) + "px)";
        if (!rafC) rafC = requestAnimationFrame(function loop() {
          rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
          ring.style.transform = "translate(" + (rx - ring.offsetWidth / 2) + "px," + (ry - ring.offsetHeight / 2) + "px)";
          rafC = requestAnimationFrame(loop);
        });
      }, { passive: true });
      document.addEventListener("mouseover", e => {
        const hot = e.target.closest("a,button,[data-hover],input,textarea,.g-item,.map-district");
        ring.classList.toggle("is-hover", !!hot);
      });
    }
  }

  /* ── Année ───────────────────────────────────────────────── */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Balayage initial ────────────────────────────────────── */
  onScroll();
})();
