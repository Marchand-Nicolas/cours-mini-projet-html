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
      // Ce script est exécuté après le chargement du composant. S'il était exécuté avant, le container n'existerait pas encore. C'est pourquoi il n'est pas écrit ci-dessus
      container.querySelector('.close').addEventListener('click', () => {
        container.remove();
      });
    }
  };
}