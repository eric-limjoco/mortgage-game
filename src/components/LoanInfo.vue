<template>
<div class="info">
  <h5>Your Loan</h5>
  <div>Interest Rate</div>
  <div class="h5">
    {{ Math.round(loanRate * 100) / 100}}%
  </div>
  <div>Outstanding Balance</div>
  <div class="mb-2 h5">
    <b-icon icon="cash"></b-icon>
    {{ balance|toCurrency }}
  </div>
  <div>Months Remaining: {{ remainingTerm }} months</div>
  <div>Monthly Payment: {{ payment|toCurrency }}</div>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['balance', 'remainingTerm', 'loanRate', 'payment'])
  }
}
</script>
<style scoped>
.info {
  /* border: 1px solid blue; */
  font-size: .8rem;
}
.info-label {
  font-size: .6rem;
  font-weight: 600;
}
</style>
