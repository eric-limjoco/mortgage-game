// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="play-bar">
  <b-modal
    id="modal-play"
    ref="modal-play"
    :title="modalTitle"
    hide-header-close
    ok-only
  >
    <p>{{ modalMessage }}</p>
  </b-modal>
  <b-container fluid class="mb-3">
      <b-row class="mb-2">
        <b-col class="px-0">
          <b-button
            variant="success"
            @click="simulate(1)"
          >
            <b-icon icon="play"></b-icon>
            Play Next Month
          </b-button>
        </b-col>
        <b-col class="px-0">
          <b-button
            variant="secondary"
            @click="simulate(12)"
          >
            <b-icon icon="skip-end"></b-icon>
            Play 12 Months
          </b-button>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="px-0">
          <b-button
            size="sm"
            variant="success"
            @click="startRefi"
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
import { mapState, mapMutations } from 'vuex'
import { BIcon, BModal } from 'bootstrap-vue'

export default {
  data () {
    return {
      modalTitle: '',
      modalMessage: ''
    }
  },
  computed: {
    ...mapState(['cash', 'newFees', 'balance', 'gameover'])
  },
  methods: {
    ...mapMutations(['refi', 'cashout', 'makePayment', 'updateRates', 'initState']),
    simulate (n) {
      for (let i = 0; i < n; i++) {
        this.makePayment()
        this.updateRates()
      }
    },
    startRefi () {
      if (this.cash < this.newFees) {
        this.modalTitle = 'Cannot Refinance Mortgage'
        this.modalMessage = "You don't have enough cash to refinance your mortgage"
        this.$refs['modal-play'].show()
      } else {
        this.refi()
      }
    },
    startCashout () {
      if (this.cash < this.newFees) {
        this.modalTitle = 'Cannot Cashout Mortgage'
        this.modalMessage = "You don't have enough cash to cashout your mortgage"
        this.$refs['modal-play'].show()
      } else {
        this.cashout()
      }
    },
    payoff () {
      if (this.cash < this.balance) {
        this.modalTitle = 'Cannot Payoff Mortgage'
        this.modalMessage = "You don't have enough cash to payoff your mortgage"
        this.$refs['modal-play'].show()
      } else {
        this.refi()
      }
    }
  },
  watch: {
    gameOver () {
      this.modalTitle = 'Game Over'
      this.modalMessage = 'Game Over!'
      this.$refs['modal-play'].show()
      this.initState()
    }
  },
  components: {
    BIcon,
    BModal
  }
}
</script>
<style scoped>
.row .col:first-child button {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.row .col:last-child button {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
button {
  border-radius: 0;
  width: 100%;
}
</style>
