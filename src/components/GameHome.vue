<template>
<div class="game">
  <b-container fluid>
    <b-row class="mb-1">
      <b-col><financial-info /></b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col><loan-info /></b-col>
      <b-col><rates-info /></b-col>
    </b-row>
    <b-row>
      <rate-chart />
    </b-row>
    <b-row>
        <play-bar />
    </b-row>
  </b-container >
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
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
  mounted () {
    this.initState()
  },
  methods: {
    ...mapMutations(['initState'])
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
  /* border: 1px solid red; */
  margin: 0 auto;
  margin-top: 4rem;
  max-width: 64rem;
}
.col {
  padding: 0;
}
</style>
