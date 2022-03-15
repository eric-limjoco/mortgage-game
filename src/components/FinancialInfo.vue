<template>
<b-container fluid class="info">
  <b-row>
    <b-col class="h2 cash-section">
        <b-icon icon="cash"></b-icon>
        <span>{{ cash|toCurrency }}</span>
        <div class="income mt-1">
          <div><b-icon icon="plus-circle"></b-icon> {{ income|toCurrency }}/month</div>
          <div class="payments-label">Total Payments: {{ cumulativePayments|toCurrency}}</div>
        </div>
    </b-col>
    <b-col class="progress-section">
      <b-icon icon="cash"></b-icon>
      <small>{{ cash|toCurrency }}</small>
      <b-progress :value="cash" :max="originalBalance" variant="primary" animated></b-progress>
      <b-icon icon="house-door"></b-icon>
      <small>{{ balance|toCurrency }}</small>
      <b-progress :value="balance" :max="originalBalance" variant="secondary" animated></b-progress>
    </b-col>
  </b-row>
</b-container>
</template>
<script>
import { mapState } from 'vuex'
import { BIcon } from 'bootstrap-vue'

export default {
  data () {
    return {
      value: 200000,
      max: 400000
    }
  },
  computed: {
    ...mapState(['cash', 'balance', 'income', 'cumulativePayments', 'originalBalance'])
  },
  components: {
    BIcon
  }
}
</script>
<style scoped>
.info {
  /* border: 1px solid green; */
  font-size: .8rem;
  padding: 0;
}
.income {
  font-size: .7rem;
}
.payments {
  display: block;
  float: right;
}
.payments-label {
  font-weight: 600;
}
.cash-section {
  padding-right: 0;
}
.progress-section {
  padding-left: 0;
}
</style>
