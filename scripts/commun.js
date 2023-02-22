// Ce fichier est commun à toutes les pages du site
// Il permet de charger les fonctions utiles, les composants, ainsi que le script de la page actuelle
// Il est nécessaire de passer par ce fichier pour charger le script de la page car le script de la page doit être chargé après les autres scripts (car il peut utiliser les fonctions et composants chargés par ce fichier)

// Variables globales
const head = document.querySelector('head');
const body = document.querySelector('body');
const html = document.querySelector('html');
const path = window.location.pathname;
const accueil = path === '/' || path.endsWith('index.html')
const relativePath = accueil ? './' : '../';
const config = {
  api: "http://158.101.204.28:8000" // L'adresse de l'API (une IP statique). Le serveur n'étant pas local, les données sont partagées entre tous les utilisateurs. Cela signifie que quand vous ajoutez un articles, tous les autres le voient.
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
  utils: ['chargerStyle', 'monter', 'monterDans'],
  composants: ['popup', 'loading', 'loadingScreen'],
  pages: ['accueil', 'articles/custom']
}
// 1. Charger les utiles
// 2. Charger les composants
  // Un composant est un objet qui contient les propriétés suivantes :
  // - nom: le nom du composant (utilisé pour le nom du fichier CSS et pour l'ID du container)
  // - html: le code HTML du composant
  // - style: un booléen indiquant si le composant a un fichier CSS associé
  // - script: une fonction qui sera exécutée après le chargement du composant
  // Le composant est renvoyé par une fonction composant
  // L'objet composant est ensuite utilisé par la fonction monter ou monterDans pour afficher le composant à l'écran
  // L'objectif de ce système est de pouvoir coder des petites briques réutilisables un peu partout. De plus, les ressources du composant ne seront chargées qu'au moment où le composant est affiché (images, fichiers css etc...)
  // Un composant peut être utilisé dans une page ou dans un autre composant
  // Exemple d'utilisation :
  // const popup = composantPopup('Mon titre', 'Mon contenu');
  // monter(popup);
fonctions.utils.forEach(util => {
  chargerScript(`${relativePath}scripts/utils/${util}.js`);
});
fonctions.composants.forEach(composant => {
  chargerScript(`${relativePath}scripts/composants/${composant}.js`);
});
fonctions.pages.forEach(page => {
  // La page d'accueil peut être / ou /index.html (en fonction de le site est hébergé sur un serveur ou non), donc elle doit être traitée séparément
  if (page === 'accueil' && accueil) {
    chargerScript(`${relativePath}scripts/pages/${page}.js`);
  }
  else if (path.endsWith(`${page}.html`)) chargerScript(`${relativePath}scripts/pages/${page}.js`);
});

function chargerScript(src) {
  // Créer un élément <script> pour charger le fichier JS
  // C'est la seule fonction utile directement écrite dans le code. Les autres sont chargées par celle-ci
  const script = document.createElement('script');
  script.src = src;
  script.type = 'text/javascript'
  html.appendChild(script);
}