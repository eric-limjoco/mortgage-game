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
  <b-modal
    id="modal-play-gameover"
    ref="modal-play-gameover"
    :title="modalTitle"
    hide-header-close
    ok-only
    @ok="initState"
  >
    <b-icon v-for="index in stars" :key="index" icon="star-fill"></b-icon>
    <b-icon v-for="index in (5-stars)" :key="index" icon="star"></b-icon>
    <p>{{ modalMessage }}</p>
  </b-modal>
  <b-container fluid>
      <b-row>
        <b-col class="px-1">
          <b-button
            size="lg"
            variant="success"
            @click="simulate(1)"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="skip-end"></b-icon>
            Play 1 Month
          </b-button>
          <b-button
            size="lg"
            variant="success"
            @click="simulate(12)"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="skip-end"></b-icon>
            Play 12 Months
          </b-button>
        </b-col>
        <b-col class="px-0">
          <b-button
            size="lg"
            variant="success"
            @click="startRefi"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="arrow-repeat"></b-icon>
            Refinance
          </b-button>
          <b-button
            size="lg"
            variant="primary"
            @click="startCashout"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="cash-stack"></b-icon>
            Cashout
          </b-button>
          <b-button
            size="lg"
            variant="danger"
            @click="startPayoff"
            :disabled="buttonsDisabled"
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
      modalMessage: '',
      buttonsDisabled: false
    }
  },
  computed: {
    ...mapState(['cash', 'newFees', 'balance', 'gameOver', 'savingsScore']),
    stars () {
      return parseInt(this.savingsScore / 100 * 5)
    }
  },
  methods: {
    ...mapMutations(['refi', 'cashout', 'payoff', 'makePayment', 'updateRates', 'initState', 'calculateSavingsScore']),
    sleep (duration) {
      return new Promise(resolve => {
        setTimeout(() => { resolve() }, duration)
      })
    },
    async simulate (n) {
      this.buttonsDisabled = true
      for (let i = 0; i < n; i++) {
        this.makePayment()
        this.updateRates()
        await this.sleep(50)
      }
      this.buttonsDisabled = false
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
    startPayoff () {
      if (this.cash < this.balance) {
        this.modalTitle = 'Cannot Payoff Mortgage'
        this.modalMessage = "You don't have enough cash to payoff your mortgage"
        this.$refs['modal-play'].show()
      } else {
        this.payoff()
      }
    }
  },
  watch: {
    gameOver () {
      if (this.gameOver) {
        this.calculateSavingsScore()
        this.modalTitle = 'Game Over'
        this.modalMessage = `Savings Score: ${this.savingsScore}%`
        this.$refs['modal-play-gameover'].show()
      }
    }
  },
  components: {
    BIcon,
    BModal
  }
}
</script>
<style scoped>
.play-bar {
  /* border: 1px solid yellow; */
  font-size: .8rem;
}
button {
  border-radius: 6px;
  font-size: .8rem;
  margin-bottom: .2rem;
  width: 100%;
  touch-action: manipulation;
}
</style>
