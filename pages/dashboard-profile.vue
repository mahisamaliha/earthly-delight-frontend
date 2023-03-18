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

    <!--***************Dashboard Section***************-->

    <section class="container pt-50 pb-50">
      <div class="dashboard-section">
        <div class="dashboard-menu">
          <figure>
            <img src="/assets/img/dashboard.png" alt="" />
          </figure>
          <h4 class="header">{{ authUser.name }}</h4>
          <ul class="dashboard-menu--list">
            <li class="dashboard-menu--list---item">
              <nuxt-link class="menu-link active" aria-current="page" to="/"
                ><i class="las la-icons"></i>
                <h4>Dashboard</h4></nuxt-link
              >
            </li>
            <li class="dashboard-menu--list---item">
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-order"
                ><i class="las la-shopping-bag"></i>
                <h4>My Orders</h4></nuxt-link
              >
            </li>
            <li class="dashboard-menu--list---item">
              <a class="menu-link" aria-current="page" @click="logout"
                ><i class="las la-sign-out-alt"></i>
                <h4>Sign Out</h4></a
              >
            </li>
          </ul>
        </div>

        <!-- Dashboard Profile -->

        <div class="dashboard-profile menu-item">
          <h4 class="menu-item--title">Dashboard</h4>
          <h4 class="sub-title">
            Hello,
            <span
              >{{ authUser && authUser.name ? authUser.name : "" }} ({{
                authUser.userType
              }})</span
            >
          </h4>
          <p>
            From your account dashboard. you can easily check & view your recent
            orders, manage your shipping and billing addresses and edit your
            password and account details
          </p>
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

  methods: {
    async logout() {
      try {
        this.$store.commit("setAuthInfo", false); //user is no longer authenticated
        this.setCookie("token", null); //clear user's token from browser
        const res = await this.callApi("get", "/app/logout");
        if (res.status == 200) {
          window.location = "/";
        } else {
          swr();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>