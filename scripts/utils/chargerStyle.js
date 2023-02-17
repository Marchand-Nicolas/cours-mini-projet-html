// Fonction pour charger un fichier CSS
function chargerStyle(src) {
  // Créer un élément <link> pour charger le fichier CSS
  if (document.getElementById(src)) return; // Si le fichier CSS est déjà chargé, ne rien faire
  const link = document.createElement('link');
  link.href = src;
  link.rel = 'stylesheet';
  link.id = src;
  head.appendChild(link);
}