let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__popup__menu');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click',

  function () {

    burger.classList.toggle('burger--active');

    menu.classList.toggle('header__popup__menu--active');

    document.body.classList.toggle('stop-scroll');

  });

menuLinks.forEach((el) => {

  el.addEventListener('clicl', function () {

    burger.classList.remove('burger--active');

    menu.classList.remove('header__popup__menu--active');

    document.body.classList.remove('stop-scroll');

  });

});
