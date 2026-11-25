const phone = '265888068487';
let category = 'all';
let products = [];
const grid = document.querySelector('#product-grid');
const empty = document.querySelector('#empty-state');
const search = document.querySelector('#search');
const overlayFix = document.createElement('style');
overlayFix.textContent = '.product-image::after{display:none!important}.product-card{cursor:pointer}.product-card .enquire{position:relative;z-index:2}.product-dialog{max-width:760px;width:calc(100% - 32px);padding:0;border:0;border-radius:24px;overflow:hidden;color:#351b2b;background:#fff}.product-dialog::backdrop{background:rgba(38,13,32,.68)}.dialog-media{min-height:300px;background-size:cover;background-position:center}.dialog-copy{padding:28px}.dialog-copy h2{margin:.2em 0}.dialog-price{font-size:1.35rem;font-weight:800;color:#8b143e}.dialog-close{position:absolute;right:14px;top:10px;border:0;border-radius:50%;background:#fff;color:#351b2b;font-size:28px;width:42px;height:42px;cursor:pointer}.dialog-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}.product-dialog .button{display:inline-block;padding:13px 18px;border-radius:999px;text-decoration:none}.product-dialog .button-primary{background:#8b143e;color:#fff}.product-dialog .button-secondary{border:1px solid #8b143e;color:#8b143e}';
document.head.appendChild(overlayFix);
function availability(stock) { return stock === 0 ? ['Out of stock', 'out'] : stock <= 2 ? ['Only ' + stock + ' left', 'low'] : ['In stock', '']; }
function whatsapp(p) { return `https://wa.me/${phone}?text=${encodeURIComponent(`Hi DEEKAYCEE, I’m enquiring about the ${p.name} (${p.category}, MWK ${p.price_mwk.toLocaleString()}). Is it available?`)}`; }
function openDetails(p) {
  let dialog = document.querySelector('#product-dialog');
  if (!dialog) { dialog = document.createElement('dialog'); dialog.id = 'product-dialog'; dialog.className = 'product-dialog'; document.body.appendChild(dialog); }
  const [label, cls] = availability(p.stock_quantity);
  dialog.innerHTML = `<button class="dialog-close" type="button" aria-label="Close product details">×</button><div class="dialog-media" style="background-image:url('${p.image}')"></div><div class="dialog-copy"><p class="eyebrow">${p.category}</p><h2>${p.name}</h2><p>${p.description}</p><p class="dialog-price">MWK ${p.price_mwk.toLocaleString()}</p><span class="availability ${cls}">${label}</span><div class="dialog-actions"><a class="button button-primary" href="${whatsapp(p)}" target="_blank" rel="noopener">Enquire on WhatsApp</a><a class="button button-secondary" href="product.html?slug=${p.slug}">View full details</a></div></div>`;
  dialog.querySelector('.dialog-close').onclick = () => dialog.close();
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); }, { once: true });
  dialog.showModal();
}
function render() {
  const query = (search?.value || '').toLowerCase();
  const shown = products.filter(p => (category === 'all' || p.category === category) && (!query || `${p.name} ${p.category}`.toLowerCase().includes(query)));
  empty.hidden = shown.length > 0;
  grid.innerHTML = shown.map(p => { const [label, cls] = availability(p.stock_quantity); return `<article class="product-card" data-slug="${p.slug}" tabindex="0"><div class="product-image" style="background-image:url('${p.image}');background-size:cover;background-position:center"><span class="availability ${cls}">${label}</span></div><div class="product-info"><div class="product-meta"><span class="product-name">${p.name}</span><span class="product-price">MWK ${p.price_mwk.toLocaleString()}</span></div><div class="product-category">${p.category}</div><a class="enquire" href="${whatsapp(p)}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div></article>`; }).join('');
}
function setLanguage(next) { document.documentElement.lang = next === 'ny' ? 'ny' : 'en'; document.querySelectorAll('[data-en][data-ny]').forEach(el => { el.textContent = el.dataset[next]; }); document.querySelectorAll('.lang').forEach(button => button.classList.toggle('active', button.dataset.lang === next)); }
search?.addEventListener('input', render);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active')?.classList.remove('active'); button.classList.add('active'); category = button.dataset.category; render(); }));
document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
grid?.addEventListener('click', e => { if (e.target.closest('a')) return; const card = e.target.closest('.product-card'); const p = products.find(item => item.slug === card?.dataset.slug); if (p) openDetails(p); });
grid?.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const p = products.find(item => item.slug === e.target.closest('.product-card')?.dataset.slug); if (p) { e.preventDefault(); openDetails(p); } });
fetch('data/ai-catalog.json').then(response => response.json()).then(data => { products = data; render(); }).catch(() => { empty.hidden = false; empty.textContent = 'Catalogue temporarily unavailable.'; });

