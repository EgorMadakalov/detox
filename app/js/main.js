import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';


// Now you can use Swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


const modal = document.getElementById('modal');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const closeMenu = document.getElementById('close-menu');
const answer = document.getElementById('answer');
const wrapModal = document.getElementById('wrap-modal');
const deliv = document.querySelector('.deliv');

const modal__btn = document.querySelector('.modal__btn');
const answer__btn = document.querySelector('.answer__btn');
const evenClick = document.querySelector('.evenClick');
const evenClicks = document.querySelectorAll('.evenClick');
const close = document.querySelector('.close');
const closes = document.querySelectorAll('.close');

console.log(deliv)
console.log(evenClicks)


modal__btn.onclick = function(){
  modal.style.display = 'none';
  answer.style.display = 'flex';
};

burger.onclick = function(){
  menu.style.display = 'block';
};
closeMenu.onclick = function(){
  menu.style.display = 'none';
};

answer__btn.onclick = function(){
  document.body.style.overflowX = 'hidden';
  wrapModal.style.display = 'none';
  modal.style.display = 'none';
  answer.style.display = 'none';
};

evenClicks.forEach((evenClick) => {
  evenClick.addEventListener('click', function(){
    deliv.scrollIntoView({
      behavior: "smooth",
    });
    setTimeout(() => {
      document.body.style.overflowX = 'hidden';
      wrapModal.style.display = 'flex';
      modal.style.display = 'flex';
    }, 600);
  });
});

closes.forEach((close) => {
  close.addEventListener('click', function(){
    document.body.style.overflowX = 'hidden';
    wrapModal.style.display = 'none';
    modal.style.display = 'none';
    answer.style.display = 'none';
  });
});


window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    let keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = new_value;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

  });

});




// document.addEventListener("DOMContentLoaded", function () {
//   var phoneInputs = document.querySelectorAll('input[data-tel-input]');

//   var getInputNumbersValue = function (input) {
//       // Return stripped input value — just numbers
//       return input.value.replace(/\D/g, '');
//   }

//   var onPhonePaste = function (e) {
//       var input = e.target,
//           inputNumbersValue = getInputNumbersValue(input);
//       var pasted = e.clipboardData || window.clipboardData;
//       if (pasted) {
//           var pastedText = pasted.getData('Text');
//           if (/\D/g.test(pastedText)) {
//               // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
//               // formatting will be in onPhoneInput handler
//               input.value = inputNumbersValue;
//               return;
//           }
//       }
//   }

//   var onPhoneInput = function (e) {
//       var input = e.target,
//           inputNumbersValue = getInputNumbersValue(input),
//           selectionStart = input.selectionStart,
//           formattedInputValue = "";

//       if (!inputNumbersValue) {
//           return input.value = "";
//       }

//       if (input.value.length != selectionStart) {
//           // Editing in the middle of input, not last symbol
//           if (e.data && /\D/g.test(e.data)) {
//               // Attempt to input non-numeric symbol
//               input.value = inputNumbersValue;
//           }
//           return;
//       }

//       if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
//           if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
//           var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
//           formattedInputValue = input.value = firstSymbols + " ";
//           if (inputNumbersValue.length > 1) {
//               formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
//           }
//           if (inputNumbersValue.length >= 5) {
//               formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
//           }
//           if (inputNumbersValue.length >= 8) {
//               formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
//           }
//           if (inputNumbersValue.length >= 10) {
//               formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
//           }
//       } else {
//           formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
//       }
//       input.value = formattedInputValue;
//   }
//   var onPhoneKeyDown = function (e) {
//       // Clear input after remove last symbol
//       var inputValue = e.target.value.replace(/\D/g, '');
//       if (e.keyCode == 8 && inputValue.length == 1) {
//           e.target.value = "";
//       }
//   }
//   for (var phoneInput of phoneInputs) {
//       phoneInput.addEventListener('keydown', onPhoneKeyDown);
//       phoneInput.addEventListener('input', onPhoneInput, false);
//       phoneInput.addEventListener('paste', onPhonePaste, false);
//   }
// })
