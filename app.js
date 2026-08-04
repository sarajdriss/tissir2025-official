/* =========================================================
   TISSIR 2025 · Brand v3.0
   Buyer Technical Audit Readiness Coaching — interaction layer
========================================================= */

(function () {
  'use strict';

  const storage = {
    get(key, fallback = null) {
      try {
        const value = window.localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : fallback;
      } catch (error) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        /* ignore storage issues */
      }
    }
  };

  const doc = document;
  const root = doc.documentElement;
  const loader = doc.getElementById('loader');
  const nav = doc.querySelector('.nav');
  const menuBtn = doc.getElementById('menuBtn');
  const navLinks = Array.from(doc.querySelectorAll('.nav-links a'));
  const topBtn = doc.getElementById('topBtn');
  const themeToggle = doc.getElementById('themeToggle');
  const deviceButtons = Array.from(doc.querySelectorAll('.device-btn'));
  const siteShell = doc.getElementById('siteShell');
  const checklistItems = Array.from(doc.querySelectorAll('.check-item'));
  const searchInput = doc.getElementById('moduleSearch');
  const filterButtons = Array.from(doc.querySelectorAll('.chip'));
  const moduleCards = Array.from(doc.querySelectorAll('.module-card'));
  const moduleEmpty = doc.getElementById('moduleEmpty');
  const faqItems = Array.from(doc.querySelectorAll('.faq-item'));
  const contactForm = doc.getElementById('contactForm');
  const formMessage = doc.getElementById('formMessage');
  const revealTargets = Array.from(doc.querySelectorAll('.reveal'));
  const sections = Array.from(doc.querySelectorAll('main section[id]'));

  /* Loader */
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hidden');
    window.setTimeout(() => loader.remove(), 500);
  }
  window.addEventListener('load', hideLoader);
  window.setTimeout(hideLoader, 2600);

  /* Theme */
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    storage.set('tissir-theme', theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      const label = themeToggle.querySelector('span');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      if (label) {
        label.textContent = theme === 'dark' ? 'Light' : 'Theme';
      }
    }
  }

  const savedTheme = storage.get('tissir-theme', null);
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  /* Device preview */
  function setPreviewMode(mode) {
    if (!siteShell) return;
    siteShell.classList.remove('preview-auto', 'preview-desktop', 'preview-tablet', 'preview-mobile');
    const safeMode = ['auto', 'desktop', 'tablet', 'mobile'].includes(mode) ? mode : 'auto';
    siteShell.classList.add(`preview-${safeMode}`);
    deviceButtons.forEach((button) => {
      const active = button.dataset.preview === safeMode;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    storage.set('tissir-preview-mode', safeMode);
  }

  const savedPreview = storage.get('tissir-preview-mode', 'auto');
  setPreviewMode(savedPreview);

  deviceButtons.forEach((button) => {
    button.addEventListener('click', () => setPreviewMode(button.dataset.preview || 'auto'));
  });

  /* Mobile nav */
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });
  }

  /* Smooth scroll + close mobile nav */
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = doc.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const headerHeight = doc.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Back-to-top */
  if (topBtn) {
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Scroll spy + active link */
  function onScroll() {
    if (topBtn) {
      topBtn.classList.toggle('visible', window.scrollY > 500);
    }

    const scrollMarker = window.scrollY + (doc.querySelector('.header')?.offsetHeight || 0) + 40;
    let currentId = sections[0]?.id || '';

    sections.forEach((section) => {
      if (scrollMarker >= section.offsetTop) currentId = section.id;
    });

    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Reveal on scroll */
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -30px 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add('show'));
  }

  /* Checklist persistence — items only, no percentage / no progress bar */
  const savedChecklist = storage.get('tissir-checklist', []);
  if (Array.isArray(savedChecklist) && checklistItems.length) {
    checklistItems.forEach((item, index) => {
      item.checked = Boolean(savedChecklist[index]);
    });
  }

  checklistItems.forEach((item) => {
    item.addEventListener('change', () => {
      storage.set('tissir-checklist', checklistItems.map((checkbox) => checkbox.checked));
    });
  });

  /* Coaching topics filter + search */
  let activeFilter = 'all';

  function filterModules() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    moduleCards.forEach((card) => {
      const category = card.dataset.category || '';
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesQuery = !query || keywords.includes(query) || text.includes(query);
      const visible = matchesFilter && matchesQuery;
      card.classList.toggle('hidden', !visible);
      if (visible) visibleCount += 1;
    });

    moduleEmpty?.classList.toggle('hidden', visibleCount !== 0);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      filterModules();
    });
  });

  searchInput?.addEventListener('input', filterModules);
  filterModules();

  /* FAQ accordion */
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-question');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((faq) => {
        faq.classList.remove('active');
        faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Contact form */
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = doc.getElementById('name')?.value?.trim() || 'Team member';
    if (formMessage) {
      formMessage.textContent = `Thank you, ${name}. Your enquiry has been recorded for Mr. DS Light Consulting's follow-up at Sarajdriss@gmail.com.`;
    }
    contactForm.reset();
  });
})();
