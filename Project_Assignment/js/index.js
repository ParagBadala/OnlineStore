var productCart=[];
var productWishlist=[];
/*Sticky Navbar*/
$(document).ready(function() {
  var $navbar = $("#mNavbar");
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
            var obj = {};
            for(d of data){
                if(d.id==prodId)
                    {
                        obj = d;
                        productCart.push(d);
                        alert("Product Added to Cart");
                        break;
                    }
            }
//            if(!productCart.indexOf(obj)){
//                productCart.push(obj);
//                alert("Product Added to Cart");
//            }
//            else{
//                alert("Poduct Already In Cart");
//            }
    }, // when it is successful at loading the JSON
    error: function(e){
        alert(e);
    }
    });

}

//Function Loading the product
function loadProduct(id){
    document.getElementById("Above_nav").innerHTML="";
    document.getElementById("Main").innerHTML="";
    jumbotron();
    $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d of data){
                console.log(d);
                if(d.id==id){
                    $("#Main").append(`<div class="card">
                  <img src="./images/${d.category}/${d.image}" alt=""           style="width:100%">
                 <h1>${d.name}</h1>
                 <p class="title">${d.description}</p>
                 <p>Price:${d.price}</p>
                 <p><button class="btn btn-info cart_btn">Add To Cart</button></p>
                 </div>`);
        }
    }
}, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
      }
    });
}

//Function removing product from cart
function removeProductCart(prodId){
        $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d in productCart){
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
    }, // what happens when it is successful at loading the JSON
    error: function(e){
        alert(e);
      }
    });
}

// Function rendering Html product page according to category clicked
function openProduct(evt, productName) {
    var company= new Set()
    document.getElementById("Above_nav").innerHTML="";
    document.getElementById("wrapper").innerHTML="";
    $("#wrapper").append(`<div id="productName" class="w3-container city  w3-animate-right">
                        <div id="mySidenav" class="sidenav">
                            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                            <a href="#">Brand</a>

                        </div>
                    </div>
                    <div id="Main">
                        <span style="font-size:30px;cursor:pointer; display:block" onclick="openNav()">&#9776; Filter</span>
                    </div>`);
     $.ajax({// calling the ajax object of jquery
        type: "GET",// we are going to be getting info from this data source
        url: "./Schema/productCollection.json",//the datasource
        dataType: "json",
        success: function(data){
            for(d of data){
                if(d.category==productName)
                {
                    company.add(d.company)
                }
            }
            for(d of company){
                        $("#mySidenav").append(`<div class="checkbox">
                        <label><input type="checkbox" value="">${d}</label>
                        </div>`)
                        readProductCollection(productName);
            }

    }, // what happens when it is successful at loading the XML
    error: function(e){
        alert(e);
      }
    });
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
    document.getElementById("Above_nav").innerHTML="";
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
    if(productCart.length==0){
            $("#Main").append(`<div class="jumbotron">
                <div class="container text-center">
                    <h1>Cart is Empty</h1>
                    <a href="#" class="btn btn-danger" onClick="home()"><span class="glyphicon glyphicon-home" ></span> Back To Home</a>
                     </div>
                </div>`)
        }
    else{
        for(d of productCart){
            console.log(d);
            $("#Main").append(`<div class="col-lg-3 col-md-4 col-xs-6">
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
}


//Function displaying product added to cart
function wishlistPage(){
    document.getElementById("Above_nav").innerHTML="";
    document.getElementById("Main").innerHTML="";
    for(d of productWishlist){
        $("#Main").append(`<div class="col-lg-3 col-md-4 col-xs-6">
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

//Function displaying Login Page
function login(){
    document.getElementById("Above_nav").innerHTML="";
    document.getElementById("Main").innerHTML="";
    $("#Main").append(` <div class="container" style="margin-top:40px">
		<div class="row">
			<div class="col-sm-6 col-md-4 col-md-offset-4">
				<div class="panel panel-default">
					<div class="panel-heading">
						<strong>Admin LogIn</strong>
					</div>
					<div class="panel-body">
						<form role="form">
							<fieldset>
								<div class="row">
									<div class="center-block">
										<img class="profile-img"
											src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt="">
									</div>
								</div>
								<div class="row">
									<div class="col-sm-12 col-md-10  col-md-offset-1 ">
										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon">
													<i class="glyphicon glyphicon-user"></i>
												</span>
												<input class="form-control" placeholder="Username" name="loginname" type="text" id="uname" autofocus>
											</div>
										</div>
										<div class="form-group">
											<div class="input-group">
												<span class="input-group-addon">
													<i class="glyphicon glyphicon-lock"></i>
												</span>
												<input class="form-control" placeholder="Password" name="password" type="password" id="pword" value="">
											</div>
										</div>
										<div class="form-group">
											<input type="button" class="btn btn-lg btn-primary btn-block" value="Log in" onclick="addCategory()">
										</div>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
					<div class="panel-footer ">
				        Authorized Used Only
					</div>
                </div>
			</div>
		</div>
	</div>
`);
}

//Function to add category
function addCategory(){
    var uname = document.getElementById("uname").value;
    var pass = document.getElementById("pword").value;
    console.log(uname,pass);
    if(uname=="admin" && pass=="admin"){
        document.getElementById("Above_nav").innerHTML="";
        document.getElementById("Main").innerHTML="";
        $("#Main").append(`<div class="container">
        <h2>CRUD Operation</h2>
        <div class="panel panel-primary">
            <div class="panel-heading">
                <ul class="nav nav-tabs">
                    <li><a data-toggle="tab" href="#add">Add</a></li>
                    <li><a data-toggle="tab" href="#delete">Delete</a></li>
                </ul>
            </div>
            <div class="panel-body">
              <div class="tab-content">
                <div id="add" class="tab-pane fade in active">
                  <h3>Add</h3>
                </div>
                <div id="delete" class="tab-pane fade">
                  <h3>DELETE</h3>
                </div>
              </div>
            </div>
            <div class="panel-footer">Authorized Person </div>
        </div>
    </div>
    `)
  }
}
