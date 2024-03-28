let clickButton;

window.onload = function() {

	setTimeout(function() {

    // Скрывает прелоадер после загрузки контента страницы
		document.body.classList.add('loaded')

    navigationToggle();
    navigationFilter();
    setHeaderPageTitle();
    setCurrentYear();

	}, 200)

}
