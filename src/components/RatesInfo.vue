// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <b-card
    title="Rates"
  >
    <div>Term: {{ newTerm }} months</div>
    <div>Rate: {{ newRate }}%</div>
    <div>Fees: ${{ newFees }}</div>
  </b-card>
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
  font-size: .8rem;
}
</style>
