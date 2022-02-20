// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="loan-info">
  <b-card
    title="Loan"
  >
    <div>Current Balance: ${{ balance }}</div>
    <div>Remaining Term {{ remainingTerm }} months</div>
    <div>Current Rate: {{ loanRate }}%</div>
    <div>Current Payment: ${{ payment }}</div>
  </b-card>
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
.game {
  margin: 0 auto;
  margin-top: 40px;
  padding: 0 1rem;
  max-width: 32rem;
}
</style>
