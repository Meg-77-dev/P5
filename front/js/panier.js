//panier dans le localStorage initial 
const panierLocalStorageInitial = JSON.parse(localStorage.getItem("cart"));
console.log(panierLocalStorageInitial)
//Nouveau LS avec le prix
const panierLocalStorage = JSON.parse(localStorage.getItem("cart"));
console.log(panierLocalStorage)

async function fetchPanier(i) {
    return await fetch("http://localhost:3000/api/products/" + panierLocalStorage[i].id)
        .then((response) => response.json())
        .then((dataAPI) => AffichPanier(dataAPI, i));
}

function calculPrix() {
    //Total
    let totalPrice = 0;
    let totalQuantity = 0;
    //Calcul nombre de canapés 
    for (const kanap of panierLocalStorage) {
        totalQuantity += Number(kanap.quantity)
        totalPrice += Number(kanap.quantity) * Number(kanap.price);
    }

    //Afficher le prix total du panier
    const selectTotalPrice = document.querySelector("#totalPrice")
    selectTotalPrice.textContent = totalPrice;
    //Afficher le nombre d'articles dans le panier 
    const selectTotalQuant = document.querySelector("#totalQuantity")
    selectTotalQuant.textContent = totalQuantity

}

function AffichPanier(dataAPI, i) {
    panierLocalStorage[i].price = dataAPI.price
    //Création de la balise article
    const article = document.createElement("article");
    document.querySelector("#cart__items").appendChild(article);
    article.className = "cart__item";
    article.setAttribute('data-id', panierLocalStorage[i].id);
    article.setAttribute('data-color', panierLocalStorage[i].color);


    //Création de la balise div contenant l'image 
    const divImage = document.createElement("div");
    divImage.className = "cart__item__img";
    article.appendChild(divImage);


    //Création de la balise image
    const image = document.createElement("img");
    image.src = dataAPI.imageUrl;
    image.alt = dataAPI.altTxt;
    divImage.appendChild(image);

    //Création de la div cart__item__content contenant tous les éléments de la balise article
    const divItemContent = document.createElement("div");
    article.appendChild(divItemContent);
    divItemContent.className = "cart__item__content";

    //Création de la div cart__item__content__description
    const divItemContentDescript = document.createElement("div");
    divItemContent.appendChild(divItemContentDescript);
    divItemContentDescript.className = "cart__item__content__description";

    //Création du titre h2 
    const NomKanap = document.createElement("h2");
    divItemContentDescript.appendChild(NomKanap);
    NomKanap.textContent = dataAPI.name;

    //Création de la balise paragraphe contenant la couleur du canapé
    const colorSelect = document.createElement("p");
    divItemContentDescript.appendChild(colorSelect);
    colorSelect.textContent = panierLocalStorage[i].color

    //Création de la balise paragraphe contenant le prix
    const price = document.createElement("p");
    divItemContentDescript.appendChild(price);
    price.textContent = dataAPI.price + "€ (prix unitaire)"

    //Création de la div cart__item__content__settings
    const divItemContentSet = document.createElement("div");
    divItemContent.appendChild(divItemContentSet);
    divItemContentSet.className = "cart__item__content__settings";

    //Création de la div cart__item__content__settings__quantity contenant la balise paragraphe qui contiendra la quantité
    const divSettingsQuant = document.createElement("div");
    divItemContentSet.appendChild(divSettingsQuant);
    divSettingsQuant.className = "cart__item__content__settings__quantity";

    //Création de la balise paragraphe contenant la quantité 
    const quant = document.createElement("p");
    divSettingsQuant.appendChild(quant);
    quant.textContent = "Qté :", panierLocalStorage[i].quantity;

    //Création de la balise input qui permettra de changer la quantité
    const inputQuant = document.createElement("input");
    divSettingsQuant.appendChild(inputQuant);
    inputQuant.className = "itemQuantity";
    inputQuant.setAttribute("type", 'Number');
    inputQuant.setAttribute("name", "itemQuantity");
    inputQuant.setAttribute("min", "1");
    inputQuant.setAttribute("max", "100");
    inputQuant.setAttribute("value", panierLocalStorage[i].quantity)

    //Modifier la quantité dans le input du panier
    inputQuant.addEventListener("change", () => {
        //Récupérer l'élément parent
        const kanapInputModif = inputQuant.closest("article")
        console.log(kanapInputModif)
        //vérifier si le canapé existe dans le localStorage avec l'id et la couleur 
        const inputModif = panierLocalStorage.find((kanap) => kanap.id == kanapInputModif.dataset.id && kanap.color == kanapInputModif.dataset.color);
        console.log(inputModif)

        //Modifier la quantité dans l'input
        if (inputModif) {
            const NouvelQuant = inputModif.quantity = inputQuant.value
            console.log(NouvelQuant)
            inputModif.quantity = NouvelQuant
            localStorage.setItem("cart", JSON.stringify(panierLocalStorage))
            //si la nouvelle quantité n'est entre 1 et 100
            if (NouvelQuant < 1 || NouvelQuant > 100) {
                alert("Veuillez selectionner une quantité entre 1 et 100")
            }
        }
        calculPrix()

    })

    //Création de la div cart__item__content__settings__delete contenant la balise paragraphe qui permettra de supprimer un canapé
    const divSettingsSuppr = document.createElement("div");
    divItemContentSet.appendChild(divSettingsSuppr);
    divSettingsSuppr.className = "cart__item__content__settings__delete";

    //Création de la balise paragraphe qui permettra de supprimer un canapé
    const deleteItem = document.createElement("p");
    divSettingsSuppr.appendChild(deleteItem);
    deleteItem.className = "deleteItem";
    deleteItem.textContent = "Supprimer";


    // Suppression d'un canapé au click sur supprimer 
    deleteItem.addEventListener("click", () => {
        confirm("Voulez-vous vraiment supprimer le canapé du panier ?")
        //Récupérer l'élément parent
        const kanapDelete = deleteItem.closest("article")
        //vérifier avec l'id et la couleur qu'il s'agit du bon canapé 
        const bonKanapDelete = panierLocalStorage.findIndex((kanap) => kanap.id == kanapDelete.dataset.id && kanap.color == kanapDelete.dataset.color);
        console.log(bonKanapDelete);
        if (bonKanapDelete !== -1) {
            //Supprimer l'affichage de l'article
            kanapDelete.remove();
            //Supprimer l'article du localStorage
            panierLocalStorage.splice(bonKanapDelete, 1);
            //Mettre à jour le localStorage 
            localStorage.setItem("cart", JSON.stringify(panierLocalStorage));
            //Rafraîchir la page
            window.location.reload()

            calculPrix()
        }

    })
}

async function main() {
    //si le localStorage est vide afficher une alerte "Votre panier est vide"
    if (panierLocalStorageInitial == 0) {
        alert("Votre panier est vide");
    }
    else {
        const cart = [];
        //Ajouter le contenu du localstorage dans le tableau cart
        cart.push(panierLocalStorageInitial)
        const itemCart = document.querySelector("#cart__items");
        const selectTotalQuant = document.querySelector("#totalQuantity")
        const selectTotalPrice = document.querySelector("#totalPrice")

        for (let i = 0; i < panierLocalStorage.length; i++) {

            await fetchPanier(i)
        }
        //Supprimer le prix du localStorageInitial
        for (let p = 0; p < panierLocalStorage.length; p++) {
            delete panierLocalStorageInitial[p].price
        }
        calculPrix()
    }
}
main();

//formulaire de commande 
function soumettreForm() {
    const form = document.querySelector(".cart__order__form")
    console.log(form)
}
//selectionner le bouton commander
const btnOrder = document.querySelector("#order")
btnOrder.addEventListener("click", (event) =>  {
    event.preventDefault()
    //Tous les querySelector des inputs du formulaire 
    const inputfirstName = document.querySelector("#firstName")
    const inputlastName = document.querySelector("#lastName")
    const inputaddress = document.querySelector("#address")
    const inputcity = document.querySelector("#city")
    const inputemail = document.querySelector("#email")

    //Tableau pour récupérer les id des canapés présents dans le LocalStorage 
    const objetContact = [];
    for (let c = 0; c < panierLocalStorageInitial.length; c++) {
        objetContact.push(panierLocalStorageInitial[c].id)
        console.log(objetContact)
    }

    //constante qui contiendra le contenu du formulaire de contact et l'id de chaque canapé du panier
        const contact =  {
            firstName: inputfirstName.value,
            lastName: inputlastName.value,
            address: inputaddress.value,
            city: inputcity.value,
            email: inputemail.value,
        };
        const products = objetContact

        const contenuForm = {
            contact, 
            products,
        }
    console.log(contenuForm)
    //Requête POST
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body:
            JSON.stringify(contenuForm)
    })
        .then(reponse => reponse.json())
        .then(dataForm => console.log(dataForm));
})




