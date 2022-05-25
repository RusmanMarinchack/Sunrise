'use strict'

new Swiper('.block-body__swiper', {
    pagination: {
        el: '.block-body__swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}"><span></span></span>`
        }
    }
});


function burgerActive() {
    let btnBurger = document.querySelector('.nav__burger');
    let navMenu = document.querySelector('.nav__wrapper-burger');

    btnBurger.addEventListener('click', function () {
        this.classList.toggle('_burger-active');
        navMenu.classList.toggle('_burger-active');
    })
}
burgerActive();



function menuCatalog() {
    let catalogItems = document.querySelectorAll('.block-catalog__item');
    let headerContentShadow = document.querySelector('.header-content__shadow');

    catalogItems.forEach(element => {
        element.addEventListener('click', function () {
            remuveClassActive();

            let dataSubMenu = this.getAttribute('data-sub-menu');
            let subMenuCatalog = document.querySelector(`.catalog-sub-menu_${dataSubMenu}`);

            subMenuCatalog.classList.add('catalog-sub-menu-active');


            if (subMenuCatalog.classList.contains('catalog-sub-menu-active')) {
                headerContentShadow.classList.add('shadow-active');

                headerContentShadow.addEventListener('click', function () {
                    headerContentShadow.classList.remove('shadow-active');
                    subMenuCatalog.classList.remove('catalog-sub-menu-active');
                })
            }
        })
    })


    function remuveClassActive() {
        document.querySelectorAll('.catalog-sub-menu').forEach(element => {
            element.classList.remove('catalog-sub-menu-active');
        })
    }
}
menuCatalog();

function subMenuMobile() {


    // if(catalogBtn.classList.contains('catalog-btn')){

    // let catalogBtnClass = document.querySelector('catalog-btn');


    // }

    // catalogBtn
}
subMenuMobile();





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
            console.log(e.target.classList.value)
            let navMenuWrapper = document.querySelector('.nav__manu-wrapper');



            if (e.target.classList[0]  === "nav__link-catalog" || e.target.classList.value === 'nav__link _icon-right') {
                let catalog = document.querySelector('.nav__link-catalog');
                let catalogBtn = document.querySelector('.block-catalog__text');
                let navMenu = document.querySelector('.nav__manu');
                // let navMenuWrapper = document.querySelector('.nav__manu-wrapper');

                // catalog.addEventListener('click', function() {



                catalogBtn.classList.add('catalog-btn');
                navMenuWrapper.innerHTML = blickCatalog.innerHTML;

                // if(catalogBtn.classList.contains('catalog-btn')){
                //     catalogBtn.addEventListener('click', function() {
                //         console.log(1);
                //         // this.classList.remove('catalog-btn');
                //         // navMenuWrapper.innerHTML = navMenu.innerHTML;
                //     })
                // }
                // })
            }

            console.log(e.target.classList.value === 'block-catalog__text catalog-btn')

            if (e.target.classList.value === 'block-catalog__text catalog-btn') {

                navMenuWrapper.innerHTML = navMenuClone.innerHTML;
                console.log(navMenu)
            }


            if (e.target.classList.value === 'nav__burger-span') {
                document.querySelector('.catalog-sub-menu__title').classList.remove('title-btn');
                navMenuWrapper.innerHTML = navMenuClone.innerHTML;
            }

            if (e.target.classList.value === 'block-catalog__item _icon-right blocking') {

                let itemData = e.target.getAttribute('data-sub-menu');
                let catalogSubMneu = document.querySelector(`.catalog-sub-menu_${itemData}`)

                console.log(catalogSubMneu);
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
        let navMenu = document.querySelector('.nav__manu-wrapper');
        let navMenuClone = navMenu.cloneNode(true)
        let navMenuWrapper = document.querySelector('.nav__manu-wrapper');
        navMenuWrapper.innerHTML = navMenuClone.innerHTML;

        document.querySelectorAll('.block-catalog__item').forEach(element => {
            element.classList.remove('blocking');
        })
        return
    }
}