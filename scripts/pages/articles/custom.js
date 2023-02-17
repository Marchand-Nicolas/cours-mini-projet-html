const screen = monter(loadingScreen());
const params = new URLSearchParams(window.location.search);
const articleId = params.get('id');
const requestOptions = {
  method: 'GET',
};
fetch(`${config.api}/getArticle?id=${articleId}`, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('titre').innerHTML = data.titre;
    document.getElementById('description').innerHTML = data.description;
    document.getElementById('contenu').innerHTML = data.contenu;
    document.getElementById('date').innerHTML = 'Publié le ' + new Date(data.date).toLocaleDateString();
    document.getElementById('container').style.backgroundImage = `url(${config.api}/image/${data.image})`;
    screen.remove();
});

const chargerCommentaires = () => {
  const commentairesContainer = document.getElementById('commentaires');
  const requestOptions = {
    method: 'GET',
  };
  fetch(`${config.api}/getCommentaires?articleId=${articleId}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      commentairesContainer.innerHTML = '';
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        commentairesContainer.innerHTML += `
        <div class="commentaire">
          <div class="flex">
            <h1>${element.auteur}</h1>
            <p class="ml-1">${new Date(element.date).toLocaleDateString()}</p>
          </div>
          <p>${element.contenu}</p>
        </div>
        `;
      }
      if (data.length === 0) commentairesContainer.innerHTML = `
      <div class="emptyContainer">
        <p>
          Aucun commentaire
        </p>
      </div>`
    });
};
chargerCommentaires();

const ajouterCommentaire = (e) => {
  e.preventDefault();
  const screen = monter(loadingScreen());
  const auteur = document.getElementById('formCommentaireAuteur').value;
  const contenu = document.getElementById('formCommentaireContenu').value;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ auteur: auteur, contenu: contenu, articleId: articleId }),
  };
  fetch(`${config.api}/addCommentaire`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('formCommentaireContenu').value = '';
      chargerCommentaires();
      screen.remove();
    });
};