// Chargement des éléments de base (navbar, footer, etc.)

// Récupérer les données de l'utilisateur mises en cache
let userObject = getCachedData("user") || {};

console.log(userObject);

if (userObject.username) {
  // Mettre à jour les données de l'utilisateur mises en cache (au cas où elles aient été modifiées sur un autre appareil)
  request(`${config.api}/private/getUser`, {
    method: "POST",
    body: { username: userObject.username, password: userObject.password },
  }).then((response) => {
    // Mettre les données de l'utilisateur en cache
    if (response) cacheData("user", response, 7);
  });
}

// Charger les éléments de base (navbar, footer, etc.)
const navbar = document.createElement("nav");
navbar.innerHTML = `
<a href="${relativePath}index.html">
<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
Accueil</a>
<div class="right">
${
  userObject.username
    ? `
<a href="${relativePath}profile.html">
  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  Profil
</a>
    `
    : `
<a href="${relativePath}connexion.html">
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
  Connexion
</a>`
}
</div>
`;
body.prepend(navbar);
const footer = document.createElement("footer");
footer.innerHTML = "© 2022 - 2023 - Tous droits réservés";
body.appendChild(footer);
