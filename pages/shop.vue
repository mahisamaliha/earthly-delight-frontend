<template>
  <div>
    <!--************Navbar****************-->
    <!-----**************Market Section************---->

    <section class="container pt-50">
      <div>
        <div
          class="shop-filter--mobile--wrapper d-lg-none"
          v-bind:class="{ active: isFilter }"
        >
          <div class="shop-filter--mobile">
            <div class="shop-filter--mobile-head">
              <h4>Filter By :</h4>
              <button type="button" v-on:click="hideFilter()">
                <i class="las la-times"></i>
              </button>
            </div>
            <div class="shop-filter--searchBy">
              <div class="shop-searchBy--radio">
                <h4 class="shop-head">Product Category</h4>
                <div
                  class="form-check"
                  v-for="(category, index) in categories"
                  :key="index"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    :value="category.id"
                    v-model="filter.category"
                    @change="filterProducts"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    {{ category.catName }}
                  </label>
                </div>
              </div>
              <div class="shop-searchBy--range">
                <h4 class="shop-head">Filter By Price</h4>
                <!-- <div class="input-range">
                  <span class="multi-range">
                    <input type="range" min="0" max="50" value="0" id="lower" />
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value="50"
                      id="upper"
                    />
                  </span>
                </div> -->
                <!-- <p class="price">Price :</p> -->
                <!-- <p>
                  <input
                    class="custom-input__field min-max"
                    type="text"
                    placeholder="Min Price"
                    v-model="filter.minPrice"
                  /><span class="text">TO</span>
                  <input
                    class="custom-input__field min-max"
                    type="text"
                    placeholder="Max Price"
                    v-model="filter.maxPrice"
                  />
                  <button>filter</button>
                </p> -->
              </div>
              <div class="shop-searchBy--tag pb-30">
                <h4 class="shop-head">Choose Tag</h4>
                <div
                  class="shop-searchBy--tag---list"
                  v-for="(tag, index) in tags.data"
                  :key="index"
                >
                  <div
                    class="tag-item"
                    @click="addToFilterTag(tag)"
                    :class="isTagInFilter(tag.id) == true ? 'active' : ''"
                  >
                    {{ tag.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-lg-3 shop-searchBy d-none d-lg-block">
          <div class="shop-searchBy--radio">
            <h4 class="shop-head">Product Category</h4>
            <div
              class="form-check"
              v-for="(category, index) in categories"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                :value="category.id"
                v-model="filter.category"
                @change="filterProducts"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                {{ category.catName }}
              </label>
            </div>
          </div>
          <div class="shop-searchBy--range">
            <h4 class="shop-head">Filter By Price</h4>
            <p>
              <input
                class="custom-input__field min-max"
                type="text"
                placeholder="Min"
                v-model="filter.minPrice"
              /><span class="text">TO</span>
              <input
                class="custom-input__field min-max"
                type="text"
                placeholder="Max"
                v-model="filter.maxPrice"
              />
              <button
                class="custom-input__field min-max"
                @click="filterProducts"
              >
                filter
              </button>
            </p>
          </div>
          <div class="shop-searchBy--tag">
            <h4 class="shop-head">Choose Tag</h4>
            <div class="shop-searchBy--tag---list">
              <div
                class="tag-item"
                v-for="(tag, index) in tags.data"
                :key="index"
                @click="addToFilterTag(tag)"
              >
                <span>{{ tag.name }}</span>
              </div>
            </div>
          </div>
        </div> -->
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
            <!-- <div class="shop-product--mobile d-lg-none">
              <div class="shop-product--mobile---filter">
                <button v-on:click="showFilter()">
                  <i class="lni lni-text-align-justify"></i>
                  <span>Filter</span>
                </button>
              </div>
              <div class="shop-product--mobile---dropdown">
                <div class="dropdown">
                  <button class="dropbtn">
                    View By<i class="lni lni-chevron-down"></i>
                  </button>
                  <div class="dropdown-content">
                    <a href="#">
                      <div class="shop-product--display--icon">
                        <span>View:</span>
                        <i class="lni lni-grid icon active"></i>
                        <i class="lni lni-list icon"></i>
                      </div>
                    </a>
                    <a href="#">
                      <div class="shop-product--display--body">
                        <p>Showing 1-12 of 24 results</p>
                      </div>
                    </a>
                    <a href="#">
                      <div class="shop-product--display--default">
                        <p>
                          Default Sorting <i class="lni lni-chevron-down"></i>
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div> -->
            <div class="shop-product--display---body">
              <!-- <span>View:</span>
              <i class="las la-border-all active"></i>
              <i class="las la-list"></i> -->
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
                          <!-- <Dropdown placement="right-start" v-if="category.category.length" >
                            <DropdownItem><span @click="addToFilterCategory(category)"> {{category.groupName}}<Icon type="ios-arrow-forward"></Icon></span></DropdownItem>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="(subCategory,subCatIndex) in category.category" :key="subCatIndex" ><span  @click="addToFilterSubCategory(subCategory)">{{subCategory.catName}}</span></DropdownItem>
                            </DropdownMenu>
                        </Dropdown> -->

                          <!-- <DropdownItem v-else ><span @click="addToFilterCategory(category)"> {{category.groupName}}</span></DropdownItem> -->
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
              <!-- <div class="item" v-if="subCategories.length > 0">
                <ul class="_drop">
                  <li class="iview-ndropdown">
                    <Dropdown trigger="click">
                      <span>SubCategories</span>
                      <i class="lni lni-chevron-down"></i>
                      <DropdownMenu
                        slot="list"
                        style="max-height: 250px; overflow: auto; width: 180px"
                      >
                        <div
                          v-for="(subCategory, catIndex) in subCategories"
                          :key="catIndex"
                          :name="subCategory.catName"
                        >
                          <DropdownItem placement="right-start"
                            ><span
                              style="font-size: 13px"
                              @click="addToFilterSubCategory(subCategory)"
                            >
                              {{ subCategory.catName }}</span
                            ></DropdownItem
                          >
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </div> -->
              <div class="item">
                <Dropdown trigger="click">
                  <!-- <span >Price</span> -->
                  <span>Filter By Price</span>
                  <i class="lni lni-chevron-down"></i>
                  <DropdownMenu
                    slot="list"
                    style="max-height: 200px; overflow: auto; width: 180px"
                  >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([1, 500])"
                        >less than ৳500</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([501, 1000])"
                        >৳500 - ৳1000</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([1001, 5000])"
                        >৳1000 - ৳5000</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([5001, 10000])"
                        >৳5000 - ৳10000</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([10001, 20000])"
                        >৳10000 - ৳2000</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([20001, 50000])"
                        >৳20000 - ৳50000</span
                      ></DropdownItem
                    >
                    <DropdownItem
                      ><span
                        style="font-size: 13px"
                        @click="addToFilterPrice([50001, 100000])"
                        >৳50000 - ৳100000</span
                      ></DropdownItem
                    >
                  </DropdownMenu>
                </Dropdown>
              </div>
              <!-- <div class="item">
                <Dropdown trigger="hover">
                  <span>Choose Tag</span>
                  <i class="lni lni-chevron-down"></i>
                  <DropdownMenu
                    slot="list"
                    style="max-height: 200px; overflow: auto; width: 180px"
                  >
                    <div
                      v-for="(tag, index) in tags"
                      :key="index"
                      :name="tag.name"
                    >
                      <DropdownItem
                        ><span
                          style="font-size: 13px"
                          @click="addToFilterTag(tag)"
                        >
                          {{ tag.name }}</span
                        ></DropdownItem
                      >
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div> -->
            </div>
            <!-- <div class="shop-product--display--body d-none d-lg-block">
              <p v-if="isLoading == false && products.length < 21">
                Showing {{ products.length }} of {{ products.length }} results
              </p>
              <p v-else-if="isLoading == false && products.length">
                Showing 21 of {{ products.length }} results
              </p>
            </div> -->
            <div class="shop-product--display--default">
              <Dropdown trigger="click" style="cursor: pointer">
                <!-- <span >sort by</span> -->
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
                  <DropdownItem
                    ><span
                      style="font-size: 13px"
                      @click="sortData(['isFeatured', 'desc'])"
                      >Top Sellers</span
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
            <template v-if="filterOption.subCategories.length > 0">
              <button
                v-for="(item, index) in filterOption.subCategories"
                :key="item.id"
                class="active"
              >
                {{ item.catName }}
                <span @click="removeFromSelectedFilterSubCategory(index)"
                  >&times;</span
                >
              </button>
            </template>
            <template v-if="filterOption.tags.length > 0">
              <button
                v-for="(item, index) in filterOption.tags"
                :key="item.id"
                class="active"
              >
                {{ item.name }}
                <span @click="removeFromSelectedFilterTag(index)">&times;</span>
              </button>
            </template>
            <!-- <button v-if="filterOption.brand" class="active">{{filterOption.brand}}  <span @click="removeFromSelectedFilterBrand"><i class="fas fa-times"></i></span> </button> -->
            <!-- <button v-if="filterOption.color" class="active">{{filterOption.color}}  <span @click="removeFromSelectedFilterColor"><i class="fas fa-times"></i></span> </button> -->
            <!-- <button v-if="filterOption.size" class="active">{{filterOption.size}}  <span @click="removeFromSelectedFilterSize"><i class="fas fa-times"></i></span> </button> -->
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
                        <!-- <h4 class="product-card__content--subtitle">
                          {{ data.productName }} {{ data.model }}
                        </h4> -->
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
      isFilter: false,
      mobileDropdownIndex: -1,
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
    showFilter() {
      this.isFilter = true;
    },
    hideFilter() {
      this.isFilter = false;
    },

    mobileMenuDropdown(index) {
      if (this.mobileDropdownIndex === index) {
        this.mobileDropdownIndex = -1;
      } else {
        this.mobileDropdownIndex = index;
      }
    },
    // async isTagInFilter(tag) {
    //   let flag = 1;
    //   let index = this.filter.tags.findIndex((d) => d == tag);
    //   if (index == -1) {
    //     flag = 2;
    //   }

    //   console.log("in isTagInFilter", tag.id, flag);

    //   return flag;
    // },
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
      // console.log(this.subCategories);
      if (this.subCategories.length > 0) {
        var filtersubcategory = [];
        this.subCategories.filter((item) => {
          if (item.group_id != id) {
            return filtersubcategory.push(item);
          }
        });
        this.subCategories = [];
        this.subCategoryIds = [];
        // this.subCategories=[];
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
      // let index = this.filterOption.categoryIds.findIndex(d => d == this.categories[this.category].id);
      // if(index == -1){

      //   this.filterOption.categoies.push(this.categories[this.category]);
      //   this.filterOption.categoryIds.push(this.categories[this.category].id)
      //   this.filterProducts()
      // }
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
    // if(this.$route.query.str) this.str = this.$route.query.str
    // if(this.$route.query.order) this.orders = this.$route.query.order
    // if(this.$route.query.brandId) this.filterOption.brand = this.$route.query.brandId
    // if(this.$route.query.colour) this.filterOption.color = this.$route.query.colour
    // if(this.$route.query.size) this.filterOption.size = this.$route.query.size
    // if(this.$route.query.price) this.filterOption.price = this.$route.query.price
    // if(this.$route.query.page) this.page = this.$route.query.page

    this.page = this.$route.query.page ? this.$route.query.page : 1;
    this.$store.commit("setGlobalProductLoading", true);
    const response = await this.callApi(
      "get",
      `/app/shop/product/list?group=${this.filterOption.categoryIds}&category=${this.filterOption.subCategoryIds}&minPrice=${this.filterOption.minPrice}&maxPrice=${this.filterOption.maxPrice}&tags=${this.filterOption.tagsId}&search=${this.filterOption.search}&default=${this.filterOption.default}&order=${this.filterOption.order}`
    );
    if (response.status == 200) {
      // this.products = response.data.data;
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