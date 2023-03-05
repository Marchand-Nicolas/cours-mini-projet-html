// Affiche un écran de chargement le temps de charger les données de l'article
const screen = monter(loadingScreen());
const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
request(`${config.api}/getArticle?id=${articleId}`, { method: "GET" }).then(
  async (data) => {
    if (data.author !== userObject.id) {
      const deleteArticleSection = document.getElementById(
        "deleteArticleSection"
      );
      deleteArticleSection.remove();
    }
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
    const author = await getUser(data.author);
    document.getElementById("titre").innerHTML = data.titre;
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("contenu").innerHTML = data.contenu;
    document.getElementById("date").innerHTML = `
    <div id="articleAuthorAvatarContainer"></div>
    <p class="ml-1">
    Publié le ${new Date(data.date).toLocaleDateString()} par ${author.username}
    </p>
    `;
    document.getElementById(
      "container"
    ).style.backgroundImage = `url(${config.api}/image/${data.image})`;
    monterDans(
      avatar({ customAvatarURL: author.avatar, width: 40 }),
      document.getElementById("articleAuthorAvatarContainer")
    );
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
  }).then(async (data) => {
    commentairesContainer.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const user = await getUser(element.userId);
      commentairesContainer.innerHTML += `
        <div class="commentaire">
          <div class="flex cent-vert">
            <div id="avatar-commentaire-${element.id}"></div>
            <h1 class="ml-1">${user.username}</h1>
            <p class="ml-1">${new Date(element.date).toLocaleDateString()} à ${
        new Date(element.date).toLocaleTimeString().split(":")[0]
      }:${new Date(element.date).toLocaleTimeString().split(":")[1]}</p>
      ${
        element.userId === userObject.id
          ? `<svg onclick="deleteCommentaire(${element.id});" class="icon-1 danger ml-1 pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>`
          : ""
      }
          </div>
          <p>${element.contenu}</p>
        </div>
        `;
      monterDans(
        avatar({ customAvatarURL: user.avatar, width: 40 }),
        document.getElementById(`avatar-commentaire-${element.id}`)
      );
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

function deleteCommentaire(id) {
  if (!checkUserLoggedIn()) return;
  const screen = monter(loadingScreen());
  request(`${config.api}/private/deleteCommentaire`, {
    method: "DELETE",
    body: {
      id: id,
      username: userObject.username,
      password: userObject.password,
    },
  }).then((data) => {
    screen.remove();
    chargerCommentaires();
  });
}

const ajouterCommentaire = (e) => {
  e.preventDefault();
  if (!checkUserLoggedIn()) return;
  const screen = monter(loadingScreen());
  const contenu = document.getElementById("formCommentaireContenu").value;
  if (contenu === "") {
    screen.remove();
    monter(popup("Erreur", "Veuillez remplir tous les champs du formulaire."));
    return;
  }
  request(`${config.api}/private/addCommentaire`, {
    method: "POST",
    body: {
      userId: userObject.id,
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
  if (!checkUserLoggedIn()) return;
  const screen = monter(loadingScreen());
  request(`${config.api}/private/deleteArticle`, {
    method: "DELETE",
    body: {
      id: articleId,
      username: userObject.username,
      password: userObject.password,
    },
  }).then((data) => {
    screen.remove();
    window.location.href = `${relativePath}index.html`;
  });
};
