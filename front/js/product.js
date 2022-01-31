//Récupération de l'ID dans l'url avec URLSearchParams.
var url = new URL(window.location.href);
var currentId = url.searchParams.get("id");

//Appel de l'API pour recevoir les données du produit possédant l'ID récupéré et ajout de ses valeurs dans le html.
fetch(`http://localhost:3000/api/products/${currentId}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    document.getElementById("title").textContent=value.name;
    document.getElementById("price").textContent=value.price;
    document.getElementById("description").textContent=value.description;
    let imageProduct = document.createElement("img");
    imageProduct.setAttribute("src",`${value.imageUrl}`);
    imageProduct.setAttribute("alt",`${value.altTxt}`);
    document.getElementsByClassName("item__img")[0].appendChild(imageProduct);
    let colorOptions = document.getElementById("colors");
    for (i in value.colors) {
        let newColor = document.createElement("option");
        newColor.setAttribute("value",value.colors[i]);
        newColor.textContent = value.colors[i];
        colorOptions.appendChild(newColor);
    }
})
.catch(function(err) {
    console.log(err)
});

//Fonction alerte choix après ajout au panier
function afterAdd() {
    if (confirm("Le produit a bien été ajouté a votre panier.\nVoulez-vous aller directement au panier?")) {
        window.location.href="../html/cart.html"
    } else {
        window.location.href="../html/index.html"
    }
}

//Ajout du produit au panier
function addToCart() {
    //Paramètres actuels du produit
    let currentProduct = {
        id : currentId,
        color : document.getElementById("colors").value,
        quantity : document.getElementById("quantity").value
    };
    let cart = [];
    //Alerte de non sélection de couleur et quantité
    if (currentProduct.color == "" || currentProduct.quantity <= 0 || currentProduct.quantity > 100) {
        alert("Veuillez sélectionner une couleur et une quantité");
        return
    }
    //Vérifie si il y a déja le produit dans le panier avec la même couleur pour ne modifier que la quantité
    if (sessionStorage.getItem("cart")) {
        cart = JSON.parse(sessionStorage.getItem("cart"));
        for (i in cart) {
            if (cart[i].id == currentProduct.id && cart[i].color == currentProduct.color) {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(currentProduct.quantity);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                afterAdd();
                return
            }
        };
    };
    if (currentProduct.color != "" && currentProduct.quantity > 0 && currentProduct.quantity < 101) {
        cart.push(currentProduct);
        sessionStorage.setItem("cart", JSON.stringify(cart))
        afterAdd();
    }
}

document.getElementById("addToCart").addEventListener("click", addToCart);
