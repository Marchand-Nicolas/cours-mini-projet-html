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
  });