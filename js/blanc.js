//Slider

const swiper = new Swiper('.js-hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 4000,
  autoplay: {
    delay: 4000
  }
});

// Menu 2

document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
    /* чтобы изначально ползунок был виден */
    autoHide: false,
    /* с помощью этого значения вы можете управлять высотой ползунка*/
    scrollbarMaxSize: 25,
  });
})


const btns = document.querySelectorAll(".header__bottom__menu");
const dropdowns = document.querySelectorAll(".dropdown");
const btnClassName = "js-header-dropdown-btn";
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function () {

    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);

  })
})

// Burger menu

// здесь мы определяем функцию, которая отвечает за работу меню, в ней не нужно ничего менять
function setBurger(params) {
  const btn = document.querySelector(`.${params.btnClass}`);
  const menu = document.querySelector(`.${params.menuClass}`);

  btn.setAttribute('aria-expanded', false);

  menu.addEventListener("animationend", function () {
    if (this.classList.contains(params.hiddenClass)) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
    }
  });

  btn.addEventListener("click", function () {
    this.classList.toggle(params.activeClass);

    if (
      !menu.classList.contains(params.activeClass) &&
      !menu.classList.contains(params.hiddenClass)
    ) {
      menu.classList.add(params.activeClass);
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', true);
    } else {
      menu.classList.add(params.hiddenClass);
      document.body.removeAttribute('style');
      btn.setAttribute('aria-expanded', false);
    }
  });
}

// здесь мы вызываем функцию и передаем в нее классы наших элементов
setBurger({
  btnClass: "burger", // класс бургера
  menuClass: "menu-wrap", // класс меню
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

//Search mobile

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener('click', function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener('click', function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener('click', function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
});

// Galery Slider

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    slidesPerGroup: 1,
    spaceBetween: 20,
    pagination: {
      el: ".galery .galery__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".galery__next",
      prevEl: ".galery__prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }

  });
});

// Galery select //
const defaultSelect = () => {
  const element = document.querySelector('.galery__list');
  const choices = new Choices(element, {
    searchEnabled: false,
    placeholder: true,
  });

  let ariaLabel = element.getAttribute('aria-label');
  element.closest('.choices').setAttribute('aria-label', ariaLabel);

};

defaultSelect();

// Catalog accordeon

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });
})();


// Табы
const params = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active"
};

function setTabs(params) {
  const tabBtns = document.querySelectorAll(`.${params.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${params.wrap}`);
    const currentContent = wrap.querySelector(`.${params.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${params.content}`);

    contents.forEach((el) => {
      el.classList.remove(params.active);
    });

    currentContent.classList.add(params.active);

    tabBtns.forEach((el) => {
      el.classList.remove(params.active);
    });

    this.classList.add(params.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(params);

// Event swiper //

const eventSwiper = new Swiper('.events__slider', {
  slidesPerView: 1,
  spaceBetween: 25,


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  a11y: {
    prevSlideMessage: 'предыдущий слайд',
    nextSlideMessage: 'следующий слайд',
  },

  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    962: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },

    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 3,
      }
  },
});

// Tooltip

tippy('[data-tippy-content]');

// Partner swiper

const projectSwiper = new Swiper('.projects__slider', {
  slidesPerView: 1,
  spaceBetween: 30,

  breakpoints: {
    650: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 1,
    },

    1000: {
      slidesPerView: 2,
      spaceBetween: 47,
      slidesPerGroup: 1,
    },

    1400: {
      slidesPerView: 3,
      spaceBetween: 50,
      slidesPerGroup: 1,
      }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  a11y: {
    prevSlideMessage: 'предыдущий слайд',
    nextSlideMessage: 'следующий слайд',
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true
  },

  watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
});

// Validate //

const validation = new JustValidate (
  '.contact__form',
  {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#d11616',
    },

  },
);

validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Введите ваше имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Введите более 3-х символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Введите не более 30-ти символов'
    },
    {
      rule: 'customRegexp',
      value: /^[а-яА-ЯёЁa-zA-Z]+$/,
      errorMessage: 'Неверный формат',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш телефон',
    },
    {
      rule: 'number',
      errorMessage: 'Только цифры',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Введите 10 символов',
    },

  ]).onSuccess((event) => {

    let formData = new FormData(event.target);
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
         let doneMessage = document.querySelector('.contact__feedback__message');
         doneMessage.classList.add('visible-message');

         (function() {
          // Создаём таймер
          setTimeout(function() {
            doneMessage.classList.remove('visible-message'); // Меняем прозрачность
          }, 5000); // 10000 мсек = 10 сек
        })();
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();
  });


// Map //

ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.76033534577601,37.61479241699063],
            zoom: 14,
            controls: ['geolocationControl', 'zoomControl']
        },{
          geolocationControlFloat: 'none',
          geolocationControlPosition: {
            bottom: '310px',
            right: '18px'
          },
          zoomControlSize: 'medium',
          zoomControlPosition: {
            bottom: '370px',
            right: '18px'
          }
        });

        var myPlacemark = new ymaps.Placemark([55.75896732335444,37.614334655064994], {}, {
          iconLayout: 'default#image',
          iconImageHref: 'img/icon-map.png',
          iconImageSize: [20, 20],
          iconImageOffset: [-5, -37]
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
      myMap.controls.remove('searchControl');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');

    }
