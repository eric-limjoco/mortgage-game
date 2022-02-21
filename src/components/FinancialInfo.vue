// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <b-card
    header="Finances"
    footer-tag="footer"
  >
    <div class="current-cash h4">
      <b-icon icon="cash"></b-icon>
      {{ cash|toCurrency }}
    </div>
    <div class="income">
      <b-icon icon="plus-circle"></b-icon>
      {{ income|toCurrency }}/month
    </div>
    <template #footer>
      <div class="total-payments">
        <span class="info-label">Total Payments</span>
      </div>
      {{ cumulativePayments|toCurrency}}
    </template>
  </b-card>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { BIcon } from 'bootstrap-vue'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['cash', 'income', 'cumulativePayments'])
  },
  mounted () {},
  methods: {
    ...mapGetters(['isLoggedIn'])
  },
  components: {
    BIcon
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
