var productCart=[];
var productWishlist=[];
/*Sticky Navbar*/
$(document).ready(function() {
  var $navbar = $("#mNavbar");

    $.getJSON("./Schema/productCollection.json",function(data){
        console.log(data);
    })
  AdjustHeader(); // Incase the user loads the page from halfway down (or something);
  $(window).scroll(function() {
      AdjustHeader();
  });

  function AdjustHeader(){
    if ($(window).scrollTop() > 196) {
      if (!$navbar.hasClass("navbar-fixed-top")) {
        $navbar.addClass("navbar-fixed-top");
      }
    } else {
      $navbar.removeClass("navbar-fixed-top");
    }
  }
});

//Function adding the product to cart
function addProduct(prodId){
    $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){

            for(d of data){
                if(d.id==prodId)
                    {
                        productCart.push(d);
                        console.log(productCart);
                        break;
                    }
                }
    }, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
    }
    });

}

//Function Loading the product
function loadProduct(){
    document.getElementById("Main").innerHTML="";
    jumbotron();
    for(d of productCart){
        console.log(d);
        $("#Main").append(`<div class="col-lg-4 col-md-4 col-xs-6">
        <div class=" text-center thumbnail">
            <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="./images/${d.category}/${d.image}" alt=""></a>
            <div class="caption">
                <div class="caption">
                    <h3>${d.name}</h3>
                    <p>Price: ${d.price}</p>
                    <a href="#" class="btn btn-danger btn-lg cartbtn" onClick="removeProductCart(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</a>
                    </div>
            </div>
        </div>
    </div> `);
    }
}

//Function removing product from cart
function removeProductCart(prodId){
        $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d in productCart){
                console.log("inside for")
                if(productCart[d].id==prodId)
                    {
                        console.log("inside if"+d)
                        productCart.splice(d,1);
                        cartPage();
                        console.log(productCart);
                        break;
                    }
                }
    }, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
    }
    });
}

//Function adding the product to wishlist
function addProductWishlist(prodId){
    $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d of data){
                if(d.id==prodId)
                    {
                        productWishlist.push(d);
                        console.log(productWishlist);
                        break;
                    }
                }
    }, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
    }
    });
}

// Function Reading productCollection.JSON
function readProductCollection(cat){
     $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d of data){
                if(d.category==cat)
                    {
                        $("#Main").append(`<div class="col-lg-3 col-md-4 col-xs-6">
            <div class=" text-center thumbnail">
                <a href="#" class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="./images/${d.category}/${d.image}" alt="" onclick="loadProduct(${d.id})"></a>
                    <div class="caption">
                        <h3>${d.name}</h3>
                        <p>Price: ${d.price}</p>
                        <button class="btn btn-info btn-lg cartbtn" onClick="addProduct(${d.id})"><span class="glyphicon glyphicon-shopping-cart" ></span> Add To Cart</button>
                        <button class="btn glyphicon glyphicon-heart wishlistbtn" onClick="addProductWishlist(${d.id})"></button>
                    </div>
            </div>
        </div> `);
            }
        }
    }, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
      }
    });
}

// Function rendering Html product page according to category clicked
function openProduct(evt, productName) {
    var i, x, tablinks;
    document.getElementById("wrapper").innerHTML="";
    var div1 = document.createElement("div");
    div1.setAttribute("id",productName);
    div1.setAttribute("class","w3-container city  w3-animate-right");
    wrapper.appendChild(div1);
    var div2 = document.createElement("div");
    div2.setAttribute("id","mySidenav");
    div2.setAttribute("class","sidenav");
    div1.appendChild(div2);
    var aTag1 = document.createElement("a");
    aTag1.setAttribute("href","javascript:void(0)");
    aTag1.setAttribute("class","closebtn");
    aTag1.setAttribute("onclick","closeNav()");
    aTag1.innerHTML="&times;"
    div2.appendChild(aTag1);
    var aTag2 = document.createElement("a");
    aTag2.setAttribute("href","#");
    aTag2.innerHTML="About";
    div2.appendChild(aTag2);
    var aTag3 = document.createElement("a");
    aTag3.setAttribute("href","#");
    aTag3.innerHTML="Service";
    div2.appendChild(aTag3);
    var aTag4 = document.createElement("a");
    aTag4.setAttribute("href","#");
    aTag4.innerHTML="Client";
    div2.appendChild(aTag4);
    var aTag5 = document.createElement("a");
    aTag5.setAttribute("href","#");
    aTag5.innerHTML="Contact";
    div2.appendChild(aTag5);
    var div3 = document.createElement("div");
    div1.appendChild(div3);
    div3.setAttribute("id","Main");
    var span = document.createElement("span");
    div3.appendChild(span);
    span.setAttribute("style","font-size:30px;cursor:pointer");
    span.setAttribute("onclick","openNav()");
    span.innerHTML="&#9776; Filter";
    var p = document.createElement("p");
    p.innerHTML=productName;
    div3.appendChild(p);
    readProductCollection(productName);
}

//Function for open sideNavbar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("Main").style.marginLeft = "250px";
}

// Function for closing sideNavbar
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("Main").style.marginLeft= "0";
}


//Reading Main category from JSON file and displaying in Navbar
$(document).ready(function(){
    $.getJSON("./Schema/categories.json",function(data){
        $.each(data.categories, function(i,category){
            var subjsondata='';
            $.each(category.sub_categories, function(i,sub_categories){
                subjsondata += "<li onClick=\"openProduct(event,'"+sub_categories.name+"')\"><a href=\"#\">"+sub_categories.name+"</a></li>";

            });
            if(subjsondata!="")
            {
                var jsondata ="<li class=\"tablink\" \"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">"+category.name+
                "</a><ul class=\"dropdown-menu\">"+subjsondata+"</ul></li>";
            }
            else{
                var jsondata ="<li class=\"tablink\" \"dropdown\" onClick=\"openProduct(event,'"+category.name+"')\"><a href=\"#\">"+category.name+
                "</a></li>";
            }
            $(jsondata).appendTo("#menu_ul");
        })
    })
  });

//Function displaying Home Page
function home(){
    document.getElementById("wrapper").innerHTML="";
   $("#wrapper").append(`<div class="fluid-container">
            <div id="feature-carousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#feature-carousel" data-slide-to="0" class="active"></li>
                  <li data-target="#feature-carousel" data-slide-to="1"></li>
                  <li data-target="#feature-carousel" data-slide-to="2"></li>
                  <li data-target="#feature-carousel" data-slide-to="3"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <a href="#">
                            <img class="img-responsive" src="images/Home/home10.jpg" alt="">
                        </a>
                        <div class="carousel-caption">
                        </div>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img class="img-responsive" src="images/Home/home12.png" alt="">
                        </a>
                        <div class="carousel-caption">
                        </div>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img class="img-responsive" src="images/Home/home1.jpg"
                                 alt="">
                        </a>
                        <div class="carousel-caption">
                        </div>
                    </div>
                    <div class="item">
                        <a href="#">
                            <img class="img-responsive" src="images/Home/home2.jpg"
                                 alt="">
                        </a>
                        <div class="carousel-caption">
                        </div>
                    </div>
                </div>
                <a class="left carousel-control" href="#feature-carousel" role="button" data-slide="prev">
                  <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#feature-carousel" role="button" data-slide="next">
                  <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div class="container">
        <div class="row page-intro">
            <div class="col-lg-12">
                <h3>Top Trending</h3>
            </div>
        </div>
        <div class="span9">
            <div class="well well-small">
                <h4>Featured Products <small class="pull-right">200+ Featured Products</small></h4>
                <div class="row-fluid">
                    <div id="featured" class="carousel slide" data-ride="carousel">
                         <div class="carousel-inner" role="listbox">
                            <div class="item active">
                                <div class="row">
                                    <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home21.jpg" alt="" style="max-width:100%;"></a></div>
                                    <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home22.jpg" alt="" style="max-width:100%;"></a></div>
                                    <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home23.jpg" alt="" style="max-width:100%;"></a></div>
                                    <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home24.jpg" alt="" style="max-width:100%;"></a></div>
                                </div>
                            </div>
                            <div class="item">
                            <div class="row">
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home25.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home26.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home27.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home28.jpg" alt="asia" style="max-width:100%;"></a></div>
                            </div>
                            </div>
                            <div class="item">
                            <div class="row">
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home29.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home30.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home31.jpg" alt="" style="max-width:100%;"></a></div>
                                <div class="col-md-3"><a href="#" class="thumbnil"><img src="images/Home/home32.jpg" alt="" style="max-width:100%;"></a></div>
                            </div>
                            </div>
                         </div>
                        <a class="left carousel-control" href="#featured" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" ></span>
                        </a>
                        <a class="right carousel-control" href="#featured" role="button" data-slide="next">
                          <span class="glyphicon glyphicon-chevron-right" ></span>
                        </a>
                </div>
            </div>
        </div>
    </div>`)
}

//Function to display jumbotron
function jumbotron(){
   $("#Above_nav").append(`<div class="jumbotron">
  			<div class="container text-center">
    			<h1>Online Store</h1>
    			<p>Mission, Vission & Values</p>
  			</div>
		</div>`)
}

//Function displaying product added to cart
function cartPage(){
    document.getElementById("Above_nav").innerHTML="";
    document.getElementById("Main").innerHTML="";
    jumbotron();
    for(d of productCart){
        console.log(d);
        $("#Main").append(`<div class="col-lg-4 col-md-4 col-xs-6">
        <div class=" text-center thumbnail">
            <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="./images/${d.category}/${d.image}" alt=""></a>
            <div class="caption">
                <div class="caption">
                    <h3>${d.name}</h3>
                    <p>Price: ${d.price}</p>
                    <a href="#" class="btn btn-danger btn-lg cartbtn" onClick="removeProductCart(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</a>
                    </div>
            </div>
        </div>
    </div> `);
    }
}


//Function displaying product added to cart
function wishlistPage(){
    document.getElementById("Main").innerHTML="";
    for(d of productWishlist){
        console.log(d);
        $("#Main").append(`<div class="col-lg-4 col-md-4 col-xs-6">
        <div class=" text-center thumbnail">
            <a href="#" class="d-block mb-4 h-100">
            <img class="img-fluid img-thumbnail" src="./images/${d.category}/${d.image}" alt=""></a>
            <div class="caption">
                <div class="caption">
                    <h3>${d.name}</h3>
                    <p>Price: ${d.price}</p>
                    <a href="#" class="btn btn-danger btn-lg cartbtn" onClick="removeProductCart(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</a>
                    </div>
            </div>
        </div>
    </div> `);
    }
}
