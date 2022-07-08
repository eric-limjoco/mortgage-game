<template>
  <div>
    <b-modal
      v-model="show"
      ok-variant="primary"
      ok-title="Close"
      ok-only
      hide-header-close
      title="Your Profile"
    >
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="label">Name</div>
            {{ `${userFirstName} ${userLastName}` }}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="label">Company</div>
            {{ userCompany }}
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="label">Email</div>
            {{ userEmail }}
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserScores } from '../firebase'

export default {
  data () {
    return {
      show: false,
      scores: {}
    }
  },
  computed: {
    ...mapState(['userFirstName', 'userLastName', 'userCompany', 'userEmail'])
  },
  methods: {
    async showDialog () {
      this.scores = await getUserScores(this.userEmail)
      this.show = true
    },
    hideDialog () {
      this.show = false
      this.scores = []
    }
  }
}
</script>
<style scoped>
.label {
  font-weight: 600;
}
</style>
