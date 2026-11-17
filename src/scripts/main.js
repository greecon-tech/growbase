/* Grow Base — progressive enhancement. The site is fully usable without this file.
   No cookies, no localStorage, no third-party requests. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('ready');

  /* ---- sticky header ---- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- mobile menu ---- */
  const btn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-nav]');
  if (btn && nav) {
    const label = btn.querySelector('.sr');
    const setOpen = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      label.textContent = open ? btn.dataset.labelClose : btn.dataset.labelOpen;
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        btn.focus();
      }
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---- reveal on scroll ---- */
  const reveals = document.querySelectorAll('.reveal, .steps');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---- gentle parallax on the hero painting (desktop, motion allowed) ---- */
  const parallax = document.querySelector('[data-parallax]');
  if (parallax && !reduce && window.matchMedia('(min-width: 961px)').matches) {
    let ticking = false;
    const update = () => {
      parallax.style.transform = `translate3d(0, ${Math.min(window.scrollY, 800) * -0.06}px, 0)`;
      ticking = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
  }

  /* ---- contact form: accessible validation + AJAX submit to Netlify Forms ---- */
  const form = document.querySelector('[data-form]');
  if (form) {
    form.noValidate = true; // we show our own, localized, accessible messages
    const status = form.querySelector('[data-status]');
    const success = document.querySelector('[data-success]');
    const submit = form.querySelector('button[type="submit"]');
    const msg = (k) => form.dataset['msg' + k];
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const fields = [...form.querySelectorAll('input[required], textarea[required]')];

    const setError = (input, text) => {
      const field = input.closest('.field');
      const err = field && field.querySelector('.field__error');
      if (!err) return;
      err.textContent = text;
      err.hidden = !text;
      field.classList.toggle('has-error', Boolean(text));
      if (text) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', err.id);
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
      }
    };

    const validate = (input) => {
      let text = '';
      if (input.type === 'checkbox') {
        if (!input.checked) text = msg('Consent');
      } else {
        const v = input.value.trim();
        if (!v) text = msg('Required');
        else if (input.type === 'email' && !EMAIL.test(v)) text = msg('Email');
      }
      setError(input, text);
      return !text;
    };

    fields.forEach((f) => {
      f.addEventListener('blur', () => {
        if (f.type !== 'checkbox' && f.value) validate(f);
      });
      f.addEventListener('input', () => {
        if (f.closest('.has-error')) validate(f);
      });
      f.addEventListener('change', () => {
        if (f.type === 'checkbox') validate(f);
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const invalid = fields.filter((f) => !validate(f));
      if (invalid.length) {
        invalid[0].focus();
        return;
      }
      const label = submit.dataset.label;
      submit.disabled = true;
      submit.firstChild.nodeValue = msg('Sending');
      status.textContent = '';
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.hidden = true;
        const note = document.querySelector('.form__note');
        if (note) note.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (err) {
        status.textContent = msg('Send');
        submit.disabled = false;
        submit.firstChild.nodeValue = label;
      }
    });
  }
})();
