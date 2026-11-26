photoGrid.addEventListener('click', event => {
  if (event.target.tagName !== 'IMG') return;
  const index = Array.from(photoGrid.children).indexOf(event.target.closest('.photo-thumb'));
  if (index < 1) return;
  const photos = [main, ...gallery];
  const [cover] = photos.splice(index, 1);
  updatePhotos([cover, ...photos]);
});
