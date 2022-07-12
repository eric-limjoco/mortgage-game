<template>
  <b-modal
    v-model="show"
    :title="title"
    hide-header-close
    :hide-footer="!loggedIn"
    ok-only
    ok-title="Play Again"
    @hidden="resetGame"
    @ok="resetGame"
  >
    <div
      v-if="!loggedIn"
      class="sign-in-form"
    >
      <p class="mb-4">You have successfully paid off your mortgage! Don't let your <strong>{{ savingsScore.toFixed(2) }}% score</strong> go to waste! Sign in for a chance to win a prize for your high score.</p>
      <b-form
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          label="First Name"
          label-for="first-name-input"
          invalid-feedback="First name is required"
          :state="firstNameState"
        >
          <b-form-input
            ref="formFirstName"
            id="first-name-input"
            v-model="form.firstName"
            :state="firstNameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Last Name"
          label-for="last-name-input"
          invalid-feedback="Last name is required"
          :state="lastNameState"
        >
          <b-form-input
            ref="formLastName"
            id="last-name-input"
            v-model="form.lastName"
            :state="lastNameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Company"
          label-for="company-input"
          invalid-feedback="Company is required"
          :state="companyState"
        >
          <b-form-input
            ref="formCompany"
            id="company-input"
            v-model="form.company"
            :state="companyState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="A valid email address is required"
          :state="emailState"
        >
          <b-form-input
            ref="formEmail"
            id="email-input"
            type="email"
            v-model="form.email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="handleOk">Submit</b-button>
      </b-form>
    </div>
    <b-container
      v-else
      fluid
    >
      <p class="mb-1">You have successfully paid off your mortgage!</p>
      <b-row class="h2 mb-4">
        <b-col>
          <span
            v-for="index in 5"
            :key="index">
            <b-icon v-if="index <= stars" icon="star-fill"></b-icon>
            <b-icon v-else icon="star"></b-icon>
          </span>
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col>
          <div class="label">Savings Score</div>
          {{ savingsScore.toFixed(2) }}%
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col cols="5">
          <div class="label">Your Rate</div>
          {{ loanRate|toRate }}
        </b-col>
        <b-col>
          <div class="label">Lowest Rate</div>
          {{ minRate|toRate }}
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col>
          <div class="label">Scheduled Payments</div>
          {{ totalPaymentsNaive|toCurrency }}
        </b-col>
      </b-row>
      <b-row class="h4 mb-3">
        <b-col cols="5">
          <div class="label">Your Payments</div>
          {{ cumulativePayments|toCurrency }}
        </b-col>
        <b-col>
          <div class="label">Minimum Payments</div>
          {{ lowestPayments|toCurrency }}
        </b-col>
      </b-row>
      <b-row class="h4">
        <b-col cols="5">
          <div class="label">Your Savings</div>
          {{ savings|toCurrency }}
        </b-col>
        <b-col>
          <div class="label">Possible Savings</div>
          {{ maxSavings|toCurrency }}
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { BModal } from 'bootstrap-vue'
import { createUser, createScore } from '../firebase'

export default {
  data () {
    return {
      show: false,
      title: 'Game Over',
      form: {
        firstName: '',
        lastName: '',
        company: '',
        email: ''
      },
      firstNameState: null,
      lastNameState: null,
      companyState: null,
      emailState: null,
      scoreCreated: false
    }
  },
  computed: {
    ...mapState(['loggedIn', 'savingsScore', 'loanRate', 'minRate', 'lowestPayments', 'totalPaymentsNaive', 'cumulativePayments', 'maxSavings', 'savings', 'userEmail', 'rateHistory', 'userRateHistory', 'refiHistory', 'cashoutHistory']),
    stars () {
      return parseInt(this.savingsScore / 100 * 5)
    }
  },
  methods: {
    ...mapMutations(['initState', 'loginUser']),
    showDialog () { this.show = true },
    hideDialog () { this.show = false },
    resetGame () {
      if (!this.scoreCreated && !this.loggedIn) {
        createScore({
          email: this.userEmail.length > 0 ? this.userEmail : '(not logged in)',
          score: this.savingsScore,
          rateHistory: this.rateHistory,
          userRateHistory: this.userRateHistory,
          refiHistory: this.refiHistory,
          cashoutHistory: this.cashoutHistory,
          date: new Date()
        })
      }
      Object.keys(this.form).forEach(k => { this.form[k] = '' })
      this.firstNameState = null
      this.lastNameState = null
      this.companyState = null
      this.emailState = null
      this.initState()
    },
    checkFormValidity () {
      this.firstNameState = this.$refs.formFirstName.checkValidity()
      this.lastNameState = this.$refs.formLastName.checkValidity()
      this.companyState = this.$refs.formCompany.checkValidity()
      this.emailState = this.$refs.formEmail.checkValidity()
    },
    handleOk (bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit () {
      this.checkFormValidity()
      if (!this.firstNameState || !this.lastNameState || !this.companyState || !this.emailState) return
      await createUser({...this.form})
      this.loginUser(this.form)
      createScore({
        email: this.userEmail.length > 0 ? this.userEmail : '(not logged in)',
        score: this.savingsScore,
        rateHistory: this.rateHistory,
        userRateHistory: this.userRateHistory,
        refiHistory: this.refiHistory,
        cashoutHistory: this.cashoutHistory,
        date: new Date()
      })
      this.scoreCreated = true
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
button {
  float: right;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
