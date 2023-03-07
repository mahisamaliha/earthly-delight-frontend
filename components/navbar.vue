<template>
  <!--************Navbar****************-->
  <header>
    <div class="navbar-mobile--wrapper d-lg-none" v-bind:class="{ active: isSidebar }">
      <div class="navbar-mobile">
        <div class="navbar-mobile--head">
          <div class="header-brand">
            <nuxt-link to="/">
              <img src="/assets/img/brand.png" alt="Brand" />
            </nuxt-link>
          </div>
          <button type="button" v-on:click="hideSidebar()">
            <i class="lni lni-close"></i>
          </button>
        </div>
        <ul class="navbar-mobile--body">
          <li class="nav-item">
            <nuxt-link class="nav-link active" aria-current="page" to="/">Home</nuxt-link>
          </li>
          <li class="nav-item dropdown">
            <nuxt-link class="nav-link dropdown-toggle" to="/shop" v-on:click="mobileMenuDropdown(0)">
              Shop
            </nuxt-link>
            <transition name="slide">
              <ul class="" v-if="mobileDropdownIndex === 0">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </transition>
          </li>
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              v-on:click="mobileMenuDropdown(1)"
            >
              Sale
            </a>
            <transition name="slide">
              <ul class="" v-if="mobileDropdownIndex === 1">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </transition>
          </li> -->
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/about">About Us</nuxt-link>
          </li>
          <!-- <li class="nav-item">
            <nuxt-link class="nav-link" to="/wishlist">Wishlist</nuxt-link>
          </li> -->
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/auction">Auction</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/contactUs">Contact Us</nuxt-link>
          </li>
        </ul>
        <div class="navbar-mobile--info bg-gray">
          <div class="navbar-mobile--info-item" v-for="(data, index) in dataBanner.data" :key="index"
            v-if="data.type == 'topPromotionalBanner'">
            {{ data.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-cart--wrapper" v-bind:class="{ active: isCart }">
      <div class="navbar-cart">
        <div class="navbar-cart--head">
          <h4>My Cart</h4>
          <button type="button" v-on:click="hideCart()">
            <i class="lni lni-close"></i>
          </button>
        </div>
        <div class="navbar-cart--body">
          <i class="lni lni-cart-full"></i>
          <p>Cart Is Empty</p>
        </div>
      </div>
    </div>
    <div class="navbar-search" v-bind:class="{ active: isSearchbar }" ref="searchBox">
      <div class="navbar-search-input">
        <input type="text" placeholder="Search..." v-model="search" />
        <button type="button" class="search-button">
          <i class="lni lni-search-alt"></i>
        </button>
      </div>
      <div class="navbar-search-cancel">
        <button type="button" class="cancel-button" v-on:click="isSearchbar = false">
          <i class="lni lni-close"></i>
        </button>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg">
      <div class="container header-content">
        <div class="navbar-item navbar-itemLogo">
          <nuxt-link class="navbar-brand" to="/">
            <img src="/assets/img/brand.png" alt="Brand" />
          </nuxt-link>
        </div>
        <div class="navbar-item d-none d-lg-block">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link class="nav-link active" aria-current="page" to="/">Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" aria-current="page" to="/shop">Shop</nuxt-link>
            </li>
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sale
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li> -->
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/about">About Us</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/auction">Auction</nuxt-link>
            </li>
            <!-- <li class="nav-item">
              <nuxt-link class="nav-link" to="/wishlist">Wishlist</nuxt-link>
            </li> -->
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/feedback">Contact Us</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="navbar-item">
          <ul class="navbar-item__action">
            <!-- <li>
              <button v-on:click="showSearchbar()" ref="searchBoxSource">
                <i class="lni lni-search-alt"> </i>
              </button>
            </li> -->
            <li>
              <template v-if="authUser">
                <nuxt-link class="nav-link" aria-current="page" to="/dashboard-profile"><i
                    class="lni lni-user"></i></nuxt-link>
              </template>
              <template v-else-if="!authUser"><nuxt-link class="nav-link" aria-current="page" to="/signIn"><i
                    class="lni lni-user"></i></nuxt-link></template>
            </li>
            <li>
              <button v-on:click="showCart()">
                <i class="lni lni-cart"></i>
                <span class="navbar-action__badge"
                  v-if="cartItem != undefined && cartItem.length > 0">{{ this.cartItem.length }}</span>
                <span class="navbar-action__badge" v-else>0</span>
              </button>
            </li>
            <li>
              <button v-on:click="showSidebar()">
                <i class="d-lg-none"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-list" viewBox="0 0 16 16">
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
</template>

<script>
import { mapGetters } from 'vuex'
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
      data: {
        email: "",
      },
      isSidebar: false,
      isSearchbar: false,
      isCart: false,
      mobileDropdownIndex: -1,
      dataBanner: [],
      filter: {
        search: "",
      },
      search: "",
      results: [],
      isDataLoading: true,
    };
  },
  watch: {
    search(after, before) {
      this.getResults();
    },
  },
  computed: {
    ...mapGetters({
      cartItem: 'getCartItem',
    })
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
      this.$router.push('/cart')
      // this.isCart = true;
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
    async filterProducts() {
      this.isLoading = true;
      const response = await this.callApi(
        "get",
        `/app/shop/product/list?search=${this.search}`
      );
      if (response.status == 200) {
        this.products = response.data.data;
      } else this.swr();
      this.isLoading = false;
    },
    getSearchedProduct(result) {
      //     const res = await this.callApi(
      //     "get",
      //     `/api/get_profile_info/${this.user_id}`
      // );
      this.product_id = result.id;
      this.$router.push(`/profile/${this.product_id}`);
      this.search = "";
    },
    async getResults() {
      this.isLoading = true;
      // axios
      //   .get("/app/shop/product/list", {
      //     params: { category: this.search },
      //   })
      //   .then((res) => (this.results = res.data))
      //   .catch((error) => {});
      const response = await this.callApi(
        "get",
        `/app/shop/product/list?category=${this.search}|brand=${this.search}|model=${this.search}|tags=${this.search}`
      );
      if (response.status == 200) {
        this.results = response.data.data;
      } else this.swr();
      this.isLoading = false;
    },
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
      //   return redirect("/");
    }
  },
  async created() {
    console.log("index page");
    console.log(this.cartItem);
    this.isDataLoading = false;
    await this.filterProducts();
    const response = await this.callApi("get", "/app/landing_page/banners");
    if (response.status == 200) {
      this.dataBanner = response.data;
      this.isDataLoading = false;
    }
  },
  mounted() {
    document.addEventListener("click", this.hideSearchbar);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },
};
</script>

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