<template>
  <div>
    <div
      v-if="
        $route.name == 'signIn' ||
        $route.name == 'signUp' ||
        $route.name == 'account-activation'
      "
    >
      <Nuxt />
    </div>
    <div v-else>
      <Navbar />
      <Nuxt />
      <BottomContainer v-if="bottomContainer == true" />
    </div>
  </div>
</template>
<script>
import Navbar from "/components/navbar";
import BottomContainer from "/components/footer";

export default {
  components: {
    Navbar,
    BottomContainer,
  },
  data() {
    return {
      bottomContainer: true,
    };
  },
  methods: {
    isFooterShowChange() {
      if (
        this.$route.name == "login" ||
        this.$route.name == "shop" ||
        this.$route.name == "product-id" ||
        this.$route.name == "registration" ||
        this.$route.name == "auth-account-activation" ||
        this.$route.name == "auth-code-varification" ||
        this.$route.name == "auth-forget-password" ||
        this.$route.name == "auth-reset-password" ||
        this.$route.name == "admin-add-product"
      ) {
        this.bottomContainer = false;
      } else this.bottomContainer = true;
    },
  },
  watch: {
    "$route.name": function (newVal, oldVal) {
      // watch it
      this.isFooterShowChange();
    },
  },
  async mounted() {
    // if(this.authUser) this.getCartItemsServer()
    this.isFooterShowChange();
  },
};
</script>
