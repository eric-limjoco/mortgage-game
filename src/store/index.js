import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light-theme',
    userFirstName: '',
    userLastName: '',
    userCompany: '',
    userEmail: '',
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
    newRate: 4,
    minRate: 4,
    recordRate: 4,
    message: '',
    gameOver: false,
    go: false,
    breakPayoff: true,
    showOptimal: false,
    savingsScore: 0,
    lowestPayments: 0,
    totalPaymentsNaive: 0,
    maxSavings: 0,
    savings: 0,
    startingPayment: 1909.66,
    startingTerm: 360,
    startBalance: 400000,
    startingRate: 4
  },
  getters,
  mutations,
  actions
})
