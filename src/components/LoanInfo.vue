<template>
<div class="info">
  <h5 id="v-step-outstanding-balance"><b-icon icon="house-door"></b-icon> {{ balance|toCurrency }}</h5>
  <div>Your Interest Rate</div>
  <div class="h5">
    {{ loanRate|toRate }}
  </div>
  <small>{{ remainingTerm }} months remaining</small><br>
  <small>Monthly Payment: {{ payment|toCurrency }}</small>
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
