<template>
  <div>
    <b-modal
    v-model="show"
    :title="title"
    :hide-footer="canPayoff"
    ok-variant="primary"
    ok-only
    hide-header-close
  >
    <b-container fluid
      v-if="canPayoff"
    >
      <b-row class="h2">
        <b-col>
          <div class="label">Cash</div>
          <span>{{ cash|toCurrency }}</span>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="h2">
          <div class="label">Current Balance</div>
          <span>{{ balance|toCurrency }}</span>
        </b-col>
      </b-row>
      <b-row>
        <b-button
          @click="startPayoff"
          variant="primary"
          class= "mb-1"
        >
          <b-icon icon="house-door"></b-icon>&nbsp;
          Payoff My Mortgage
        </b-button>
        <b-button
          @click="hideDialog"
          size="sm"
          variant="dark"
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
          <div class="label">Cash</div>
          <span>{{ cash|toCurrency }}</span>
        </b-col>
      </b-row>
      <b-row class="h2">
        <b-col>
          <div class="label">Current Balance</div>
          <span>{{ balance|toCurrency }}</span>
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
  <b-modal
    v-model="showConfirmation"
    :title="confirmationTitle"
    ok-variant="primary"
    ok-only
    hide-header-close
  >
    <b-container>
      <b-row class="mb-3">
        <b-col>
          You have successfully paid off your mortgage!
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
      errorMessage: "You don't have enough cash to payoff your mortgage.",
      confirmationTitle: 'Mortgage Payoff Complete'
    }
  },
  computed: {
    ...mapState(['cash', 'balance']),
    canPayoff () {
      return this.cash >= this.balance
    },
    title () {
      return this.canPayoff ? 'Payoff' : 'Cannot Payoff Mortgage'
    }
  },
  methods: {
    ...mapMutations(['payoff']),
    showDialog () { this.show = true },
    hideDialog () { this.show = false },
    startPayoff () {
      this.payoff()
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
.label,
.confirm-label {
  font-size: 0.8rem;
  font-weight: 600;
}
.label {
  color: #999999;
}
</style>
