(() => {
  const showNotice = message => {
    let notice = document.querySelector('.share-notice');
    if (!notice) { notice = document.createElement('div'); notice.className = 'share-notice'; document.body.appendChild(notice); }
    notice.textContent = message; notice.classList.add('visible');
    clearTimeout(notice._timer); notice._timer = setTimeout(() => notice.classList.remove('visible'), 2600);
  };
  const copyLink = async url => {
    if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); return true; }
    const input = document.createElement('textarea'); input.value = url; input.setAttribute('readonly', ''); input.style.position = 'fixed'; input.style.opacity = '0'; document.body.appendChild(input); input.select();
    const copied = document.execCommand('copy'); input.remove(); return copied;
  };
  document.addEventListener('click', async event => {
    const button = event.target.closest('.share-button');
    if (!button) return;
    event.preventDefault(); event.stopImmediatePropagation();
    const url = location.href;
    try {
      if (navigator.share) { await navigator.share({title: document.title, text: document.title, url}); return; }
      if (await copyLink(url)) showNotice('Product link copied');
      else showNotice('Copy the product link from your browser');
    } catch (error) {
      if (error?.name !== 'AbortError') showNotice('Could not share. Copy the page link to share it.');
    }
  }, true);
})();
