// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="play-bar">
  <refi-dialog
    ref="refi-dialog"
  />
  <cashout-dialog
    ref="cashout-dialog"
  />
  <payoff-dialog
    ref="payoff-dialog"
  />
  <b-container fluid class="px-0">
      <b-row class="mb-2">
        <span id="v-step-play"></span>
        <b-button-group class="px-0 play-stop">
          <b-button
            v-if="!isPlaying"
            size="lg"
            variant="outline-primary"
            @click="isPlaying=true"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="play"></b-icon>
            Play
          </b-button>
          <b-button
            v-else
            size="lg"
            variant="outline-primary"
            @click="isPlaying=false"
          >
            <b-icon icon="stop"></b-icon>
            Stop
          </b-button>
        </b-button-group>
      </b-row>
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
            variant="outline-primary"
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
            variant="outline-primary"
            @click="startRefi"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="arrow-repeat"></b-icon>
            Refinance
          </b-button>
          <b-button
            v-if="false"
            size="lg"
            variant="outline-secondary"
            @click="startCashout"
            :disabled="buttonsDisabled"
          >
            <b-icon icon="cash-stack"></b-icon>
            Cashout
          </b-button>
          <b-button
            size="lg"
            variant="outline-danger"
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
import RefiDialog from './RefiDialog.vue'
import CashoutDialog from './CashoutDialog.vue'
import PayoffDialog from './PayoffDialog.vue'

export default {
  data () {
    return {
      simulationMonths: 12,
      modalTitle: '',
      modalMessage: '',
      buttonsDisabled: false,
      isPlaying: false
    }
  },
  computed: {
    ...mapState(['cash', 'newFees', 'balance', 'savingsScore', 'remainingTerm', 'gameOver'])
  },
  methods: {
    ...mapMutations(['refi', 'cashout', 'payoff', 'makePayment', 'updateRates', 'initState']),
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
      this.$refs['refi-dialog'].showDialog()
    },
    startCashout () {
      this.$refs['cashout-dialog'].showDialog()
    },
    startPayoff () {
      this.$refs['payoff-dialog'].showDialog()
    },
    simulationMonthsFormatter () {
      return this.simulationMonths > 1 ? `Run ${this.simulationMonths} Months` : `Run ${this.simulationMonths} Month`
    }
  },
  watch: {
    async isPlaying () {
      if (this.isPlaying) {
        this.buttonsDisabled = true
        while (this.isPlaying) {
          this.makePayment()
          this.updateRates()
          await this.sleep(50)
        }
      } else {
        this.buttonsDisabled = false
      }
    },
    remainingTerm () {
      if (this.simulationMonths > this.remainingTerm) {
        this.simulationMonths = this.remainingTerm
      }
    },
    gameOver () {
      if (this.gameOver) {
        this.isPlaying = false
        this.buttonsDisabled = false
      }
    }
  },
  components: {
    BIcon,
    BModal,
    RefiDialog,
    CashoutDialog,
    PayoffDialog
  }
}
</script>
<style scoped>
.row .b-form-spinbutton,
.row button {
  width: 50%;
}
button {
  border-radius: 6px;
  font-size: .8rem;
  margin-bottom: .2rem;
}
.play-stop button {
  font-size: 1.2rem;
  height: 60px;
}
.b-form-spinbutton,
.b-form-spinbutton.focus {
  color: #21732f;
  border-radius: 6px 0 0 6px;
  background-color: #fff;
  border-color: #21732f;
}
.b-form-spinbutton:hover {
  background-color: #21732f;
  color: #fffffd;
}
.b-form-spinbutton.disabled {
  opacity: 0.65;
}
</style>
