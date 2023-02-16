<template>
    <div>
        <!--************Navbar****************-->

        <!-- <Navbar /> -->
        <div class="header-info">
            <div class="container">
                <div class="header-info-content">
                    <div class="header-info-content-item d-none d-lg-block">Refer a Friend. Get 20% Off</div>
                    <div class="header-info-content-item d-none d-lg-block">Subscribe Today Get $10 Off</div>
                    <div class="header-info-content-item d-none d-lg-block">Free Shipping +30 Day Returns</div>
                </div>
            </div>
        </div>

        <!--***************Dashboard Section***************-->

        <section class="container pt-50 pb-50">
            <div class="dashboard-section">
                <div class="dashboard-menu">
                    <figure>
                        <img src="/assets/img/dashboard.png" alt="">
                    </figure>
                    <h4 class="header">Mahisa Maliha</h4>
                    <ul class="dashboard-menu--list">
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link" aria-current="page" to="/dashboard-profile"
                                ><i class="las la-icons"></i><h4>Dashboard</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-order"
                                ><i class="las la-shopping-bag"></i><h4>My Orders</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-preOrder"
                                ><i class="las la-box"></i><h4>My Pre-Orders</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link active" aria-current="page" to="/"
                                ><i class="las la-bell"></i><h4>Notification</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-address"
                                ><i class="las la-map-marker"></i><h4>Address</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-account"
                                ><i class="las la-user"></i><h4>Account Details</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-report"
                                ><i class="las la-clipboard-list"></i><h4>Report Issue</h4></nuxt-link
                            >
                        </li>
                        <li class="dashboard-menu--list---item">
                            <nuxt-link class="menu-link " aria-current="page" to="/dashboard-signOut"
                                ><i class="las la-sign-out-alt"></i><h4>Sign Out</h4></nuxt-link
                            >
                        </li>
                    </ul>
                </div>

                <!-- Dashboard Notification -->

                <div class="dashboard-notification menu-item">
                    <h4 class="menu-item--title border-0 p-0">Notification</h4>
                    <div class="list">
                        <div class="list--item active">
                            <i class="las la-bell"></i>
                            <div class="notification-list--item---info">
                                <h4 class="title">Your Order #PX890 is Canceled</h4>
                                <h4 class="sub-title">2021-08-27 17:20:08</h4>
                            </div>
                        </div>
                        <div class="list--item">
                            <i class="las la-bell"></i>
                            <div class="notification-list--item---info">
                                <h4 class="title">Your Order #PX890 is Canceled</h4>
                                <h4 class="sub-title">2021-08-27 17:20:08</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="discount-section pb-100">
                <h4 class="sub-title">
                    Ten Percent Discount for
                </h4>
                <h4 class="title">
                    Our Premium Customers
                </h4>
                <p class="text">
                    Your will get 10% discount on your each and every purchase by using Loyalty Card for lifetime.
                </p>
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
};
</script>