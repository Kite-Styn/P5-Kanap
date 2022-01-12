fetch("https://kite-styn.github.io/P5-Kanap/back/models/Product.js")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    for (i in value) {
        document.getElementById("items").innerHTML+='<a href="./product.html?id='+value[i]._id+'"><article><img src='+value[i].imageUrl+' alt='+value[i].altTxt+'/><h3 class="productName">'+value[i].name+'</h3><p class="productDescription">'+value[i].description+'</p></article></a>'
    }
})
/*
function rep() {
    document.getElementById("items").innerHTML='<a href="./product.html?id=42"><article><img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"/><h3 class="productName">Kanap name1</h3><p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a>'
};
rep()*/
