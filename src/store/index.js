import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light-theme',
    loggedIn: false,
    cash: 0,
    income: 4000,
    cumulativePayments: 0,
    originalBalance: 400000,
    balance: 400000,
    remainingTerm: 360,
    loanRate: 4,
    payment: 1909.66,
    newTerm: 360,
    newFees: 4000,
    change: 0.005,
    rateHistory: [],
    userRateHistory: [],
    optimalRateHistory: [],
    optimalRateHistory2: [],
    threshold: 1.0,
    gameOver: false,
    go: false,
    breakPayoff: true,
    newRate: 4,
    minRate: 4,
    recordRate: null,
    message: ''
  },
  getters,
  mutations,
  actions
})
