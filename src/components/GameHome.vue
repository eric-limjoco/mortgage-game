<template>
<div class="game">
  <disclaimer-dialog
    ref="disclaimer-dialog"
  />
  <game-over-dialog
    ref="game-over-dialog"
  />
  <b-container fluid>
    <b-row class="mb-3">
      <b-col id="financial-info"><financial-info /></b-col>
    </b-row>
    <b-row class="mb-4">
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
import GameOverDialog from './GameOverDialog.vue'
import DisclaimerDialog from './DisclaimerDialog.vue'
import { createScore } from '../firebase'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['loggedIn', 'userEmail', 'gameOver', 'savingsScore', 'rateHistory', 'userRateHistory', 'refiHistory', 'cashoutHistory'])
  },
  mounted () {
    this.initState()
    this.$refs['disclaimer-dialog'].showDialog()
  },
  methods: {
    ...mapMutations(['initState', 'calculateSavingsScore'])
  },
  watch: {
    gameOver () {
      if (this.gameOver) {
        this.calculateSavingsScore()
        if (this.loggedIn) {
          createScore({
            email: this.userEmail.length > 0 ? this.userEmail : '(not logged in)',
            score: this.savingsScore,
            rateHistory: this.rateHistory,
            userRateHistory: this.userRateHistory,
            refiHistory: this.refiHistory,
            cashoutHistory: this.cashoutHistory,
            date: new Date()
          })
        }
        this.$refs['game-over-dialog'].showDialog()
      }
    }
  },
  components: {
    PlayBar,
    RateChart,
    FinancialInfo,
    LoanInfo,
    RatesInfo,
    GameOverDialog,
    DisclaimerDialog
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
  margin-top: 4.2rem;
  max-width: 64rem;
}
.col {
  padding: 0;
}
</style>
