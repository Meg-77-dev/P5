function initProducts() {
    //création d'une constante contenant l'url de l'API
    const url = "http://localhost:3000/api/products";
    // Récupération les données de l'API grâce à une promesse 
    fetch(url)
        .then(reponse => reponse.json())
        .then(produits => affichKanap(produits));
}

//Afficher tous les canapés grâce à une boucle for
function affichKanap(kanap) {
    const kanaps = document.querySelector('#items');
    for (let i = 0; i < kanap.length; i++) {
        const produit = kanap[i];

        // Afficher le lien des canapés / balise a
        const liensKanap = document.createElement('a');
        liensKanap.setAttribute('href', "./product.html?id=" + produit._id);
        kanaps.appendChild(liensKanap);

        // Afficher les articles / balise article
        const article = document.createElement('article');
        liensKanap.appendChild(article);


        // Afficher les images / balise img
        const image = document.createElement('img');
        image.setAttribute('src', produit.imageUrl);
        image.setAttribute('alt', produit.altTxt);
        article.appendChild(image);

        // Afficher les noms des canapés dans un titre h3
        const name = document.createElement('h3');
        name.className = 'produitName';
        name.textContent = produit.name;
        article.appendChild(name);

        // Afficher les descriptions dans un p
        const description = document.createElement('p');
        description.className = 'produitdescription';
        description.textContent = produit.description;
        article.appendChild(description);
    }
}

initProducts();
