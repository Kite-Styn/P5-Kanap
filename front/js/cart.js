let cart = [];
cart = JSON.parse(sessionStorage.getItem("cart"));



//let currentId = "107fb5b75607497b96722bda5b504926";

function displayProduct(value) {
    let newTag = document.createElement("article");
    newTag.setAttribute("class","cart__item");
    newTag.setAttribute("data-id",value._id);
    newTag.setAttribute("data-color",cart[i].color);
    document.querySelector("#cart__items").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__img");
    document.querySelector(".cart__item").appendChild(newTag);
    newTag = document.createElement("img");
    newTag.setAttribute("src",value.imageUrl);
    newTag.setAttribute("alt",value.altTxt);
    document.querySelector(".cart__item__img").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content");
    document.querySelector(".cart__item").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__description");
    document.querySelector(".cart__item__content").appendChild(newTag);
    newTag = document.createElement("h2");
    newTag.textContent = value.title;
    document.querySelector(".cart__item__content__description").appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = cart[i].color;
    document.querySelector(".cart__item__content__description").appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = `${value.price} €`;
    document.querySelector(".cart__item__content__description").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings");
    document.querySelector(".cart__item__content").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings__quantity");
    document.querySelector(".cart__item__content__settings").appendChild(newTag);
    newTag = document.createElement("p");
    newTag.textContent = "Qté : ";
    document.querySelector(".cart__item__content__settings__quantity").appendChild(newTag);
    newTag = document.createElement("input");
    newTag.setAttribute("type","number");
    newTag.setAttribute("class","itemQuantity");
    newTag.setAttribute("name","itemQuantity");
    newTag.setAttribute("min",1);
    newTag.setAttribute("max",100);
    newTag.setAttribute("value",cart[i].quantity);
    document.querySelector(".cart__item__content__settings__quantity").appendChild(newTag);
    newTag = document.createElement("div");
    newTag.setAttribute("class","cart__item__content__settings__delete");
    document.querySelector(".cart__item__content__settings").appendChild(newTag);
    newTag = document.createElement("p");
    newTag.setAttribute("class","deleteItem");
    newTag.textContent = "Supprimer";
    document.querySelector(".cart__item__content__settings__delete").appendChild(newTag);
}

for (i in cart) {
    fetch(`http://localhost:3000/api/products/${cart[i].id}`)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        displayProduct(value);
        console.log(value)
    })
    .catch(function(err) {
        console.log(err)
    });
}






//displayProduct();