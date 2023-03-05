const articlesParDefaut = [
  {
    titre: "Les Fractales: Kesquecé?",
    description:
      "Une figure fractale est un objet mathématique qui présente une structure similaire à toutes les échelles. C'est un objet géométrique « infiniment morcelé » dont des détails sont observables à une échelle arbitrairement choisie. En zoomant sur une partie de la figure, il est possible de retrouver toute la figure ; on dit alors qu’elle est « auto similaire ».",
    page: "def_fractale",
  },
  {
    titre: "Les Fractales: Histoire",
    description:
      "De nombreux exemples de fractales, comme le flocon de Koch ou le tapis de Serpiński ont été découverts à la fin du 19e siècle, mais c'est Benoît Mandelbrot qui, en 1975, a attiré l'attention sur ces objets et leur omniprésence dans la nature ...",
    page: "hist_fractale",
  },
  {
    titre: "Les Fractales: Dans la nature",
    description:
      "Des formes fractales approximatives sont facilement observables dans la nature. Ces objets ont une structure autosimilaire sur une échelle étendue, mais finie : les nuages, les flocons de neige, les montagnes, les réseaux de rivières, le chou-fleur ou le brocoli, et les vaisseaux sanguins.",
    page: "nat_fractale",
  },
];

const articlesDynamiques = [];
let articles = [...articlesParDefaut];
const articlesContainer = document.getElementById("articles");

const params = {
  q: "",
};

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
let filtre = query || "";
document.getElementById("article-search").value = filtre;

function updateParams() {
  const url = new URL(window.location.href);
  const keys = Object.keys(params);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = params[key];
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  window.history.pushState({}, "", url);
}

function chargerArticles() {
  articlesContainer.innerHTML = "";
  for (let index = 0; index < articles.length; index++) {
    const element = articles[index];
    const image =
      element.type === "custom"
        ? `${config.api}/image/${element.image}`
        : `images/articles/${element.page}.jpg`;
    const page =
      element.type === "custom"
        ? `articles/custom.html?id=${element.id}`
        : `articles/${element.page}.html`;
    articlesContainer.innerHTML += `
        <a class="articleLink" href="${page}">
            <article style="background-image: url('${image}')">
                <h1>${element.titre}</h1>
                <p>
                    ${element.description}
                </p>
            </article>
        </a>
        `;
  }
  if (articles.length === 0) {
    articlesContainer.innerHTML = `
        <article class="full">
            <h1>Aucun article ne correspond à votre recherche</h1>
        </article>
        `;
  }
}

function rechercherArticles(e) {
  // Quand l'utilisateur tape dans la barre de recherche
  const texte = e.target.value;
  filtre = texte;
  filtrerArticles();
  params.q = texte;
  updateParams();
}

function filtrerArticles() {
  if (!filtre) {
    articles = [...articlesParDefaut, ...articlesDynamiques];
  } else {
    articles = [...articlesParDefaut, ...articlesDynamiques].filter(
      (article) =>
        article.titre.toLowerCase().includes(filtre.toLowerCase()) ||
        article.description.toLowerCase().includes(filtre.toLowerCase())
    );
    const copie = articles.map((article) => ({ ...article }));
    // Surligner le texte recherché sans prendre en compte les majuscules
    for (let index = 0; index < articles.length; index++) {
      const article = articles[index];
      const titre = article.titre.toLowerCase();
      const description = article.description.toLowerCase();
      // Trouver l'index du texte recherché dans le titre et la description
      const indexTitre = titre.indexOf(filtre.toLowerCase());
      const indexDescription = description.indexOf(filtre.toLowerCase());
      if (indexTitre !== -1) {
        // Surligner le texte recherché
        copie[index].titre = `${article.titre.slice(
          0,
          indexTitre
        )}<span class="highlight">${article.titre.slice(
          indexTitre,
          indexTitre + filtre.length
        )}</span>${article.titre.slice(indexTitre + filtre.length)}`;
      }
      if (indexDescription !== -1) {
        copie[index].description = `${article.description.slice(
          0,
          indexDescription
        )}<span class="highlight">${article.description.slice(
          indexDescription,
          indexDescription + filtre.length
        )}</span>${article.description.slice(
          indexDescription + filtre.length
        )}`;
      }
    }
    articles = copie;
  }
  chargerArticles();
}

function getArticles() {
  monterDans(loadingScreen(), articlesContainer);
  request(`${config.api}/getArticles`, { method: "GET" }).then((data) => {
    // Supprimer tous les articles dynamiques
    articlesDynamiques.length = 0;
    // Ajouter les articles dynamiques
    articlesDynamiques.push(
      ...data.map((article) => ({
        ...article,
        type: "custom",
      }))
    );
    filtrerArticles();
  });
}
getArticles();

function ajouterArticle(e) {
  // Quand l'utilisateur rempli le formulaire et clique sur le bouton "Ajouter"
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const titre = document.getElementById("formArticleTitre").value;
  const description = document.getElementById("formArticleDescription").value;
  const contenu = document.getElementById("formArticleContenu").value;

  if (!titre || !description || !contenu)
    return monter(
      popup("Erreur", "Veuillez remplir tous les champs du formulaire.")
    );

  // Ajouter les données du formulaire dans un FormData
  formData.append("titre", titre);
  formData.append("description", description);
  formData.append("contenu", contenu);

  // Envoyer les données du formulaire
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const screen = monter(loadingScreen());
  fetch(`${config.api}/addArticle`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      getArticles();
      monter(
        popup(
          "Succès",
          `Votre article a bien été ajouté. <a class="link" href="articles/custom.html?id=${data.id}" target="_blank" rel="noreferrer">Afficher</a>`
        )
      );
      screen.remove();
    });
}

filtrerArticles();
