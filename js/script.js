'use strict'

new Swiper('.block-body__swiper', {
    autoplay: {
        delay: 3000
    },
    pagination: {
        el: '.block-body__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"><span></span></span>`
        }
    }
});

new Swiper('.sales-leaders__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: '.sales-leaders__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"><span></span></span>`
        }
    },
    slidesPerView: 4,

    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 0,
            slideToClickedSlide: true,
        },

        500: {
            slidesPerView: 2,
            spaceBetween: 20,
            slideToClickedSlide: true,
        },
        1199: {
            slidesPerView: 3,
            slideToClickedSlide: true,
        },
        1399: {
            slidesPerView: 4,
            spaceBetween: 30,
            slideToClickedSlide: true,
        }
    }
});

// Перевірка на знаходження на головній сторінці.
if (document.body.classList.contains('home')) {
    let activeSlider = document.querySelector('.tab-body-item-two__swiper');
    let activeItemSlider = document.querySelectorAll('.item-two__swiper-slide');
    const breakpoint = window.matchMedia('(max-width:992px)');

    let mySwiper;

    const breakpointChecker = function () {

        if (breakpoint.matches === false) {

            if (mySwiper !== undefined) mySwiper.destroy(true, true);
            activeSlider.classList.add('wrapper');
            activeItemSlider.forEach(element => {
                element.classList.remove('swiper-slide')
            })
            return;

        } else if (breakpoint.matches === true) {
            activeSlider.classList.remove('wrapper');
            activeItemSlider.forEach(element => {
                element.classList.add('swiper-slide')
            })
            return enableSwiper();
        }
    };

    const enableSwiper = function () {
        mySwiper = new Swiper('.tab-body-item-two__swiper', {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                el: '.tab-body__swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return `<span class="${className}"><span></span></span>`
                }
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                500: {
                    slidesPerView: 2,
                }
            }
        });
    };


    breakpoint.addListener(breakpointChecker);

    breakpointChecker();


    progresBar();
    errorForm('.order-block-form__form');
}


// Бургер меню.
function burgerActive() {
    let btnBurger = document.querySelector('.nav__burger');
    let navMenu = document.querySelector('.nav__wrapper-burger');

    btnBurger.addEventListener('click', function () {
        this.classList.toggle('_burger-active');
        navMenu.classList.toggle('_burger-active');
    })
}
burgerActive();


// Відкриваємо меню на desktop.
function menuCatalog() {
    let catalogItems = document.querySelectorAll('.block-catalog__item');
    let headerContentShadow = document.querySelector('.header-content__shadow');

    catalogItems.forEach(element => {
        element.addEventListener('click', function () {
            remuveClassActive();

            this.classList.add('item-active');

            let dataSubMenu = this.getAttribute('data-sub-menu');
            let subMenuCatalog = document.querySelector(`.catalog-sub-menu_${dataSubMenu}`);

            subMenuCatalog.classList.add('catalog-sub-menu-active');


            if (subMenuCatalog.classList.contains('catalog-sub-menu-active')) {
                headerContentShadow.classList.add('shadow-active');

                headerContentShadow.addEventListener('click', function () {
                    headerContentShadow.classList.remove('shadow-active');
                    remuveClassActive();
                })
            }
        })
    })

    // Закриваємо меню на desktop.
    function remuveClassActive() {
        document.querySelectorAll('.block-catalog__item').forEach(element => {
            element.classList.remove('item-active');
        })

        document.querySelectorAll('.catalog-sub-menu').forEach(element => {
            element.classList.remove('catalog-sub-menu-active');
        })
    }
}
menuCatalog();


// Бургер Submenu.
if (matchMedia) {
    let screen = window.matchMedia("(max-width:992px)");
    screen.addListener(changes);
    changes(screen);
}

function changes(screen) {
    if (screen.matches) {
        let navMenu = document.querySelector('.nav__manu-wrapper');
        let navMenuClone = navMenu.cloneNode(true)

        let blickCatalog = document.querySelector('.block-catalog');

        document.querySelectorAll('.block-catalog__item').forEach(element => {
            element.classList.add('blocking');
        })

        document.addEventListener('click', function (e) {
            let navMenuWrapper = document.querySelector('.nav__manu-wrapper');



            if (e.target.classList[0] === "nav__link-catalog" || e.target.classList.value === 'nav__link _icon-right') {
                let catalog = document.querySelector('.nav__link-catalog');
                let catalogBtn = document.querySelector('.block-catalog__text');
                let navMenu = document.querySelector('.nav__manu');

                catalogBtn.classList.add('catalog-btn');
                navMenuWrapper.innerHTML = blickCatalog.innerHTML;
            }

            if (e.target.classList.value === 'block-catalog__text catalog-btn') {

                navMenuWrapper.innerHTML = navMenuClone.innerHTML;
            }


            if (e.target.classList.value === 'nav__burger-span') {
                document.querySelector('.catalog-sub-menu__title').classList.remove('title-btn');
                navMenuWrapper.innerHTML = navMenuClone.innerHTML;
            }

            if (e.target.classList.value === 'block-catalog__item _icon-right blocking') {

                let itemData = e.target.getAttribute('data-sub-menu');
                let catalogSubMneu = document.querySelector(`.catalog-sub-menu_${itemData}`)

                catalogSubMneu.querySelector('.catalog-sub-menu__title').classList.add('title-btn');
                navMenuWrapper.innerHTML = catalogSubMneu.innerHTML;


            }
            if (e.target.classList.value === 'catalog-sub-menu__title title-btn') {


                let blickCatalog = document.querySelector('.block-catalog');
                document.querySelector('.catalog-sub-menu__title').classList.remove('title-btn');
                navMenuWrapper.innerHTML = blickCatalog.innerHTML
            }
        })


    } else {

        document.querySelectorAll('.block-catalog__item').forEach(element => {
            element.classList.remove('blocking');
        })
    }


}


function goToTheTop() {
    let btnStart = document.querySelector('.footer__btn-start');
    document.addEventListener('scroll', function () {
        if (window.scrollY >= 200) {
            btnStart.classList.add('btn-start-active');
        } else {
            btnStart.classList.remove('btn-start-active');
        }
    })

    btnStart.addEventListener('click', function () {
        window.scrollBy({
            top: -window.scrollY,
            behavior: 'smooth'
        })
    })
}
goToTheTop();


// Таби в блоці may-interest.

function tabs() {
    let tabBtn = document.querySelectorAll('.may-interest-tabs__tab');

    tabBtn.forEach((element, index) => {
        element.addEventListener('click', function () {
            removeClassTabBody();
            let numberTabBody = this.getAttribute('data-tab-body');
            let tabBody = document.querySelector(`.tab-body__item_${numberTabBody}`);

            this.classList.add('tab-active');
            tabBody.classList.add('tab-body-active');
        })
    })
}
tabs();

function removeClassTabBody() {
    document.querySelectorAll('.may-interest-tabs__tab').forEach(element => {
        element.classList.remove('tab-active')
    });
    document.querySelectorAll('.tab-body__item').forEach(element => {
        element.classList.remove('tab-body-active')
    });
}


// прогрес бар в блоці May interes ====================
function progresBar() {
    let progresBar = document.querySelector('.big-block__progress-bar')
    let labelGoods = document.querySelector('.big-block__label')
    let leangthGoods = labelGoods.querySelector('span');

    progresBar.querySelector('span').style.width = `${leangthGoods.innerHTML * 10}%`;
}



function plusMinusGoodss() {
    let plus = document.querySelectorAll('.plus');
    let minus = document.querySelectorAll('.minus');

    plus.forEach(element => {
        element.addEventListener('click', function () {
            let parentBlock = this.parentNode;
            let number = parentBlock.querySelector('span');

            if (number.innerHTML > '-1') {
                minus.forEach(element => {
                    element.classList.remove('minus-active');
                })

            }
            number.innerHTML++

            if (parentBlock.classList.contains('big-block-btn__wrapper-namber')) {
                let card = parentBlock.parentNode.parentNode;
                let remainderGoods = card.querySelector('.big-block__label').querySelector('span');
                if (remainderGoods.innerHTML <= number.innerHTML) {
                    number.innerHTML = remainderGoods.innerHTML;
                    element.classList.add('plus-active');

                }

            }

        })
    })

    minus.forEach(element => {
        element.addEventListener('click', function () {
            let parentBlock = this.parentNode;
            let number = parentBlock.querySelector('span');

            number.innerHTML--
            if (number.innerHTML < '1') {
                this.classList.add('minus-active');
                number.innerHTML = '0';

            }

            if (parentBlock.classList.contains('big-block-btn__wrapper-namber')) {
                let card = parentBlock.parentNode.parentNode;
                let remainderGoods = card.querySelector('.big-block__label').querySelector('span');
                if (remainderGoods.innerHTML > number.innerHTML) {
                    plus.forEach(element => {
                        element.classList.remove('plus-active');
                    })

                }

            }

        })
    })
};
plusMinusGoodss();



// Product card
if (document.body.classList.contains('product')) {
    toReceive();
    errorForm('.product-options__form');

    let headerContentShadow = document.querySelector('.header-content__shadow');
    let blockCatalog = document.querySelector('.block-catalog__wrapper');
    document.addEventListener('click', function (e) {
        console.log(e.target.classList)

        // Ховаємо і вивзиваємо меню каталог.
        if (e.target.classList[0] === 'block-catalog__text') {

            blockCatalog.classList.toggle('active-catalog');
            headerContentShadow.classList.add('shadow-active');
        }
        if (e.target.classList[0] === 'block-catalog__text') {
            if (!document.querySelector('.block-catalog__wrapper').classList.contains('active-catalog')) {
                headerContentShadow.classList.remove('shadow-active');
            }
        }
        if (e.target.classList[0] === 'header-content__shadow') {
            blockCatalog.classList.remove('active-catalog');
            headerContentShadow.classList.remove('shadow-active');
        }
        if (e.target.classList[0] === 'product-options-form__btn'){
            errorForm('.product-options-form');
        }


    })
}


// Перевірка форми чи не пустий інпут і виводимо ошибку.
function errorForm(addClass) {
    let form = document.querySelector(addClass);

    form.addEventListener('submit', function (e) {
            e.preventDefault();

            let input = form.querySelectorAll('.input');
            input.forEach(element => {
                if (element.value === '') {
                    element.classList.add('input-error');
                } else {
                    element.classList.remove('input-error');
                }
            })


        })
}
errorForm('.dont-miss-form');


// Получаємо src фото в блоці product-description__imegs-list
function toReceive() {
    let productImegs = document.querySelectorAll('.product-description__img');
    let productBigImg = document.querySelector('.product-description__big-img');
    productImegs.forEach(element => {
        element.addEventListener('click', function () {
            removeClassActiveImg();
            this.parentNode.classList.add('img-active');
            console.log(this.parentNode)
            productBigImg.innerHTML = `<img src="${this.getAttribute('src')}" alt="Product" />`;
        })
    })
}

function removeClassActiveImg() {
    document.querySelectorAll('.product-description__item').forEach(element => {
        element.classList.remove('img-active')
    })
}
