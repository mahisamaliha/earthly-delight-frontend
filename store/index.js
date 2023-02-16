//import Vuex from 'vuex'
//import axios from 'axios'
export const strict = false
import cookie from 'cookie'

export const state = () => ({
    user : 'no user',
    authUser: false,
    callWishListOb:null,
    callCartOb:null,
    cart: [],
    order:{
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


    },
    allGlobalProducts:[],
    globalProductLoading:true,
    token: '',
    unauthorizedCredential: { contact: "",  password: ""},

})
// common getters
export const getters = {
  getIsLoggedIn (state) {
    return !!state.authUser
  },
  getAuthUser (state) {
    return state.authUser
  },
  getToken (state) {
    return state.token
  },
  getCallCartOb (state) {
    return state.callCartOb
  },
  unauthorizedCredential(state) {
    return state.unauthorizedCredential;
  },
  getAllGlobalProducts (state) {
    return state.allGlobalProducts
  },
  getGlobalProductLoading (state) {
    return state.globalProductLoading
  },

  getCallWishListOb (state) {
    return state.callWishListOb
  },
  order (state) {
    return state.order;
  },
  getCartItem (state) {
    return state.cart
  },
}
//mutations for changing data from action
export const mutations = {
  loginUser(state, data) {
    state.authUser = data
  },
  setAuthInfo(state, data) {
    state.authUser = data
  },
  updateCart (state, data) {
    state.cart = data
  },
  setToken(state, data) {
    state.token = data
  },
  removeItem (state, i) {
    state.cart.splice(i,1)
  },
  removeAll (state, data) {
    state.cart=[]
  },
  setCallCartOb (state, data) {
    state.callCartOb = data
  },
  setUnauthorizedCredential(state, data) {
    state.unauthorizedCredential = data;
  },
  setAllGlobalProducts (state, data) {
    state.allGlobalProducts = data
  },
  setGlobalProductLoading (state, data) {
    state.globalProductLoading = data
  },
  pushAllGlobalProducts (state, data) {
    state.allGlobalProducts.push(data)
  },
  setCallWishListOb (state, data) {
    state.callWishListOb = data
  },
  order (state, data) {
    state.order = data
  },
}
// actionns for commiting mutations
export const actions = {
    async nuxtServerInit({ commit, state }, { $axios, req, env })  {
    console.log('I am running as nuxt server init')
    const session = req.headers.cookie ? cookie.parse(req.headers.cookie) : ''
    // console.log("token : ",session)
    $axios.setToken(session.token, 'Bearer');
    try {
      const res  = await $axios.get('/app/auth_user')
      console.log(res.data)
      commit('setAuthInfo', res.data)
      const cart = await $axios.get(`/app/get_cart`)
      if(cart.status == 200){
        // console.log(cart.data);
        state.order.invoiceTotal = cart.data.total
        commit('updateCart', cart.data.data)
      }
    } catch (e) {
        console.log('nuxt server error ')
    }
  },

  setToken ({ commit }, data) {
    commit('setToken', data)
  },
  updateCart ({ commit }, data) {
    commit('updateCart', data)
  },
  setAuthInfo ({ commit }, data) {
    commit('setAuthInfo', data)
  },
}
