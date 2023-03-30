// Recuperation des paramètres de l'url pour relier l'id correspond au canapé
const url = new URLSearchParams(window.location.search);
const id = url.get("id");

function fetchProduct() {
  //Requête API pour récupérer les données 
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(reponse => reponse.json())
    .then(data => affichData(data));
}
function affichData(kanap) {

  // Les constantes qui récupèrent les données
  const imageUrl = kanap.imageUrl;
  const altTxt = kanap.altTxt;
  const name = kanap.name;
  const price = kanap.price;
  const description = kanap.description;
  const colors = kanap.colors;

  //Les constantes qui font appel aux fonctions 
  const image = addImage(imageUrl, altTxt);
  const title = addTitle(name);
  const prix = addPrice(price);
  const descriptionKanap = addDescription(description);
  const couleursKanap = choiceColors(colors);

  addToCart();
}
//Afficher l'image du canapé 
function addImage(imageUrl, altTxt) {
  const itemImg = document.querySelector(".item__img");
  const image = document.createElement("img");
  image.src = imageUrl
  image.alt = altTxt
  itemImg.appendChild(image);
}
//Afficher le nom du canapé 
function addTitle(name) {
  const h1Title = document.querySelector("#title");
  h1Title.textContent = name
}
//Afficher le prix du canapé
function addPrice(price) {
  const spanPrice = document.querySelector("#price");
  spanPrice.textContent = price
}
//Afficher la description du canapé
function addDescription(description) {
  const paragraphedescription = document.querySelector("#description");
  paragraphedescription.textContent = description
}
//Afficher les couleurs disponibles
function choiceColors(colors) {
  const colorselect = document.querySelector("#colors");
  //La méthode forEach affiche chaque couleur du array colors
  colors.forEach(color => {
    const option = document.createElement("option");
    option.value = color
    option.textContent = color
    colorselect.appendChild(option);
  })
}
function addToCart() {

  //Constante permettant de selectionner le bouton Ajouter au panier
  const btnAjoutPanier = document.querySelector("#addToCart")
  // addEventListener indique qu'un événement doit être écouté sur le bouton Ajouter au panier au click
  btnAjoutPanier.addEventListener("click", () => {
    //Constantes permettant de selectionner la couleur et la quantité
    const color = document.querySelector("#colors").value
    const quantity = +document.querySelector("#quantity").value;
    if (color === '' || quantity < 1 || quantity > 100) {
      alert("Veuillez selectionner une couleur et une quantité valide")
    }
    else {
      const contenuPanier = {
        id,
        color,
        quantity
      };
      console.log(contenuPanier);

      //La variable contenant le localStorage
      let kanapdansLS = JSON.parse(localStorage.getItem("cart"))
      alert("Le canapé a été ajouté au panier")
      //Si la clé existe
      if (kanapdansLS) {
        console.log(kanapdansLS)
       //Vérifier si l'id et la couleur sont déjà présents dans le localStorage
        let kanap = kanapdansLS.find((kanap) => kanap.id == contenuPanier.id && kanap.color == contenuPanier.color);
        //si l'id et la couleur existe dans le localStorage
        if (kanap) {
          //Si ils existent on ajoute la nouvelle quantité à l'ancienne
          const NouvelQuant = kanap.quantity + contenuPanier.quantity;
          console.log(NouvelQuant)
          kanap.quantity = NouvelQuant
          localStorage.setItem("cart", JSON.stringify(kanapdansLS))
        }
        //si l'id et la couleur n'existe pas on les pousses dans le localStorage
        if (kanap === undefined) {
          kanapdansLS.push(contenuPanier)
          localStorage.setItem("cart", JSON.stringify(kanapdansLS));
          console.log(kanapdansLS)
        }
      }
      else {
        //Sinon créer un tableau dans lequel on pousse les données selectionnées 
        kanapdansLS = [];
        kanapdansLS.push(contenuPanier)
        localStorage.setItem("cart", JSON.stringify(kanapdansLS));
        console.log(kanapdansLS)
      }
    }
  })
}

fetchProduct()

