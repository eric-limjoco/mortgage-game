// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="play-bar">
  <b-container fluid class="mb-3">
      <b-row class="mb-2">
        <b-col class="px-0">
          <b-button
            variant="success"
          >
            <b-icon icon="play"></b-icon>
            Play
          </b-button>
        </b-col>
        <b-col class="px-0">
          <b-button
            variant="secondary"
          >
            <b-icon icon="skip-end"></b-icon>
            Skip
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="px-0">
          <b-button
            size="sm"
            variant="success"
            @click="refi()"
          >
            <b-icon icon="arrow-repeat"></b-icon>
            Refinance
          </b-button>
        </b-col>
        <b-col class="px-0">
          <b-button
            size="sm"
            variant="secondary"
            @click="cashout()"
          >
            <b-icon icon="cash-stack"></b-icon>
            Cashout
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="px-0">
          <b-button
            size="sm"
            variant="danger"
            @click="payoff()"
          >
            <b-icon icon="house-door"></b-icon>
            Payoff
          </b-button>
        </b-col>
      </b-row>
  </b-container>
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
.row .col:first-child button {
  border-radius: 6px 0 0 6px;
}

.row .col:last-child button {
  border-radius: 0 6px 6px 0;
}
button {
  border-radius: 0;
  width: 100%;
}
</style>
