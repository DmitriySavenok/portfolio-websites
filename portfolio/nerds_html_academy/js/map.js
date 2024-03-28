var map;
  DG.then(function () {
    // На мобильных маркер по середине экрана,
    // на компьютерах смещён от центра экрана вправо.
    if (window.innerWidth >= 650) {
      map = DG.map('map', {
      center: [59.939014, 30.320971],
      zoom: 17,
      scrollWheelZoom: false,
      doubleClicklZoom: false,
      fullscreenControl: false,
      zoomControl: false
      });
    } else {
      map = DG.map('map', {
      center: [59.939352, 30.323414],
      zoom: 16,
      fullscreenControl: false,
      zoomControl: false,
      touchZoom: false
      });
    }

    // Собственное изображение маркера на карте
    var myIcon = DG.icon({
      iconUrl: 'img/icons/map-marker.png',
      iconRetinaUrl: 'img/icons/map-marker.png',
      iconSize: [231, 190],
      iconAnchor: [50, 190]
    });
    var marker = DG.marker([59.938635, 30.323118], {icon: myIcon}).addTo(map);
    marker.bindLabel('Офис студии Nёrds в Санкт-Петербурге');
    });
