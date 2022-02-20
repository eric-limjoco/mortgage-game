// eslint-disable-next-line vue/multi-word-component-names
<template>
<div>
  <div class="game">
    <p>
      Pay off the loan with the minimum amount of money possible.
    </p>
    <div class="controls">
      <play-bar />
    </div>
    <b-alert
      :show="message.length>0"
    >
      {{ message }}
    </b-alert>
    <rate-chart />
    <div class="info">
      <financial-info />
      <loan-info />
      <rates-info />
    </div>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import PlayBar from './PlayBar.vue'
import RateChart from './RateChart.vue'
import FinancialInfo from './FinancialInfo.vue'
import LoanInfo from './LoanInfo.vue'
import RatesInfo from './RatesInfo.vue'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['message'])
  },
  components: {
    PlayBar,
    RateChart,
    FinancialInfo,
    LoanInfo,
    RatesInfo
  }
}
</script>
<style scoped>
navbar {
  width: 100%;
}
.game {
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 1rem;
  max-width: 32rem;
}
.info {
  margin-bottom: 6rem;
}
</style>
