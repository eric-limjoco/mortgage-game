<template>
  <div>
    <b-modal
      v-model="show"
      ok-variant="primary"
      ok-title="Close"
      ok-only
      hide-header-close
      title="Leaderboard"
    >
      <b-container fluid>
        <div
          v-if="onLeaderboard"
        >
          You are on the leaderboard! Your scores are highlighted in green.
        </div>
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllScores } from '../firebase'

export default {
  data () {
    return {
      show: false,
      scores: [],
      fields: ['rank', 'date', 'score'],
      items: [],
      onLeaderboard: false
    }
  },
  computed: {
    ...mapState(['userEmail'])
  },
  methods: {
    async showDialog () {
      this.scores = await getAllScores()
      this.constructLeaderboard()
      this.show = true
    },
    hideDialog () {
      this.show = false
      this.onLeaderboard = false
      this.scores = []
    },
    constructLeaderboard () {
      let res = []
      for (let i = 0; i < this.scores.length; i++) {
        let d = new Date(0)
        d.setUTCSeconds(this.scores[i].date.seconds)
        let t = {
          date: d.toLocaleString(),
          score: `${this.scores[i].score.toFixed(2)}%`,
          rank: i + 1
        }
        if (this.userEmail.length > 0 && this.scores[i].email === this.userEmail) {
          console.log('onLeaderboard!!!!')
          this.onLeaderboard = true
          t['_rowVariant'] = 'success'
        }
        res.push(t)
      }
      this.items = res
    }
  }
}
</script>
<style scoped>
.label {
  font-weight: 600;
}
</style>
