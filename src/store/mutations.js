function randN (mean, standardDev) {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * standardDev + mean
}
function monthlyPayment (balance, remainingTerm, loanRate) {
  let r = loanRate / 1200
  return (balance * r) / (1 - (Math.pow((1 + r), remainingTerm * -1)))
}

function interestPayment (balance, remainingTerm, loanRate) {
  let interest = balance * loanRate / 1200
  return interest
}
function principalPayment (balance, remainingTerm, loanRate) {
  let payment = monthlyPayment(balance, remainingTerm, loanRate)
  let interest = interestPayment(balance, remainingTerm, loanRate)
  let principal = payment - interest
  return principal
}

export default {
  initState (state) {
    state.loanRate = 4
    state.cash = 0
    state.income = 4000
    state.balance = 400000
    state.remainingTerm = 360
    state.payment = 1909.66
    state.cumulativePayments = 0
    state.originalBalance = 400000
    state.newTerm = 360
    state.newFees = 4000
    state.change = 0.005
    state.rateHistory = []
    state.userRateHistory = []
    state.optimalRateHistory = []
    state.threshold = 1.0
    state.newRate = 4
    state.message = ''
    state.gameOver = false
    state.go = false
    state.breakPayoff = true
    state.minRate = state.loanRate
    state.recordRate = state.loanRate - state.threshold
    state.rateHistory.push(state.loanRate)
    state.userRateHistory.push(state.loanRate)
    state.optimalRateHistory.push(state.loanRate)
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
    if (state.newRate < state.minRate) state.minRate = state.newRate
    if (state.newRate < state.recordRate) state.recordRate = state.newRate - state.threshold
    state.userRateHistory.push(state.loanRate)
    state.rateHistory.push(state.newRate)
    state.optimalRateHistory.push(state.minRate)
  },
  makePayment (state) {
    if (state.gameOver) return
    state.cumulativePayments += state.payment
    state.cash = state.cash + state.income - state.payment
    if (state.cash < 0) state.gameOver = true
    else {
      let principal = principalPayment(state.balance, state.remainingTerm, state.loanRate)
      state.balance -= principal
      state.remainingTerm -= 1
      if (state.remainingTerm <= 0) state.gameOver = true
    }
  },
  refi (state) {
    state.loanRate = state.newRate
    state.remainingTerm = state.newTerm
    state.cash -= state.newFees
    state.cumulativePayments += state.newFees
    state.payment = monthlyPayment(state.balance, state.remainingTerm, state.loanRate)
  },
  cashout (state) {
    let cashoutAmount = state.originalBalance - state.balance
    state.balance = state.originalBalance
    state.loanRate = state.newRate
    state.remainingTerm = state.newTerm
    state.cash = state.cash - state.newFees + cashoutAmount
    state.cumulativePayments += state.newFees
    state.payment = monthlyPayment(state.balance, state.remainingTerm, state.loanRate)
  },
  payoff (state) {
    state.cash = state.cash - state.balance
    state.cumulativePayments += state.balance
    state.gameOver = true
  }
}
