<template>
  <div>
    <section class="signIn-section pt-50 pb-50">
      <div class="signIn-section--card">
        <div class="signIn-section--card-logo">
          <nuxt-link to="/">
            <img src="/assets/img/brand.png" alt="Brand" />
          </nuxt-link>
        </div>
        <div class="signIn-section--card-input">
          <form v-on:submit.prevent>
            <h4>Sign In</h4>
            <div class="custom-input__group">
              <i class="custom-input__prepend"><i class="lni lni-phone"></i></i>
              <input
                class="custom-input__field"
                type="text"
                placeholder="Enter You Number"
                v-model="data.contact"
              />
            </div>
            <div class="custom-input__group">
              <i class="custom-input__prepend"
                ><i class="lni lni-lock-alt"></i
              ></i>
              <input
                class="custom-input__field"
                type="password"
                placeholder="Password"
                v-model="data.password"
              />
            </div>
            <div class="form-check__box">
              <div class="custom-input__checkbox">
                <input type="checkbox" id="signIn" v-model="checkbox" />
                <label for="signIn">Keep me signed in</label>
              </div>
            </div>
            <button
              type="submit"
              @click="login"
              :disabled="isLoading"
              :loading="isLoading"
            >
              {{ isLoading ? "Signing In..." : "Sign In" }}
            </button>
            <p>
              Don't have an Account ?
              <nuxt-link to="/signUp">Sign Up</nuxt-link>
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      checkbox: false,
      isLoading: false,
      isLoggingBlock: true,
      errors: [],
      data: {
        contact: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      if (this.data.contact.trim() == "")
        return this.e("Phone Number is required");
      if (this.data.password.trim() == "")
        return this.e("Password is required");

      this.isLoading = true;

      const res = await this.callApi("post", "/app/login", this.data);

      if (res.status == 200) {
        this.$store.dispatch("setAuthInfo", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.setCookie("token", res.data.token);
        this.s("You are logged In");
        this.getCartItemsServer()
        if(this.callCartOb){
            let product = this.callCartOb;
            let quantity = product.quantity
            delete product.quantity;
            this.addToCartServer(this.callCartOb,quantity)
            this.$store.commit('setCallCartOb',null)
            this.$router.push('/cart')
            return
        }
        window.location = "/";
      }
      else if(res.status == 422){
        for (let x in res.data) {
              this.e( res.data[x]);
          }
      }
      else if(res.status == 401){
        for (let x in res.data) {
              this.e( res.data[x]);
          }
      }
      else if(res.status == 400){
        for (let x in res.data) {
              this.e( res.data[x]);
          }
      }
      else if(res.status == 402){
        for (let x in res.data) {
              this.e( res.data[x]);
        }
          let emailPassword = {
            contact: this.data.contact,
            password: this.data.password,
          };
          this.$store.commit("setUnauthorizedCredential", emailPassword);
          this.$router.push(`/account-activation`);
      }
      else this.swr();
      this.isLoading = false;
    },
  },
  computed:{
      ...mapGetters({
          callCartOb:'getCallCartOb',
      })
  },
  mounted() {
    document.addEventListener("click", this.hideSearchbar);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },
};
</script>

