<template>
  <div>
    <!--************Navbar****************-->
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

    <!--************WishList Section****************-->

    <section class="container">
      <div class="cart-section pt-50 pb-50">
        <table class="cart-section--table table table-bordered">
          <thead>
            <tr>
              <th scope="col">Images</th>
              <th scope="col">Product</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in wishlists" :key="index">
            <tr>
              <td><img :src="item.productImage" alt="Product" /></td>
              <td>{{ item.productName }}</td>
              <td>{{ item.sellingPrice }}</td>
              <td v-if="item.stock == 0">Out of Stock</td>
              <td v-else>In Stock</td>
              <td @click="remove(index)"><i class="lni lni-trash-can"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!--***************Footer Section***************-->
    <!-- <BottomContainer /> -->
  </div>
</template>

<script>
// import Navbar from "/components/navbar";
// import BottomContainer from "/components/footer";
export default {
  components: {
    // Navbar,
    // BottomContainer,
  },
  data() {
    return {
      wishlists: [],
      userId: "",
      isLoading: false,
    };
  },
  methods: {
    async getWishList() {
      this.isLoading = true;
      this.userId = this.authUser.id;
      const response = await this.callApi(
        "get",
        `/app/get_wishlist`,
        this.userId
      );
      if (response.status == 200) {
        this.wishlists = response.data.data;
      }
      //else this.swr();
      this.isLoading = false;
    },
    async remove(index) {
      if (this.wishlists[index].id) {
        this.remove_id = this.wishlists[index].id;
      }
      this.isLoading = true;
      const res = await this.callApi(
        "post",
        `/app/remove_wishlist/${this.remove_id}`
      );
      if (res.status === 200) {
        this.s(res.data.msg);
        this.wishlists.splice(index, 1);
      } else {
        this.swr();
      }
      this.isLoading = false;
    },
  },
  async created() {
    console.log("WishList page");
    await this.getWishList();
  },
};
</script>
