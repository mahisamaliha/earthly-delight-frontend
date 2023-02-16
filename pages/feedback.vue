<template>
  <div>
    <!--************Navbar****************-->

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

    <!--************Feedback Section****************-->

    <section class="feedback-section container pt-50 pb-20">
      <div class="row">
        <div class="feedback-contact col-lg-6 col-md-6 pb-30">
          <h4 class="feedback-contact--subtitle">Contact With Us</h4>
          <h4 class="feedback-contact--title">Speak With Our Expert.</h4>

          <ul class="feedback-contact--item">
            <li class="feedback-contact--item---info">
              <div class="contact-icon"><i class="las la-phone-volume"></i></div>
              <div>
                <h5 class="subtitle">CALL ANYTIME</h5>
                <h5 class="title"><a href="tel:123-456789">123-456789</a></h5>
              </div>
            </li>
            <li class="feedback-contact--item---info">
              <div class="contact-icon"><i class="lar la-envelope"></i></div>
              <div>
                <h5 class="subtitle">SEND EMAIL</h5>
                <h5 class="title"><a href="mailto:need_help@company.com">need_help@company.com</a></h5>
              </div>
            </li>
            <li class="feedback-contact--item---info">
              <div class="contact-icon"><i class="las la-map-marker"></i></div>
              <div>
                <h5 class="subtitle">VISIT OFFICE</h5>
                <h5 class="title">350 New York, United States</h5>
              </div>
            </li>
          </ul>
        </div>

        <div class="feedback-input--area col-lg-6 col-md-6 pb-30">
          <form>
            <div class="input-field">
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="input-field">
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div class="custom-input__group">
                <input
                  class="custom-input__field"
                  type="text"
                  placeholder="Subject"
                />
              </div>
            </div>
            <div class="textarea-field">
              <textarea id="report" placeholder="Your Message" rows="7"></textarea>
            </div>
            <div class="custom-input__checkbox">
              <input type="checkbox" id="save" />
              <label for="save"
                >Save my name, email, and website in this browser for the next
                time I comment.</label
              >
            </div>
          </form>
          <button>SEND</button>
        </div>
      </div>
    </section>

    <!--***************Footer Section***************-->
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
