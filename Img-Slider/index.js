 var products = [];
    var index = 0;
    var interval = 2000; 
    var sliderInterval;

    var request = new XMLHttpRequest();
    request.open("GET", "https://fakestoreapi.com/products", true);
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        products = JSON.parse(request.responseText);
        showSlide(index);
      }
    };
    request.send();

    
    function showSlide(i) {
      var img = document.getElementById("slider-img");
      var caption = document.getElementById("slider-caption");
      img.src = products[i].image;
      caption.innerText = products[i].title;
    }

    
    function next() {
      index++;
      if (index >= products.length) {
        index = 0;
      }
      showSlide(index);
    }

    function prev() {
      index--;
      if (index < 0) {
        index = products.length - 1;
      }
      showSlide(index);
    }

   
    function play() {
      stop(); 
      sliderInterval = setInterval(function () {
        next();
      }, interval);
    }

    
    function stop() {
      clearInterval(sliderInterval);
    }

    function changeSpeed(newSpeed) {
      interval = newSpeed;
      play();
    }