<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <button type="submit">
        Create a User
      </button>
    </form>

    <h3>User List</h3>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user }}
      </li>
    </ul>
  </div>
</template>
<script>
import { getUsers, createUser } from '../firebase'

export default {
  data () {
    return {
      form: {
        name: ''
      },
      users: {}
    }
  },
  async beforeMount () {
    this.users = await getUsers()
  },
  methods: {
    async onSubmit () {
      await createUser({...this.form})
      this.form.name = ''
    }
  }
}
</script>
