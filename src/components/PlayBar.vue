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
  <b-container fluid class="px-0">
      <b-row class="mb-2">
        <b-button-group class="px-0">
          <b-form-spinbutton
            id="simulation-months-input"
            v-model="simulationMonths"
            :formatter-fn="simulationMonthsFormatter"
            :disabled="buttonsDisabled"
            min="1"
            :max="Math.min(36, remainingTerm)"
            size="sm"
            style="font-size:.8rem"
          >
          </b-form-spinbutton>
          <b-button
            class="my-0"
            size="lg"
            variant="success"
            @click="simulate(simulationMonths)"
            :disabled="buttonsDisabled"
          >
            <div style="font-size:1rem">
              <b-spinner small v-if="buttonsDisabled"></b-spinner>
              <b-icon v-else icon="skip-end"></b-icon>
              Go
            </div>
          </b-button>
        </b-button-group>
      </b-row>
      <b-row>
        <b-button-group class="px-0">
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
        </b-button-group>
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
      simulationMonths: 12,
      modalTitle: '',
      modalMessage: '',
      buttonsDisabled: false
    }
  },
  computed: {
    ...mapState(['cash', 'newFees', 'balance', 'gameOver', 'savingsScore', 'remainingTerm']),
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
    },
    simulationMonthsFormatter () {
      return this.simulationMonths > 1 ? `Run ${this.simulationMonths} Months` : `Run ${this.simulationMonths} Month`
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
button {
  border-radius: 6px;
  font-size: .8rem;
  margin-bottom: .2rem;
  width: 100%;
}
.b-form-spinbutton,
.b-form-spinbutton.focus {
  background-color: #21732f;
  border-radius: 6px 0 0 6px;
  color: #fff;
  border: none;
  border-right: 2px solid #2c3e50;
}
.b-form-spinbutton.disabled {
  opacity: 0.65;
}
.btn .btn {
  color: #fff;
}
.btn-success {
  background-color: #21732f;
}
.btn-primary {
  background-color: #276681;
}
.btn-danger {
  background-color: #dc3545;
}
</style>
