function navigationFilter() {
  let filter = '*';
  let filterFocus = localStorage.getItem('filterFocus');
  console.log('Локальная перемнная хранит ' + filterFocus);

  // Если в локальной переменной ничего не записано или она не создана, то создать локальную переменную.
  if (filterFocus === undefined || filterFocus === null) {
    localStorage.setItem('filterFocus', '#button-all');
    clickButton = localStorage.getItem('filterFocus');
    console.log('Переменная filterFocus в локальном хранилище не определена, устанавливается значение #button-all')
  }

  // Переменная хранит название страницы
  let pageTitle = document.querySelector('.body');

  // Если открыта страница с фотографиями запускаем скрипт
  if(pageTitle.classList.contains('index-page')) {

    // Инициализация библиотеки для плиточного расположения фото на страниц портфолио
    const elem = document.querySelector('.portfolio__grid');
    const iso = new Isotope( elem, {
      itemSelector: '.grid-item',
      layoutMode: 'masonry',
      percentPosition: true
    });

    // Цикл находит все кнопки с классом .navigation__filter-btn
    document.querySelectorAll('.navigation__filter-btn').forEach(el => {
      el.addEventListener('click', (e) => {
          filter = e.currentTarget.dataset.filter;
          // console.log(filter);

          // Поиск фотографий по нажатой кнопке.
          document.querySelectorAll('.gallery-photo').forEach(el => {
            if (filter === '*') {
              document.querySelector('.header__page-title').innerHTML = 'Портфолио';
              el.dataset.fancybox = 'gallery';
            } else if (filter === '.portrait') {
              document.querySelector('.header__page-title').innerHTML = 'Индивидуальные съёмки';
              document.querySelectorAll('.portrait-img').forEach(portrait => {
                portrait.dataset.fancybox = 'portrait';
              })
            } else if (filter === '.family') {
              document.querySelector('.header__page-title').innerHTML = 'Семейные съёмки';
              document.querySelectorAll('.family-img').forEach(family => {
                family.dataset.fancybox = 'family';
              })
            } else if (filter === '.love-story') {
              document.querySelector('.header__page-title').innerHTML = 'Love Story';
              document.querySelectorAll('.love-story-img').forEach(love => {
                love.dataset.fancybox = 'love-story';
              })
            }
            else if (filter === '.christening') {
              document.querySelector('.header__page-title').innerHTML = 'Крещения';
              document.querySelectorAll('.christening-img').forEach(christening => {
                christening.dataset.fancybox = 'christening';
              })
            }
          })

          // записываем в переменную id нажатой кнопки
          clickButton = "#"+el.id;
          localStorage.setItem('filterFocus', clickButton);
          console.log('В локальное хранилище в переменную filterFocus записано значение ' + clickButton);
          iso.arrange({filter: `${filter}`});
      });
    });

  // Иначе если открыта не страница портфолио (index.html), то по нажатии на кнопку фильтрации фото,
  // произойдёт переход на страницу с портфолио и фотографии отсортируются так как было выбрано.
  } else {
    document.querySelectorAll('.navigation__filter-btn').forEach(el => {
      el.addEventListener('click', (e) => {
          window.location.href = 'index.html';
          clickButton = "#"+el.id;
          localStorage.setItem('filterFocus', clickButton);
        });
      });
  }

  // Скрипт отвечает за закрытие меню на мобильных экранах,
  // после нажатия на какую-нибудь кнопку фильтра фотографий.

  // Определяем, что экран меньше 768px
  if (document.documentElement.clientWidth < 768) {

    //записываем в перемнную "selectedNow" параметр фильтра выбранный в данный момент.
    selectedNow = clickButton;
    console.log('Сейчас выбрано ' + selectedNow);
    console.log('Экран меньше 768px');

    // отслеживаем нажатие на кнопку фильтра
    document.querySelectorAll('.navigation__filter-btn').forEach(el => {
      el.addEventListener('click', (e) => {

        // если меню открыто и нажата кнопка фильтра то ...
        if (document.querySelector(".navigation").classList.contains('navigation--opened')) {
          console.log('В данный момент меню открыто');

          // ... Если выбран пункт фильтра отличающейся от текущего,
          // то закрыть меню и записать только что ыбранный пункт в текущий.
            if (selectedNow !== clickButton) {
              closeNavigation();
              selectedNow = clickButton;
            }

          } else {
            console.log('В данный момент меню закрыто');
          }
        });
      });
  }
}

function setCurrentYear() {
  let year = String(new Date().getFullYear());
  document.querySelector('.current-year').innerHTML = year;
}
