<template>
  <b-modal
    v-model="show"
    :title="title"
    hide-header-close
    ok-only
    ok-title="Play Again"
    @ok="initState"
  >
    <p class="mb-1">You have successfully paid off your mortgage!</p>

    <b-container fluid>
      <b-row class="h2 mb-4">
        <b-col>
          <span
            v-for="index in 5"
            :key="index">
            <b-icon v-if="index <= stars" icon="star-fill"></b-icon>
            <b-icon v-else icon="star"></b-icon>
          </span>
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col>
          <div class="label">Savings Score</div>
          {{ savingsScore }}%
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col cols="5">
          <div class="label">Your Rate</div>
          {{ loanRate|toRate }}
        </b-col>
        <b-col>
          <div class="label">Lowest Rate</div>
          {{ minRate|toRate }}
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col>
          <div class="label">Scheduled Payments</div>
          {{ totalPaymentsNaive|toCurrency }}
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col cols="5">
          <div class="label">Your Payments</div>
          {{ cumulativePayments|toCurrency }}
        </b-col>
        <b-col>
          <div class="label">Minimum Payments</div>
          {{ lowestPayments|toCurrency }}
        </b-col>
      </b-row>
      <b-row class="h4">
        <b-col cols="5">
          <div class="label">Your Savings</div>
          {{ savings|toCurrency }}
        </b-col>
        <b-col>
          <div class="label">Possible Savings</div>
          {{ maxSavings|toCurrency }}
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BModal } from 'bootstrap-vue'
export default {
  data () {
    return {
      show: false,
      title: 'Game Over'
    }
  },
  computed: {
    ...mapState(['savingsScore', 'loanRate', 'minRate', 'lowestPayments', 'totalPaymentsNaive', 'cumulativePayments', 'maxSavings', 'savings']),
    stars () {
      return parseInt(this.savingsScore / 100 * 5)
    }
  },
  methods: {
    ...mapMutations(['initState']),
    showDialog () { this.show = true },
    hideDialog () { this.show = false }
  },
  components: {
    BModal
  }
}
</script>
<style scoped>
.label,
.confirm-label {
  font-size: 0.8rem;
  font-weight: 600;
}
.label {
  color: #999999;
}
</style>
