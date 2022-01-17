//Récupération de l'ID dans l'url avec URLSearchParams.
var url = new URL(window.location.href);
var currentId = url.searchParams.get("id");
document.getElementById("title").innerHTML=currentId;

/* Alt
var url = new URL(window.location.href);
var search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
var currentId = search_params.get("id");
};
document.getElementById("price").innerHTML=currentId;
*/

//Appel de l'API pour recevoir les données du produit possédant l'ID récupéré et ajout de ses valeurs dans le html.
fetch(`http://localhost:3000/api/products/${currentId}`)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    document.getElementById("price").innerHTML=value.price;
    /*var currentIndex = value.findIndex(i => i._id === currentId);
    var currentProduct = value[currentIndex];
    document.getElementById("price").innerHTML=currentIndex;*/
    /* Alt
    for(var i = 0; i < value.length; i++) {
        if (value[i]._id === currentId) {
            var currInd = i;
            document.getElementById("price").innerHTML=currInd;
            break;
        }
    }
    */
})
