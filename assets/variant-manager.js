const variantCss=document.createElement('link');variantCss.rel='stylesheet';variantCss.href='assets/variant-manager.css';document.head.appendChild(variantCss);let variantRows=[],variantEnabled=false;
function splitVariant(v){return v.split(',').map(x=>x.trim()).filter(Boolean)}function currentSaved(){const slug=document.querySelector('#edit-slug').value,items=JSON.parse(localStorage.getItem('dkc-demo-catalog-v1')||'[]');return items.find(x=>x.slug===slug)}
function variantSection(){if(document.querySelector('#variant-section'))return;const s=document.createElement('section');s.id='variant-section';s.className='form-section variant-section';s.innerHTML='<div class="variant-heading"><div><h2>Inventory</h2><p class="field-help">Use a matrix when stock differs by colour or size.</p></div></div><label class="variant-toggle"><input id="variant-enabled" type="checkbox"> Track stock by colour or size</label><div id="variant-builder" class="hidden"><div class="variant-inputs"><div class="field"><label>Colours</label><input id="variant-colours" placeholder="Black, White, Navy"></div><div class="field"><label>Sizes</label><input id="variant-sizes" placeholder="S, M, L or 38, 39, 40"></div></div><button type="button" id="variant-build" class="mini-button">Build matrix</button><div id="variant-summary" class="variant-summary"></div><div class="variant-table-wrap"><table class="variant-table"><thead><tr><th>Colour</th><th>Size</th><th>SKU</th><th>Stock</th><th></th></tr></thead><tbody id="variant-rows"></tbody></table></div><p id="variant-rollup" class="variant-rollup"></p></div></section>';document.querySelector('#product-price').closest('.form-section').before(s);s.querySelector('#variant-enabled').onchange=e=>{variantEnabled=e.target.checked;s.querySelector('#variant-builder').classList.toggle('hidden',!variantEnabled);if(variantEnabled&&!variantRows.length)buildMatrix()};s.querySelector('#variant-build').onclick=buildMatrix;s.addEventListener('input',updateVariantRows)}
function buildMatrix(){const colors=splitVariant(document.querySelector('#variant-colours').value||'Default'),sizes=splitVariant(document.querySelector('#variant-sizes').value||''),old=variantRows;variantRows=[];colors.forEach(color=>(sizes.length?sizes:['']).forEach(size=>{const same=old.find(x=>x.color===color&&x.size===size);variantRows.push({color,size,sku:same?.sku||'',stock:Number(same?.stock||0)})}));renderMatrix()}
function renderMatrix(){const b=document.querySelector('#variant-rows');if(!b)return;b.innerHTML=variantRows.map((r,i)=>`<tr><td><input data-v="color" data-i="${i}" value="${r.color}"></td><td><input data-v="size" data-i="${i}" value="${r.size}" placeholder="—"></td><td><input data-v="sku" data-i="${i}" value="${r.sku}" placeholder="Optional"></td><td><input data-v="stock" data-i="${i}" type="number" min="0" value="${r.stock}"></td><td><button type="button" class="variant-remove" data-remove="${i}">×</button></td></tr>`).join('');updateRollups()}
function updateVariantRows(){document.querySelectorAll('[data-v]').forEach(el=>{const r=variantRows[Number(el.dataset.i)];if(r)r[el.dataset.v]=el.dataset.v==='stock'?Number(el.value):el.value});updateRollups()}function updateRollups(){const total=variantRows.reduce((n,r)=>n+Number(r.stock||0),0),by={};variantRows.forEach(r=>by[r.color]=(by[r.color]||0)+Number(r.stock||0));const s=document.querySelector('#variant-summary'),roll=document.querySelector('#variant-rollup');if(s)s.innerHTML=`<strong>${total} total units</strong> · ${variantRows.length} variants`;if(roll)roll.textContent=Object.entries(by).map(([k,v])=>`${k}: ${v}`).join(' · ')}
function loadVariants(){variantSection();const p=currentSaved();variantRows=p?.variants?.map(x=>({...x}))||[];variantEnabled=Boolean(p?.variants?.length);const toggle=document.querySelector('#variant-enabled'),builder=document.querySelector('#variant-builder');toggle.checked=variantEnabled;builder.classList.toggle('hidden',!variantEnabled);document.querySelector('#variant-colours').value=[...new Set(variantRows.map(x=>x.color))].join(', ');document.querySelector('#variant-sizes').value=[...new Set(variantRows.map(x=>x.size).filter(Boolean))].join(', ');if(variantEnabled)renderMatrix()}
function saveAll(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  if (q('#save-button').disabled) return;
  const field = selector => q(selector).value;
  const name = field('#product-name').trim();
  const rows = variantEnabled ? variantRows.map(row => ({...row, stock: Number(row.stock || 0)})) : [];
  const product = {
    ...(editing || {}),
    id: editing?.id || editing?.slug || 'product-' + Date.now(),
    slug: editing?.slug || slug(name) + '-' + Date.now(),
    name,
    category: field('#product-category'),
    subcategory: q('#product-subcategory')?.value || '',
    sizes: q('#product-sizes')?.value || '',
    variant: q('#product-variant')?.value || '',
    colors: [...new Set(rows.map(row => row.color).filter(Boolean))],
    variants: rows,
    price_mwk: Number(field('#product-price')),
    stock_quantity: variantEnabled ? rows.reduce((total, row) => total + row.stock, 0) : Number(field('#product-stock')),
    image: main || 'assets/shop-front.webp',
    gallery: [...gallery],
    description: field('#product-description').trim() || 'Available from DeeKayCee Shopping & Shipping.'
  };
  let items;
  try {
    const saved = localStorage.getItem(KEY);
    items = saved ? JSON.parse(saved) : [...catalog];
    const index = items.findIndex(item => item.slug === product.slug);
    if (index < 0) items.unshift(product);
    else items[index] = product;
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch (error) {
    q('#form-message').textContent = error.name === 'QuotaExceededError'
      ? 'Browser storage is full. Your changes are still here. Use smaller photos and save again.'
      : 'Could not save in this browser. Your changes are still here. Please try again.';
    return;
  }
  catalog = items;
  polishDirty = false;
  q('#save-notice').textContent = name + (editing ? ' changes saved' : ' added');
  resetForm();
  renderProducts();
  show('products');
}
const watcher=new MutationObserver(()=>{const editor=document.querySelector('#editor-view');if(editor&&!editor.classList.contains('hidden'))loadVariants()});watcher.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});document.addEventListener('click',e=>{if(e.target.dataset.remove!==undefined){variantRows.splice(Number(e.target.dataset.remove),1);renderMatrix()}});document.querySelector('#product-form')?.addEventListener('submit',saveAll,true);
