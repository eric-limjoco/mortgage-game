<template>
  <div>
    <b-modal
    v-model="show"
    :title="title"
    :hide-footer="canRefi"
    ok-variant="success"
    ok-only
    hide-header-close
  >
    <b-container fluid
      v-if="canRefi"
    >
      <b-row class="h4">
        <b-col cols="4">
          <div class="label">Current Rate</div>
          {{ Math.round(loanRate * 100) / 100}}%
        </b-col>
        <b-col align="center" class="h1" cols="2">
          <b-icon icon="arrow-right"></b-icon>
        </b-col>
        <b-col cols="6">
          <div class="label">New Rate</div>
          {{ Math.round(newRate * 100) / 100}}%
        </b-col>
      </b-row>
      <b-row class="h4">
        <b-col cols="4">
          <div class="label">Monthly Payment</div>
          {{ payment|toCurrency }}
        </b-col>
        <b-col align="center" class="h1" cols="2">
          <b-icon icon="arrow-right"></b-icon>
        </b-col>
        <b-col cols="6">
          <div class="label">New Monthly Payment</div>
          {{ newPayment|toCurrency }}
        </b-col>
      </b-row>
      <b-row style="font-size:1rem">
        <b-col cols="4">
          <div class="label">Remaining Term</div>
          {{ remainingTerm }} months
        </b-col>
        <b-col align="center" class="h1" cols="2">
          <b-icon icon="arrow-right"></b-icon>
        </b-col>
        <b-col cols="6">
          <div class="label">New Term</div>
          {{ newTerm }} months
        </b-col>
      </b-row>
      <b-row class="mt-2 mb-4">
        <strong>Refinancing Fees: {{ newFees | toCurrency }}</strong>
      </b-row>
      <b-row>
        <b-button
          @click="startRefi"
          variant="success"
          class= "mb-1"
        >
          <b-icon icon="arrow-repeat"></b-icon>
          Refinance My Mortgage
        </b-button>
        <b-button
          @click="hideDialog"
          size="sm"
        >
          Cancel
        </b-button>
      </b-row>
    </b-container>
    <b-container v-else>
      <b-row class="mb-2">
        <b-col>
          {{ errorMessage }}
        </b-col>
      </b-row>
      <b-row class="h2">
        <b-col>
          <b-icon icon="cash"></b-icon>
          <span>{{ cash|toCurrency }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <strong>Refinancing Fees: {{ newFees | toCurrency }}</strong>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
  <b-modal
    v-model="showConfirmation"
    :title="confirmationTitle"
    ok-variant="success"
    ok-only
    hide-header-close
  >
    <b-container>
      <b-row class="mb-3">
        <b-col>
          You have successfully refinanced your mortgage.
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <div class="confirm-label">Interest Rate</div>
          {{ Math.round(loanRate * 100) / 100}}%
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <div class="confirm-label">Outstanding Balance</div>
          {{ balance | toCurrency }}
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col>
          <div class="confirm-label">Remaining Term</div>
          {{ remainingTerm }} months
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="confirm-label">Monthly Payment</div>
          {{ payment | toCurrency }}
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BModal } from 'bootstrap-vue'
export default {
  data () {
    return {
      show: false,
      showConfirmation: false,
      errorMessage: "You don't have enough cash to refinance your mortgage.",
      confirmationTitle: 'Mortgage Refinance Complete'
    }
  },
  computed: {
    ...mapState(['cash', 'newFees', 'loanRate', 'newRate', 'payment', 'remainingTerm', 'newTerm', 'balance']),
    canRefi () {
      return this.cash >= this.newFees
    },
    title () {
      return this.canRefi ? 'Refinance' : 'Cannot Refinance Mortgage'
    },
    newPayment () {
      return (this.balance * (this.newRate / 1200)) / (1 - (Math.pow((1 + (this.newRate / 1200)), this.newTerm * -1)))
    }
  },
  methods: {
    ...mapMutations(['refi']),
    showDialog () { this.show = true },
    hideDialog () { this.show = false },
    startRefi () {
      this.refi()
      this.hideDialog()
      this.showConfirmation = true
    }
  },
  components: {
    BModal
  }
}
</script>
<style scoped>
.label {
  color: #999999;
  font-size: 0.6rem;
  font-weight: 600;
}
.confirm-label {
  font-size: 0.8rem;
  font-weight: 600;
}
</style>
