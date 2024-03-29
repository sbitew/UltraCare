$(function() {

    new Slider({
        images: '.slider-1 img',
        btnPrev: '.slider-1 .buttons .prev',
        btnNext: '.slider-1 .buttons .next',
        auto: false
    });

  new Slider({
        images: '.slider-2 img',
        btnPrev: '.slider-2 .buttons .prev',
        btnNext: '.slider-2 .buttons .next',
        auto: true,
        rate: 2000
    });
});


function Slider(obj) {

  this.images = $(obj.images);
  this.auto = obj.auto;
  this.btnPrev = obj.btnPrev;
  this.btnNext = obj.btnNext;
    this.rate = obj.rate || 1000;

  var i = 0;
    var slider = this;

    // The "Previous" button: to remove the class .shoved, show the previous image and add the .shoved class
  this.prev = function () {
    slider.images.eq(i).removeClass('shown');
    i--;

    if (i < 0) {
      i = slider.images.length - 1;
    }

    slider.images.eq(i).addClass('shown');
  }

    // The "Next" button: to remove the class .shoved, show the next image and add the .shoved class
  this.next = function () {
    slider.images.eq(i).removeClass('shown');
    i++;

    if (i >= slider.images.length) {
      i = 0;
    }

    slider.images.eq(i).addClass('shown');
  }

    // To add next and prev functions when clicking the corresponding buttons
    $(slider.btnPrev).on('click', function(){ slider.prev();});
    $(slider.btnNext).on('click', function(){ slider.next();});

    // For the automatic slider: this method calls the next function at the set rate
  if (slider.auto)  {
        setInterval(slider.next, slider.rate);
    }
};



const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
