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
        <div class="label">Play History</div>
        <b-table
          striped
          hover
          :items="items"
          :fields="fields"
          v-if="items.length > 0"
        ></b-table>
        <span
          v-else
          class="no-play-history"
        >
          No play history
        </span>
        <b-button
          variant="danger"
          @click="signout()"
        >
          Sign out
        </b-button>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserScores } from '../firebase'

export default {
  data () {
    return {
      show: false,
      scores: [],
      fields: ['date', 'score']
    }
  },
  computed: {
    ...mapState(['userFirstName', 'userLastName', 'userCompany', 'userEmail']),
    items () {
      return this.scores.map(s => {
        let d = new Date(0)
        d.setUTCSeconds(s.date.seconds)
        return {
          date: d.toLocaleString(),
          score: `${s.score.toFixed(2)}%`
        }
      })
    }
  },
  methods: {
    ...mapMutations(['logoutUser']),
    async showDialog () {
      this.scores = await getUserScores(this.userEmail)
      this.show = true
    },
    hideDialog () {
      this.show = false
      this.scores = []
    },
    signout () {
      this.logoutUser()
      this.hideDialog()
    }
  }
}
</script>
<style scoped>
.label {
  font-weight: 600;
}
.row {
  margin-bottom: 1rem;
}
thead {
  font-size: .9rem;
}
.no-play-history {
  color: #999999;
  font-size: .9rem;
  font-style: italic;
  font-weight: 600;
}
</style>
