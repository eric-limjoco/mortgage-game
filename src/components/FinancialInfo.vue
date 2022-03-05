<template>
<b-container fluid class="info">
  <b-row>
    <b-col class="h4">
        <b-icon icon="cash"></b-icon>
        <span>{{ cash|toCurrency }}</span>
        <div class="income mt-1">
          <b-icon icon="plus-circle"></b-icon> {{ income|toCurrency }}/month
        </div>
    </b-col>
    <b-col>
      <div class="payments">
        <span class="payments-label">Total Payments</span>: {{ cumulativePayments|toCurrency}}
      </div>
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
    }
  },
  computed: {
    ...mapState(['cash', 'income', 'cumulativePayments'])
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
  font-size: .6rem;
}
.payments {
  display: block;
  float: right;
}
.payments-label {
  font-size: .8rem;
  font-weight: 600;
}
</style>
