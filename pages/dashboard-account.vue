<template>
  <div>
    <!--***************Dashboard Section***************-->

    <section class="container pt-50 pb-50">
      <div class="dashboard-section">
        <div class="dashboard-menu">
          <figure>
            <img src="/assets/img/dashboard.png" alt="" />
          </figure>
          <h4 class="header">Mahisa Maliha</h4>
          <ul class="dashboard-menu--list">
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-profile"
                ><i class="las la-icons"></i>
                <h4>Dashboard</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-order"
                ><i class="las la-shopping-bag"></i>
                <h4>My Orders</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-preOrder"
                ><i class="las la-box"></i>
                <h4>My Pre-Orders</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-notification"
                ><i class="las la-bell"></i>
                <h4>Notification</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-address"
                ><i class="las la-map-marker"></i>
                <h4>Address</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link class="menu-link active" aria-current="page" to="/"
                ><i class="las la-user"></i>
                <h4>Account Details</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-report"
                ><i class="las la-clipboard-list"></i>
                <h4>Report Issue</h4>
              </nuxt-link>
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-signOut"
                ><i class="las la-sign-out-alt"></i>
                <h4>Sign Out</h4>
              </nuxt-link>
            </li>
          </ul>
        </div>

        <!-- Dashboard Account -->

        <div class="dashboard-account menu-item">
          <h4 class="menu-item--title">Account Details</h4>

          <div class="account-details">
            <form>
              <div class="input-field">
                <label>Name *</label>
                <div class="custom-input__group">
                  <input
                    class="custom-input__field"
                    type="text"
                    placeholder="Name"
                    v-model="formValue.name"
                  />
                </div>
              </div>
              <div class="account-details--email">
                <div class="account-details--email---item">
                  <div class="input-field">
                    <label>Email *</label>
                    <div class="custom-input__group">
                      <input
                        class="custom-input__field"
                        type="email"
                        v-model="formValue.email"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                </div>
                <div class="account-details--email---item">
                  <div class="input-field">
                    <label>Phone *</label>
                    <div class="custom-input__group">
                      <input
                        class="custom-input__field"
                        type="text"
                        placeholder="Your Phone"
                        v-model="formValue.contact"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="account-details--select">
                <div class="account-details--select---item">
                  <div class="input-field">
                    <label>Select Your City*</label>
                    <div>
                      <Select
                        v-model="formValue.customer.cityId"
                        class="only"
                        placeholder="Choose a City"
                        @on-change="getZones"
                        filterable
                      >
                        <Option
                          v-for="(city, index) in cities"
                          :value="city.id"
                          :key="index"
                          >{{ city.name }}</Option
                        >
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="account-details--select---item">
                  <div class="input-field">
                    <label>Select Your Zone*</label>
                    <div>
                      <Select
                        v-model="formValue.customer.zoneId"
                        class="only"
                        placeholder="Choose a Zone"
                        @on-change="getAreas"
                        :disabled="formValue.customer.cityId ? false : true"
                        filterable
                      >
                        <Option
                          v-for="(zone, index) in zones"
                          :value="zone.id"
                          :key="index"
                          >{{ zone.zoneName }}</Option
                        >
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="account-details--select---item">
                  <div class="input-field">
                    <label>Select Your Area*</label>
                    <div>
                      <Select
                        v-model="formValue.customer.areaId"
                        class="only"
                        placeholder="Choose a Area"
                        :disabled="formValue.customer.cityId ? false : true"
                        filterable
                      >
                        <Option
                          v-for="(area, index) in areas"
                          :value="area.id"
                          :key="index"
                          >{{ area.name }}</Option
                        >
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-field">
                <label>Address *</label>
                <div class="custom-input__group">
                  <input
                    class="custom-input__field"
                    type="text"
                    placeholder="Street Address"
                    v-model="formValue.customer.address"
                    id="address"
                  />
                </div>
              </div>
              <div class="input-field">
                <label>Postcode / Zip *</label>
                <div class="custom-input__group">
                  <input
                    class="custom-input__field"
                    type="text"
                    placeholder="Postcode / Zip"
                    v-model="formValue.customer.postCode"
                  />
                </div>
              </div>
              <div class="input-field">
                <label>Facebook Profile*</label>
                <div class="custom-input__group">
                  <input
                    class="custom-input__field"
                    type="text"
                    placeholder="Facebook Profile"
                    v-model="formValue.customer.facebook"
                  />
                </div>
              </div>
              <div class="input-field">
                <label>Instagram profile*</label>
                <div class="custom-input__group">
                  <input
                    class="custom-input__field"
                    type="text"
                    placeholder="Instagram profile"
                    v-model="formValue.customer.instagram"
                  />
                </div>
              </div>
              <div class="custom-input__checkbox">
                <input
                  type="checkbox"
                  id="payment1"
                  v-model="isPasswordChange"
                />
                <label for="payment1"> Password Change?</label>
              </div>
              <template v-if="isPasswordChange">
                <div class="input-field">
                  <label>Current password</label>
                  <div class="custom-input__group">
                    <input
                      class="custom-input__field"
                      type="password"
                      placeholder="Current password"
                      v-model="password.oldPassword"
                    />
                  </div>
                </div>
                <div class="input-field">
                  <label>New password</label>
                  <div class="custom-input__group">
                    <input
                      class="custom-input__field"
                      type="password"
                      placeholder="New password"
                      v-model="password.password"
                    />
                  </div>
                </div>
                <div class="input-field">
                  <label>Confirm password</label>
                  <div class="custom-input__group">
                    <input
                      class="custom-input__field"
                      type="password"
                      placeholder="Confirm password"
                      v-model="password.cpassword"
                    />
                  </div>
                </div>
              </template>
            </form>
            <button @click="formSubmit">SAVE CHANGES</button>
          </div>
        </div>
      </div>

      <div class="discount-section pb-100">
        <h4 class="sub-title">Ten Percent Discount for</h4>
        <h4 class="title">Our Premium Customers</h4>
        <p class="text">
          Your will get 10% discount on your each and every purchase by using
          Loyalty Card for lifetime.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isPasswordChange: false,
      checkbox: false,
      isLoading: false,
      cities: [],
      zones: [],
      areas: [],
      customers: [],
      formValue: {
        name: "",
        email: "",
        contact: "",
        username: "",
        customer: {
          address: "",
          zone: "",
          postCode: "",
          zoneId: "",
          facebook: "",
          instagram: "",
          cityId: "",
        },
      },
      password: {
        oldPassword: "",
        password: "",
        cpassword: "",
      },
    };
  },
  methods: {
    // async formSubmit() {
    //   if (this.formValue.name.trim() == "") return this.i("Name is Empty!");
    //   // if(this.formValue.email.trim() == '') return this.i("Email is Empty!")
    //   if (this.formValue.contact.trim() == "")
    //     return this.i("Contact is Empty!");

    //   if (this.formValue.customer.address === "")
    //     return this.i("Address is Empty!");
    //   if (this.formValue.customer.zoneId == "")
    //     return this.i("Zone Id is Empty!");
    //   if (this.formValue.customer.facebook.trim() == "")
    //     return this.i("Facbook is Empty!");
    //   if (this.formValue.customer.instagram.trim() == "")
    //     return this.i("Instagram is Empty!");
    //   if (this.isPasswordChange) {
    //     if (this.password.oldPassword.trim() == "")
    //       return this.i("Current Password is Empty!");
    //     if (this.password.password.trim() == "")
    //       return this.i("New Password is Empty!");
    //     if (this.password.cpassword.trim() !== this.password.password.trim())
    //       return this.i(" Password Doesn't match!");
    //     this.formValue.password = this.password;
    //   } else {
    //     delete this.formValue.password;
    //   }
    //   this.formValue.customer.customerName = this.formValue.name;
    //   this.formValue.customer.contact = this.formValue.contact;
    //   this.formValue.customer.email = this.formValue.email;
    //   let index = this.zones.findIndex(
    //     (d) => d.id == this.formValue.customer.zoneId
    //   );
    //   this.formValue.customer.zone = this.zones[index].zoneName;
    //   const res = await this.callApi("post", "app/user/edit", this.formValue);
    //   if (res.status == 200) {
    //     this.s("Profile updated Successfully!");
    //     this.$store.commit("setAuthInfo", this.formValue);
    //   } else if (res.status == 401) {
    //     this.e(res.data.message);
    //   } else {
    //     this.swr();
    //   }
    // },

    async formSubmit() {
      console.log(this.formValue);

      if (this.formValue.name == "") return this.i("Name is Empty!");
      // if(this.formValue.email.trim() == '') return this.i("Email is Empty!");
      if (this.formValue.contact == "") return this.i("Contact is Empty!");

      if (this.formValue.customer.address === "")
        return this.i("Address is Empty!");
      if (this.formValue.customer.zoneId == "")
        return this.i("Zone Id is Empty!");
      if (this.formValue.customer.facebook == "")
        return this.i("Facbook is Empty!");
      if (this.formValue.customer.instagram == "")
        return this.i("Instagram is Empty!");
      if (this.isPasswordChange) {
        if (this.password.oldPassword.trim() == "")
          return this.i("Current Password is Empty!");
        if (this.password.password.trim() == "")
          return this.i("New Password is Empty!");
        if (this.password.cpassword.trim() !== this.password.password.trim())
          return this.i(" Password Doesn't match!");
        this.formValue.password = this.password;
      } else {
        delete this.formValue.password;
      }

      this.formValue.customer.customerName = this.formValue.name;
      this.formValue.customer.contact = this.formValue.contact;
      this.formValue.customer.email = this.formValue.email;
      console.log(this.formValue);

      let index = this.zones.findIndex(
        (d) => d.id == this.formValue.customer.zoneId
      );
      this.formValue.customer.zone = this.zones[index].zoneName;
      const res = await this.callApi("post", "app/user/edit", this.formValue);
      if (res.status == 200) {
        this.s("Profile updated Successfully!");
        this.$store.commit("setAuthInfo", this.formValue);
      } else if (res.status == 401) {
        this.e(res.data.message);
      } else {
        this.swr();
      }
    },
    onChange(event) {
      this.data.customer.zone;
    },

    async getCities() {
      const response = await this.callApi("get", `/app/get_cities?limit=10`);
      if (response.status == 200) {
        this.cities = response.data.data;
      } else this.swr();
    },
    async getZones() {
      let city = this.formValue.customer.cityId
        ? this.formValue.customer.cityId
        : "";
      const response = await this.callApi("get", `/app/get_zones?city=${city}`);
      if (response.status == 200) {
        this.zones = response.data.data;
      } else this.swr();
    },
    async getAreas() {
      let zone_id = this.formValue.customer.zoneId
        ? this.formValue.customer.zoneId
        : "";
      const response = await this.callApi(
        "get",
        `/app/get_areas?zone=${zone_id}`
      );
      if (response.status == 200) {
        this.areas = response.data.data;
      } else this.swr();
    },
    // async asyncData({ app, store, redirect, params }) {
    //   try {
    //     let [res] = await Promise.all([
    //       app.$axios.get(`/app/get_customer_info`),
    //     ]);
    //     return {
    //       customers: res.data,
    //     };
    //   } catch (error) {
    //     console.log("error from asyncData server");
    //     console.log(error);
    //     //   return redirect("/");
    //   }
    // },
  },

  async created() {
    // const [resCities, resZones, resAreas] = await Promise.all([
    //   this.callApi("get", "/app/get_cities?limit=10"),
    //   this.callApi("get", "/app/get_zones?limit=10"),
    //   this.callApi("get", "/app/get_areas?limit=10"),
    // ]);

    // if (
    //   resCities.status == 200 &&
    //   resZones.status == 200 &&
    //   resAreas.status == 200
    // ) {
    //   this.cities = resCities.data.data;
    //   this.zones = resZones.data.data;
    //   this.areas = resAreas.data.data;
    // } else {
    //   this.swr();
    // }
    this.formValue = JSON.parse(JSON.stringify(this.authUser));
    this.getCities();

    if (this.formValue.customer.cityId) this.getZones();
    if (this.formValue.customer.areaId) this.getAreas();
  },
};
</script>