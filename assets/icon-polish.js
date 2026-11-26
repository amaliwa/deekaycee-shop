(() => {
  const icons = {
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 11.5a8 8 0 0 1-11.8 7.1L4 20l1.4-4A8 8 0 1 1 20 11.5Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.2 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.7 1.2 1.6 2.1 2.8 2.7l.5-.6c.2-.2.4-.2.7-.1l1.5.7c.3.1.4.3.4.6v.5c0 .3-.1.5-.4.7-.4.3-1 .4-1.5.2-2.2-.7-4.5-3-5.3-5.2-.2-.6-.1-1.1.1-1.6Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    share: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="18" cy="5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="12" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="19" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  document.querySelectorAll('.enquire').forEach(el => { el.insertAdjacentHTML('afterbegin', icons.whatsapp); });
  document.querySelectorAll('.whatsapp-button').forEach(el => { el.querySelector('span')?.replaceWith(document.createRange().createContextualFragment(icons.whatsapp)); });
  document.querySelectorAll('.share-button').forEach(el => { el.textContent = ''; el.insertAdjacentHTML('beforeend', icons.share); });
  document.querySelectorAll('.back-link').forEach(el => { el.innerHTML = icons.arrow + '<span>Back to shop</span>'; });
})();
