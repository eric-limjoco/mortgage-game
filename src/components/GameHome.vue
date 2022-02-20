// eslint-disable-next-line vue/multi-word-component-names
<template>
<div>
  <div class="game">
    <p>
      Pay off the loan with the minimum amount of money possible.
    </p>
    <b-alert
      :show="message.length>0"
    >
      {{ message }}
    </b-alert>
    <b-container-fluid class="info">
      <b-row>
        <b-col><financial-info /></b-col>
        <b-col><loan-info /></b-col>
      </b-row>
      <b-row>
        <b-col><rates-info /></b-col>
      </b-row>
    </b-container-fluid>
    <rate-chart />
    <div class="controls">
      <play-bar />
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
  max-width: 64rem;
}
</style>
