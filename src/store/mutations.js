function randN (mean, standardDev) {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * standardDev + mean
}
function monthlyPayment (balance, remainingTerm, loanRate) {
  return (balance * (loanRate / 1200)) / (1 - (Math.pow((1 + (loanRate / 1200)), remainingTerm * -1)))
}
function interestPayment (balance, remainingTerm, loanRate) {
  return balance * loanRate / 1200
}
function principalPayment (balance, remainingTerm, loanRate) {
  let payment = monthlyPayment(balance, remainingTerm, loanRate)
  let interest = interestPayment(balance, remainingTerm, loanRate)
  return payment - interest
}
function scheduledBalance (balance, term, loanRate, age) {
  let r = loanRate / 1200
  return balance * (Math.pow(1 + r, term) - Math.pow(1 + r, age)) / (Math.pow(1 + r, term) - 1)
}
function calculateOptimalPayment (age, rate, startingPayment, balance, startingTerm, cash, newFees, income) {
  var currentPayments = startingPayment * age
  var newPayments = 0
  var refiBalance = balance
  var refiPayment = monthlyPayment(refiBalance, startingTerm, rate)

  //re-simulate optimal strategy
  var simCash = cash - newFees
  var currentBalance = refiBalance
  var i

  // simulate new loan to maturity
  for (i=0;i<startingTerm;i++) {  
    simCash += income - refiPayment
    newPayments += refiPayment
    currentBalance = scheduledBalance(refiBalance, startingTerm, rate, i);
    if (simCash > currentBalance) {
      break
    }
  }
  var totalPayments = currentPayments + newPayments + currentBalance
  return totalPayments
}

export default {
  initState (state) {
    state.loanRate = 5.5
    state.startingRate = state.loanRate
    state.month = 0
    state.cash = 0
    state.income = 4000
    state.balance = 400000
    state.remainingTerm = 360
    state.startingTerm = state.remainingTerm
    state.payment = 2271.16
    state.startingPayment = state.payment
    state.cumulativePayments = 0
    state.originalBalance = 400000
    state.startingBalance = state.originalBalance
    state.newTerm = 360
    state.newFees = 4000
    state.change = 0.005
    state.rateHistory = []
    state.userRateHistory = []
    state.optimalPayments = 671130.87
    state.optimalRefiAge = 0
    state.optimalRate = 5.5
    state.optimalRateHistory = []
    state.refiHistory = []
    state.cashoutHistory = []
    state.threshold = 1.0
    state.newRate = 5.5
    state.message = ''
    state.gameOver = false
    state.go = false
    state.breakPayoff = true
    state.minRate = state.loanRate
    state.recordRate = state.loanRate - state.threshold
    state.rateHistory.push(state.loanRate)
    state.userRateHistory.push(state.loanRate)
    state.optimalRateHistory.push(state.loanRate)
    state.showOptimal = false
    state.refiMonth = false
    state.cashoutMonth = false
  },
  loginUser (state, userData) {
    state.userFirstName = userData.firstName
    state.userLastName = userData.lastName
    state.userCompany = userData.company
    state.userEmail = userData.email
    state.loggedIn = true
  },
  logoutUser (state) {
    state.userFirstName = ''
    state.userLastName = ''
    state.userCompany = ''
    state.userEmail = ''
    state.loggedIn = false
  },
  setTheme (state, theme) {
    state.theme = theme
  },
  setMessage (state, message) {
    state.message = message
  },
  updateRates (state) {
    let bigJump = Math.random() < 0.1
    if (bigJump) state.change = randN(0, 0.25)
    else state.change = randN(state.change / 10, 0.05)
    state.newRate += state.change
    if (state.newRate <= 0) state.newRate = 0
    if (state.newRate < state.minRate) state.minRate = state.newRate
    if (state.newRate < state.recordRate) state.recordRate = state.newRate - state.threshold
    
    var newPayment = calculateOptimalPayment(state.month, state.newRate, state.startingPayment, state.balance, state.startingTerm, state.cash, state.newFees, state.income)

    if (newPayment < state.optimalPayments)
    {
      state.optimalPayments = newPayment
      state.optimalRate = state.newRate
      state.optimalRefiAge = state.month
    }
    
    state.userRateHistory.push(state.loanRate)
    state.rateHistory.push(state.newRate)
    state.optimalRateHistory.push(state.minRate)
  },
  makePayment (state) {
    // change to nextMonth()?
    if (state.gameOver) return
    state.cumulativePayments += state.payment
    state.cash = state.cash + state.income - state.payment
    state.refiMonth = false
    state.cashoutMonth = false
    state.month += 1
    if (state.cash < 0) state.gameOver = true
    else {
      let principal = principalPayment(state.balance, state.remainingTerm, state.loanRate)
      state.balance -= principal
      state.remainingTerm -= 1
      if (state.remainingTerm <= 0 || state.balance <= 0) state.gameOver = true
    }
  },
  refi (state) {
    state.loanRate = state.newRate
    state.remainingTerm = state.newTerm
    state.cash -= state.newFees
    state.cumulativePayments += state.newFees
    state.payment = monthlyPayment(state.balance, state.remainingTerm, state.loanRate)
    state.refiMonth = true
    state.refiHistory.push(state.month)
  },
  cashout (state) {
    let cashoutAmount = state.originalBalance - state.balance
    state.balance = state.originalBalance
    state.loanRate = state.newRate
    state.remainingTerm = state.newTerm
    state.cash = state.cash - state.newFees + cashoutAmount
    state.cumulativePayments += state.newFees
    state.payment = monthlyPayment(state.balance, state.remainingTerm, state.loanRate)
    state.cashoutMonth = true
    state.cashoutHistory.push(state.month)
  },
  payoff (state) {
    state.cash = state.cash - state.balance
    state.cumulativePayments += state.balance
    state.balance = 0
    state.gameOver = true
  },
  calculateSavingsScore_old (state) {
    // assume you refi-ed at min rate
    let payoffAge = 142
    let payoffBal = scheduledBalance(state.startingBalance, state.startingTerm, state.startingRate, payoffAge)
    var totalPaymentsNaive = state.startingPayment * state.startingTerm

    var oMinRate = Math.min(...state.rateHistory.slice(0, payoffAge))
    var oMinAge = state.rateHistory.indexOf(oMinRate)
    var oMinBalance = scheduledBalance(state.startingBalance, state.startingTerm, state.startingRate, oMinAge)
    var oMinPayment = monthlyPayment(oMinBalance, state.startingTerm, oMinRate)

    for (let i = 0; i < payoffAge; i++) {
      if (i < oMinAge) {
        state.optimalRateHistory[i] = state.startingRate
      } else {
        state.optimalRateHistory[i] = oMinRate
      }
    }
    // not completely accurate because we didnt re-amortize at refi
    let totalPaymentsOMinRate = (state.startingPayment * oMinAge) + (oMinPayment * (payoffAge - oMinAge)) + payoffBal

    var lowestPayments = Math.min(totalPaymentsNaive, totalPaymentsOMinRate)
    var savings = totalPaymentsNaive - state.cumulativePayments
    var maxSavings = totalPaymentsNaive - lowestPayments

    state.savingsScore = 0
    if (maxSavings !== 0) state.savingsScore = (100 * savings / maxSavings)

    state.totalPaymentsNaive = totalPaymentsNaive
    state.maxSavings = maxSavings
    state.savings = savings
    state.showOptimal = true
  },
  calculateSavingsScore (state) {
    var totalPaymentsNaive = state.startingPayment * state.startingTerm
    var i
    for (let i = 0; i < state.month; i++) {
      if (i < state.optimalRefiAge) {
        state.optimalRateHistory[i] = state.startingRate
      } else {
        state.optimalRateHistory[i] = state.optimalRate
      }
    }
   
    var lowestPayments = Math.min(state.totalPaymentsNaive, state.optimalPayments)
    var savings = totalPaymentsNaive - state.cumulativePayments
    var maxSavings = totalPaymentsNaive - state.optimalPayments

    state.savingsScore = 0
    if (maxSavings !== 0) state.savingsScore = (100 * savings / maxSavings)

    state.totalPaymentsNaive = totalPaymentsNaive
    state.maxSavings = maxSavings
    state.savings = savings
    state.showOptimal = true
  }
}