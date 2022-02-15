let cart = [];
cart = JSON.parse(sessionStorage.getItem("cart"));

let currentProduct = {

};

//Ajoute le html avec les valeurs retournées par fetch
function displayProduct(value) {
    currentProduct = cart[i];
    let newTag = document.createElement("article");
    newTag.setAttribute("class","cart__item");
    newTag.setAttribute("data-id",value._id);
    newTag.setAttribute("data-color",currentProduct.color);
    let target = document.querySelector("#cart__items");
    target.appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__img");
    target = document.querySelectorAll(".cart__item");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("img");
    newTag.setAttribute("src",value.imageUrl);
    newTag.setAttribute("alt",value.altTxt);
    target = document.querySelectorAll(".cart__item__img");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content");
    target = document.querySelectorAll(".cart__item");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__description");
    target = document.querySelectorAll(".cart__item__content");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("h2");
    newTag.textContent = value.name;
    target = document.querySelectorAll(".cart__item__content__description");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = currentProduct.color;
    target = document.querySelectorAll(".cart__item__content__description");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = `${value.price} €`;
    target = document.querySelectorAll(".cart__item__content__description");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings");
    target = document.querySelectorAll(".cart__item__content");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings__quantity");
    target = document.querySelectorAll(".cart__item__content__settings");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = "Qté : ";
    target = document.querySelectorAll(".cart__item__content__settings__quantity");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("input");
    newTag.setAttribute("type","number");
    newTag.setAttribute("class","itemQuantity");
    newTag.setAttribute("name","itemQuantity");
    newTag.setAttribute("min",1);
    newTag.setAttribute("max",100);
    newTag.setAttribute("value",currentProduct.quantity);
    target = document.querySelectorAll(".cart__item__content__settings__quantity");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings__delete");
    target = document.querySelectorAll(".cart__item__content__settings");
    target[target.length-1].appendChild(newTag);
    newTag = document.createElement("p");
    newTag.setAttribute("class","deleteItem");
    newTag.textContent = "Supprimer";
    target = document.querySelectorAll(".cart__item__content__settings__delete");
    target[target.length-1].appendChild(newTag);
}

//Calcule la quantité totale des produits dans le panier
function totalQuantity() {
    let totalQty = 0;
    let numbers = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i].value;
        totalQty += parseInt(value);
    };

    document.querySelector("#totalQuantity").textContent = totalQty;
}

//Calcule le prix total des produits dans le panier
function totalPrice() {
    let cartProducts = document.querySelectorAll(".cart__item");
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        let price = document.querySelectorAll(".cart__item__content__description")[i].lastChild.textContent;
        let qty = document.querySelectorAll(".itemQuantity")[i].value;
        totalPrice += parseInt(price) * parseInt(qty);
    }
    document.querySelector("#totalPrice").textContent = totalPrice;
}

//Remplace les données stockées par celles de la page
function storeNewCart(length) {
    let cartLength = length;
    cart = [];
    for (let i = 0; i < cartLength; i++) {
        let updateProduct = {
            id : "",
            color : "",
            quantity : ""
        };
        updateProduct.id = document.querySelectorAll(".cart__item")[i].dataset.id;
        updateProduct.color = document.querySelectorAll(".cart__item")[i].dataset.color;
        updateProduct.quantity = document.querySelectorAll(".itemQuantity")[i].value;
        cart.push(updateProduct);
    };
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

//Supprime un produit du panier et lance les fonctions de recalcul et de stockage
function removeFromCart() {
    let cartLength = cart.length;
    for (let i = 0; i < cartLength; i++) {
        document.querySelectorAll(".deleteItem")[i].addEventListener("click", function() {
            let elt = document.querySelectorAll(".deleteItem")[i].closest(".cart__item");
            elt.remove();
            storeNewCart(cart.length-1);
            totalQuantity();
            totalPrice()
        })
    }
    
}

//Reaction dynamique à la modification ou suppression des produits
function dynamicChange() {
    for (let i = 0; i < cart.length; i++) {
        document.querySelectorAll(".itemQuantity")[i].addEventListener("input", function() {
        totalQuantity();
        totalPrice();
        storeNewCart(cart.length)
        })
    }
    removeFromCart()
}

//Affichage des produits du panier
async function display() {
    if (document.getElementById("cart__items") != null && cart != null) {
        for (i in cart) {
            let data = await fetch(`http://localhost:3000/api/products/${cart[i].id}`);
            if (!data.ok) {
                throw new Error(message);
            }
            let value = await data.json();
            displayProduct(value);
        }
        totalQuantity();
        totalPrice();
        dynamicChange()
    }
}
display();

const regexName = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.,\d\s]+$/;
const regexAddress = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.]+$/;
const regexCity = /^[^±!@£$%^&*_+¡€#¢§¶•ªº()"«\\/\{\}\[\]\~<>?:;|=.\d]+$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/;

let validFirstName = false;
let validLastName = false;
let validAddress = false;
let validCity = false;
let validEmail = false;

let contact = {
    firstName : "",
    lastName : "",
    address : "",
    city : "",
    email : ""
};

let products = [];

//Gère la validité des données entrées dans le formulaire
function formValidity() {
    if (document.getElementById("cart__items") != null) {
        document.getElementById("firstName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("firstNameErrorMsg").textContent = "";
                validFirstName = true
            } else {
                document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide";
                validFirstName = false
            }
        });
        document.getElementById("lastName").addEventListener("input", function(e) {
            if (regexName.test(e.target.value) && e.target.value != "") {
                document.getElementById("lastNameErrorMsg").textContent = "";
                validLastName = true
            } else {
                document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide";
                validLastName = false
            }
        });
        document.getElementById("address").addEventListener("input", function(e) {
            if (regexAddress.test(e.target.value) && e.target.value != "") {
                document.getElementById("addressErrorMsg").textContent = "";
                validAddress = true
            } else {
                document.getElementById("addressErrorMsg").textContent = "Veuillez entrer une addresse valide";
                validAddress = false
            }
        });
        document.getElementById("city").addEventListener("input", function(e) {
            if (regexCity.test(e.target.value) && e.target.value != "") {
                document.getElementById("cityErrorMsg").textContent = "";
                validCity = true
            } else {
                document.getElementById("cityErrorMsg").textContent = "Veuillez entrer une ville valide";
                validCity = false
            }
        });
        document.getElementById("email").addEventListener("input", function(e) {
            if (regexEmail.test(e.target.value) && e.target.value != "") {
                document.getElementById("emailErrorMsg").textContent = "";
                validEmail = true
            } else {
                document.getElementById("emailErrorMsg").textContent = "Veuillez entrer une addresse email valide";
                validEmail = false
            }
        })
    }
}
formValidity();

//Enregistre les données contact si les champs sont bien remplis
function confirmForm() {
    if (validFirstName == true && validLastName == true && validAddress == true && validCity == true && validEmail == true) {
        contact.firstName = document.getElementById("firstName").value;
        contact.lastName = document.getElementById("lastName").value;
        contact.address = document.getElementById("address").value;
        contact.city = document.getElementById("city").value;
        contact.email = document.getElementById("email").value;
    } else {
        alert("Veuillez correctement remplir tous les champs du formulaire")
    }
}

//Liste les id des produits dans le panier
function confirmProducts() {
    products = [];
    for (i in cart) {
        products.push(cart[i].id)
    }
}

//Envoie les détails de la commande à l'Api
function confirmApi() {
    if (contact.firstName !== "" && products.length > 0) {
        let order = {
            contact,
            products
        };
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(order)
        })
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
        })
        .then(function(value) {
            sessionStorage.removeItem("cart");
            window.location.href=`../html/confirmation.html?order_id=${value.orderId}`
        })
        .catch(function(err) {
            console.log(err)
        });
    }
}

//Ecoute le clique du bouton commander et lance les autres fonctions
function confirmPurchase() {
    if (document.getElementById("cart__items") != null) {
        const confirm = document.getElementById("order");
        confirm.addEventListener("click", function(e) {
            e.preventDefault();
            if (cart == null) {
                alert("Le panier est vide");
                return
            }
            confirmForm();
            confirmProducts();
            confirmApi()
        })
    }
}
confirmPurchase();

//Insère l'id de commande dans la page confirmation
function insertOrderId() {
    var url = new URL(window.location.href);
    var orderId = url.searchParams.get("order_id");
    let orderIdSpan = document.getElementById("orderId");
    if (orderIdSpan != null) {
        orderIdSpan.textContent = orderId;
    }
}
insertOrderId();
