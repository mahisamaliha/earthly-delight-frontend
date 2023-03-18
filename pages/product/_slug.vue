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
            </figure>
          </div>
        </div>
      </div>
      <div class="product-details">
        <h4 class="title">Name : {{productDetails.productName}}</h4>
        <div class="product-details--rating">
          <h4>
            Price : {{ productDetails.sellingPrice
            }}
          </h4>
        </div>
        <div class="product-varient d-flex" style="margin-bottom:10px;">
            <template v-if="allVariation && allVariation.length > 0">

                <div class="pro-color" v-for="(item,index) in allVariation" :key="index">
                    <select v-model="productVariation[item.name]" @change="getVariableProduct(index)">
                        <option value=""  disabled selected>{{item.name}}</option>
                        <option v-for="(val,i) in item.values" :key="i" :value="val.value" >{{val.value}}</option>
                    </select>
                </div>
            </template>
        </div>
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
        <h4 class="product-details--category">
          Category: <span>{{ productDetails.catName }}</span>
        </h4>
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
        <ul class="section-header__action--tab pb-30">
          <li
            v-bind:class="{ active: isProductInfoIndex === 1 }"
            v-on:click="showProductInfo(1)"
          >
            Description
          </li>
        </ul>
      </div>
      <div class="description-tab" v-if="isProductInfoIndex === 1">
        <div
          class="description-tab--details container"
          v-html="productDetails.brief_description"
        ></div>
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
      isProductInfoIndex: 1,
      hooperProduct: {
        centerMode: false,
        wheelControl: false,
      },
      variableProduct:{},
      // allReviews:[],
      allVariation:[],
      variableProduct:[],
      variationproduct:[],
      // reviewForm:{
      //   productId:-1,
      //   rating:0,
      //   content:'',
      //   userId:0
      // },
      variableProduct:{id:0},
      isLoading: true,
      productDetails: "",
      customerRating:0,
      // reviews: [],
      product:{},
      mainImages:'',
      allImages:[],
      quantity: 1,
      // hooperFeaturedProduct: {
      //   itemsToShow: 1,
      //   centerMode: false,
      //   breakpoints: {
      //     450: {
      //       centerMode: false,
      //       itemsToShow: 2,
      //     },
      //     800: {
      //       centerMode: false,
      //       itemsToShow: 3,
      //     },
      //     1000: {
      //       itemsToShow: 4,
      //     },
      //   },
      // },
    };

  },
  methods: {
    showProductInfo(index) {
      this.isProductInfoIndex = index;
    },
    changeQuantityNumber(type, q) {
      if (q + this.quantity < 1) return;
      this.quantity += q;
      if(this.variationproduct.stock < this.quantity){
        this.i("Stock Limited Execeed!")
      }
    },
    async getVariableProduct(indexNumber = -1){
      console.log(indexNumber);
      await this.isFieldEnabled(indexNumber);
      await this.checkUsedVariation();
      let variation = {}
      for(let d of this.allVariation){
            if(this.productVariation[d.name] == ''){
              this.i(`Please Select a ${d.name}!`)
              return this.variableProduct = {id:0}
            }
            variation[d.name] = this.productVariation[d.name];
      }
      this.isLoading = true;
      variation = JSON.stringify(variation)
      console.log(finalProduct);
      let finalProduct = this.variationproduct[0];
      if(finalProduct){
        this.variableProduct = finalProduct
        this.isImageLoading = true;
        if(finalProduct.product_images){
          this.allImages = finalProduct.product_images

        }
        else {
          this.allImages = this.productDetails.product_images
        }
        this.sliderSetup();

      }
      else {
        this.w("Product not found!")
      }
      this.isLoading=false
    },
    checkUsedVariation(){
        if(this.variationproduct.length == 0) return

            let keys = Object.keys(this.productVariation);
            let totalFillupVariation = 0;

            for(let i of keys){
              if(this.productVariation[i] != ''){
                totalFillupVariation++;
              }
            }
            console.log("totalFillupVariation ",totalFillupVariation)
            if(totalFillupVariation != this.allVariation.length){
              console.log("reseting Data")
              for(let d of this.allVariation){
                  for(let value of d.values){
                      value.isDisabled = false
                  }
              }
            }
            for(let i in this.allVariation){
              let d = this.allVariation[i];
                if((i == totalFillupVariation) && totalFillupVariation == (this.allVariation.length -1)){
                console.log("start refining ",d.name)
                  for(let value of d.values){
                    let isFound = false;
                    let ob={};
                    for(let i of keys){
                      if(this.productVariation[i] == ''){
                        ob[i] = value.value
                      }
                      else ob[i]=this.productVariation[i]
                    }
                    ob = JSON.stringify(ob)
                    for(let vp of this.variationproduct ){
                      if(vp.variation == ob ) isFound = true;
                    }
                    if(isFound == false) value.isDisabled = true
                  }
                }
            }
      },
    sliderSetup(){

      if(this.allImages){
        this.sliderImages = [];
        let i = 0;
        for(let d of this.allImages){
          if(i == 0)  this.mainImage = d.url;
          i = 2;
          this.sliderImages.push(d)
        }
      }
      else {
        this.mainImage = this.variationproduct.product_images[0].url;
        this.sliderImages = this.variationproduct.product_images;
      }
      this.isInfiniteScroll = false
      if(this.sliderImages.length > 3) this.isInfiniteScroll = true
      this.isImageLoading = false
    },
    isFieldEnabled(indexNumber){

      for(let i in this.allVariation){
        if(indexNumber < i){
          this.productVariation[this.allVariation[i].name] = '';
          this.allVariation[i].isDisabled = true;
        }
        if((indexNumber+1) == i){
          this.allVariation[i].isDisabled = false;
        }
      }
    },

    async addCart(){
      for(let d of this.allVariation){
            if(this.productVariation[d.name] == ''){
              this.i(`Please Select a ${d.name}!`)
              return this.variableProduct = {id:0}
            }
      }
      if(this.variationproduct.stock < this.quantity){
        this.i("Stock Limited Execeed!")
        return;
      }
      let ob={
        userId : this.authUser.id,
        productId : this.variableProduct.id,
        mproductId : this.productDetails.id,
        categoryId : this.variableProduct.groupId,
        subcategoryId : this.variableProduct.categoryId,
        menuId : this.variableProduct.menuId,
        quantity: this.quantity
      }
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
    // async addReview(){
    //   if(!this.authUser){
    //         this.i('Please Login first!')
    //         return this.$router.push(`/signIn?callback=${this.$route.path}`)
    //     }
    //   if(this.reviewForm.content.trim()==''){
    //    return this.i('Description Required!')
    //   }
    //   if(this.reviewForm.rating==0){
    //     return this.i("Rating required!")
    //   }
    //   this.reviewForm.userId = this.authUser.id
    //   this.reviewForm.productId = this.productDetails.id
    //   const response = await this.callApi('post','/app/addreview',this.reviewForm)
    //   if(response.status == 201 || response.status == 200){
    //     this.s('Review Added Successfully!');
    //     this.reviewForm.productId=-1
    //     this.reviewForm.content=''
    //     this.reviewForm.rating=0
    //     this.getReviews();
    //   }else this.swr();
    // },
    // async getReviews(){
    //   const response = await this.callApi('get',`/app/reviews/${this.productDetails.id}`);
    //   if(response.status){
    //     this.allReviews = response.data
    //   }else this.swr();
    // }
  },
  async asyncData({app,redirect,params,store}){
        try {
          let response = await app.$axios.get(`/app/product_details/${params.slug}`)
            console.log('hello');
            if (response.status == 200) {
                let productVariation = {};
                for(let d of response.data.data[0].product_variation){
                    productVariation[d.name] = ''
                }
                return {
                    productDetails : response.data.data[0],
                    mainImages :response.data.data[0].product_images[0],
                    allImages :response.data.data[0].product_images,
                    allVariation :response.data.data[0].product_variation,
                    variationproduct :  response.data.variationproducts,
                    customerRating :response.data.data[0].average_rating?response.data.data[0].average_rating.rating : 0,
                    // allReviews :response.data.data[0].review,
                    productVariation: productVariation,
                }
            }

        } catch (error) {
            redirect(`/`)
        }

    },
  async created() {
    console.log(this.authUser.id);
    console.log("product page");
    console.log(this.$route.params.slug);
    this.sliderSetup();
    this.getVariableProduct();
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
