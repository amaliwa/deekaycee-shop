const phone = '265888068487';
const products = [
  { name: 'Satin evening dress', category: 'Dresses', price: 'MWK 289,000', stock: 4, tone: '#b88672', tilt: '-4deg' },
  { name: 'Linen wrap dress', category: 'Dresses', price: 'MWK 219,000', stock: 8, tone: '#d1b98f', tilt: '3deg' },
  { name: 'City ankle boot', category: 'Footwear', price: 'MWK 349,000', stock: 2, tone: '#473d39', tilt: '-5deg' },
  { name: 'Everyday white trainer', category: 'Footwear', price: 'MWK 199,000', stock: 0, tone: '#ede9e1', tilt: '2deg' },
  { name: 'Structured shoulder bag', category: 'Accessories', price: 'MWK 179,000', stock: 5, tone: '#53635b', tilt: '-2deg' },
  { name: 'Soft knit midi', category: 'Dresses', price: 'MWK 249,000', stock: 3, tone: '#a1a8a0', tilt: '4deg' },
  { name: 'Everyday leather belt', category: 'Accessories', price: 'MWK 89,000', stock: 12, tone: '#684b3e', tilt: '-3deg' },
  { name: 'Retro court trainer', category: 'Footwear', price: 'MWK 229,000', stock: 1, tone: '#bb9a68', tilt: '5deg' }
];
let category = 'all';
const grid = document.querySelector('#product-grid');
const empty = document.querySelector('#empty-state');
function availability(stock) { return stock === 0 ? ['Out of stock', 'out'] : stock <= 2 ? ['Only ' + stock + ' left', 'low'] : ['In stock', '']; }
function render() {
  const query = document.querySelector('#search').value.toLowerCase();
  const shown = products.filter(p => (category === 'all' || p.category === category) && (!query || `${p.name} ${p.category}`.toLowerCase().includes(query)));
  empty.hidden = shown.length > 0;
  grid.innerHTML = shown.map(p => {
    const [label, cls] = availability(p.stock);
    const msg = encodeURIComponent(`Hi DEEKAYCEE, I’m enquiring about the ${p.name} (${p.category}, ${p.price}). Is it available in my size?`);
    return `<article class="product-card"><div class="product-image" style="--tone:${p.tone};--tilt:${p.tilt}"><span class="availability ${cls}">${label}</span></div><div class="product-info"><div class="product-meta"><span class="product-name">${p.name}</span><span class="product-price">${p.price}</span></div><div class="product-category">${p.category}</div><a class="enquire" href="https://wa.me/${phone}?text=${msg}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div></article>`;
  }).join('');
}
function setLanguage(next) {
  document.documentElement.lang = next === 'ny' ? 'ny' : 'en';
  document.querySelectorAll('[data-en][data-ny]').forEach(el => { el.textContent = el.dataset[next]; });
  document.querySelectorAll('.lang').forEach(button => button.classList.toggle('active', button.dataset.lang === next));
}
document.querySelector('#search').addEventListener('input', render);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); category = button.dataset.category; render();
}));
document.querySelectorAll('.lang').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
render();
