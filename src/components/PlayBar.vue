// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="play-bar">
  <b-button-toolbar
    key-nav
    class="app-toolbar simulate"
  >
    <b-button-group
      class="mx-1"
    >
      <b-button
        size="sm"
        variant="success"
      >
    <b-icon icon="play"></b-icon>
      Play
    </b-button>
    <b-button
      size="sm"
      variant="secondary"
    >
      <b-icon icon="skip-end"></b-icon>
      Skip
    </b-button>
    </b-button-group>
  </b-button-toolbar>
  <b-button-toolbar
    key-nav
    class="app-toolbar actions"
  >
    <b-button-group class="mx-1">
      <b-button
        size="sm"
        variant="success"
        @click="refi()"
      >
        <b-icon icon="arrow-repeat"></b-icon>
        Refinance
      </b-button>
      <b-button
        size="sm"
        variant="secondary"
        @click="cashout()"
      >
        <b-icon icon="cash-stack"></b-icon>
        Cashout
      </b-button>
      <b-button
        size="sm"
        variant="danger"
        @click="payoff()"
      >
        <b-icon icon="house-door"></b-icon>
        Payoff
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import { BIcon } from 'bootstrap-vue'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['setMessage']),
    refi () {
      this.setMessage('Refinance')
    },
    cashout () {
      this.setMessage('Cashout')
    },
    payoff () {
      this.setMessage('Payoff')
    }
  },
  components: {
    BIcon
  }
}
</script>
<style scoped>
.play-bar {
  margin-bottom: 2rem;
}
.app-toolbar {
  margin-bottom: 1rem;
}
</style>
