<template>
  <div>
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

        <!-- <div class="cart-section--coupon pb-30">
          <input type="text" v-if="!isCoupon && !isReferral" placeholder="Promo Code" v-model="order.coupon">
          <input type="text" v-else disabled style="background: #d5d5d5;" placeholder="Promo Code"
            v-model="order.coupon">
          <button v-if="!isCoupon" @click="checkCoupon">Apply Coupon</button>
          <button v-else @click="clearCoupon">Clear</button>
        </div>
        <div class="cart-section--coupon pb-30" v-if="!ismember && !isCoupon">
          <input type="text" v-if="!isReferral" placeholder="Referral Code" v-model="order.referralCode">
          <input type="text" v-else disabled style="background: #d5d5d5;" placeholder="Referral Code"
            v-model="order.referralCode">
          <button class="btn _btn1 _w_100" v-if="!isReferral" @click="checkreferralCode">Apply Code</button>
          <button class="btn _btn1" v-else @click="clearreferralCode">Clear</button>
        </div>
        <div class="cart-section--coupon pb-30" v-if="order.isDGMoney == 0">
          <div v-if="isGiftVoucher == false" class="row g-2">
            <div class="col col-md col-lg">
              <div class="cart-section--coupon pb-30">
                <input type="text" v-model="order.giftVoucherCode" placeholder="Gift Voucher">
                <button v-if="order.giftVoucherAmount == 0" @click="checkGiftVoucherCode">Apply Code</button>
              </div>
            </div>
          </div>
          <div v-else-if="isGiftVoucher == true" class="row g-2">
            <div class="col col-md col-lg">
              <div class="cart-section--coupon pb-30">
                <input type="text" v-if="order.giftVoucherAmount > 0" disabled style="background: #d5d5d5;"
                  v-model="order.giftVoucherCode">
                <input type="text" v-else placeholder="Gift Voucher Code" v-model="order.giftVoucherCode">
                <button class="btn _btn1" v-if="order.giftVoucherAmount > 0"
                  @click="clearGiftVoucherCode">Clear</button>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="cart-section--coupon pb-70" v-if="authUser.customer.barcode != null  ">
          <input type="text" placeholder="Coupon code" v-model="order.coupon" />
          <button v-if="!isCoupon" @click="checkCoupon">Apply Coupon</button>
          <button v-else @click="clearCoupon">Clear</button>
        </div> -->
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
    clearCoupon() {
      let order = this.order;
      order.discount = 0
      if (this.isReferral) order.discount += parseInt(this.settings.refererBonus)
      order.membershipDiscount = 0
      order.membershipDiscountAmount = 0
      order.refferalDiscount = 0
      order.refferalDiscountAmount = 0
      order.promoDiscount = 0
      order.promoDiscountAmount = 0
      order.coupon = ''
      order.discountType = ""
      this.isCoupon = false
      this.$store.commit('order', order);
      this.checkMemberShip();
    },
    async checkCoupon() {
      if (!this.authUser) {
        this.i('Please Login first!')
        return this.$router.push('/signIn?callback=/cart')

      }
      let order = this.order;
      if (order.coupon == '') return this.i('Promo Code  is empty!')

      const res = await this.callApi('post', 'app/checkCoupon', { code: order.coupon })
      if (res.status == 202) {
        //  console.log(res.data)

        if (order.discount <= res.data.Coupon.discount) {
          this.s('You get ' + res.data.Coupon.discount + '% Discount')
          order.discount = res.data.Coupon.discount
          order.promoDiscount = res.data.Coupon.discount
          order.membershipDiscount = 0
          order.membershipDiscountAmount = 0
          order.refferalDiscount = 0
          order.refferalDiscountAmount = 0
          if (this.isReferral) order.discount += (this.settings.refererBonus)
          order.discountType = "Promo Code"
          this.isCoupon = true
        }
        else {
          this.i('You get ' + res.data.Coupon.discount + '% Discount')
        }

      }
      else if (res.status == 401) {
        this.e(res.data.message)
      }
      else {
        this.swr();
      }
    },
    async checkGiftVoucherCode() {
      if (!this.authUser) {
        this.i('Please Login first!')
        return this.$router.push('/signIn?callback=/cart')

      }
      let order = this.order;
      if (order.giftVoucherCode == '') return this.i('Gift Voucher  Code  is empty!')

      const res = await this.callApi('post', 'app/checkGiftVoucherCode', { code: order.giftVoucherCode })
      if (res.status == 202) {
        if (this.totalCost < res.data.Coupon.amount) return this.i("Gift Voucher can not applicable to this amount of order")
        order.giftVoucherAmount = parseFloat(res.data.Coupon.amount)
        this.s(`You get ৳ ${order.giftVoucherAmount} Gift Voucher`)
        this.isGiftVoucher = true
      }
      else if (res.status == 401) {
        this.e(res.data.message)
      }
      else {
        this.swr();
      }
      this.$store.commit('order', order);
    },
    clearGiftVoucherCode() {
      let order = this.order;
      order.giftVoucherCode = ''
      order.giftVoucherAmount = 0
      this.isGiftVoucher = false
      this.$store.commit('order', order);
    },
    async checkreferralCode() {

      if (!this.authUser) {
        this.i('Please Login first!')
        return this.$router.push('/signIn?callback=/cart')

      }
      let order = this.order;
      if (order.referralCode == '') return this.i('Referral  Code  is empty!')
      if (this.isReferral == true) return this.i('You already take Referrrel discount!')

      const res = await this.callApi('post', 'app/checkReferralCode', { barcode: order.referralCode })
      if (res.status == 202) {

        this.s(`You get ${this.settings.refererBonus}% Discount`)
        order.discount = parseInt(order.discount) + parseInt(this.settings.refererBonus)
        order.refferalDiscount = parseInt(this.settings.refererBonus)
        order.membershipDiscount = 0
        order.membershipDiscountAmount = 0
        order.promoDiscount = 0
        order.promoDiscountAmount = 0
        this.isReferral = true

      }
      else if (res.status == 401) {
        this.e("Invalid Referral Code !")
      }
      else {
        this.swr();
      }
      this.$store.commit('order', order);
    },
    clearreferralCode() {
      let order = this.order;
      order.discount = parseInt(order.discount) - parseInt(this.settings.refererBonus)
      this.isReferral = false
      order.referralCode = ''
      order.membershipDiscount = 0
      order.membershipDiscountAmount = 0
      order.refferalDiscount = 0
      order.refferalDiscountAmount = 0
      order.promoDiscount = 0
      order.promoDiscountAmount = 0
      this.$store.commit('order', order);
    },
    clearGiftVoucherCode() {
      let order = this.order;
      order.giftVoucherCode = ''
      order.giftVoucherAmount = 0
      this.isGiftVoucher = false
      this.$store.commit('order', order);
    },
    checkMemberShip() {
      let order = this.order;
      if (this.authUser) {
        if (this.authUser.customer && this.authUser.customer.barcode) {
          // console.log("Yes")
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
      // return
      this.$router.push('/checkout')
    },
    async getCart() {
      this.isLoading = true;
      this.userId = this.authUser.id;
      // console.log(this.userId);
      const response = await this.callApi(
        "get",
        `/app/get_cart?userId=${this.userId}`
      );
      if (response.status == 200) {
        this.$store.commit('updateCart', response.data.data)
        this.carts = response.data.data;
        this.total = response.data.total;
      }
      //else this.swr();
      this.isLoading = false;
    },
    async remove(index) {
      if (this.carts[index].id) {
        this.remove_id = this.carts[index].id;
      }
      this.removeItemServer(this.remove_id, index)

      return
      this.isLoading = true;
      const res = await this.callApi(
        "post",
        `/app/remove_cart/${this.remove_id}`
      );
      if (res.status === 200) {
        this.s(res.data.msg);
        this.carts.splice(index, 1);
      } else {
        this.swr();
      }
      this.isLoading = false;
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
      let cost = this.order.invoiceTotal;
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
      // if( this.$store.state.order.discount > 0 ) cost = parseFloat(cost) -  parseFloat((cost* this.$store.state.order.discount)/100)

      // if(this.order.billingZone) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice)
      if (this.order.giftVoucherCode != '') cost = parseFloat(cost) - parseFloat(this.order.giftVoucherAmount)
      if (this.order.isDGMoney == 1) cost = parseFloat(cost) - parseFloat(this.order.dgAmount)
      if (this.order.shippingPrice > 0) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice)
      return cost
      cost = Math.floor(cost)
      cost = this.autoRound(cost);
      return cost
    }
    // totalCostWithShipping(){
    //   let cost =this.total
    //   let discount = this.$store.state.order.discount;
    //   if(discount>0){
    //     cost = cost - (cost * (discount/100))
    //   }
    //   return cost
    // }
  },
  mounted() {
    let order = this.order;
    if (this.authUser) {
      if (this.authUser.customer && this.authUser.customer.barcode) {
        // console.log("Yes MembershipFouond")
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
    // console.log("Cart page");
    await this.getCart();
    // console.log(this.$store.state.order);
  },
};
</script>
