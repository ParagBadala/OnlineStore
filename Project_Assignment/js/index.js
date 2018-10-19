
/*Sticky Navbar*/
$(document).ready(function() {
  var $navbar = $("#mNavbar");

  AdjustHeader(); // Incase the user loads the page from halfway down (or something);
  $(window).scroll(function() {
      AdjustHeader();
  });

  function AdjustHeader(){
    if ($(window).scrollTop() > 198) {
      if (!$navbar.hasClass("navbar-fixed-top")) {
        $navbar.addClass("navbar-fixed-top");
      }
    } else {
      $navbar.removeClass("navbar-fixed-top");
    }
  }
});


// Function rendering Html product page according to category clicked
function openCity(evt, cityName) {
    var i, x, tablinks;
    document.getElementById("wrapper").innerHTML="";
    var div1 = document.createElement("div");
    div1.setAttribute("id",cityName);
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
    p.innerHTML=cityName;
    div3.appendChild(p);

//
//  x = document.getElementsByClassName("city");
//  for (i = 0; i < x.length; i++) {
//      x[i].style.display = "none";
//  }
//  tablinks = document.getElementsByClassName("tablink");
//  for (i = 0; i < x.length; i++) {
//      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
//  }
//  document.getElementById(cityName).style.display = "block";
//  evt.currentTarget.className += " w3-red";
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
                subjsondata += "<li onClick=\"openCity(event,'"+sub_categories.name+"')\"><a href=\"#\">"+sub_categories.name+"</a></li>";

            });
            if(subjsondata!="")
            {
                var jsondata ="<li class=\"tablink\" \"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">"+category.name+
                "</a><ul class=\"dropdown-menu\">"+subjsondata+"</ul></li>";
            }
            else{
                var jsondata ="<li class=\"tablink\" \"dropdown\" onClick=\"openCity(event,'"+category.name+"')\"><a href=\"#\">"+category.name+
                "</a></li>";
            }
            $(jsondata).appendTo("#menu_ul");
        })
    })
})
