window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var balloons = document.getElementsByClassName("balloon");
  for(var i = 0; i < balloons.length; i++){
    balloons[i].style.bottom = window.pageYOffset + "px";
  }
}