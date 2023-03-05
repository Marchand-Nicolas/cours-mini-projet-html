addEventListener("error", (e) => {
  if (e.message.toLowerCase().includes("script")) window.location.reload();
});

// Ce fichier est commun à toutes les pages du site
// Il permet de charger les fonctions utiles, les composants, ainsi que le script de la page actuelle
// Il est nécessaire de passer par ce fichier pour charger le script de la page car le script de la page doit être chargé après les autres scripts (car il peut utiliser les fonctions et composants chargés par ce fichier)

// Variables globales
const head = document.querySelector("head");
const body = document.querySelector("body");
const html = document.querySelector("html");
const path = window.location.pathname;
const accueil = path === "/" || path.endsWith("index.html");
const basicURL =
  accueil ||
  path.endsWith("connexion.html") ||
  path.endsWith("inscription.html") ||
  path.endsWith("profile.html");
const relativePath = basicURL ? "./" : "../";
const config = {
  api: "https://mini-projet-api.nico-best-pc-ever.ovh", // Addresse de l'api.,
  //api: "http://localhost:8000", // Addresse de l'api en local.
};

// Charger les autres scripts et composants utiles :
const fonctions = {
  utils: [
    "cacheData",
    "getCachedData",
    "request",
    "chargerStyle",
    "monter",
    "monterDans",
    "base",
    "checkUserLoggedIn",
    "getUser",
  ],
  composants: ["popup", "loading", "loadingScreen", "avatar"],
  pages: ["accueil", "inscription", "connexion", "profile", "articles/custom"],
};
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
fonctions.utils.forEach((util) => {
  chargerScript(`${relativePath}scripts/utils/${util}.js`);
});
setTimeout(() => {
  fonctions.composants.forEach((composant) => {
    chargerScript(`${relativePath}scripts/composants/${composant}.js`);
  });
}, 100);
setTimeout(() => {
  fonctions.pages.forEach((page) => {
    // La page d'accueil peut être / ou /index.html (en fonction de le site est hébergé sur un serveur ou non), donc elle doit être traitée séparément
    if (page === "accueil" && accueil) {
      chargerScript(`${relativePath}scripts/pages/${page}.js`);
    } else if (path.endsWith(`${page}.html`))
      chargerScript(`${relativePath}scripts/pages/${page}.js`);
  });
}, 100);

function chargerScript(src) {
  // Créer un élément <script> pour charger le fichier JS
  // C'est la seule fonction utile directement écrite dans le code. Les autres sont chargées par celle-ci
  const script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  html.appendChild(script);
}
