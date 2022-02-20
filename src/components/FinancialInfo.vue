// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <b-card
    title="Finances"
  >
    <div>Current Cash: ${{ cash }}</div>
    <div>Current Income: ${{ income }}</div>
    <div>Cumulative Payments: ${{ cumulativePayments }}</div>
  </b-card>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

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
  }
}
</script>
<style scoped>
.info {
  font-size: .8rem;
}
</style>
