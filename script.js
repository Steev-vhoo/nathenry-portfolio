// Nav: scrolled state, mobile toggle, active section highlight
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');

const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  menu.classList.toggle('is-open', !open);
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.classList.remove('is-open');
  })
);

const links = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => spy.observe(s));

// Count-up numbers
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const countUp = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  if (reduce || !target) return;
  const start = performance.now();
  const dur = 1200;
  const tick = (t) => {
    const p = Math.min((t - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      e.target.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(e.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Case study filters
const filters = document.querySelectorAll('.filter');
const cases = document.querySelectorAll('.case');
filters.forEach((btn) =>
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    cases.forEach((c) => {
      const show = f === 'all' || c.dataset.tags.split(' ').includes(f);
      c.hidden = !show;
      if (show) c.classList.add('is-visible');
    });
  })
);

document.getElementById('year').textContent = new Date().getFullYear();
