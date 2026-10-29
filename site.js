(function () {
  const SITE = window.SITE || {};
  const PROJECTS = window.PROJECTS || [];

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const ARROW =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

  /* ---------- Links from data.js ---------- */
  document.querySelectorAll("[data-mailto]").forEach((a) => (a.href = "mailto:" + SITE.email));
  document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = SITE.email));
  ["github", "linkedin"].forEach((key) =>
    document.querySelectorAll(`[data-${key}]`).forEach((a) => (a.href = SITE[key]))
  );
  document.querySelectorAll("[data-resume-file]").forEach((a) => (a.href = SITE.resume));
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (menuBtn && menu) {
    const setOpen = (open) => {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
    };
    menuBtn.addEventListener("click", () => setOpen(menuBtn.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        setOpen(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Rendering ---------- */
  function device(p) {
    const img = `<img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.title)}" loading="lazy" decoding="async">`;
    if (p.device === "phone") return `<div class="device phone">${img}</div>`;
    return `<div class="device laptop"><div class="laptop-screen">${img}</div><div class="laptop-base"></div></div>`;
  }

  function card(p) {
    return `
      <li class="reveal">
        <a class="card" href="project.html?p=${encodeURIComponent(p.slug)}">
          <div class="card-head">
            <div>
              <h3 class="card-title">${esc(p.title)}</h3>
              <p class="card-sub">${esc(p.subtitle)}</p>
            </div>
            <span class="arrow-btn" aria-hidden="true">${ARROW}</span>
          </div>
          <div class="stage">${device(p)}</div>
        </a>
      </li>`;
  }

  document.querySelectorAll("[data-work-list]").forEach((list) => {
    const items = list.hasAttribute("data-featured") ? PROJECTS.filter((p) => p.featured) : PROJECTS;
    list.innerHTML = items.map(card).join("");
  });
  document.querySelectorAll("[data-project-count]").forEach((el) => {
    el.textContent = `${PROJECTS.length} project${PROJECTS.length === 1 ? "" : "s"}`;
  });

  const detail = document.querySelector("[data-project]");
  if (detail) {
    const slug = new URLSearchParams(location.search).get("p");
    const i = PROJECTS.findIndex((p) => p.slug === slug);
    const p = PROJECTS[i];

    if (!p) {
      detail.innerHTML = `
        <h1 class="project-title">Not found</h1>
        <p class="project-sub">That project doesn't exist (yet).</p>
        <a class="inline-link" href="work.html">See all work <span>↗</span></a>`;
    } else {
      document.title = `${p.title} · ${SITE.name}`;
      const next = PROJECTS.length > 1 ? PROJECTS[(i + 1) % PROJECTS.length] : null;
      const paras = (v) => [].concat(v).map((t) => `<p>${esc(t)}</p>`).join("");
      const links = (p.links || [])
        .map((l) => `<a class="btn btn-secondary" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ${ARROW}</a>`)
        .join("");

      detail.innerHTML = `
        <a class="back-link" href="work.html"><span>←</span> All work</a>
        <h1 class="project-title">${esc(p.title)}</h1>
        <p class="project-sub">${esc(p.subtitle)}</p>

        <div class="hero-panel reveal"><div class="stage">${device(p)}</div></div>

        <div class="detail-grid">
          <dl class="facts reveal">
            <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
            ${p.meta ? `<div><dt>When</dt><dd>${esc(p.meta)}</dd></div>` : ""}
            <div><dt>Tools</dt><dd class="chips">${(p.tools || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</dd></div>
          </dl>
          <div class="detail-body">
            <section class="reveal"><h2>Overview</h2><div class="prose">${paras(p.overview)}</div>${links ? `<div class="detail-links">${links}</div>` : ""}</section>
            <section class="reveal"><h2>Outcome</h2><div class="prose">${paras(p.outcome)}</div></section>
          </div>
        </div>

        ${next ? `
        <div class="next-project">
          <p class="eyebrow">Next project</p>
          <ul class="work-list">${card(next)}</ul>
        </div>` : ""}`;
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }
})();
