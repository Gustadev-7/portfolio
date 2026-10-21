// Aplica o tema salvo (ou o do sistema) antes da primeira pintura, para a tela não piscar.
// Fica em arquivo próprio, e não inline no index.html, para a Content-Security-Policy
// não precisar liberar scripts inline (ver vercel.json).
(function () {
  var theme;
  try {
    theme = localStorage.getItem('gd-theme');
  } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.dataset.theme = theme;
})();
