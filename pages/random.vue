<template>
  <div>
        <!--************Navbar****************-->
        <header>
                <div class="navbar-mobile--wrapper d-lg-none" v-bind:class="{ 'active' : isSidebar}">
                    <div class="navbar-mobile">
                        <div class="navbar-mobile--head">
                            <div class="header-brand">
                                <a href="#">
                                    <img src="assets/img/brand.png" alt="Logo">
                                </a>
                            </div>
                            <button type="button" v-on:click="hideSidebar()">
                                <i>
                                    <img
                                        src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png" />
                                </i>
                            </button>
                        </div>
                        <ul class="navbar-mobile--body">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" v-on:click="mobileMenuDropdown(0)">
                                    Shop
                                </a>
                                <transition name="slide">
                                    <ul class="" v-if="mobileDropdownIndex===0">
                                        <li><a class="dropdown-item " href="#">Action</a></li>
                                        <li><a class="dropdown-item " href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </transition>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" v-on:click="mobileMenuDropdown(1)">
                                    Sale
                                </a>
                                <transition name="slide">
                                    <ul class="" v-if="mobileDropdownIndex===1">
                                        <li><a class="dropdown-item " href="#">Action</a></li>
                                        <li><a class="dropdown-item " href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </transition>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Product</a>
                            </li>
                        </ul>
                    </div>
                    <div class="navbar-mobile--info bg-gray" v-for="(data, index) in dataBanner.data" :key="index" v-if="data.type == 'topPromotionalBanner'">
                            <div class="navbar-mobile--info-item">{{ data.title }}</div>

                    </div>
                </div>
            <div class="navbar-cart--wrapper" v-bind:class="{ 'active' : isCart}">
                <div class="navbar-cart">
                    <div class="navbar-cart--head">
                        <h4>My Cart</h4>
                        <button type="button" v-on:click="hideCart()">
                            <i>
                                <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png" />
                            </i>
                        </button>
                    </div>
                    <div class="navbar-cart--body">
                        <i class="lni lni-cart-full"></i>
                        <p>Cart Is Empty</p>
                    </div>
                </div>
            </div>


            <div class="navbar-search" v-bind:class="{ 'active' : isSearchbar}" ref="searchBox">
                <div class="navbar-search-input">
                    <input type="text" placeholder="Search...">
                    <button type="button" class="search-button">
                        <i class="lni lni-search-alt"></i>
                    </button>
                </div>
                <div class="navbar-search-cancel">
                    <button type="button" class="cancel-button" v-on:click="isSearchbar=false">
                        <i>
                            <img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png" />
                        </i>
                    </button>
                </div>
            </div>

            <nav class="navbar navbar-expand-lg">
                <div class="container header-content">
                    <div class="navbar-item navbar-itemLogo">
                        <a class="navbar-brand" href="#">
                            <img src="/assets/img/brand.png" alt="Brand">
                        </a>
                    </div>
                    <div class="navbar-item d-none d-lg-block">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/market">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="/shop" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Shop
                                </a>
                                <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item " href="#">Action</a></li>
                                    <li><a class="dropdown-item " href="#">Another action</a></li>

                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Sale
                                </a>
                                <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item " href="#">Action</a></li>
                                    <li><a class="dropdown-item " href="#">Another action</a></li>

                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Pages</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Product</a>
                            </li>
                        </ul>
                    </div>
                    <div class="navbar-item">
                        <ul class="navbar-item__action">
                            <li>
                                <button v-on:click="showSearchbar()" ref="searchBoxSource">
                                    <i class="lni lni-search-alt"> </i>
                                </button>
                            </li>
                            <li>
                                <a class="nav-link" aria-current="page" href="/signIn"><i class="lni lni-user"></i></a>
                            </li>
                            <li>
                                <button v-on:click="showCart()">
                                    <i class="lni lni-cart"></i>
                                    <span class="navbar-action__badge">2</span>
                                </button>
                            </li>
                            <li>
                                <button v-on:click="showSidebar()">
                                    <i class="d-lg-none"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                            fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </i>
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

        </header>

        <!--************Hero****************-->
        <section class="hero-section">
            <div class="header-info">
                <div class="container">
                    <div class="header-info-content" >
                        <div class="header-info-content-item d-none d-lg-block" v-for="(data, index) in dataBanner.data" :key="index"
                        v-if="data.type == 'topPromotionalBanner'">{{data.title}}</div>

                    </div>
                </div>
            </div>

            <hooper class="no-margin" :wheelControl="false">
                <slide class="item hero-section__bg" v-for="(data, index) in dataBanner.data" :key="index"
                v-if="data.type == 'slider'"
                :style="{backgroundImage: `url(${data.image})`}">
                    <div class="container">
                        <div class="hero-section__content">
                            <h4>{{ data.subTitle }}</h4>
                        <h1>{{ data.title }}</h1>
                        <button class="main-btn main-btn__border">
                        {{ data.btn_text }}
                        </button>
                        </div>
                    </div>
                </slide>
                <HooperPagination slot="hooper-addons"></HooperPagination>
            </hooper>
        </section>

        <!--**********Latest Hot Deals*********-->

        <section class="hot-deals__section bg-gray pt-100 pb-70" v-if="isDataLoading == false && hotdeals!=null">
            <div class="container">
            <div class="section-header">
                <h2>Latest Hot Deals</h2>
                <div class="section-header__action">
                    <a href="#">View All Deals <i class="lni lni-chevron-right"></i></a>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4 col-lg-5 pb-30">
                    <div class="time-card">
                        <h3>{{hotdeals.title}}</h3>
                        <h4 class="t-clr-secondary">{{hotdeals.percentageTitle}}</h4>
                        <ul class="time-card__counter">
                            <li><span >{{ displayDay }}</span>DAYS</li>
                            <li><span >{{ displayHour }}</span>HRS</li>
                            <li><span >{{ displayMin }}</span>MIN</li>
                            <li><span >{{ displaySec }}</span>SEC</li>
                        </ul>
                        <a href="#" class="time-card__link">View All</a>
                    </div>
                </div>
                <div class="col-xl-8 col-lg-7 pb-30">
                    <div class="hot-deals__carousel--area">
                        <hooper :settings="hooperHotDeals" :wheelControl="false">
                            <slide class="slide-item__hot-deals" v-for="(data, index) in products.isHotDeal" :key="index">
                                <div class="product-card">
                                    <div class="product-card__box">
                                        <div
                                            class="product-card__info product-card__info--red product-card__info--left" v-if="data.discount != 0">{{ data.discount }}%</div>
                                        <div
                                            class="product-card__info product-card__info--blue product-card__info--right" v-if="data.isNew == 1">
                                            New</div>
                                        <figure class="product-image">
                                            <img :src="data.productImage" alt="Product" />
                                        </figure>
                                    </div>
                                    <div class="product-card__content">
                                        <h3 class="product-card__content--title">
                                            {{ data.productName }}
                                        </h3>
                                        <h4 class="product-card__content--subtitle">
                                            {{ data.model }}
                                        </h4>
                                        <p class="product-card__content--price">
                                            {{ data.sellingPrice }}
                                            <del> {{ data.sellingPrice }} </del>
                                        </p>
                                    </div>
                                </div>
                            </slide>

                            <hooper-navigation slot="hooper-addons" class="hooper-hotDeals_button">
                            </hooper-navigation>
                        </hooper>
                    </div>
                </div>
            </div>
            </div>
        </section>

    <!--***************Featured Product Section****************-->

        <section class="featured-product__section bg-gray pt-100 pb-70">
            <div class="container">
                <div class="section-header">
                <h2>Featured Product</h2>
                <div class="section-header__action">
                    <ul class="section-header__action--tab">
                    <li class="active" data-id="featured-product-1" v-for="(data, index) in categories.isMenuFeatured" :key="index"
                    >
                        {{ data.catName }}
                    </li>
                    </li>

                    </ul>
                </div>
                </div>
                <div class="featured-product__area">
                    <hooper :settings="hooperFeaturedProduct" :wheelControl="false">
                        <slide
                        class="item slide-item__hot-deals"
                        v-for="(data, index) in products.isFeatured" :key="index"
                        >
                        <div class="product-card">
                            <div class="product-card__box">
                            <div
                                class="product-card__info product-card__info--red product-card__info--left"
                                v-if="data.discount != 0"
                            >
                                {{ data.discount }}%
                            </div>
                            <div
                                class="product-card__info product-card__info--blue product-card__info--right"
                                v-if="data.isNew == 1"
                            >
                                New
                            </div>
                            <figure class="product-image">
                                <img :src="data.productImage" alt="Product" />
                            </figure>
                            </div>
                            <div class="product-card__content">
                            <h3 class="product-card__content--title">
                                {{ data.productName }}
                            </h3>
                            <h4 class="product-card__content--subtitle">
                                {{ data.model }}
                            </h4>
                            <p class="product-card__content--price">
                                {{ data.sellingPrice }} <del>{{ data.sellingPrice }}</del>
                            </p>
                            </div>
                        </div>
                        </slide>
                        <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    </hooper>
                </div>
            </div>
        </section>


        <!--**********Featured Category Section***********-->

        <section class="featured-category__section bgWhite pb-70 pt-100">
            <div class="container">
                <div class="section-header">
                    <h2>Featured Categories</h2>
                    <div class="section-header__action">
                        <a href="#">View All Categories<i class="lni lni-chevron-right"></i></a>
                    </div>
                </div>
                <div class="row featured-category__grid">
                    <div class="featured-category__grid--item pb-30">
                        <div class="product-card product-card__single">
                            <a href="#">
                                <div class="product-card__box">
                                    <figure class="product-image">
                                        <img src="/assets/img/fp1.png" alt="Product">
                                    </figure>
                                </div>
                                <div class="product-card__content">
                                    <h3 class="product-card__content--title f-weight__700 text-center t-clr__primary">
                                        DSLR Cameras</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!--***************Trending Offers Section****************-->

        <section class="trending-offers__section bgWhite pb-100 pt-100">
            <div class="container">
                <div class="section-header">
                    <h2>Trending Offers</h2>
                </div>

                <hooper :settings="hooperTrendingOffer" :wheelControl="false">
                    <slide class="item slide-item__hot-deals">
                        <div class="trending_offers--section">
                            <div class="trending_offers--section--left">
                                <h3>The best Travel Cameras in 2022 </h3>
                                <p>Go to place where you’renot going stresed</p>
                                <button>View More</button>
                            </div>
                            <div class="trending_offers--section--right">
                                <img class="trending__img" src="/assets/img/trending.png">
                            </div>
                        </div>
                    </slide>
                    <hooper-navigation slot="hooper-addons" class="hooper-trendingOffer_button"></hooper-navigation>
                </hooper>

            </div>
        </section>


        <!--***************Featured Product Section****************-->

        <section class="featured-product__section bg-gray pt-100 pb-100">
            <div class="container">
                <div class="section-header">
                    <h2>Featured Product</h2>
                    <div class="section-header__action">
                        <ul class="section-header__action--tab">
                            <li class="active" data-id="featured-product-1">DIGITAL CAMERA</li>
                            <li data-id="featured-product-2">FILM CAMERA</li>
                            <li data-id="featured-product-3">MEDIUM FORMAT</li>
                            <li data-id="featured-product-4">MIRRORLESS</li>
                            <li data-id="featured-product-5">360 CAMERAS</li>
                        </ul>
                    </div>
                </div>
                <div class="featured-product__area">

                    <hooper :settings="hooperFeaturedProduct" :wheelControl="false">
                        <slide class="item slide-item__hot-deals">
                            <div class="product-card">
                                <div class="product-card__box">
                                    <div class="product-card__info product-card__info--blue product-card__info--right">
                                        New
                                    </div>
                                    <figure class="product-image">
                                        <img src="/assets/img/np1.png" alt="Product">
                                    </figure>
                                </div>
                                <div class="product-card__content">
                                    <h3 class="product-card__content--title">Digital Camera</h3>
                                    <h4 class="product-card__content--subtitle">Sony ZV-1</h4>
                                    <p class="product-card__content--price">$180.00 <del>$180.00</del></p>
                                </div>
                            </div>
                        </slide>

                        <hooper-navigation slot="hooper-addons"></hooper-navigation>
                    </hooper>
                </div>
            </div>
        </section>

        <!--***************News-letter Section****************-->

        <div class="newsletter-section pt-100 pb-100">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 col-md-7 col-sm-7">
                        <div class="newsletter-section__content">
                            <h2>Join Our Mailing List And <span>Get 20% </span>Off Any Service.</h2>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                            <div class="custom-input__group">
                                <input type="text" placeholder="Enter email ID..." class="custom-input__field" v-model="data.email">
                                <button class="custom-input__append"  @click="sendMail()">Send</button>
                            </div>
                            <div class="custom-input__checkbox">
                                <input type="checkbox" id="newsletterCheckbox">
                                <label for="newsletterCheckbox">We'll never spam you</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-5">
                        <div class="newsletter-section__image">
                            <img src="assets/img/mail-form-camera.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--***************Recent Article Section****************-->

        <section class="article__section pt-100 pb-70">
            <div class="container">
                <div class="section-header">
                    <h2>Recent Articles</h2>
                    <div class="section-header__action">
                        <a href="#">View All Post<i class="lni lni-chevron-right"></i></a>
                    </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 article--section" v-for="(data, index) in articles.data" :key="index">
                    <img
                      class="article--section__img"
                      :src="data.image"
                      alt=""
                    />
                    <p class="article--section__date">{{data.created_at}}</p>
                    <h4 class="article--section__head">
                      {{data.title}}
                    </h4>
                    <p class="article--section__para">
                      {{data.details}}
                    </p>
                    <button class="article--section__button">Read More</button>
                  </div>
                </div>
            </div>
        </section>


        <!--***************Footer Section***************-->

        <section class="footer__section bg-gray pt-50">
            <div class="footer__section">
                <div class="container">
                    <div class="footer__section--main row">
                        <div class="col-lg-4 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head"><img src="/assets/img/icon (1).png"
                                        class="footer--image">Free Shipping Orders $60+</h4>
                                <p class="footer__section--content--para">Moves So Quickly That</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head"><img src="/assets/img/icon (2).png"
                                        class="footer--image">24/7 Customer Support</h4>
                                <p class="footer__section--content--para">Moves So Quickly That</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head"><img src="/assets/img/icon (3).png"
                                        class="footer--image">100% Secure Payments</h4>
                                <p class="footer__section--content--para">PayPal / MasterCard</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer__section--last row">
                        <div class="col-lg-3 col-md-6">
                            <div class="footer__section--content part-1">
                                <h4 class="footer__section--content--head">Subscribe</h4>
                                <p class="footer__section--content--para">Enter Email Address Get $20 Off Your
                                    First Order
                                </p>
                                <input class="footer__section--content--input" type="text" placeholder="Enter Email">
                                <div class="footer__section--content--icon">
                                    <i
                                        class="lni lni-facebook-filled css-1gu8igg footer__section--content--icon_item slide-item__hot-deals"></i>
                                    <i class="lni lni-twitter-original footer__section--content--icon_item"></i>
                                    <i class="lni lni-instagram-filled footer__section--content--icon_item"></i>
                                    <i class="lni lni-youtube footer__section--content--icon_item"></i>
                                    <i class="lni lni-pinterest footer__section--content--icon_item"></i>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head">Our Stores</h4>
                                <p class="footer__section--content--para">New York</p>
                                <p class="footer__section--content--para">London SF</p>
                                <p class="footer__section--content--para">Cockfosters BP</p>
                                <p class="footer__section--content--para">Los Angeles</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head">Useful Links</h4>
                                <p class="footer__section--content--para">Privacy Policy</p>
                                <p class="footer__section--content--para">Returns</p>
                                <p class="footer__section--content--para">Terms & Conditions</p>
                                <p class="footer__section--content--para">Contact Us</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="footer__section--content">
                                <h4 class="footer__section--content--head">My Account</h4>
                                <p class="footer__section--content--para">My Account</p>
                                <p class="footer__section--content--para">Order History</p>
                                <p class="footer__section--content--para">Wish List</p>
                                <p class="footer__section--content--para">Newsletter</p>
                            </div>
                        </div>
                    </div>

                    <p class="footer__section--copyright pt-30 pb-30">copyright © 2022 cameraworld.com all rights
                        reserved
                    </p>
                </div>
            </div>
        </section>


    </div>
  </div>
</template>

<style lang="scss">
.slide {
    &-enter {
        overflow: hidden;
        max-height: 0;

        &-to {
            max-height: 500px;
            overflow: hidden;
        }

        &-active {
            -moz-transition-duration: 0.5s;
            -webkit-transition-duration: 0.5s;
            -o-transition-duration: 0.5s;
            transition-duration: 0.5s;
            -moz-transition-timing-function: ease-in;
            -webkit-transition-timing-function: ease-in;
            -o-transition-timing-function: ease-in;
            transition-timing-function: ease-in;
        }
    }

    &-leave {
        @extend .slide-enter-to;

        &-to {
            @extend .slide-enter;
        }

        &-active {
            -moz-transition-duration: 0.5s;
            -webkit-transition-duration: 0.5s;
            -o-transition-duration: 0.5s;
            transition-duration: 0.5s;
            -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
            transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        }
    }
}
</style>

<script>
import {
    Hooper,
    Slide,
    Progress as HooperProgress,
    Pagination as HooperPagination,
    Navigation as HooperNavigation
}
    from 'hooper';;
import 'hooper/dist/hooper.css';
export default {
    components: {
        Hooper,
        Slide,
        HooperProgress,
        HooperPagination,
        HooperNavigation
    },

    data() {
        return {
            isSidebar: false,
            isSearchbar: false,
            isCart: false,
            mobileDropdownIndex: -1,
            isSidebar: false,

            hooperHotDeals: {
                itemsToShow: 1.2,
                centerMode: false,
                breakpoints: {
                    500: {
                        centerMode: false,
                        itemsToShow: 2,
                    },
                    1000: {
                        itemsToShow: 2,
                    },
                    1200: {
                        itemsToShow: 3,
                    }
                }
            },
            hooperNewProduct: {
                itemsToShow: 1,
                centerMode: false,
                breakpoints: {
                    450: {
                        centerMode: false,
                        itemsToShow: 2,
                    },
                    800: {
                        centerMode: false,
                        itemsToShow: 3
                    },
                    1000: {
                        itemsToShow: 4,
                    }
                }
            },
            hooperTrendingOffer: {
                itemsToShow: 1,
                centerMode: false,
                breakpoints: {
                    768: {
                        centerMode: false,
                        itemsToShow: 2
                    },

                }
            },
            hooperFeaturedProduct: {
                itemsToShow: 1,
                centerMode: false,
                breakpoints: {
                    450: {
                        centerMode: false,
                        itemsToShow: 2,
                    },
                    800: {
                        centerMode: false,
                        itemsToShow: 3,
                    },
                    1000: {
                        itemsToShow: 4,
                    }
                }
            },
            dataBanner:[],
            categories:[],
            products:[],
            hotdeals:[],
            articles:[],
            data: {
                email: "",
            },
        }

    },

    computed: {
        _seconds: ()=> 1000,
        _minutes(){
          return this._seconds * 60;
        },
        _hours(){
          return this._minutes * 60;
        },
        _days(){
          return this._hours * 24;
        }
    },
    methods: {

        showSidebar() {
            this.isSidebar = true;
        },
        hideSidebar() {
            this.isSidebar = false;
        },
        showSearchbar() {
            this.isSearchbar = true;
        },
        hideSearchbar(e) {
            if (this.isSearchbar) {
                let target = e.target;
                var container = this.$refs.searchBox;
                var source = this.$refs.searchBoxSource;

                if (!source.contains(target) && !container.contains(target)) {
                    this.isSearchbar = false;
                }
            }
        },
        showCart() {
            this.isCart = true;
        },
        hideCart() {
            this.isCart = false;
        },

        mobileMenuDropdown(index) {
            if (this.mobileDropdownIndex === index) {

                this.mobileDropdownIndex = -1;

            } else {

                this.mobileDropdownIndex = index;

            }
        },

        showRemaining(hotdeals) {
          // console.log("Calling Show Remaining", hotdeals);
          const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(hotdeals.endTime);
            const distance = end.getTime() - now.getTime();

            if(distance<0){
              clearInterval(timer);
              this.displaySec = "00";
              this.displayMin = "00";
              this.displayHour = "00";
              this.displayDay = "00";
              return
            }

          const days = Math.floor(distance / this._days);
          const hours = Math.floor((distance % this._days) / this._hours);
          const minutes = Math.floor((distance % this._hours) / this._minutes);
          const seconds = Math.floor((distance % this._minutes)/ this._seconds);

          this.displaySec = seconds < 10 ? "0" + seconds : seconds;
          this.displayMin = minutes < 10 ? "0" + minutes : minutes;
          this.displayHour = hours < 10 ? "0" + hours : hours;
          this.displayDay = days < 10 ? "0" + days : days;
          }, 1000);
        },

        async sendMail(){
          // if (this.data.email.trim() == "")
          //           return this.e("Email is required");
          this.isDataLoading = true;
          const res = await this.callApi("post", "/app/landing_page/send_mail", this.data);
                if (res.status === 200) {
                    return this.e("Email is required");
                    this.data.email = "";
                } else {
                    this.e("Oops!", "Something went wrong, please try again!");
                }
                this.isDataLoading = false;
        }
    },
    async asyncData({ app, store, redirect, params }) {
      try {
        let [res1] = await Promise.all([
          app.$axios.get(`/app/landing_page/banners`),
        ]);

        return {
          dataBanner: res1.data,
        };
      } catch (error) {
        console.log('error from asyncData server');
        console.log(error);
      //   return redirect("/");
      }
    },

    async created() {
      console.log("index page");
      const [resHotdeals, resCategories, resProducts, resArticles] = await Promise.all([
        this.callApi("get", "/app/landing_page/hotdeals"),
        this.callApi("get","/app/landing_page/categories"),
        this.callApi("get", "/app/landing_page/products"),
        this.callApi("get", "/app/landing_page/articles"),
        this.callApi("get", "/app/landing_page/articles"),

      ]);

      if (resHotdeals.status == 200 && resCategories.status == 200 && resProducts.status == 200 && resArticles.status == 200) {
        if(resHotdeals.data.data.length > 0){
              this.hotdeals = resHotdeals.data.data[0];
              this.showRemaining(this.hotdeals);

        }

        this.categories = resCategories.data;
        this.products = resProducts.data;
        this.articles = resArticles.data;
      }

      else this.e("Oops!", "Something went wrong, please try again!");

      this.isDataLoading = false;

    },
    mounted() {
        document.addEventListener('click', this.hideSearchbar)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideSearchbar)
    }

}
</script>
