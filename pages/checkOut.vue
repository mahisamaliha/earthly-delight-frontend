<template>
  <div>
    <section class="billing-section container pb-50">
      <div class="billing-information pt-50">
        <div class="billing-details">
          <h4 class="title">Billing Details</h4>
          <label>Name *</label>
          <div class="custom-input__group">
            <input
              class="custom-input__field"
              type="text"
              placeholder="Your Name"
              id="name"
              v-model="order.name"
            />
          </div>
          <div class="billing-details--email">
            <div class="billing-details--email---item">
              <label>Email *</label>
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  v-model="order.email"
                />
              </div>
            </div>
            <div class="input-group">
              <label>Contact *</label>
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="text"
                  placeholder="Your Phone"
                  id="Contact"
                  v-model="order.contact"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="billing-details--select">
            <div class="billing-details--select---item">
              <label>Select Your City*</label>
              <div class="custom-input__group">
                <Select
                  class="custom-input__field"
                  v-model="order.billingCity"
                  placeholder="Select Shipping City"
                  @on-change="changeBillingCity"
                  filterable>
                  <Option
                    v-for="(item, index) in cities"
                    :key="index"
                    :value="item.name"
                    >{{ item.name }}</Option>
                </Select>
              </div>
            </div>
            <div class="billing-details--select---item">
              <label>Select Your Zone*</label>
              <div class="custom-input__group">
                <Select
                  class="custom-input__field"
                  placeholder="Select Shipping Zone"
                  v-model="order.billingZone"
                  @on-change="changeShippingPrice"
                  filterable
                  :disabled="selected.billingCity ? false : true"
                >
                  <Option
                    v-for="(item, index) in filterZones"
                    :key="index"
                    :value="item.zoneName"
                    >{{ item.zoneName }}</Option
                  >
                </Select>
              </div>
            </div>
            <div class="billing-details--select---item">
              <label>Select Your Area*</label>
              <div class="custom-input__group">
                <Select
                  class="custom-input__field"
                  placeholder="Select Shipping Area"
                  v-model="order.billingArea"
                  @on-change="changeBillingArea"
                  filterable
                  :disabled="isAreaEnable"
                >
                  <Option
                    v-for="(item, index) in filterAreas"
                    :key="index"
                    :value="item.name"
                    >{{ item.name }}</Option
                  >
                </Select>
              </div>
            </div>
          </div>
          <label>Address *</label>
          <div class="custom-input__group">
            <input
              class="custom-input__field"
              type="text"
              placeholder="Your Address"
              id="address"
              v-model="order.billingAddress"
            />
          </div>
          <label>Postcode / Zip *</label>
          <div class="custom-input__group">
            <input
              class="custom-input__field"
              type="text"
              placeholder="Postcode / Zip"
              id="postal"
              v-model="order.postCode"
            />
          </div>
        </div>
        <div class="your-order" v-if="this.cartItem.length">
          <h4 class="title">Your Order</h4>

          <div class="order-list">
            <div class="order-list--item order-list--header">
              <h4 class="order-list--item---title">Product</h4>
              <p class="order-list--item---info">Total</p>
            </div>
            <div
              class="order-list--item order-list--body"
              v-for="(item, index) in cartItem"
              :key="index">
              <h4 class="order-list--item---title">
                {{ item.vproduct.productName }} × {{ item.quantity }}
              </h4>
              <p class="order-list--item---info">
                ৳
                {{
                  (item.quantity *
                    (item.vproduct.sellingPrice -
                      (item.vproduct.sellingPrice * item.mproduct.discount) /
                        100))
                    | toFixedNum
                }}
              </p>
            </div>
          </div>
          <div class="order-total">
            <div class="order-list--item order-list--body">
              <h4 class="order-list--item---title">Sub Total</h4>
              <p class="order-list--item---info">৳ {{ this.order.invoiceTotal }}</p>
            </div>
            <div class="order-list--item order-list--body">
              <h4 class="order-list--item---title">Grand Total</h4>
              <p class="order-list--item---info">৳ {{ totalCost }}</p>
            </div>
            <div class="order-list--item order-list--header">
              <h4 class="order-list--item---title">Total</h4>
              <p class="order-list--item---info">
                ৳ {{ totalCostWithShipping }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="shipping-information pt-50 pb-50">
        <div class="shipping-details">
          <h4 class="title">Shipping Details</h4>
          <div class="custom-input__checkbox">
            <input type="checkbox" id="shipping" />
            <label for="shipping">Ship to a different address?</label>
          </div>
          <h5>Order Notes</h5>
          <form>
            <textarea
              placeholder="Notes about your order, e.g. special notes for delivery."
            ></textarea>
          </form>
        </div>

        <div class="payment">
          <h4 class="title">Payment</h4>
          <div class="payment-item">
            <div class="custom-input__checkbox">
              <input  type="radio" id="payment1" name="radio-group" value="Cash on delivery" v-model="order.paymentType">
              <label for="payment1"></label>
            </div>
            <div class="payment-item--picture">
              <figure>
                <img src="assets/img/cashondelivery.png" alt="cod" />
              </figure>
            </div>
          </div>
          <button :disabled="loading" @click="placeOrder">Place Order</button>
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
      isLogin: false,
      loading: false,
      fetchLoading: true,
      previous_deisgn: false,
      isAgreementLoading: false,
      isDifferentShipping: false,

      zones: [],
      cities: [],
      areas: [],
      shippingAreas: [],
      settings: {
        refererBonus: 0,
        isShippingFree: 0,
      },
      selected: {
        billingCity: "",
        billingZone: "",
        billingArea: "",
        shippingCity: "",
        shippingZone: "",
        shippingArea: "",
      },

      shippingDetails: {
        name: "",
        email: "",
        contact: "",
        shippingCity: "",
        shippingZone: "",
        shippingArea: "",
        postCode: "",
        address: "",
        notes: "",
      },
    };
  },
  methods: {
    changeBillingCity() {
      let order = this.order;
      let index = this.cities.findIndex((d) => d.name == order.billingCity);
      if (index > -1) {
        this.selected.billingCity = this.cities[index].id;
      }
      this.selected.billingZone = "";
      this.order.billingZone = "";
      this.order.billingArea = "";
      this.selected.billingArea = "";
      this.$store.commit("order", order);
    },
    changeBillingArea() {
      let order = this.order;
      let index = this.areas.findIndex((d) => d.name == order.billingArea);
      if (index > -1) {
        this.selected.billingArea = this.areas[index].id;
      }

      this.$store.commit("order", order);
    },
    async changeShippingPrice(){

    let order  = this.order;
    if(this.isDifferentShipping== true){
      if(this.zones.length  ==0) return
      if(this.shippingDetails.shippingZone == undefined || this.shippingDetails.shippingZone == '') return this.i('Shipping Zone is required!')

      let index = this.zones.findIndex(d => d.zoneName == this.shippingDetails.shippingZone )
      if(index > -1) {
        this.selected.shippingZone = parseFloat(this.zones[index].id)
        if(this.settings.isShippingFree == 0){
            order.shippingPrice = parseFloat(this.zones[index].delivery)

        }
        else if(this.settings.isShippingFree == 1){
            if(this.settings.shippingFreeAfter >= this.totalCost)
            order.shippingPrice = parseFloat(this.zones[index].delivery)
        }
        console.log(order.shippingPrice)

        this.$store.commit('order',order)
      }
      else {
        this.shippingDetails.shippingArea = ''
        this.selected.shippingArea = ''
      }

      if(this.selected.shippingZone) await this.getShippingAreas();

      return;
    }

    if(order.billingZone == undefined || order.billingZone == '') return
    if(this.zones.length  ==0) return
    let index = this.zones.findIndex(d => d.zoneName == order.billingZone )
    if(index > -1) {
      this.selected.billingZone = this.zones[index].id

        if(this.settings.isShippingFree == 0){
          order.shippingPrice = parseFloat(this.zones[index].delivery)
      }
      else if(this.settings.isShippingFree == 1){
          if(this.settings.shippingFreeAfter >= this.totalCost)
          order.shippingPrice = parseFloat(this.zones[index].delivery)
      }

      this.$store.commit('order',order)
    }
    else {
      order.billingArea = ''
      this.selected.billingArea = ''
      this.$store.commit('order',order)
    }
    if(this.selected.billingZone) await this.getAreas();

  },
    async placeOrder() {
      let order = this.order;
      console.log(order.paymentType);
      // return
      if (!this.authUser) return this.w("Please login or registar first.");
      if (order.name.trim() == "") return this.w("Name is Empty!");
      if (order.contact.trim() == "") return this.w("Phone number is Empty!");
      if (order.billingAddress.trim() == "")
        return this.w("Billing Address is Empty!");
      if (order.billingCity.trim() == "") return this.w("City is Empty!");
      if (order.billingZone.trim() == "") return this.w("Zone is Empty!");
      if (order.postCode.trim() == "")
        return this.w("Postal / Zip Code is Empty!");
        if(order.paymentType == '') order.paymentType = "Cash on delivery"
      if (order.paymentType.trim() == "")
        return this.w("Select a payment Method !");
      if (this.isDifferentShipping == true) {
        if (this.shippingDetails.name.trim() == "")
          return this.w("Recipient Name is Empty!");
        if (this.shippingDetails.contact.trim() == "")
          return this.w("Recipient Phone number is Empty!");
        if (this.shippingDetails.shippingCity.trim() == "")
          return this.w("Recipient City is Empty!");
        if (this.shippingDetails.shippingZone.trim() == "")
          return this.w("Recipient Zone is Empty!");
        if (this.shippingDetails.address.trim() == "")
          return this.w("Recipient Address is Empty!");
      }
      order.isDifferentShipping = this.isDifferentShipping;
      if (order.isDifferentShipping) {
        order.shippingDetails = JSON.stringify(this.shippingDetails);
      }
      this.loading = true;

      order.cityId = this.selected.billingCity;
      order.zoneId = this.selected.billingZone;
      order.areaId = this.selected.billingArea;

      order.subTotal = this.order.invoiceTotal;
      order.totalSellingPrice = this.totalSellingPrice;
      order.grandTotal = this.totalCostWithShipping;
      order.cartItems = this.cartItem;
      let start = new Date();
      order.date =
        start.getFullYear() +
        "-" +
        (start.getMonth() + 1) +
        "-" +
        start.getDate();

      const res = await this.callApi("post", "app/order", order);
      if (res.status == 200) {
        this.s("Your order submitted sucessfully !");
        this.loading = false;
        this.removeAll();
        this.removeAllorder();
      } else if (res.status == 422) {
        this.e(res.data.message);
      } else this.swr();
      this.loading = false;
    },
    removeAllorder() {
      let order = {
        billingCity:'',
      shippingPrice:0,
      coupon:'',
      discountType:'',
      discount:0,
      postCode:'',
      referralCode:'',
      giftVoucherCode:'',
      giftVoucherAmount:0,
      isDGMoney:0,
      dgAmount:0,
      roundAmount:0,
      refferalDiscount:0,
      membershipDiscount:0,
      promoDiscount:0,
      refferalDiscountAmount:0,
      membershipDiscountAmount:0,
      promoDiscountAmount:0,

      totalSellingPrice:0,
      subTotal:0,
      invoiceTotal:0,
      grandTotal:0,
      billingAddress:'',
      paymentType:'',
      name:'',
      contact:'',
      };
      this.$store.commit("order", order);
    },
    checkMemberShip() {
      if (this.cartItem.length == 0) {
        this.$router.push("/");
        return;
      }
      let order = this.order;
      if (this.authUser) {
        if (this.authUser.customer && this.authUser.customer.barcode) {
          console.log("Yes");
          this.order.discount = 10;
          this.order.discountType = "Membership Discount";
          this.ismember = true;
        }
      }
      this.$store.commit("order", order);
    },
    autoRound(value) {
      let reminder = value % 10;
      this.order.roundAmount = reminder;
      console.log(value-reminder);
      return value - reminder;
    },
    async getAreas() {
      const res = await this.callApi(
        "get",
        `app/get_areas/${this.selected.billingZone}`
      );
      if (res.status == 200) {
        this.areas = res.data.data;
      } else if (res.status == 401) {
        this.e(res.data.message);
      } else {
        this.swr();
      }
    },
    async getShippingAreas() {
      console.log('hello');
      const res = await this.callApi(
        "get",
        `app/get_areas/${this.selected.shippingZone}`
      );
      if (res.status == 200) {
        this.shippingAreas = res.data.areas;
      } else if (res.status == 401) {
        this.e(res.data.message);
      } else {
        this.swr();
      }
    },
  },
  computed: {
    ...mapGetters({order: 'order',cartItem:'getCartItem'}),
    totalCost() {
      let cost = this.order.invoiceTotal;
     if (this.order.membershipDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.membershipDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.membershipDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      } else if (this.order.refferalDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.refferalDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.refferalDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      } else if (this.order.promoDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.promoDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.promoDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      }
      if (this.order.giftVoucherAmount > 0)
        cost = cost - this.order.giftVoucherAmount;
      if (this.order.isDGMoney) cost = cost - this.order.dgAmount;
      cost = Math.floor(cost);
      cost = this.autoRound(cost);
      return cost;
    },
    totalCostWithShipping() {
      let cost = this.order.invoiceTotal;
      if (this.order.membershipDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.membershipDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.membershipDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      } else if (this.order.refferalDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.refferalDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.refferalDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      } else if (this.order.promoDiscount > 0) {
        var totalOld = cost;
        var discountAmount = (this.order.promoDiscount * totalOld) / 100;
        discountAmount = Math.ceil(discountAmount);
        var afterDiscount = totalOld - discountAmount;
        this.order.promoDiscountAmount = discountAmount;
        afterDiscount = afterDiscount;
        cost = afterDiscount;
      }
      if (this.order.giftVoucherCode != ""){
        cost = parseFloat(cost) - parseFloat(this.order.giftVoucherAmount);
      }
      cost = Math.floor(cost);
      cost = this.autoRound(cost);
      if (this.order.shippingPrice > 0) cost = parseFloat(cost) + parseFloat(this.order.shippingPrice);
      return cost
    },
    filterZones() {
      if (this.selected.billingCity) {
        let newZones = [];
        for (let d of this.zones) {
          if (d.city_id == this.selected.billingCity) {
            newZones.push(d);
          }
        }
        return newZones;
      } else return this.zones;
    },
    filterAreas() {
      if (this.selected.billingZone) {
        let newZones = [];
        for (let d of this.areas) {
          if (d.zone_id == this.selected.billingZone) {
            newZones.push(d);
          }
        }
        return newZones;
      } else return this.areas;
    },
    isAreaEnable() {
      if (this.selected.billingZone != "" && this.selected.billingCity != "")
        return false;
      else return true;
    },
  },
  async mounted() {
    if (this.$route.query.redirect_from) {
      var myOrder = JSON.parse(this.$ls.get("myOrder"));
      myOrder.paymentType = "bKash";
      this.$store.commit("order", myOrder);
    } else {
    }
    if (this.order.discount == 0) this.checkMemberShip();
    let order = this.order;

    if (this.authUser) {
      console.log("calling settimeout", order);

      if (order.billingCity) {
        let index = this.cities.findIndex((d) => d.name == order.billingCity);
        if (index > -1) {
          this.selected.billingCity = this.cities[index].id;
        }
      } else if (this.authUser.customer && this.authUser.customer.cityId) {
        let index = this.cities.findIndex(
          (d) => d.id == this.authUser.customer.cityId
        );
        if (index > -1) {
          order.billingCity = this.cities[index].name;
          this.selected.billingCity = this.cities[index].id;
        }
      }

      if (order.billingZone) {
        let index = this.zones.findIndex(
          (d) => d.zoneName == order.billingZone
        );
        if (index > -1) {
          this.selected.billingZone = this.zones[index].id;
          console.log("order billingzone", this.selected.billingZone);
        }
      } else if (this.authUser.customer && this.authUser.customer.zoneId) {
        let index = this.zones.findIndex(
          (d) => d.id == this.authUser.customer.zoneId
        );
        console.log("auth billingzone before", index);
        if (index > -1) {
          order.billingZone = this.zones[index].zoneName;
          this.selected.billingZone = this.zones[index].id;
          console.log("auth billingzone", this.selected.billingZone);
          if (this.zones[index].postCode)
            order.postCode = this.zones[index].postCode;
          if (this.settings.isShippingFree == 0) {
            order.shippingPrice = parseFloat(this.zones[index].delivery);
          } else if (this.settings.isShippingFree == 1) {
            if (this.settings.shippingFreeAfter >= this.totalCost) {
              order.shippingPrice = parseFloat(this.zones[index].delivery);
            }
          }
        }
      }
      if (this.selected.billingZone) await this.getAreas();
      if (order.billingArea) {
        let index = this.areas.findIndex((d) => d.name == order.billingArea);
        if (index > -1) {
          this.selected.billingArea = this.areas[index].id;
        }
      } else if (this.authUser.customer && this.authUser.customer.areaId) {
        let index = this.areas.findIndex(
          (d) => d.id == this.authUser.customer.areaId
        );
        if (index > -1) {
          order.billingArea = this.areas[index].name;
          this.selected.billingArea = this.areas[index].id;
        }
      }
      if (this.authUser.customer && this.authUser.customer.barcode) {
        if (order.discount <= 10) {
          console.log("Yes MembershipFouond");
          order.discount = 10;
          order.membershipDiscount = 10;
          order.refferalDiscount = 0;
          order.refferalDiscountAmount = 0;
          order.promoDiscount = 0;
          order.promoDiscountAmount = 0;
          order.discountType = "Membership Discount";
          this.ismember = true;
        }
      }
      if (!order.name) order.name = this.authUser.name;
      if (!order.email) order.email = this.authUser.email;
      if (!order.contact) order.contact = this.authUser.contact;
      if (!order.billingAddress)
        order.billingAddress = this.authUser.customer
          ? this.authUser.customer.address
          : "";
      if (!order.postCode)
        order.postCode = this.authUser.customer
          ? this.authUser.customer.postCode
          : "";
      this.$store.commit("order", order);
    }
    console.log("endig settimeout", this.order);
    this.fetchLoading = false;
  },
  async created() {
    console.log(this.order);
    const [res, res2, res3] = await Promise.all([
      this.callApi("get", "/app/get_zones"),
      this.callApi("get", "/app/settings"),
      this.callApi("get", "/app/get_cities"),
    ]);
    if (res.status == 200 && res3.status == 200) {
      this.zones = res.data.data;
      this.cities = res3.data.data;

      if (this.order.billingCity) {
        let index = this.cities.findIndex(
          (d) => d.name == this.order.billingCity
        );
        if (index > -1) {
          this.selected.billingCity = this.cities[index].id;
        }
      }
      if (this.order.billingZone) {
        let index = this.zones.findIndex(
          (d) => d.zoneName == this.order.billingZone
        );
        if (index > -1) {
          this.selected.billingZone = this.zones[index].id;
          console.log("order billingzone", this.selected.billingZone);
          this.getAreas();
        }
      }
    }
    if (res2.status == 200) {
      this.settings = res2.data;
    }
  },
};
</script>
