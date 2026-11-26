(() => {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'product-theme-toggle'; button.setAttribute('aria-label', 'Switch colour theme');
  document.querySelector('.product-page')?.prepend(button);
  const setTheme = theme => { const dark = theme === 'dark'; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; button.textContent = dark ? '☀' : '☾'; button.setAttribute('aria-pressed', String(dark)); localStorage.setItem('dkc-theme', dark ? 'dark' : 'light'); };
  button.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  setTheme(localStorage.getItem('dkc-theme') || 'light');
})();
