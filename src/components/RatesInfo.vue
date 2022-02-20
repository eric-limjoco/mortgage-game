// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="rates-info">
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
.game {
  margin: 0 auto;
  margin-top: 40px;
  padding: 0 1rem;
  max-width: 32rem;
}
</style>
