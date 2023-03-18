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
    <section class="container">
      <div class="cart-section pt-50 pb-50">
        <div class="cart-section--table">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in cartItem" :key="index">
                <td>
                  <img :src="cart.mproduct.productImage" alt="Product" />
                </td>
                <td>{{ cart.vproduct.productName }}</td>
                <td>
                  <template v-if="cart.mproduct.discount > 0">
                    <div class="_dis_flex _price">
                      <span class="_price_text">৳ {{
                        cart.vproduct.sellingPrice - (cart.vproduct.sellingPrice *
                          (cart.mproduct.discount / 100))
                      }}</span>
                      <span><del> ৳ {{ cart.vproduct.sellingPrice }} </del></span>
                    </div>
                  </template>
                  <template v-else>৳ {{ cart.vproduct.sellingPrice }}</template>
                </td>
                <td> {{ cart.quantity }} </td>
                <td>
                  <template v-if="cart.mproduct.discount > 0">
                    <div class="_dis_flex _price">
                      <span class="_price_text">৳ {{
                        cart.quantity * (cart.vproduct.sellingPrice -
                          (cart.vproduct.sellingPrice * (cart.mproduct.discount / 100)))
                      }}</span>
                    </div>
                  </template>
                  <template v-else>{{ cart.quantity * cart.vproduct.sellingPrice }}</template>
                </td>
                <td @click="remove(index)">
                  <i class="lni lni-trash-can"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="cart-section--bill">
          <h4>Cart Totals</h4>
          <!-- <div class="subtotal">
            <h5>Subtotal</h5>
            <h5>৳ {{ this.order.invoiceTotal }}</h5>
          </div> -->
          <!-- <div v-if="(discount > 0)" class="subtotal">
            <h5>Discount</h5>
            <h5>{{ discount }}%</h5>
          </div> -->
          <div class="total">
            <h5>Total</h5>
            <h5>৳ {{ totalCostWithShipping }}</h5>
          </div>
          <div class="checkoutButton">
            <button @click="gotToCheck()">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      total: 0,
      carts: [],
      userId: "",
      isLoading: false,
    };
  },
  methods: {
    gotToCheck() {
      if (!this.authUser) {
        this.i('Please Login first!')
        return this.$router.push('/signIn?callback=/cart')
      }
      let order = this.order;
      if (this.cartItem.length == 0) return this.i('Your cart is empty!')
      this.$store.commit('order', order);
      if (this.cartItem.length == 0) return this.i('Your cart is empty!')
      this.$router.push('/checkout')
    },
    async getCart() {
      this.isLoading = true;
      this.userId = this.authUser.id;
      const response = await this.callApi(
        "get",
        `/app/get_cart?userId=${this.userId}`
      );
      if (response.status == 200) {
        this.$store.commit('updateCart', response.data.data)
        this.carts = response.data.data;
        this.total = response.data.total;
        this.order.invoiceTotal = this.total
      }
      this.isLoading = false;
    },
    async remove(index) {
      if (this.cartItem[index].id) {
        this.remove_id = this.cartItem[index].id;
      }
      this.removeItemServer(this.remove_id, index)
      this.getCart();
      return
    },
  },
  computed: {
    ...mapGetters({ order: 'order', cartItem: 'getCartItem' }),

    discount() {
      return this.$store.state.order.discount;
    },
    totalCostWithShipping() {
      let cost =  this.total;
      return cost
    }
  },
  mounted() {
    let order = this.order;
    if (this.authUser) {
      if(this.authUser.customer){
        order.billingAddress = this.authUser.customer.address
        order.postCode = this.authUser.customer.postCode
      }
    }
    this.$store.commit('order', order);
  },
  async created() {
    await this.getCart();
  },
};
</script>