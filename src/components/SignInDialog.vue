<template>
  <div>
    <b-modal
      id="modal-sign-in"
      ref="modal-sign-in"
      v-model="show"
      ok-variant="primary"
      ok-title="Sign In"
      hide-header-close
      title="Sign in for a chance to win a prize!"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <div class="sign-in-form">
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
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { createUser } from '../firebase'

export default {
  data () {
    return {
      show: false,
      form: {
        firstName: '',
        lastName: '',
        company: '',
        email: ''
      },
      firstNameState: null,
      lastNameState: null,
      companyState: null,
      emailState: null
    }
  },
  methods: {
    ...mapMutations(['loginUser']),
    showDialog () {
      this.show = true
    },
    hideDialog () {
      this.show = false
    },
    checkFormValidity () {
      this.firstNameState = this.$refs.formFirstName.checkValidity()
      this.lastNameState = this.$refs.formLastName.checkValidity()
      this.companyState = this.$refs.formCompany.checkValidity()
      this.emailState = this.$refs.formEmail.checkValidity()
    },
    resetModal () {
      Object.keys(this.form).forEach(k => { this.form[k] = '' })
      this.firstNameState = null
      this.lastNameState = null
      this.companyState = null
      this.emailState = null
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
      this.hideDialog()
    }
  }
}
</script>
<style scoped>
.sign-in-form {
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 32rem;
}
button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.form-group {
  margin-bottom: 1rem;
}
</style>
