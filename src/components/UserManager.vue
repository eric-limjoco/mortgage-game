<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <button type="submit">
        Create User
      </button>
    </form>

    <h3>User List</h3>
    <table v-if="users.length">
      <thead>
        <td>Id</td>
        <td>Name</td>
        <td>Delete</td>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>
          <button @click="onDelete(user.id)"> Delete </button>
        </td>
      </tr>
    </table>
    <span v-else>No users</span>
  </div>
</template>
<script>
import { getUsers, createUser, deleteUser } from '../firebase'

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
    await this.updateUsers()
  },
  methods: {
    async updateUsers () {
      this.users = await getUsers()
    },
    async onSubmit () {
      await createUser({...this.form})
      this.form.name = ''
      this.updateUsers()
    },
    onDelete (id) {
      deleteUser(id)
      this.updateUsers()
    }
  }
}
</script>
<style scoped>
form {
  margin-bottom: 3rem;
}
button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.form-group {
  margin-bottom: 1rem;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
}
td {
  border: 1px solid slategray;
  padding: 0.5rem;
}
thead td {
  font-weight: 600;
}
</style>
