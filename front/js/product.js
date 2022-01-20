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

//Ajout du produit au panier
function addToCart() {
    //Paramètres actuels du produit
    let currentProduct = {
        id : currentId,
        color : document.getElementById("colors").value,
        amount : document.getElementById("quantity").value
    };
    let cart = [];
    //Vérifie si il y a déja le produit dans le panier avec la même couleur pour ne modifier que la quantité
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        for (i in cart) {
            if (cart[i].id == currentProduct.id && cart[i].color == currentProduct.color) {
                let newAmount = parseInt(cart[i].amount) + parseInt(currentProduct.amount);
                cart[i].amount = newAmount;
                localStorage.setItem("cart", JSON.stringify(cart));
                return
            }
        };
    };
    if (currentProduct.color != "" && currentProduct.amount > 0) {
        cart.push(currentProduct);
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

document.getElementById("addToCart").addEventListener("click", addToCart)