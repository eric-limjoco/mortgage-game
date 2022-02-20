// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <b-card
    title="Loan"
  >
    <div>${{ balance }} / {{ loanRate }}%</div>
    <div>Remaining Term: {{ remainingTerm }} months</div>
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
.info {
  font-size: .8rem;
}
</style>
