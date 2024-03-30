function countup(className){
  var countBlockTop = $("."+className).offset().top;
  var windowHeight = window.innerHeight;
  var show = true;

  $(window).scroll( function (){
      if(show && (countBlockTop < $(window).scrollTop() + windowHeight)){
          show = false;

          $('.'+className).spincrement({
              from: 1,
              duration: 5200,
          });
      }
  })
}


$(function() {
  countup("numbers", $(".numbers").text());
});

// let valueDisplays = document.querySelectorAll(".numbers");
// let interval = 4000;
// valueDisplays.forEach((valueDisplay) => {
//   let startValue = 0;
//   let endValue = parseInt(valueDisplay.getAttribute("data-val"));
//   let duration = Math.floor(interval / endValue);
//   let counter = setInterval(function () {
//     startValue += 1;
//     valueDisplay.textContent = startValue;
//     if (startValue == endValue) {
//       clearInterval(counter);
//     }
//   }, duration);
// });
