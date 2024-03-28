function setHeaderPageTitle() {
  let pageTitle = document.querySelector('.body');

  if(pageTitle.classList.contains('index-page')) {
    console.log('Загружена страницы Портфолио')
    document.querySelector('.header__page-title').innerHTML = 'Портфолио';
    document.querySelector(clickButton).click();
  } else if(pageTitle.classList.contains('price-page')) {
    console.log('Загружена страницы Прайс')
    document.querySelector('.header__page-title').innerHTML = 'Прайс';
  } else if(pageTitle.classList.contains('conditions-page')) {
    console.log('Загружена страницы Условия проведени съёмки')
    document.querySelector('.header__page-title').innerHTML = 'Условия проведения съёмки';
  }
}

const menuButton = document.querySelector(".header__menu-button");
const navigation = document.querySelector(".navigation");
const main = document.querySelector("main");

function navigationToggle() {
  clickButton = localStorage.getItem('filterFocus');

  menuButton.addEventListener('click', function() {
    menuButton.classList.toggle('button__pressed');
    navigation.classList.toggle('navigation--opened');
    main.classList.toggle('main--navigation-opened');
    console.log('Нажата кнопка открытия/закрытия меню');

    let pageTitle = document.querySelector('.body');
    if(pageTitle.classList.contains('index-page')) {
      if(clickButton === undefined) {
        clickButton = localStorage.getItem('filterFocus');
        document.querySelector('#button-all').click();
        console.log('Локальная переменная была не определена, автоматически нажата кнопка #button-all')
      } else {
        document.querySelector(clickButton).click();
        console.log('Автоматически нажата кнопка с значением ' + clickButton + ' из локальной переменной')
      }
    }
  })
}

function closeNavigation() {
  menuButton.classList.remove('button__pressed');
  navigation.classList.remove('navigation--opened');
  main.classList.remove('main--navigation-opened');
  console.log('Закрытие меню');
  document.querySelector(clickButton).click();
}
