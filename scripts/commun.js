const head = document.querySelector('head');
const body = document.querySelector('body');

const path = window.location.pathname;
const relativePath = path === '/' || path.endsWith('index.html') ? './' : '../';

const config = {
  api: "http://158.101.204.28:8000"
}

// Charger les éléments de base (navbar, footer, etc.)
const navbar = document.createElement('nav');
navbar.innerHTML = `
<a href="${relativePath}index.html">
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
Accueil</a>
`;
body.prepend(navbar);
const footer = document.createElement('footer');
footer.innerHTML = '© 2022 - 2023 - Tous droits réservés';
body.appendChild(footer);

// Charger les autres scripts et composants utiles :
const fonctions = {
  utils: ['chargerStyle', 'monter'],
  composants: ['popup']
}
fonctions.utils.forEach(util => {
  chargerScript(`${relativePath}scripts/utils/${util}.js`);
});
fonctions.composants.forEach(composant => {
  chargerScript(`${relativePath}scripts/composants/${composant}.js`);
});

function chargerScript(src) {
  // Créer un élément <script> pour charger le fichier JS
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript'
  body.appendChild(script);
}