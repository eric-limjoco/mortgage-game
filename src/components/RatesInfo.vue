// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <h5><b-icon icon="shop-window"></b-icon> Rates</h5>
  <div>Market Rate</div>
  <div class="h5">
    <b-icon v-if="newRate < loanRate" icon="caret-down-fill" class="down" font-scale="0.8"></b-icon>
    <b-icon v-else icon="caret-up-fill" class="up" font-scale="0.8"></b-icon>
    {{ newRate|toRate }}
  </div>
  <small>Term: {{ newTerm }} months</small><br>
  <small>Fees: ${{ newFees }}</small>
  <span id="v-step-market-rates"></span>
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
    ...mapState(['loanRate', 'newTerm', 'newRate', 'newFees']),
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
