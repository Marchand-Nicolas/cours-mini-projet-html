function popup(message, contenu) {
  const html = `
  <div class="popup">
    <h2>${message}</h2>
    ${contenu.startsWith('<') ? contenu : `<p>${contenu}</p>`}
    <button class="bouton close">Fermer</button>
  </div>
  `

  return {
    html: html,
    style: true,
    nom: 'popup',
    script: (container) => {
      container.querySelector('.close').addEventListener('click', () => {
        container.remove();
      });
    }
  };
}