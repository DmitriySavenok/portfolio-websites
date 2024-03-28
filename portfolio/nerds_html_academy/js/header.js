function headerMenuToggle() {
  var headerMenu = document.getElementById("header__menu");
  var headerMenuButton = document.getElementById("header__button-toggle");
  var menuOpen = headerMenuButton.classList.contains("menu-icon");

  headerMenu.classList.toggle("open-menu");

  if(menuOpen == true) {
    headerMenuButton.classList.remove("menu-icon");
    headerMenuButton.classList.add("close-icon");
  } if(menuOpen == false) {
    headerMenuButton.classList.remove("close-icon");
    headerMenuButton.classList.add("menu-icon");
  }
}

function headerMenuActiveLink() {
  var bodyClass = document.getElementById("body").classList.item(0);

  switch(bodyClass) {
    case 'index-page':
      var indexLink = document.getElementById("index-link");
      indexLink.classList.add("active-link");
      break;
    case 'catalog-page':
      var catalogLink = document.getElementById("catalog-link");
      catalogLink.classList.add("active-link");
      break;
    case 'shopping-cart':
      var shoppingLink = document.getElementById("shopping-cart-button");
      shoppingLink.classList.add("active-link");
      break;
  }
}

headerMenuActiveLink();
