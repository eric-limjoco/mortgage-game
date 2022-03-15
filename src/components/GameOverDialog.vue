<template>
  <b-modal
    v-model="show"
    :title="title"
    hide-header-close
    ok-only
    @ok="initState"
  >
    <p>You have successfully paid off your mortgage!</p>
    <span
      v-for="index in 5"
      :key="index">
      <b-icon v-if="index <= stars" icon="star-fill"></b-icon>
      <b-icon v-else icon="star"></b-icon>
    </span>
    <p>Savings Score: {{savingsScore}}%</p>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BModal } from 'bootstrap-vue'
export default {
  data () {
    return {
      show: false,
      title: 'Game Over'
    }
  },
  computed: {
    ...mapState(['savingsScore']),
    stars () {
      return parseInt(this.savingsScore / 100 * 5)
    }
  },
  methods: {
    ...mapMutations(['initState']),
    showDialog () { this.show = true },
    hideDialog () { this.show = false }
  },
  components: {
    BModal
  }
}
</script>
<style scoped>
.label,
.confirm-label {
  font-size: 0.8rem;
  font-weight: 600;
}
.label {
  color: #999999;
}
</style>
