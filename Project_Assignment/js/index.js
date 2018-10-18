
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


function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-red";
}


function w3_open() {
  document.getElementById("main").style.marginLeft = "25%";
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}

function w3_MobileOpen() {
  document.getElementById("MobileMain").style.marginLeft = "25%";
  document.getElementById("MobileSidebar").style.width = "25%";
  document.getElementById("MobileSidebar").style.display = "block";
  document.getElementById("MobileOpenNav").style.display = 'none';
}
function w3_MobileClose() {
  document.getElementById("MobileMain").style.marginLeft = "0%";
  document.getElementById("MobileSidebar").style.display = "none";
  document.getElementById("MobileOpenNav").style.display = "inline-block";
}

function w3_MobileOpen() {
  document.getElementById("MobileMain").style.marginLeft = "25%";
  document.getElementById("MobileSidebar").style.width = "25%";
  document.getElementById("MobileSidebar").style.display = "block";
  document.getElementById("MobileOpenNav").style.display = 'none';
}
function w3_MobileClose() {
  document.getElementById("MobileMain").style.marginLeft = "0%";
  document.getElementById("MobileSidebar").style.display = "none";
  document.getElementById("MobileOpenNav").style.display = "inline-block";
}

function w3_ClothingOpen() {
  document.getElementById("ClothingMain").style.marginLeft = "25%";
  document.getElementById("ClothingSidebar").style.width = "25%";
  document.getElementById("ClothingSidebar").style.display = "block";
  document.getElementById("ClothingOpenNav").style.display = 'none';
}
function w3_ClothingClose() {
  document.getElementById("ClothingMain").style.marginLeft = "0%";
  document.getElementById("ClothingSidebar").style.display = "none";
  document.getElementById("ClothingOpenNav").style.display = "inline-block";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("watchesMain").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("watchesMain").style.marginLeft= "0";
}

function w3_ShoeOpen() {
  document.getElementById("ShoeMain").style.marginLeft = "25%";
  document.getElementById("ShoeSidebar").style.width = "25%";
  document.getElementById("ShoeSidebar").style.display = "block";
  document.getElementById("ShoeOpenNav").style.display = 'none';
}
function w3_ShoeClose() {
  document.getElementById("ShoeMain").style.marginLeft = "0%";
  document.getElementById("ShoeSidebar").style.display = "none";
  document.getElementById("ShoeOpenNav").style.display = "inline-block";
}



//Reading Main category from JSON file and displaying in Navbar

$(document).ready(function(){
    $.getJSON("./Schema/categories.json",function(data){
        console.log(data);
        $.each(data.categories, function(i,category){
            var subjsondata='';
            $.each(category.sub_categories, function(i,sub_categories){
                subjsondata += "<li>"+sub_categories.name+"</li>"
            });
            var jsondata ="<li class=\"tablink\" onClick=\"openCity(event,'"+category.name+"')\"><a href=\"#\">"+category.name+
                "</a></li>";
             console.log(jsondata);
$(jsondata).appendTo("#menu_ul");
        })
    })
})
