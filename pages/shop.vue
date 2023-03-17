<template>
  <div>
    <!-- <Navbar /> -->
    <div class="header-info">
      <div class="container">
          <div class="header-info-content">
              <div class="header-info-content-item d-none d-lg-block">
                  Refer a Friend. Get 40% Off
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
        
    <!-----**************Market Section************---->

    <section class="container pt-50">
      <div>
        <div class="shop-product">
          <div class="shop-product--search">
            <div class="custom-input__group">
              <button class="custom-input__prepend">
                <i class="las la-search"></i>
              </button>
              <input
                type="text"
                v-model="filterOption.search"
                v-on:keyup="filterProducts"
                placeholder="Search"
                class="custom-input__field"
              />
            </div>
          </div>
          <div class="shop-product--display">
            <div class="shop-product--display---body">
              <div class="item">
                <ul class="_drop">
                  <li class="iview-ndropdown">
                    <Dropdown trigger="click">
                      <span>Categories</span>
                      <i class="lni lni-chevron-down"></i>
                      <DropdownMenu
                        slot="list"
                        style="max-height: 250px; overflow: auto; width: 180px"
                      >
                        <div
                          v-for="(category, catIndex) in categories"
                          :key="catIndex"
                          :name="category.groupName"
                        >
                        <DropdownItem placement="right-start"
                            ><span
                              style="font-size: 13px"
                              @click="addToFilterCategory(category)"
                            >
                              {{ category.groupName }}</span
                            ></DropdownItem
                          >
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
              <div class="item">
                <Dropdown trigger="click">
                  <span>Filter By Price</span>
                  <i class="lni lni-chevron-down"></i>
                  <DropdownMenu
                    slot="list"
                    style="max-height: 200px; overflow: auto; width: 180px"
                  >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([1, 200])"
                        >less than ৳200</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([201, 400])"
                        >৳201 - ৳400</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([401, 600])"
                        >৳401 - ৳600</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([601, 1000])"
                        >৳601 - ৳1000</span
                      ></DropdownItem
                    >
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div class="shop-product--display--default">
              <Dropdown trigger="click" style="cursor: pointer">
                <span>Default Sorting</span>
                <i class="lni lni-chevron-down"></i>
                <DropdownMenu
                  slot="list"
                  style="max-height: 200px; overflow: auto; width: 180px"
                >
                  <DropdownItem
                    ><span
                      style="font-size: 13px"
                      @click="sortData(['isNew', 'desc'])"
                      >Newest</span
                    ></DropdownItem
                  >
                  <DropdownItem
                    ><span
                      style="font-size: 13px"
                      @click="sortData(['sellingPrice', 'desc'])"
                      >Price (high - low)</span
                    ></DropdownItem
                  >
                  <DropdownItem
                    ><span
                      style="font-size: 13px"
                      @click="sortData(['sellingPrice', 'asc'])"
                      >Price (low - high)</span
                    ></DropdownItem
                  >
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div class="selected-filter-area">
            <template v-if="filterOption.categoies.length > 0">
              <button
                v-for="(item, index) in filterOption.categoies"
                :key="item.id"
                class="active"
              >
                {{ item.groupName }}
                <span @click="removeFromSelectedFilterCategory(index)"
                  >&times;</span
                >
              </button>
            </template>
            <button
              v-if="filterOption.minPrice && filterOption.maxPrice"
              class="active"
            >
              {{ filterOption.minPrice }} - {{ filterOption.maxPrice }}
              <span @click="removeFromSelectedFilterPrice">&times;</span>
            </button>
            <span v-if="!isAllFilterClear" @click="removeFromSelectedFilterAll"
              >Clear All</span
            >
          </div>
          <div
            class="shop-product--item"
            v-if="isLoading == false && products.length"
          >
            <div class="row">
              <template v-if="!isLoading && products.length">
                <div
                  class="grid-item"
                  v-for="(data, index) in products"
                  :key="index"
                >
                  <nuxt-link :to="`/product/${data.slug}`">
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
                          {{ data.groupeName }}
                        </h3>
                        <p
                          class="product-card__content--price"
                          v-if="data.discount"
                        >
                          ৳
                          {{
                            Math.floor(
                              data.sellingPrice -
                                (data.sellingPrice * data.discount) / 100
                            )
                          }}
                          <del>৳ {{ data.sellingPrice }} </del>
                        </p>
                        <p class="product-card__content--price" v-else>
                          ৳ {{ data.sellingPrice }}
                        </p>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </template>
              <template v-else-if="isLoading"
                ><div style="text-align: center; margin: 30px 0px">
                  <h4>
                    <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i
                    ><span>Products Loading...</span>
                  </h4>
                </div></template
              >
              <template v-else-if="!isLoading && products.length == 0"
                ><div style="text-align: center; margin: 30px 0px">
                  <h4>Product not found!</h4>
                </div></template
              >
              <template v-if="loadMoreLoading && !noProductRemaining"
                ><div style="text-align: center; margin: 30px 0px">
                  <h4>
                    <i class="ivu-load-loop ivu-icon ivu-icon-ios-loading"></i
                    ><span>Loading More Products...</span>
                  </h4>
                </div></template
              >
              <template v-else-if="noProductRemaining"
                ><div style="text-align: center; margin: 30px 0px">
                  <h4>No More Product Found...</h4>
                </div></template
              >
            </div>
          </div>
          <div
            v-else-if="isLoading == true"
            style="text-align: center; margin: 20px"
          >
            <h3>Products Loading...</h3>
          </div>
          <div
            v-else-if="isLoading == false && products.length == 0"
            style="text-align: center; margin: 20px"
          >
            <h3>No data found!</h3>
          </div>
        </div>
      </div>
    </section>

    <!--***************Footer Section***************-->
  </div>
</template>

<script>
import { Option, Select } from "iview";
import { mapGetters } from "vuex";
export default {
  components: { Select, Option },
  data() {
    return {
      // isFilter: false,
      // mobileDropdownIndex: -1,
      loadMoreLoading: false,
      noProductRemaining: false,
      limit: 20,
      categories: [],
      subCategories: [],
      subCategoryIds: [],
      // products: [],
      tags: [],
      price: 0,
      category: -1,
      page: 1,
      filterOption: {
        categoryIds: [],
        subCategoryIds: [],
        default: "",
        order: "",
        search: "",
        categoies: [],
        subCategories: [],
        minPrice: "",
        maxPrice: "",
        order: [],
        tags: [],
        tagsId: [],
      },
      filter: {
        group: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        tags: [],
        search: "",
        default: "",
        order: "",
      },
    };
  },
  computed: {
    isAllFilterClear() {
      let flag = true;
      if (this.filterOption.subCategories.length > 0) flag = false;
      if (this.filterOption.subCategoryIds.length > 0) flag = false;
      if (this.filterOption.categoryIds.length > 0) flag = false;
      if (this.filterOption.categoies.length > 0) flag = false;
      if (this.filterOption.tags.length > 0) flag = false;
      if (this.filterOption.tagsId.length > 0) flag = false;
      if (this.filterOption.maxPrice && this.filterOption.minPrice)
        flag = false;
      return flag;
    },
    ...mapGetters({
      products: "getAllGlobalProducts",
      isLoading: "getGlobalProductLoading",
    }),
  },
  methods: {
    sortData(key) {
      this.filterOption.default = key[0];
      this.filterOption.order = key[1];
      this.filterProducts();
    },
    removeFromSelectedFilterAll() {
      this.filterOption.categoies = [];
      this.filterOption.categoryIds = [];
      this.filterOption.subCategoryIds = [];
      this.filterOption.subCategories = [];
      this.filterOption.tags = [];
      this.filterOption.tagsId = [];
      this.subCategories = [];
      this.filterOption.minPrice = "";
      this.filterOption.maxPrice = "";
      this.filterProducts();
    },
    removeFromSelectedFilterCategory(index) {
      let id = this.filterOption.categoies[index].id;
      let index2 = this.filterOption.categoryIds.findIndex((d) => d == id);
      this.filterOption.categoryIds.splice(index2, 1);
      this.filterOption.categoies.splice(index, 1);
      if (this.subCategories.length > 0) {
        var filtersubcategory = [];
        this.subCategories.filter((item) => {
          if (item.group_id != id) {
            return filtersubcategory.push(item);
          }
        });
        this.subCategories = [];
        this.subCategoryIds = [];
        console.log(filtersubcategory);
        console.log(filtersubcategory.length);
        if (filtersubcategory.length > 0) {
          for (let i = 0; i < filtersubcategory.length; i++) {
            this.subCategories.push(filtersubcategory[i]);
            this.subCategoryIds.push(filtersubcategory[i].id);
          }
        }
      }
      this.filterProducts();
    },
    removeFromSelectedFilterSubCategory(index) {
      let id = this.filterOption.subCategories[index].id;
      let index2 = this.filterOption.subCategoryIds.findIndex((d) => d == id);
      this.filterOption.subCategoryIds.splice(index2, 1);
      this.filterOption.subCategories.splice(index, 1);
      this.filterProducts();
    },
    removeFromSelectedFilterTag(index) {
      let id = this.filterOption.tags[index].id;
      let index2 = this.filterOption.tagsId.findIndex((d) => d == id);
      this.filterOption.tagsId.splice(index2, 1);
      this.filterOption.tags.splice(index, 1);
      this.filterProducts();
    },
    removeFromSelectedFilterPrice() {
      this.filterOption.minPrice = "";
      this.filterOption.maxPrice = "";
      this.filterProducts();
    },
    addToFilterPrice(price) {
      this.filterOption.minPrice = price[0];
      this.filterOption.maxPrice = price[1];
      this.filterProducts();
    },
    addToFilterCategory(category) {
      if (this.category == undefined) return;
      let index = this.filterOption.categoryIds.findIndex(
        (d) => d == category.id
      );
      if (index == -1) {
        if (category.category.length > 0) {
          for (let i = 0; i < category.category.length; i++) {
            this.subCategories.push(category.category[i]);
            this.subCategoryIds.push(category.category[i].id);
          }
          console.log(category);
          console.log("Category found");
        }
        this.filterOption.categoies.push(category);
        this.filterOption.categoryIds.push(category.id);
        this.filterProducts();
      }
    },
    addToFilterSubCategory(category) {
      let index = this.filterOption.subCategoryIds.findIndex(
        (d) => d == category.id
      );
      if (index == -1) {
        this.filterOption.subCategories.push(category);
        this.filterOption.subCategoryIds.push(category.id);
        this.filterProducts();
      }
    },
    async addToFilterTag(tag) {
      let index = this.filterOption.tagsId.findIndex((d) => d == tag.id);
      if (index == -1) {
        this.filterOption.tags.push(tag);
        this.filterOption.tagsId.push(tag.id);
        await this.filterProducts();
      }
    },
    async filterProducts() {
      window.history.pushState(
        {},
        null,
        `${this.$route.path}?group=${this.filterOption.categoryIds}&page=${this.page}&limit=${this.limit}&category=${this.filterOption.subCategoryIds}&minPrice=${this.filterOption.minPrice}&maxPrice=${this.filterOption.maxPrice}&tags=${this.filterOption.tagsId}&default=${this.filterOption.default}&search=${this.filterOption.search}&order=${this.filterOption.order}`
      );
      this.$store.commit("setGlobalProductLoading", true);
      const response = await this.callApi(
        "get",
        `/app/shop/product/list?group=${this.filterOption.categoryIds}&page=${this.page}&limit=${this.limit}&category=${this.filterOption.subCategoryIds}&minPrice=${this.filterOption.minPrice}&maxPrice=${this.filterOption.maxPrice}&tags=${this.filterOption.tagsId}&search=${this.filterOption.search}&default=${this.filterOption.default}&order=${this.filterOption.order}`
      );
      if (response.status == 200) {
        // this.products = response.data.data;
        this.$store.commit("setAllGlobalProducts", response.data.data);
      } else this.e("Oops!", "Something went wrong, please try again!");
      this.$store.commit("setGlobalProductLoading", false);
    },
    async loadMore(more = 20) {
      console.log("Load more is calling! length", this.products.length);

      if (this.noProductRemaining) return;

      this.limit = this.limit + more;
      this.loadMoreLoading = true;
      const res = await this.callApi(
        "get",
        `/app/shop/product/list?group=${this.filterOption.categoryIds}&page=${this.page}&category=${this.filterOption.subCategoryIds}&minPrice=${this.filterOption.minPrice}&maxPrice=${this.filterOption.maxPrice}&tags=${this.filterOption.tagsId}&limit=${this.limit}&default=${this.filterOption.default}&search=${this.filterOption.search}&order=${this.filterOption.order}`
      );
      if (res.status == 200) {
        let prevLength = this.products.length;
        if (this.products.length == res.data.data.length) {
          this.noProductRemaining = true;
        }
        for (let i in res.data.data) {
          console.log("pushing data");
          let d = res.data.data[i];
          if (i >= prevLength) {
            this.$store.commit("pushAllGlobalProducts", d);
          }
        }
      }
      this.loadMoreLoading = false;
      console.log("Load more is finished! length", this.products.length);
    },
  },
  watch: {
    "$route.fullPath": function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      window.scrollTo(0, 0);
      if (this.$route.query.str) this.str = this.$route.query.str;
      if (this.$route.query.order) this.orders = this.$route.query.order;
      if (this.$route.query.groupId) {
        console.log("category found");
        let groups = this.$route.query.groupId.split(",");
        this.filterOption.categoryIds = groups;
      }
      if (this.$route.query.subCategory) {
        let groups = this.$route.query.subCategory.split(",");
        this.filterOption.subCategoryIds = groups;
      }
      if (this.$route.query.brandId)
        this.filterOption.brand = this.$route.query.brandId;
      if (this.$route.query.colour)
        this.filterOption.color = this.$route.query.colour;
      if (this.$route.query.size)
        this.filterOption.size = this.$route.query.size;
      if (this.$route.query.price)
        this.filterOption.price = this.$route.query.price;
      if (this.$route.query.page) this.page = this.$route.query.page;

      this.page = this.$route.query.page ? this.$route.query.page : 1;

      this.filterProducts();
    },
  },

  async created() {
    console.log("Shop page");
    this.page = this.$route.query.page ? this.$route.query.page : 1;
    this.$store.commit("setGlobalProductLoading", true);
    const response = await this.callApi(
      "get",
      `/app/shop/product/list?group=${this.filterOption.categoryIds}&category=${this.filterOption.subCategoryIds}&minPrice=${this.filterOption.minPrice}&maxPrice=${this.filterOption.maxPrice}&tags=${this.filterOption.tagsId}&search=${this.filterOption.search}&default=${this.filterOption.default}&order=${this.filterOption.order}`
    );
    if (response.status == 200) {
      this.$store.commit("setAllGlobalProducts", response.data.data);
    } else this.e("Oops!", "Something went wrong, please try again!");
    this.$store.commit("setGlobalProductLoading", false);

    const [resCategories, resTags] = await Promise.all([
      this.callApi("get", "/app/shop/categories"),
      this.callApi("get", "/app/shop/tags"),
    ]);
    if (resCategories.status == 200 && resTags.status == 200) {
      this.categories = resCategories.data.data;
      this.tags = resTags.data.data;
    } else this.e("Oops!", "Something went wrong, please try again!");
  },
  mounted() {
    document.addEventListener("click", this.hideSearchbar);
    window.onscroll = () => {
      this.bottomOfWindow =
        window.pageYOffset + window.innerHeight >
        document.body.scrollHeight - 100;

      if (this.bottomOfWindow) {
        if (!this.loadMoreLoading) {
          this.loadMore(20);
        }
      }
    };
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },
};
</script>

<style lang="scss">
.selected-filter-area {
  display: flex;
  padding: 15px 0px;
  align-items: center;
}
.selected-filter-area button {
  background: #f5f6f6;
  color: #000;
  font-size: 13px;
  letter-spacing: 1.4px;
  text-transform: capitalize;
  padding: 3px 15px;
  border: 1px solid #e2dcdc;
  margin-right: 20px;
}
.selected-filter-area button i {
  font-size: 10px;
  margin-left: 5px;
}
.selected-filter-area span {
  font-size: 14px;
  text-decoration: underline;
  text-transform: capitalize;
  cursor: pointer;
}
</style>