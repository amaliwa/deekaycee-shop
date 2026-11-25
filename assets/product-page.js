const phone = '265888068487';
const slug = new URLSearchParams(location.search).get('slug');
const root = document.querySelector('#product-detail');
function availability(stock) { return stock === 0 ? ['Out of stock', 'out'] : stock <= 2 ? ['Only ' + stock + ' left', 'low'] : ['In stock', '']; }
fetch('data/ai-catalog.json').then(r => r.json()).then(items => {
  const p = items.find(item => item.slug === slug) || items[0];
  const [label, cls] = availability(p.stock_quantity);
  const message = encodeURIComponent(`Hi DKC, I’m enquiring about the ${p.name} (${p.category}, MWK ${p.price_mwk.toLocaleString()}). Is it available?`);
  document.title = `${p.name} | DEEKAYCEE Shopping & Shipping`;
  document.querySelector('meta[name="description"]').content = p.description;
  const ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'Product', name:p.name, description:p.description, image:[new URL(p.image, location.href).href], offers:{ '@type':'Offer', priceCurrency:'MWK', price:p.price_mwk, availability:p.stock_quantity ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock', url:location.href } }); document.head.appendChild(ld);
  root.innerHTML = `<div class="product-detail-image" style="background-image:url('${p.image}')"></div><div class="product-detail-copy"><p class="eyebrow">${p.category}</p><h1>${p.name}</h1><p>${p.description}</p><p class="dialog-price">MWK ${p.price_mwk.toLocaleString()}</p><span class="availability ${cls}">${label}</span><p class="demo-note">AI-generated placeholder listing — product photo, size and final price will be replaced/confirmed by the shop.</p><a class="button button-primary" href="https://wa.me/${phone}?text=${message}" target="_blank" rel="noopener">Enquire on WhatsApp</a></div>`;
}).catch(() => { root.innerHTML = '<p>Product details are temporarily unavailable.</p>'; });
