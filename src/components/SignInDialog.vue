<template>
  <div>
    <b-modal
      v-model="show"
      ok-variant="primary"
      ok-title="Submit"
      ok-only
      hide-header-close
      title="Sign in for a chance to win a prize!"
      @ok="onSubmit"
    >
      <div class="user-manager">
        <b-form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="form.firstName" class="form-control" required />
            <label>Last Name</label>
            <input v-model="form.lastName" class="form-control" required />
            <label>Company</label>
            <input v-model="form.company" class="form-control" required />
            <label>Email</label>
            <input v-model="form.email" class="form-control" required />
          </div>
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
      users: {}
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
    async onSubmit () {
      await createUser({...this.form})
      this.loginUser(this.form)
      Object.keys(this.form).forEach(k => { this.form[k] = '' })
    }
  }
}
</script>
<style scoped>
.user-manager {
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 32rem;
}
button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
input {
  margin-bottom: 1rem;
}
</style>
