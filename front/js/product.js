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

fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(value) {
    var currentIndex = value.findIndex(i => i._id === currentId);
    var currentProduct = value[currentIndex];
    document.getElementById("price").innerHTML=currentIndex;
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
