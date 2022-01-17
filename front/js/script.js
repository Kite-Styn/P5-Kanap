//Appel de l'API pour recevoir et insérer les produits dans le html avec une boucle for in.
let api="http://localhost:3000/api/products"
fetch(api)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    let items = document.getElementById("items");
    let content = "";
    for (i in value) {
        content+='<a href="./product.html?id='+value[i]._id+'"><article><img src='+value[i].imageUrl+' alt='+value[i].altTxt+'/><h3 class="productName">'+value[i].name+'</h3><p class="productDescription">'+value[i].description+'</p></article></a>'
    };
    items.innerHTML = content;
})
/*
function rep() {
    document.getElementById("items").innerHTML='<a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"/><h3 class="productName">Kanap name1</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>'
};
rep()*/