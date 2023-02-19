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
              <nuxt-link class="menu-link active" aria-current="page" to="/"
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
              <nuxt-link
                class="menu-link"
                aria-current="page"
                to="/dashboard-account"
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

        <!-- Dashboard My Order-->

        <div class="dashboard-order--details menu-item">
          <h4 class="menu-item--title">Order Details</h4>
          <div class="dashboard-order--details---area">
            <div class="product-detail">
              <h4 class="title">PX 890</h4>
              <h4 class="sub-title">order details: 2021-08-27 17:20:08</h4>
            </div>
            <div class="customer-detail">
              <h4 class="sub-title">Billing Information:</h4>
              <h4 class="title">Mahisa Maliha</h4>
              <h4 class="title">Sylhet Shadar, Sylhet</h4>
              <h4 class="title">123-456-789</h4>
            </div>
            <div class="payment-method">
              <h4 class="sub-title">Payment Method:</h4>
              <h4 class="title">Bkash</h4>
            </div>
            <div class="payment-status">
              <h4 class="sub-title">Payment Status</h4>
              <h4 class="title">Pending</h4>
            </div>
          </div>

          <div class="dashboard-order--details---table pt-50">
            <table>
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">QTY</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class="product-details">
                  <td scope="row">Sony ZV-1 digital camera</td>
                  <td>25</td>
                  <td>1</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td scope="row" class="total-title">Sub Total</td>
                  <td></td>
                  <td></td>
                  <td>25</td>
                </tr>
                <tr>
                  <td scope="row">Membership Discount 10%</td>
                  <td></td>
                  <td></td>
                  <td>-3</td>
                </tr>
                <tr>
                  <td scope="row">Rounding(+/-)</td>
                  <td></td>
                  <td></td>
                  <td>-2</td>
                </tr>
                <tr>
                  <td scope="row">Deliver Charge</td>
                  <td></td>
                  <td></td>
                  <td>0</td>
                </tr>
                <tr>
                  <td scope="row" class="total-title">Grand Total</td>
                  <td></td>
                  <td></td>
                  <td>20</td>
                </tr>
              </tbody>
            </table>
            <button>Track Order</button>
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
      isLoading: false,
      orders: [],
    };
  },
  async created() {
    this.isLoading = true;
    const response = await this.callApi("get", `/app/get_order_details`);
    if (response.status == 200) {
      this.orderDetails = response.data[0];
    } else this.swr();
    this.isLoading = false;
  },
};
</script>