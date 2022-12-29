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
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
            slideToClickedSlide: true,
        },
        1399: {
            slidesPerView: 4,
            spaceBetween: 30,
            slideToClickedSlide: true,
        }
    }
});

function noUiSliderFun(){
    let slider = document.querySelector('.catalog-filter-accardion__slider');
if(slider){
    let minPrice = document.querySelector('.catalog-filter-accardion__min-price');
    let maxPrice = document.querySelector('.catalog-filter-accardion__max-price');
    noUiSlider.create(slider, {
        start: [Number(minPrice.getAttribute('data-min-price')), Number(maxPrice.getAttribute('data-max-price'))],
        connect: true,
        range: {
            'min': Number(minPrice.getAttribute('data-min-price')),
            'max': Number(maxPrice.getAttribute('data-max-price'))
        }
    });


    let skipValues = [
        document.getElementById('skip-value-lower'),
        document.getElementById('skip-value-upper')
    ];
    
    slider.noUiSlider.on('update', function (values, handle) {
        skipValues[handle].innerHTML = (Math.trunc(values[handle]));
    });
}
}

noUiSliderFun()




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
    errorForm('.dont-miss-form');
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

    if(btnStart){
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

    function removeClassTabBody() {
        tabBtn.forEach(element => {
            element.classList.remove('tab-active')
        });
        document.querySelectorAll('.tab-body__item').forEach(element => {
            element.classList.remove('tab-body-active')
        });
    }
}



tabs();

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
        element.addEventListener('click', function (e) {
            e.preventDefault()

            let parentBlock = this.parentNode;
            let number = parentBlock.querySelector('span');

            if (+number.innerHTML > 1) {
                minus.forEach(element => {
                    element.classList.remove('minus-active');
                })

            }
            number.innerHTML++

            if (parentBlock.classList.contains('big-block-btn__wrapper-namber')) {
                let card = parentBlock.parentNode.parentNode;
                let remainderGoods = card.querySelector('.big-block__label').querySelector('span');
                if (+remainderGoods.innerHTML <= +number.innerHTML) {
                    number.innerHTML = remainderGoods.innerHTML;
                    element.classList.add('plus-active');

                }

            }
            multiplyPriceQuantity();
        })
    })

    minus.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault()

            let parentBlock = this.parentNode;
            let number = parentBlock.querySelector('span');


            number.innerHTML--
            if (+number.innerHTML < 2) {
                this.classList.add('minus-active');
                number.innerHTML = 1;

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
            multiplyPriceQuantity();
        })
    })
};
plusMinusGoodss();



// Product card
if (document.body.classList.contains('product')) {

    let headerContentShadow = document.querySelector('.header-content__shadow');
    let blockCatalog = document.querySelector('.block-catalog__wrapper');

    let popupShadow = document.querySelector('.popup__shadow');
    let popup = document.querySelector('.popup__body');

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

        // Sub menu На кнопку Сортування на сторінці Catalog.
        if(e.target.classList[1] === 'btn-sorting' || e.target.classList[0] === '_icon-right'){
            document.querySelector('.catalog-header-sublist').classList.toggle('active-sublist');
            document.querySelector('.btn-sorting span').classList.toggle('oreng');
        } else {
            if(document.querySelector('.catalog-header-sublist')){
                document.querySelector('.catalog-header-sublist').classList.remove('active-sublist');
                document.querySelector('.btn-sorting span').classList.remove('oreng');
            }

        }
        
        // Клік на кнопку фільтер в мобільній версії на сторінці catalog.
        let innerFilter = document.querySelector('.page-catalog__inner');

        if(e.target.classList[1] === 'btn-filter' || e.target.classList[0] === '_icon-filter'){
            innerFilter.classList.add('active-inner');
        }
        if(e.target.classList[0] === 'catalog-block-title__btn'){
            innerFilter.classList.remove('active-inner');
        }

         // Попап (Як зроби замір рулонних штор) закриваємо
        // if (e.target.classList[0] === 'popup__btn' || e.target.classList[0] === 'popup__shadow'){
        //     document.body.classList.remove('lock-popup');
        //     document.firstElementChild.classList.remove('lock-popup');
        //     popupShadow.classList.remove('popup-active');
        //     popup.classList.remove('popup-active');
        // }

    })

    // document.addEventListener('keydown', (e) => {
    //     // Попап (Як зроби замір рулонних штор) закриваємо на кнопку esc.
    //     if(e.keyCode === 27){
    //         document.body.classList.remove('lock-popup');
    //         document.firstElementChild.classList.remove('lock-popup');
    //         popupShadow.classList.remove('popup-active');
    //         popup.classList.remove('popup-active');
    //     }
    // })


    toReceive();
    errorForm('.product-options__form');
    errorForm('.dont-miss-form');
    errorForm('.add-comment-form');
    errorForm('.contat-form');
    // errorForm('.basket-body-two-form');
    tabBtnRadio();
    creatSlider();
    multiplyPriceQuantity();
    ordering()
}

// Попап (Як зроби замір рулонних штор).
function popapOpen() {
    let btnPopups = document.querySelectorAll('.open-popup');

    btnPopups.forEach(btnPopup => {
        if(btnPopup){
            btnPopup.addEventListener('click', function() {

                let id = this.dataset.id;
                let popup = document.querySelector(`#${id}`);

                if(popup){
                    let popupBody = popup.querySelector('.popup__body');

                    document.body.classList.add('lock-popup');
                    document.firstElementChild.classList.add('lock-popup');
                    popup.classList.add('popup-active');
                    popupBody.classList.add('popup-active');

                    document.addEventListener('click', (e) => {
                        if (e.target.classList[0] === 'popup__btn' || e.target.classList[0] === 'popup__shadow'){
                            document.body.classList.remove('lock-popup');
                            document.firstElementChild.classList.remove('lock-popup');
                            popup.classList.remove('popup-active');
                            popupBody.classList.remove('popup-active');
                        }
                    })

                    
                    // Попап (Як зроби замір рулонних штор) закриваємо на кнопку esc.
                    document.addEventListener('keydown', (e) => {
                    if(e.keyCode === 27){
                        document.body.classList.remove('lock-popup');
                        document.firstElementChild.classList.remove('lock-popup');
                        popup.classList.remove('popup-active');
                        popupBody.classList.remove('popup-active');
                    }
    })
                }

            })
            
        }
    })
}

popapOpen();

// Перевірка форми чи не пустий інпут і виводимо ошибку.
function errorForm(addClass) {
    let form = document.querySelector(addClass);
    if(form){
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let input = form.querySelectorAll('.input');
            input.forEach(element => {
                if (element.value === '') {
                    element.focus();
                    element.classList.add('input-error');
                } else {
                    element.classList.remove('input-error');
                }
            })
        })
    }
}





// Получаємо src фото в блоці product-description__imegs-list.
function toReceive() {
    let productImegs = document.querySelectorAll('.product-description__img');
    let productBigImg = document.querySelector('.product-description__big-img');
    productImegs.forEach(element => {
        element.addEventListener('click', function () {
            removeClassActiveImg();
            this.parentNode.classList.add('img-active');
            productBigImg.innerHTML = `<img src="${this.getAttribute('src')}" alt="Product" />`;
        })
    })
}

function removeClassActiveImg() {
    document.querySelectorAll('.product-description__item').forEach(element => {
        element.classList.remove('img-active')
    })
};


function creatSlider() {
let btnRight = document.querySelector('.btn-right');
let btnLeft = document.querySelector('.btn-left');
let basketProgresItemWrapper = document.querySelector('.basket-list__wrapper');
let basketProgresItem = document.querySelectorAll('.basket-list__item');
let basketProgresItemLengrh = basketProgresItem.length;
basketProgresItemLengrh = basketProgresItemLengrh - 1;

if(btnLeft || btnRight){
    if(basketProgresItemLengrh === (basketProgresItem.length - 1)){
        btnLeft.classList.add('not-active');
    }

    btnRight.addEventListener('click', function() {
        basketProgresItemLengrh--
        if(basketProgresItemLengrh <= '0'){
            basketProgresItemLengrh = 0;
            this.classList.add('not-active');
        }
    
        if(basketProgresItemLengrh < (basketProgresItem.length - 1)) {
            btnLeft.classList.remove('not-active');
        }
    
        basketProgresItemWrapper.style.right = `calc(-${(basketProgresItemLengrh * 100)}vw + 10px)`;
    })
    
    btnLeft.addEventListener('click', function() {
        basketProgresItemLengrh++
        if(basketProgresItemLengrh >= (basketProgresItem.length - 1)){
            basketProgresItemLengrh = (basketProgresItem.length - 1);
            this.classList.add('not-active');
        } 
    
        if(basketProgresItemLengrh < (basketProgresItem.length - 1)) {
            btnRight.classList.remove('not-active');
        }
    
        if(basketProgresItemWrapper.style.right = 'calc(-100vw + 10px)'){
            btnRight.classList.remove('not-active');
        }
    
        basketProgresItemWrapper.style.right = `calc(-${(basketProgresItemLengrh * 100)}vw + 10px)`;
    })
}

}


// Робимо радіокнопки табами в формі basket-body-two-form
function tabBtnRadio() {
    let tabsRadio = document.querySelectorAll('.form-tabs__radio');

tabsRadio.forEach(element => {
    element.addEventListener('change', function() {
        let dataItemForm = this.getAttribute('data-item-form');
        if(dataItemForm){
            removeClassTabBody();
            document.querySelector(`.basket-body-two-form__tab-body_${dataItemForm}`).classList.add('tab-body-active');

            let blockChekbox = document.querySelector('.block-checkbox');
            if(dataItemForm === '3') {
                blockChekbox.style.display = 'block';
            } else {
                blockChekbox.style.display = 'none';
            }
        }

    })
})
}

function removeClassTabBody() {
    document.querySelectorAll(`.tab-body`).forEach(element => {
        element.classList.remove('tab-body-active');
    })
}



let basketListItem = document.querySelectorAll('.basket-list__item');

basketListItem.forEach(element => {
    element.addEventListener('click', function() {
        if(this.classList.contains('active-item')){
            removeClassRemovwItem();
            let activeItem = this.getAttribute('data-item-progres');
            let activeItemProgres = document.querySelector(`.basket__body_${activeItem}`);
            activeItemProgres.classList.add('basket-body-active');
        }
    })
})

function removeClassRemovwItem() {
    document.querySelectorAll('.basket__body').forEach(element => {
        element.classList.remove('basket-body-active');
    })
}

// Прогресбар оформлення заказу в корзинні.

function ordering() {
    let btnRight = document.querySelector('.btn-right');
    let btnLeft = document.querySelector('.btn-left');
    let basketProgresItemWrapper = document.querySelector('.basket-list__wrapper');
    let btnGoToOrdering = document.querySelector('.basket-order-block__btn');
let barProgres = document.querySelector('.basket-list__progres span');
let basketListItemTwo = document.querySelector('.basket-list__item_2');
let basketListItemThre = document.querySelector('.basket-list__item_3');
let basketBodyTwoForm = document.querySelector('.basket-body-two-form');

if(btnGoToOrdering){
    btnGoToOrdering.addEventListener('click', function() {
        removeClassRemovwItem();
        basketProgresItemWrapper.style.right = 'calc(-100vw + 10px)';
        btnLeft.classList.remove('not-active');
        btnRight.classList.remove('not-active');
        barProgres.style.width = '66.666%';
        basketListItemTwo.classList.add('active-item');
        document.querySelector('.basket__body_2').classList.add('basket-body-active');
    
    
    })
}

if(basketBodyTwoForm){
    basketBodyTwoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        removeClassRemovwItem();
        basketProgresItemWrapper.style.right = 'calc(0vw + 10px)';
        btnRight.classList.add('not-active');
        barProgres.style.width = '100%';
        basketListItemThre.classList.add('active-item');
        document.querySelector('.basket__body_3').classList.add('basket-body-active');
    });
}

}



// Множимо ціну на кількість товару в корзині.
function multiplyPriceQuantity() {
    let blockPrice = document.querySelectorAll('.basket-body-one__money-block');
    blockPrice.forEach(element => {
        let price = element.querySelector('.block-price__price span').innerHTML;
        let length = element.querySelector('.basket-body-one__wrapper-namber span').innerHTML;
        let finalPrice = element.querySelector('.basket-body-one__final-price span');

        finalPrice.innerHTML = `${+(price) * +(length)}`;
    })
}


function addedProduct(){
    let like = document.querySelectorAll('.like');

like.forEach(element => {
    element.addEventListener('click', function() {

        if(this.classList.contains('_icon-like')){
            this.classList.remove('_icon-like');
            this.classList.add('_icon-added');
        } else {
            this.classList.add('_icon-like');
            this.classList.remove('_icon-added');
        }

    }) 
})
}

addedProduct();

function starRating(){
    let starsTtem = document.querySelectorAll('.stars__item');

    if(starsTtem){
        starsTtem.forEach(element => {
            element.addEventListener('click', function() {
                let starsList = element.parentNode;
                starsList.dataset.starsTotal = element.dataset.starsItem;
            })
        })
    }
} 
starRating();


// Робимо аккордеон для сторінуи question.
function accordionQuestion() {
    let headerAccordion = document.querySelectorAll('.item-accordions__header');

    headerAccordion.forEach(element => {
        if(element){
            element.addEventListener('click', function() {
                let bodyAccordion = this.nextElementSibling;
                this.classList.toggle('accordion-active');
                bodyAccordion.classList.toggle('accordion-active');
                // bodyAccordion.style.heigth = `${bodyAccordion.scrollHeigth}px`;

                if(this.classList.contains('accordion-active') && bodyAccordion.classList.contains('accordion-active')){
                    this.querySelector('span').innerHTML = '&#8722';
                    bodyAccordion.style.height = `${(bodyAccordion.scrollHeight + 60)}px`;
                } else {
                    this.querySelector('span').innerHTML = '&#43;';
                    bodyAccordion.style.height = `0`;
                }
            }) 
        }
    })
}
accordionQuestion();

// Робимо аккордеон для сторінці Catalog.
function accrdionCatalogFilter() {
    let headerAcardion = document.querySelectorAll('.catalog-filter-accardion__header');

    headerAcardion.forEach(element => {
        if(element){
            element.addEventListener('click', function() {
                this.classList.toggle('accordion-active');
                this.classList.toggle('oreng');
                this.nextElementSibling.classList.toggle('accordion-active');

                if(this.classList.contains('accordion-active') && this.nextElementSibling.classList.contains('accordion-active')){
                    this.nextElementSibling.style.height = `${(this.nextElementSibling.scrollHeight + 11)}px`;
                } else {
                    this.nextElementSibling.style.height = `0px`;
                }
            })
        }
    })
}
accrdionCatalogFilter();

function errorBlockHeight() {
    let blockError = document.querySelector('.main__error');

    if(blockError) {
        let header = document.querySelector('.header');
        
        if(window.innerWidth <= 576){
            blockError.style.height = `100vh`;
        } 
        else {
            blockError.style.height = `calc(100vh - ${header.clientHeight}px)`;
        }
    }
}
errorBlockHeight();



