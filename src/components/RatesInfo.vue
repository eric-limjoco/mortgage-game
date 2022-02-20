// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="info">
  <div class="rates-info">
    <strong>
      New Loan Rate ({{ newTerm }} months): {{ newRate }}% | Fees: ${{ newFees }}
    </strong>
  </div>
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
.rates-info {
  text-align: center;
}
</style>
