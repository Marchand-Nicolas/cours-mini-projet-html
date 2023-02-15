const articles = [
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

const container = document.getElementById('articles')

for (let index = 0; index < articles.length; index++) {
    const element = articles[index];
    container.innerHTML += `
    <article style="background-image: url('images/articles/${element.page}.jpg')">
        <a href="articles/${element.page}.html">
            <h1>${element.titre}</h1>
            <p>
                ${element.description}
            </p>
        </a>
    </article>
    `
}

function ajouterArticle(e) {
    // Quand l'utilisateur rempli le formulaire et clique sur le bouton "Ajouter"
    e.preventDefault();
    const articleId = 2;
    
    monter(
        popup(
            'Succès', 
            `Votre article a bien été ajouté. <a class="link" href="articles/custom.html?id=${articleId}" target="_blank" rel="noreferrer">Afficher</a>`
    ));
}