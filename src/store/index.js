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
    month: 0,
    cash: 0,
    income: 4000,
    cumulativePayments: 0,
    originalBalance: 400000,
    balance: 400000,
    remainingTerm: 360,
    loanRate: 5.5,
    payment: 2271.16,
    newTerm: 360,
    newFees: 4000,
    change: 0.005,
    rateHistory: [],
    userRateHistory: [],
    optimalRateHistory: [],
    optimalRateHistory2: [],
    refiHistory: [],
    cashoutHistory: [],
    threshold: 1.0,
    newRate: 5.5,
    minRate: 5.5,
    recordRate: 5.5,
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
    startingPayment: 2271.16,
    startingTerm: 360,
    startBalance: 400000,
    startingRate: 5.5,
    refiMonth: false,
    cashoutMonth: false
  },
  getters,
  mutations,
  actions
})
