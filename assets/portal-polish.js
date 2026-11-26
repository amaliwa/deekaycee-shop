let polishDirty = false;
const photoGrid = document.querySelector('#image-preview');
const productForm = document.querySelector('#product-form');

function addPhotoActions() {
  for (const [index, thumb] of Array.from(photoGrid.children).entries()) {
    if (thumb.querySelector('.photo-actions')) continue;
    const actions = document.createElement('div');
    actions.className = 'photo-actions';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.polishRemove = index;
    remove.textContent = 'Remove';
    actions.appendChild(remove);
    thumb.appendChild(actions);
  }
}

function updatePhotos(photos) {
  main = photos[0] || '';
  gallery = photos.slice(1);
  q('#product-main-image-url').value = main.startsWith('data:') ? '' : main;
  polishDirty = true;
  preview();
}

new MutationObserver(addPhotoActions).observe(photoGrid, {childList: true});
productForm.addEventListener('input', () => { polishDirty = true; });
photoGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-polish-remove]');
  if (!button) return;
  const photos = main ? [main, ...gallery] : [...gallery];
  photos.splice(Number(button.dataset.polishRemove), 1);
  updatePhotos(photos);
});

for (const selector of ['#back-products', '#cancel-edit']) {
  q(selector).addEventListener('click', event => {
    if (!polishDirty) return;
    if (confirm('Discard your unsaved changes?')) {
      polishDirty = false;
    } else {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
}
