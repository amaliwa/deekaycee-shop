const phone = '265888068487';
let category = 'all';
let products = [];
const grid = document.querySelector('#product-grid');
const empty = document.querySelector('#empty-state');
function availability(stock) { return stock === 0 ? ['Out of stock', 'out'] : stock <= 2 ? ['Only ' + stock + ' left', 'low'] : ['In stock', '']; }
function render() {
  const query = document.querySelector('#search').value.toLowerCase();
  const shown = products.filter(p => (category === 'all' || p.category === category) && (!query || `${p.name} ${p.category}`.toLowerCase().includes(query)));
  empty.hidden = shown.length > 0;
  grid.innerHTML = shown.map(p => {
    const [label, cls] = availability(p.stock_quantity);
    const msg = encodeURIComponent(`Hi DEEKAYCEE, I’m enquiring about the ${p.name} (${p.category}, MWK ${p.price_mwk.toLocaleString()}). Is it available?`);
    return `<article class="product-card"><div class="product-image" style="background-image:url('${p.image}');background-size:cover;background-position:center"><span class="availability ${cls}">${label}</span></div><div class="product-info"><div class="product-meta"><span class="product-name">${p.name}</span><span class="product-price">MWK ${p.price_mwk.toLocaleString()}</span></div><div class="product-category">${p.category}</div><a class="enquire" href="https://wa.me/${phone}?text=${msg}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div></article>`;
  }).join('');
}
function setLanguage(next) {
  document.documentElement.lang = next === 'ny' ? 'ny' : 'en';
  document.querySelectorAll('[data-en][data-ny]').forEach(el => { el.textContent = el.dataset[next]; });
  document.querySelectorAll('.lang').forEach(button => button.classList.toggle('active', button.dataset.lang === next));
}
document.querySelector('#search').addEventListener('input', render);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); category = button.dataset.category; render(); }));
document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
fetch('data/media-catalog.json').then(response => response.json()).then(data => { products = data; render(); }).catch(() => { empty.hidden = false; empty.textContent = 'Catalogue temporarily unavailable.'; });

