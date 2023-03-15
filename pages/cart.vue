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
                  <!-- {{ cart.vproduct.sellingPrice }} -->
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
          <div class="subtotal">
            <h5>Subtotal</h5>
            <h5>৳ {{ this.order.invoiceTotal }}</h5>
          </div>
          <div v-if="(discount > 0)" class="subtotal">
            <h5>Discount</h5>
            <h5>{{ discount }}%</h5>
          </div>
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
  components: {},
  data() {
    return {
      total: 0,
      isCoupon: false,
      isReferral: false,
      carts: [],

      userId: "",
      ismember: false,
      isGiftVoucher: false,
      isReferral: false,
      isLoading: false,
      settings: {
        refererBonus: 0,
        isShippingFree: 0,
      },
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
      if (!this.isCoupon) order.coupon = ''
      if (!this.isGiftVoucher) order.giftVoucherCode = ''
      if (this.order.isDGMoney == 0) order.dgAmount = 0
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
    autoRound(value) {
      let reminder = (value % 10)
      this.order.roundAmount = reminder;
      return value - reminder;
    },
  },
  computed: {
    ...mapGetters({ order: 'order', cartItem: 'getCartItem' }),

    discount() {
      return this.$store.state.order.discount;
    },
    coupon() {
      return this.$store.state.order.coupon;
    },
    totalCostWithShipping() {
      let cost =  this.total;
      if (this.order.membershipDiscount > 0) {
        var totalOld = cost
        var discountAmount = (this.order.membershipDiscount * totalOld) / 100
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount
        this.order.membershipDiscountAmount = discountAmount
        afterDiscount = (afterDiscount)
        cost = afterDiscount
      }
      if (this.order.refferalDiscount > 0) {
        var totalOld = cost
        var discountAmount = (this.order.refferalDiscount * totalOld) / 100
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount
        this.order.refferalDiscountAmount = discountAmount
        afterDiscount = (afterDiscount)
        cost = afterDiscount
      }
      else if (this.order.promoDiscount > 0) {
        var totalOld = cost
        var discountAmount = (this.order.promoDiscount * totalOld) / 100
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount
        this.order.promoDiscountAmount = discountAmount
        afterDiscount = (afterDiscount)
        cost = afterDiscount
      }
      if (this.order.giftVoucherCode != '') cost = parseFloat(cost) - parseFloat(this.order.giftVoucherAmount)
      if (this.order.isDGMoney == 1) cost = parseFloat(cost) - parseFloat(this.order.dgAmount)
      if (this.order.shippingPrice > 0) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice)
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
      if (this.authUser.customer && this.authUser.customer.barcode) {
        order.discount = 10
        order.membershipDiscount = 10
        order.refferalDiscount = 0
        order.refferalDiscountAmount = 0
        order.promoDiscount = 0
        order.promoDiscountAmount = 0
        order.discountType = "Membership Discount"
        this.ismember = true
      }
    }
    this.$store.commit('order', order);
  },
  async created() {
    let order = {
      coupon: '',
      discount: 0,
    }
    await this.getCart();
  },
};
</script>