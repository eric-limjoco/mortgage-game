// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <h5>Rates</h5>
  <div>Interest Rate</div>
  <div class="h5">
    ^ {{ Math.round(newRate * 100) / 100}}%
  </div>
  <div>Term</div>
  <div class="mb-2 h5">
    {{ newTerm }} months
  </div>
  <div>Fees: ${{ newFees }}</div>
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
    ...mapState(['newTerm', 'newRate', 'newFees'])
  }
}
</script>
<style scoped>
.info {
  /* border: 1px solid purple; */
  font-size: .8rem;
}
</style>
