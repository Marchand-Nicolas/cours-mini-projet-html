function monter(composant) {
  const composantId = `composant-${composant.nom}`;
  const containerId = `container-${composantId}`;
  let container = document.getElementById(composant.nom)
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.classList.add(`container-${composant.nom}`);
    body.appendChild(container);
  }
  container.innerHTML = composant.html;
  if (composant.style) chargerStyle(`${relativePath}styles/composants/${composant.nom}.css`);
  if (composant.script) return composant.script(container);
}