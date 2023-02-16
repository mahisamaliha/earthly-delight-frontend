<template>
  <div>
    <section class="signIn-section pt-50 pb-50">
      <div class="signIn-section--card">
        <div class="signIn-section--card-logo pt-70 pb-70">
          <nuxt-link to="/">
            <img src="/assets/img/brand.png" alt="Brand" />
          </nuxt-link>
        </div>
        <div class="signIn-section--card-input">
          <form v-on:submit.prevent>
            <div class="custom-input__group">
              <input
                class="custom-input__field"
                type="text"
                placeholder="Enter Verification Code"
                v-model="form_data.token"
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              @click="submit"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
              {{ isSubmitting ? "Submitting..." : "Submit OTP" }}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              @click="sendCodeAgain"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
              {{ isSubmitting ? "Sending..." : "Send Code Again" }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      isSidebar: false,
      isSearchbar: false,
      isCart: false,
      mobileDropdownIndex: -1,
      form_data: {
        token: "",
        contact: "",
        password: "",
      },
      digit: {
        digit1: "",
        digit2: "",
        digit3: "",
        digit4: "",
      },
      isSubmitting: false,
      isLoading: false,
      errors: [],
    };
  },
  computed: {
    ...mapGetters({
      unauthorizedCredential: "unauthorizedCredential",
    }),
  },
  methods: {
    showSidebar() {
      this.isSidebar = true;
    },
    hideSidebar() {
      this.isSidebar = false;
    },
    showSearchbar() {
      this.isSearchbar = true;
    },
    hideSearchbar(e) {
      if (this.isSearchbar) {
        let target = e.target;
        var container = this.$refs.searchBox;
        var source = this.$refs.searchBoxSource;

        if (!source.contains(target) && !container.contains(target)) {
          this.isSearchbar = false;
        }
      }
    },
    showCart() {
      this.isCart = true;
    },
    hideCart() {
      this.isCart = false;
    },

    mobileMenuDropdown(index) {
      if (this.mobileDropdownIndex === index) {
        this.mobileDropdownIndex = -1;
      } else {
        this.mobileDropdownIndex = index;
      }
    },

    handleOnComplete(value) {
      console.log("OTP completed: ", value);
      this.form_data.token = value;
      this.onSubmit();
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },

    async submit() {
      if (this.form_data.token == "") return this.i("Code is empty!");
      this.form_data.token = String(this.form_data.token);
      if (this.form_data.token.length != 6)
        return this.i("Code is incomplete!");

      this.form_data.contact = this.unauthorizedCredential.contact;
      this.form_data.password = this.unauthorizedCredential.password;

      const res = await this.callApi(
        "post",
        "/app/verify_email",
        this.form_data
      );
      if (res.status == 200) {
        this.$store.dispatch("setAuthInfo", res.data.user);
        this.$store.dispatch("setToken", res.data.token);
        this.setCookie("token", res.data.token);
        this.s("Login successful !");
        // if (this.$route.query.callback)
        //   return this.$router.push(this.$route.query.callback);
        this.$router.push("/");
      } else {
        if (res.status == 404) this.w(res.data.msg);
        else this.swr();
      }
    },
    async sendCodeAgain() {
      let data = {
        contact: this.$route.query.contact,
      };

      if (data.contact.trim() == "") return this.i("Contact is empty!");

      const res = await this.callApi("post", "/app/sendActivationCode", data);
      if (res.status == 200) {
        this.i(
          "A One-Time Password (OTP) has been sent to your registered mobile number ..."
        );
      } else if (res.status == 422) {
        this.e(res.data.message);
      } else {
        this.swr();
      }
    },
  },

  mounted() {
    document.addEventListener("click", this.hideSearchbar);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideSearchbar);
  },

  // created() {
  //   this.form_data.email = this.$route.query.contact;
  // },
};
</script>

<style lang="scss">
.slide {
  &-enter {
    overflow: hidden;
    max-height: 0;

    &-to {
      max-height: 500px;
      overflow: hidden;
    }

    &-active {
      -moz-transition-duration: 0.5s;
      -webkit-transition-duration: 0.5s;
      -o-transition-duration: 0.5s;
      transition-duration: 0.5s;
      -moz-transition-timing-function: ease-in;
      -webkit-transition-timing-function: ease-in;
      -o-transition-timing-function: ease-in;
      transition-timing-function: ease-in;
    }
  }

  &-leave {
    @extend .slide-enter-to;

    &-to {
      @extend .slide-enter;
    }

    &-active {
      -moz-transition-duration: 0.5s;
      -webkit-transition-duration: 0.5s;
      -o-transition-duration: 0.5s;
      transition-duration: 0.5s;
      -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
  }
}
</style>
