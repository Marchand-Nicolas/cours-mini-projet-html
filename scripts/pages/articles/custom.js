// Affiche un écran de chargement le temps de charger les données de l'article
const screen = monter(loadingScreen());
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
request(`${config.api}/getArticle?id=${articleId}`, { method: "GET" }).then(
  (data) => {
    if (data.empty) {
      // Si l'article n'existe pas, affiche un message d'erreur
      screen.remove();
      return monter(
        popup("Erreur", "Cet article n'existe pas ou a été supprimé.", {
          buttonText: "Retourner à l'accueil",
          action: () => {
            window.location.href = "../index.html";
          },
        })
      );
    }
    document.getElementById("titre").innerHTML = data.titre;
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("contenu").innerHTML = data.contenu;
    document.getElementById("date").innerHTML =
      "Publié le " + new Date(data.date).toLocaleDateString();
    document.getElementById(
      "container"
    ).style.backgroundImage = `url(${config.api}/image/${data.image})`;
    // Supprime l'écran de chargement
    screen.remove();
    chargerCommentaires();
  }
);

const chargerCommentaires = () => {
  const commentairesContainer = document.getElementById("commentaires");
  monterDans(loading(), commentairesContainer);
  request(`${config.api}/getCommentaires?articleId=${articleId}`, {
    method: "GET",
  }).then((data) => {
    commentairesContainer.innerHTML = "";
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
    if (data.length === 0)
      commentairesContainer.innerHTML = `
      <div class="emptyContainer">
        <p>
          Aucun commentaire
        </p>
      </div>`;
  });
};

const ajouterCommentaire = (e) => {
  e.preventDefault();
  const screen = monter(loadingScreen());
  const auteur = document.getElementById("formCommentaireAuteur").value;
  const contenu = document.getElementById("formCommentaireContenu").value;
  if (auteur === "" || contenu === "") {
    screen.remove();
    monter(popup("Erreur", "Veuillez remplir tous les champs du formulaire."));
    return;
  }
  request(`${config.api}/addCommentaire`, {
    method: "POST",
    body: {
      auteur: auteur,
      contenu: contenu,
      articleId: articleId,
    },
  }).then((data) => {
    document.getElementById("formCommentaireContenu").value = "";
    chargerCommentaires();
    screen.remove();
  });
};

const supprimerArticle = () => {
  const screen = monter(loadingScreen());
  request(`${config.api}/deleteArticle`, {
    method: "DELETE",
    body: { id: articleId },
  }).then((data) => {
    screen.remove();
    window.location.href = `${relativePath}index.html`;
  });
};
