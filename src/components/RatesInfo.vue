// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <h5><b-icon icon="shop-window"></b-icon> Rates</h5>
  <div>Market Rate</div>
  <div class="h5">
    <b-icon icon="caret-up-fill" class="up" font-scale="0.8"></b-icon> {{ Math.round(newRate * 100) / 100}}%
  </div>
  <small>Term: {{ newTerm }} months</small><br>
  <small>Fees: ${{ newFees }}</small>
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
    ...mapState(['newTerm', 'newRate', 'newFees']),
    newRateIcon () {
      return 'caret-up-fill'
    }
  }
}
</script>
<style scoped>
.info {
  /* border: 1px solid purple; */
  font-size: .8rem;
}
.up {
  color: green;
}
.down {
  color: red;
}
</style>
