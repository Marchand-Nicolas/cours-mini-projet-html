function popup (message, contenu) {
    let popupContainer = document.getElementById('popup-container')
    if (!popupContainer) {
      popupContainer = document.createElement('div');
      popupContainer.id = 'popup-container';
      popupContainer.classList.add('popup-container');
      body.appendChild(popupContainer);
    }
    popupContainer.innerHTML = `
    <div class="popup">
      <h2>${message}</h2>
      <p>${contenu}</p>
      <button class="close">Fermer</button>
    </div>
    `;
    popupContainer.querySelector('.close').addEventListener('click', () => {
      popupContainer.remove();
    });
}