// Monte un composant dans un container précis
function monterDans(composant, container) {
  if (typeof container === "string")
    container = document.getElementById(container);
  container.innerHTML = composant.html;
  if (composant.style)
    chargerStyle(`${relativePath}styles/composants/${composant.nom}.css`); // Charger le fichier CSS du composant
  if (composant.script) return composant.script(container);
}
