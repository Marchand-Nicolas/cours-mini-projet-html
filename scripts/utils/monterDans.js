function monterDans(composant, container) {
  if (typeof container === 'string') container = document.getElementById(container);
  container.innerHTML = composant.html;
  if (composant.style) chargerStyle(`${relativePath}styles/composants/${composant.nom}.css`);
  if (composant.script) return composant.script(container);
}