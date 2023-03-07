<template>
  <div>
    <!-- <Navbar /> -->
    <div class="header-info">
      <div class="container">
        <div class="header-info-content">
          <div class="header-info-content-item d-none d-lg-block">
            Refer a Friend. Get 20% Off
          </div>
          <div class="header-info-content-item d-none d-lg-block">
            Subscribe Today Get $10 Off
          </div>
          <div class="header-info-content-item d-none d-lg-block">
            Free Shipping +30 Day Returns
          </div>
        </div>
      </div>
    </div>
    <!--************Product****************-->

    <section class="product-section container pt-50">
      <div class="product-picture">
        <div class="product-picture--max">
          <div class="product-picture--max---card">
            <figure class="product-image">
              <img :src="mainImages.url" alt="Product" />
              <!-- <img src="/assets/img/product-max.png" alt="Product" /> -->
            </figure>
          </div>
        </div>
        <!-- <hooper
          :vertical="true"
          style="height: 400px"
          v-if="(allImages.length>0)"
          :settings="hooperProduct"
          :itemsToShow="4.5"
          class="product-picture--min"
        >
          <slide class="product-picture--min---card" v-for="(image,index) in allImages" :key="index">
            <figure class="product-image" @click="(mainImages=image)">
              <img :src="image.url" alt="Product" />
            </figure>
          </slide>
          <hooper-navigation v-if="(allImages.length>3)? true : false" slot="hooper-addons"></hooper-navigation>
        </hooper> -->

      </div>
      <div class="product-details">
        <h4 class="title">{{productDetails.productName}}</h4>
        <div class="product-details--rating">
          <div class="product-details--rating---review">
            <div class="rating-icon">
              <template v-if="this.customerRating > 0">
                <i v-if="this.customerRating>0" class="las la-star"></i>
                <i v-if="this.customerRating>1" class="las la-star"></i>
                <i v-if="this.customerRating>2" class="las la-star"></i>
                <i v-if="this.customerRating>3" class="las la-star"></i>
                <i v-if="this.customerRating>4" class="las la-star"></i>

              </template>
              <template v-if="this.productDetails.average_rating == null">
                <span><i class="las la-star noactive"></i></span>
                  <span><i class="las la-star noactive"></i></span>
                  <span><i class="las la-star noactive"></i></span>
                  <span><i class="las la-star noactive"></i></span>
                  <span><i class="las la-star noactive"></i></span>
              </template>
            </div>
          </div>
          <h4>
            {{ productDetails.sellingPrice
            }}<span>{{ productDetails.sellingPrice }}</span>
          </h4>
        </div>
        <!-- <div class="product-varient d-flex">
                <template v-if="allVariation.length > 0">

                    <div class="pro-color" v-for="(item,index) in allVariation" :key="index">
                        <select v-model="productVariation[item.name]" @change="getVariableProduct">
                            <option value=""  disabled selected>{{item.name}}</option>
                            <option v-for="(val,i) in item.values" :key="i" :value="val.value" >{{val.value}}</option>
                        </select>
                    </div>
                </template>
            </div> -->
        <div class="product-details--text">
        <p>
          </p>
        </div>
        <div class="product-details--quantity">
          <h4>Quantity :</h4>
          <div class="product-details--quantity---button">
            <div class="min-max">
              <button>
                <i
                  class="las la-minus"
                  @click="changeQuantityNumber(2, -1)"
                ></i>
              </button>
              <input type="text" v-model="quantity" />

              <button>
                <i class="las la-plus" @click="changeQuantityNumber(1, 1)"></i>
              </button>
            </div>
            <button @click="addCart"><i class="las la-plus"></i>Add To Cart</button>
          </div>
        </div>
        <!-- <h4 class="product-details--category">
          Category: <span>{{ productDetails.catName }}</span>
        </h4> -->
        <div class="product-details--wishlist">
          <i @click="addWishList(productDetails)" v-if="isWishlist" class="lar la-heart wishList active"></i>
          <i @click="addWishList(productDetails)" v-if="!isWishlist" class="lar la-heart wishList"></i>
          <h5 class="wishList" @click="addWishList(productDetails)">Add to Wishlist</h5>
        </div>
        <div class="product-details--social">
          <span>Share This Product:</span>
          <ul class="social-list">
            <li><i class="lab la-facebook-f"></i></li>
            <li><i class="lab la-twitter"></i></li>
            <li><i class="lab la-instagram"></i></li>
            <li><i class="lab la-youtube"></i></li>
            <li><i class="lab la-pinterest"></i></li>
          </ul>
        </div>
      </div>
    </section>

    <!--************Description****************-->

    <section class="tab-section pt-50 pb-50">
      <div class="section-header__action container">
        <ul class="section-header__action--tab">
          <li
            v-bind:class="{ active: isProductInfoIndex === 1 }"
            v-on:click="showProductInfo(1)"
          >
            Description
          </li>

          <li
            v-bind:class="{ active: isProductInfoIndex === 3 }"
            v-on:click="showProductInfo(3)"
          >
            Reviews (3)
          </li>
        </ul>
      </div>
      <div class="description-tab" v-if="isProductInfoIndex === 1">
        <div
          class="description-tab--details container pt-30"
          v-html="productDetails.brief_description"
        ></div>
      </div>

      <div class="additional-tab pb-50 pt-50" v-if="isProductInfoIndex === 2">
        <div class="container">
          <div class="additional-tab--info">
            <ul class="title">
              <li>Weight:</li>
              <!-- <li>Color:</li>
              <li>Size:</li> -->
              <li>Model:</li>
              <li>Brand:</li>
              <li>Other Info:</li>
            </ul>
            <ul class="subtitle">
              <li>400g</li>
              <!-- <li>{{ productDetails.description.Color }}</li>
              <li>{{ productDetails.description.Size }}</li> -->
              <li>{{ productDetails.model }}</li>
              <li>{{ productDetails.brandName }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="review-tab container pb-50 pt-50"
        v-if="isProductInfoIndex === 3"
      >
        <div v-if="(allReviews.length > 0)" class="review-tab--list">
         <!-- {{data.user}} -->
          <div class="review-tab--customer pb-30"  v-for="(data,index) in allReviews" :key="index">
            <div class="customer-picture">
              <figure>
                <img :src="data.users.image" alt="Product" />
              </figure>
            </div>
            <div class="customer-review">
              <div class="customer-review--info">
                <h4>{{data.users.name}}</h4>
                <div class="rating-icon" >
                  <i v-for="(item,index) in data.rating" :key="index" class="las la-star"></i>
                </div>
                <h5>Reply</h5>
              </div>
              <p>
                {{data.content}}
              </p>
            </div>
          </div>
         <!-- <div class="review-tab--customer pb-30">
            <div class="customer-picture">
              <figure>
                <img src="/assets/img/customer2.png" alt="Product" />
              </figure>
            </div>
            <div class="customer-review">
              <div class="customer-review--info">
                <h4>White Lewis</h4>
                <div class="rating-icon">
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                </div>
                <h5>Reply</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet, constetur adipiscing elit. Etiam eu
                turpis mol, dictum est a, mattis tellus. Sed dignissim, metus
                nec fringiirilla accumsanaa, risus
              </p>
            </div>
          </div> -->
        <!--<div class="review-tab--customer">
            <div class="customer-picture">
              <figure>
                <img src="/assets/img/customer3.png" alt="Product" />
              </figure>
            </div>
            <div class="customer-review">
              <div class="customer-review--info">
                <h4>White Lewis</h4>
                <div class="rating-icon">
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                  <i class="las la-star"></i>
                </div>
                <h5>Reply</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet, constetur adipiscing elit. Etiam eu
                turpis mol, dictum est a, mattis tellus. Sed dignissim, metus
                nec fringiirilla accumsanaa, risus
              </p>
            </div>
          </div>-->
        </div>
        <div class="review-tab--input" id="review">
          <h4 class="title">Add a Review</h4>
          <div class="sub-title">
            <div class="header">Your Rating:</div>
            <div class="rate">
              <input type="radio" id="star5" name="rate" value="5" v-model="reviewForm.rating" />
              <label for="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value="4" v-model="reviewForm.rating" />
              <label for="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value="3" v-model="reviewForm.rating" />
              <label for="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value="2" v-model="reviewForm.rating" />
              <label for="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value="1" v-model="reviewForm.rating" />
              <label for="star1" title="text">1 star</label>
            </div>
          </div>
          <div class="review-tab--input---area">
            <div class="custom-input__group">
              <input
                class="custom-input__field"
                type="text"
                placeholder="Name"
              />
            </div>
            <div class="custom-input__group">
              <input
                class="custom-input__field"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="review-tab--input---text-area">
            <form>
              <textarea v-model="reviewForm.content" placeholder="Your Message"></textarea>
            </form>
          </div>
          <div class="submit-button">
            <button @click="addReview">Submit</button>
          </div>
        </div>
      </div>
    </section>

    <!--************Trending Products****************-->

    <section class="trending-section pt-50 pb-50">
      <div class="trending-header container">
        <h4>Related Product</h4>
        <h5>
          Mirum est notare quam littera gothica quam nunc putamus parum claram!
        </h5>
      </div>
      <div class="featured-product__area">
        <div class="container">
          <hooper :settings="hooperFeaturedProduct" :wheelControl="false"><slide  class="item"  v-for="(data, index) in trending"  :key="index">
            <nuxt-link :to="`/product/${data.slug}`">
            <div class="pb-30">
              <div class="product-card">
                <div class="product-card__box">
                  <div  class="product-card__info product-card__info--red product-card__info--left"  v-if="data.discount != 0">
                    {{ data.discount }}%
                  </div>
                  <div  class="product-card__info product-card__info--blue product-card__info--right"  v-if="data.isNew == 1">
                    New
                  </div>
                  <figure class="product-image">
                    <img :src="data.productImage" alt="Product" />
                    <!-- <img src="/assets/img/np3.png" alt="Product" /> -->
                  </figure>
                </div>
                <div class="product-card__content">
                  <h3 class="product-card__content--title">
                    {{ data.groupeName }}
                  </h3>
                  <p class="product-card__content--price">
                    {{ data.sellingPrice }}
                    <del> {{ data.sellingPrice }} </del>
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
          </slide>
          <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
          <!-- <div
            class="item col-lg-3 col-md-6 col-sm-6"
            v-for="(data, index) in trending"
            :key="index"
          >
          <nuxt-link :to="`/product/${data.slug}`">
            <div class="pb-30">
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
                    {{ data.sellingPrice }}
                    <del> {{ data.sellingPrice }} </del>
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
          </div> -->
        </div>
      </div>
    </section>

    <!--***************Footer Section***************-->
    <!-- <BottomContainer /> -->
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
// import Navbar from "/components/navbar.vue";
// import BottomContainer from "/components/footer";

export default {
  components: {
    Hooper,
    Slide,
    HooperProgress,
    HooperPagination,
    HooperNavigation,
    // Navbar,
    // BottomContainer,
  },
  data() {
    return {
      isSidebar: false,
      isSearchbar: false,
      isCart: false,
      isFilter: false,
      mobileDropdownIndex: -1,
      isProductInfoIndex: 1,
      hooperProduct: {
        centerMode: false,
        wheelControl: false,
      },
      productVariation:{},
      allReviews:[],
      allVariation:[],
      reviewForm:{
        productId:-1,
        rating:0,
        content:'',
        userId:0
      },
      productVariation :{

      },
      variableProduct:{id:0},
      isLoading: true,
      productDetails: "",
      customerRating:0,
      reviews: [],
      trending: [],
      product:{},
      // productVariation:[],
      mainImages:'',
      allImages:[],
      quantity: 1,
      isWishlist:false,
      wishList:{
        userId:0,
        productId:-1,
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
          },
        },
      },
    };

  },
  methods: {
    showProductInfo(index) {
      this.isProductInfoIndex = index;
    },
    changeQuantityNumber(type, q) {
      if (q + this.quantity < 1) return;
      this.quantity += q;
      if(this.product.stock < this.quantity){
        this.i("Stock Limited Execeed!")
      }
    },
    async getVariableProduct(){
      let variation = {}
      // console.log(this.productVariation);
      for(let d of this.allVariation){
            if(this.productVariation[d.name] == ''){
              this.i(`Please Select a ${d.name}!`)
              return this.variableProduct = {id:0}
            }
            variation[d.name] = this.productVariation[d.name];
      }
      let ob = {
        id : this.productDetails.id,
        variation: variation
      }
      const response = await this.callApi("post",`/app/getVariableProduct`,ob);
      if(response.status == 200){
        this.product = response.data
        if(response.data.product_images.length > 0){
          this.allImages = response.data.product_images
          this.mainImages = response.data.product_images[0]
        }
      }else this.swr()
    },
    async addCart(){
      // if(!this.authUser){
      //       this.i('Please Login first!')
      //       return this.$router.push(`/signIn?callback=${this.$route.path}`)
      //   }
      for(let d of this.allVariation){
            if(this.productVariation[d.name] == ''){
              this.i(`Please Select a ${d.name}!`)
              return this.variableProduct = {id:0}
            }
      }
      if(this.product.stock < this.quantity){
        this.i("Stock Limited Execeed!")
        return;
      }
      // console.log(this.product);
      let ob={
        userId : this.authUser.id,
        productId : this.product.id,
        mproductId : this.productDetails.id,
        categoryId : this.product.groupId,
        subcategoryId : this.product.categoryId,
        menuId : this.product.menuId,
        quantity: this.quantity
      }
      // console.log(this.product.menuId);
      this.addToCartServer(ob,this.quantity);
      return;
      const response = await this.callApi("post", '/app/add_cart', ob);
      if(response.status == 201 || response.status == 200){
        this.$store.commit('updateCart', response.data.allCarts);
        if(response.data.isNew) this.s('Item added to cart.');
        else this.s('Product Quantity increased  in cart ');
      }else if ( response.status == 401 ){
        this.i(response.data.message)
      }
      else {
        this.swr();
      }
    },
    async addReview(){
      if(!this.authUser){
            this.i('Please Login first!')
            return this.$router.push(`/signIn?callback=${this.$route.path}`)
            // return this.$router.push('/signIn?callback=/cart')
        }
      if(this.reviewForm.content.trim()==''){
       return this.i('Description Required!')
      }
      if(this.reviewForm.rating==0){
        return this.i("Rating required!")
      }
      this.reviewForm.userId = this.authUser.id
      this.reviewForm.productId = this.productDetails.id
      const response = await this.callApi('post','/app/addreview',this.reviewForm)
      if(response.status == 201 || response.status == 200){
        this.s('Review Added Successfully!');
        this.reviewForm.productId=-1
        this.reviewForm.content=''
        this.reviewForm.rating=0
        this.getReviews();
      }else this.swr();
    },
    async addWishList(item){
      if(!this.authUser){
          this.i('Please Login first!')
          this.$store.commit('setCallWishListOb',item)
          return this.$router.push(`/signIn?callback=${this.$route.path}`)
          // return this.$router.push('/signIn?callback=/cart')
      }
      this.wishList.userId = this.authUser.id
      this.wishList.productId = this.productDetails.id
      const response = await this.callApi('post','/app/wishList',this.wishList);
      if(response.status == 201 || response.status == 200){
        this.s('Added to wishLis!')
      }else this.swr();
    },
    async getReviews(){
      const response = await this.callApi('get',`/app/reviews/${this.productDetails.id}`);
      if(response.status){
        this.allReviews = response.data
      }else this.swr();
    }
  },

  async created() {
    console.log(this.authUser.id);
    console.log("product page");
    console.log(this.$route.params.slug);
    const response = await this.callApi(
      "get",
      `/app/product_details/${this.$route.params.slug}?userId=${this.authUser.id}`
    );
    if (response.status == 200) {
      // let productVariation = {};
      this.productDetails = response.data.data[0];
      this.mainImages = this.productDetails.product_images[0];
      this.allImages = this.productDetails.product_images;
      this.allVariation = this.productDetails.product_variation
      // console.log(this.productDetails);
      this.customerRating = this.productDetails.average_rating? this.productDetails.average_rating.rating : 0
      this.allReviews =this.productDetails.review
      this.trending = response.data.relatedProduct;
      if(this.productDetails.wishlist == null){
        this.isWishlist = false
      }else{
        this.isWishlist=true
      }
      for(let d of this.allVariation){
         this.productVariation[d.name] = ''
      }
    }
    // else this.swr();
    this.isLoading = false;
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
.active{
  color: #008631 !important;
}
.wishList:hover{
  cursor: pointer;
}
.noactive{
  color: rgb(179, 176, 176) !important;
}
.product-varient {
    margin-top: 35px;
}
.pro-color {
    width: 30%;
    margin-right: 20px;
}
.pro-color select,
.pro-size select{
    width: 100%;
    border: 1px solid #a9a5a5;
    padding: 13px 5px;
}
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
