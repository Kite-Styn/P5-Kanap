let cart = [];
cart = JSON.parse(sessionStorage.getItem("cart"));

let currentProduct = {

};
//let ind = 0;

function displayProduct(value) {
    currentProduct = cart[i];
    //ind += 1;
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

function totalQuantity() {
    let totalQty = 0;
    let numbers = document.querySelectorAll(".itemQuantity");
    console.log(numbers.length);
    for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i].value;
        totalQty += parseInt(value);
        console.log(totalQty)
    };
    console.log(totalQty);
    document.querySelector("#totalQuantity").textContent = totalQty;
}

function calculateTotal() {
    let cartProducts = document.querySelectorAll(".cart__item");
    let totalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        let price = document.querySelectorAll(".cart__item__content__description")[i].lastChild.textContent;
        let qty = document.querySelectorAll(".itemQuantity")[i].value;
        totalPrice += parseInt(price) * parseInt(qty);
        console.log(totalPrice);
    }
    document.querySelector("#totalPrice").textContent = totalPrice;
}

function storeNewCart() {
    cartLength = cart.length;
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
        console.log(updateProduct.id)
    };
    console.log(cart);
    sessionStorage.setItem("cart", JSON.stringify(cart))
}

function dynamicChange() {
    for (let i = 0; i < cart.length; i++) {
        document.querySelectorAll(".itemQuantity")[i].addEventListener("change", function() {
        totalQuantity();
        calculateTotal();
        storeNewCart()
        })
    }
}

async function display() {
    for (i in cart) {
        let data = await fetch(`http://localhost:3000/api/products/${cart[i].id}`);
        if (!data.ok) {
            throw new Error(message);
        }
        let value = await data.json();
        displayProduct(await value);
        console.log(currentProduct);
        console.log(value)
    }
    totalQuantity();
    calculateTotal();
    dynamicChange()
}
display();

//totalQuantity();

//displayProduct();

/*Alt?
for (i in cart) {
    fetch(`http://localhost:3000/api/products/${cart[i].id}`)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        //currentProduct = cart[i];
        //console.log(currentProduct);
        displayProduct(value);
        console.log(value)
    })
    .catch(function(err) {
        console.log(err)
    });
}
function displayCart() {
    for (i in cart) {
    currentProduct = cart[i];
    let target = document.querySelectorAll(".cart__item");
    console.log(target);
    target[i].setAttribute("data-color",currentProduct.color);
    target = document.querySelectorAll(".cart__item__content__description p");
    target[i].textContent = currentProduct.color;
    target = document.querySelectorAll(".cart__item__content__settings__quantity input");
    target[i].setAttribute("value",currentProduct.quantity);
}
}
displayCart()
*/