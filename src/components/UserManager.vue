<template>
  <div class="user-manager">
    <h1>User Manager</h1>
    <p>This app demonstrates writing to and reading from a Firebase database.</p>
    <b-form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>
      <b-button
        type="submit"
        variant="success"
      >
        Create User
      </b-button>
    </b-form>
    <hr>
    <h4>User List</h4>
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
          <b-button
            @click="onDelete(user.id)"
            variant="danger"
          >
            Delete
          </b-button>
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
.user-manager {
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 1rem;
  max-width: 32rem;
}
form {
  border: 1px solid rgba(155, 159, 163, 0.712);
  border-radius: 6px;
  margin-bottom: 3rem;
  padding: 2rem;

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
