'use strict';
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  const closeMenu = () => { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) { closeMenu(); } });

  const selectors = [...document.querySelectorAll('.service-selector')];
  const panels = [...document.querySelectorAll('.service-panel')];
  const serviceNavigation = document.querySelector('.service-navigation');
  serviceNavigation.setAttribute('role', 'tablist');
  serviceNavigation.setAttribute('aria-label', 'TIEC service disciplines');
  function selectService(index, moveFocus = false) {
    selectors.forEach((button, i) => {
      const selected = i === index;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
      panels[i].classList.remove('entering');
    });
    if (!reducedMotion) { panels[index].classList.add('entering'); }
    if (moveFocus) { selectors[index].focus(); }
  }
  selectors.forEach((button, index) => {
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', button.dataset.panel);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', button.id);
    panels[index].tabIndex = 0;
    button.addEventListener('click', () => selectService(index));
    button.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { next = (index + 1) % selectors.length; }
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { next = (index - 1 + selectors.length) % selectors.length; }
      else if (event.key === 'Home') { next = 0; }
      else if (event.key === 'End') { next = selectors.length - 1; }
      else { return; }
      event.preventDefault();
      selectService(next, true);
    });
  });
  selectService(0);
  document.body.classList.add('js-enhanced');

  if ('IntersectionObserver' in window) {
    if (!reducedMotion) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach(element => {
        // Elements already on screen stay readable rather than flashing off.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.classList.add('reveal-ready');
          revealObserver.observe(element);
        }
      });
    }
    const markers = [...document.querySelectorAll('.story-progress span')];
    const storyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const current = Number(entry.target.dataset.step);
          markers.forEach((marker, index) => marker.classList.toggle('current', index === current));
        }
      });
    }, { rootMargin: '-18% 0px -40% 0px', threshold: 0 });
    document.querySelectorAll('.story-step').forEach(step => storyObserver.observe(step));
    markers[0].classList.add('current');
  }

  const form = document.querySelector('#contact-form');
  const submit = form.querySelector('.submit-button');
  submit.disabled = false;
  document.querySelectorAll('.service-contact').forEach(link => link.addEventListener('click', () => {
    form.elements.service.value = link.dataset.interest;
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) { return; }
    const status = document.querySelector('#form-status');
    const notice = document.createElement('p');
    notice.textContent = 'Your demo draft is ready below. Nothing has been sent to TIEC or stored. To contact the company, call 281.448.8432 or email info@tiec.com.';
    const draft = document.createElement('pre');
    draft.textContent = `Name: ${form.elements.name.value}\nEmail: ${form.elements.email.value}\nInterest: ${form.elements.service.value}\n\n${form.elements.message.value}`;
    status.replaceChildren(notice, draft);
    status.hidden = false;
    status.focus({ preventScroll: true });
    status.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'instant' : 'smooth' });
  });
})();
