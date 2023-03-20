<template>
  <div>
    <!--************Hero****************-->

    <section class="hero-section">
      <div class="header-info">
        <div class="container">
          <div class="header-info-content">
            <div class="header-info-content-item d-none d-lg-block" v-for="(data, index) in dataBanner.data" :key="index"
              v-if="data.type == 'topPromotionalBanner'">
              {{ data.title }}
            </div>
          </div>
        </div>
      </div>
      <hooper class="no-margin" :wheelControl="false">
        <slide class="item hero-section__bg" style="background-image:url(assets/img/Frame.png) ; background-size: cover;">
          <div class="container">
            <div class="hero-section__content">
              <h4>One Touch Of The Nature</h4>
              <h1>Welcome To Earthly Delight</h1>
              <button class="main-btn main-btn__border">
                Discover Now
              </button>
            </div>
          </div>
        </slide>
        <slide class="item hero-section__bg"
          style="background-image:url(assets/img/Frame2.png) ; background-size: cover;">
          <div class="container">
            <div class="hero-section__content">
              <h4>One Touch Of The Nature</h4>
              <h1>Welcome To Earthly Delight</h1>
              <button class="main-btn main-btn__border">
                Discover Now
              </button>
            </div>
          </div>
        </slide>
        <HooperPagination slot="hooper-addons"></HooperPagination>
      </hooper>
    </section>

    <!--**********Featured Category Section***********-->

    <section class="featured-category__section bgWhite pb-70 pt-100">
      <div class="container">
        <div class="section-header">
          <h2>Featured Categories</h2>
        </div>
        <div class="row featured-category__grid">
          <div class="featured-category__grid--item pb-30">
            <div class="product-card product-card__single">
              <div class="product-card__box">
                <figure class="product-image">
                  <img src="assets/img/about1.png" alt="Product">
                </figure>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__content--title">Flower</h3>
              </div>
            </div>
          </div>
          <div class="featured-category__grid--item pb-30">
            <div class="product-card product-card__single">
              <div class="product-card__box">
                <figure class="product-image">
                  <img src="assets/img/about3.png" alt="Product">
                </figure>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__content--title">Fruit</h3>
              </div>
            </div>
          </div>
          <div class="featured-category__grid--item pb-30">
            <div class="product-card product-card__single">
              <div class="product-card__box">
                <figure class="product-image">
                  <img src="assets/img/about4.png" alt="Product">
                </figure>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__content--title">Bonsai</h3>
              </div>
            </div>
          </div>
          <div class="featured-category__grid--item pb-30">
            <div class="product-card product-card__single">
              <div class="product-card__box">
                <figure class="product-image">
                  <img src="assets/img/maple.png" alt="Product">
                </figure>
              </div>
              <div class="product-card__content">
                <h3 class="product-card__content--title">Maple</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--****************Picture Section******************-->
    <section>
      <figure>
        <img src="assets/img/picture.png" alt="">
      </figure>
    </section>

    <!--***************New Product Section****************-->

    <section class="new-product__section bg-gray pt-100 pb-100">
      <div class="container">
        <div class="section-header">
          <h2>New Product</h2>
        </div>
        <div class="new-product__area">
          <hooper :settings="hooperNewProduct" :wheelControl="false" :infiniteScroll="false">
            <slide class="item slide-item__hot-deals" v-for="(data, index) in products.isNew" :key="index">
              <nuxt-link :to="`/product/${data.slug}`">
                <div class="product-card">
                  <div class="product-card__box">
                    <div class="product-card__info product-card__info--red product-card__info--left"
                      v-if="data.discount != 0">
                      {{ data.discount }}%
                    </div>
                    <div class="product-card__info product-card__info--blue product-card__info--right">
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
                    <p class="product-card__content--price" v-if="data.discount">
                      ৳
                      {{
                        Math.floor(
                          data.sellingPrice -
                          (data.sellingPrice * data.discount) / 100
                        )
                      }}
                    </p>
                    <p class="product-card__content--price" v-else>
                      ৳ {{ data.sellingPrice }}
                    </p>
                  </div>
                </div>
              </nuxt-link>
            </slide>

            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
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
          <slide class="item slide-item__hot-deals" v-for="(data, index) in dataBanner.data" :key="index"
            v-if="data.type == 'trendingOffers'">
            <div class="trending_offers--section">
              <div class="trending_offers--section--left">
                <h3>{{ data.title }}</h3>
                <p>{{ data.subTitle }}</p>
                <button>View More</button>
              </div>
              <div class="trending_offers--section--right">
                <img class="trending__img" :src="data.image" />
              </div>
            </div>
          </slide>

          <hooper-navigation slot="hooper-addons" class="hooper-trendingOffer_button"></hooper-navigation>
        </hooper>
      </div>
    </section>

    <!-- ***************News-letter Section****************-->

    <section class="newsletter-section pt-100 pb-100">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="newsletter-section__content">
              <h2>
                Join Our Mailing List And <span>Get 20% </span>Off Any Service.
              </h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text.
              </p>
              <div class="custom-input__group">
                <input type="email" placeholder="Enter email ID..." class="custom-input__field"/>
                <button class="custom-input__append">
                  Send
                </button>
              </div>
              <div class="custom-input__checkbox">
                <input type="checkbox" id="newsletterCheckbox" />
                <label for="newsletterCheckbox">We'll never spam you</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--***************Recent Article Section****************-->

    <section class="article--section pt-100 pb-70">
      <div class="container">
        <div class="section-header">
          <h2>Recent Articles</h2>
        </div>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6 pb-30 ">
            <nuxt-link to="/article">
              <div class="article--section-main">
                <img class="article--section__img" src="assets/img/article1.png" alt="">
                <p class="article--section__date">MAY 20, 2020</p>
                <h4 class="article--section__head">The Importance Importance of Trees..........</h4>
                <p class="article--section__para">Sed ut perspiciatis unde omnis iste natus error sit volupta
                  accusantium doloremque laudantium, totam rem aperia,
                  eaque natus error sit voluptatem
                </p>
                <a href="#" class="article--section__button">Read More</a>
              </div>
            </nuxt-link>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 pb-30 ">

            <nuxt-link to="/article">
              <div class="article--section-main">
                <img class="article--section__img" src="assets/img/article2.png" alt="">
                <p class="article--section__date">June 28, 2020</p>
                <h4 class="article--section__head">The Importance Importance of Trees..........</h4>
                <p class="article--section__para">Sed ut perspiciatis unde omnis iste natus error sit volupta
                  accusantium doloremque laudantium, totam rem aperia,
                  eaque natus error sit voluptatem
                </p>
                <a href="#" class="article--section__button">Read More</a>
              </div>
            </nuxt-link>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6 pb-30 ">

            <nuxt-link to="/article">
              <div class="article--section-main">
                <img class="article--section__img" src="assets/img/article3.png" alt="">
                <p class="article--section__date">September 03, 2021</p>
                <h4 class="article--section__head">The Importance Importance of Trees..........</h4>
                <p class="article--section__para">Sed ut perspiciatis unde omnis iste natus error sit volupta
                  accusantium doloremque laudantium, totam rem aperia,
                  eaque natus error sit voluptatem
                </p>
                <a href="#" class="article--section__button">Read More</a>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Progress as HooperProgress,
  Pagination as HooperPagination,
  Navigation as HooperNavigation,
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation,
  },
  data() {
    return {
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
            itemsToShow: 3,
          },
          1000: {
            itemsToShow: 4,
          },
        },
      },
      hooperTrendingOffer: {
        itemsToShow: 1,
        centerMode: false,
        breakpoints: {
          768: {
            centerMode: false,
            itemsToShow: 2,
          },
        },
      },
      dataBanner: [],
      products: [],
      isDataLoading: true,
    };
  },
  computed: {
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
      console.log("error from asyncData server");
      console.log(error);
    }
  },

  async created() {
    console.log("index page");
    const response = await this.callApi("get", "/app/landing_page/banners");
    if (response.status == 200) {
      this.dataBanner = response.data;
      console.log("index page");
      const [resProducts] =
        await Promise.all([
          this.callApi("get", "/app/landing_page/products"),
        ]);
      if (resProducts.status == 200) {
        this.products = resProducts.data;
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.isDataLoading = false;
    }
  },
};
</script>