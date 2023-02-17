const articlesParDefaut = [
    {
        titre: "Les Fractales: Kesquecé?",
        description: "Une figure fractale est un objet mathématique qui présente une structure similaire à toutes les échelles. C'est un objet géométrique « infiniment morcelé » dont des détails sont observables à une échelle arbitrairement choisie. En zoomant sur une partie de la figure, il est possible de retrouver toute la figure ; on dit alors qu’elle est « auto similaire ».",
        page: "def_fractale"
    },
    {
        titre: "Les Fractales: Histoire",
        description: "De nombreux exemples de fractales, comme le flocon de Koch ou le tapis de Serpiński ont été découverts à la fin du 19e siècle, mais c'est Benoît Mandelbrot qui, en 1975, a attiré l'attention sur ces objets et leur omniprésence dans la nature ...",
        page: "hist_fractale"
    },
    {
        titre: "Les Fractales: Dans la nature",
        description: "Des formes fractales approximatives sont facilement observables dans la nature. Ces objets ont une structure autosimilaire sur une échelle étendue, mais finie : les nuages, les flocons de neige, les montagnes, les réseaux de rivières, le chou-fleur ou le brocoli, et les vaisseaux sanguins.",
        page: "nat_fractale"
    }
]

const articles = [...articlesParDefaut]
const articlesContainer = document.getElementById('articles')

function chargerArticles() {
    articlesContainer.innerHTML = ''
    for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        const image = element.type === 'custom' ?
        `${config.api}/image/${element.image}`
        :
        `images/articles/${element.page}.jpg`
        const page = element.type === 'custom' ?
        `articles/custom.html?id=${element.id}`
        :
        `articles/${element.page}.html`
        articlesContainer.innerHTML += `
        <a class="articleLink" href="${page}">
            <article style="background-image: url('${image}')">
                <h1>${element.titre}</h1>
                <p>
                    ${element.description}
                </p>
            </article>
        </a>
        `
    }
}
chargerArticles()

function update() {
    monterDans(loadingScreen(), articlesContainer)
    const requestOptions = {
        method: 'GET',
    };
    fetch(`${config.api}/getArticles`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
        articles.splice(articlesParDefaut.length)
        articles.push(...data.map((article) => ({
            ...article,
            type: 'custom'
        })))
        chargerArticles()
    })
}
update()

function ajouterArticle(e) {
    // Quand l'utilisateur rempli le formulaire et clique sur le bouton "Ajouter"
    e.preventDefault();

    const form = e.target
    const formData = new FormData(form)
    const titre = document.getElementById('formArticleTitre').value
    const description = document.getElementById('formArticleDescription').value
    const contenu = document.getElementById('formArticleContenu').value
    
    if (!titre || !description || !contenu) return monter(
            popup(
                'Erreur',
                'Veuillez remplir tous les champs du formulaire.'
            )
        )

    formData.append("titre", titre)
    formData.append("description", description)
    formData.append("contenu", contenu)
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    const screen = monter(loadingScreen());
    fetch(`${config.api}/addArticle`, requestOptions)
    .then(response => response.json())
    .then(data => {
        update()
        monter(
            popup(
                'Succès', 
                `Votre article a bien été ajouté. <a class="link" href="articles/custom.html?id=${data.id}" target="_blank" rel="noreferrer">Afficher</a>`,
        ));
        screen.remove()
    })
}