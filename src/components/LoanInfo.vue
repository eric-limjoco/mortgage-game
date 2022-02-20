// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <b-card
    header="Loan"
    footer-tag="footer"
  >
    <div class="current-balance h4">
      <b-icon icon="cash"></b-icon>
      ${{ balance }}
    </div>
    <div class="current-loan-info">
      {{ loanRate }}% / {{ remainingTerm }} months
    </div>
    <template #footer>
      <div class="monthly-payment">
        <span class="info-label">Monthly Payment</span>
      </div>
      ${{ payment }}
    </template>
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
.info-label {
  font-size: .6rem;
  font-weight: 600;
}
</style>
