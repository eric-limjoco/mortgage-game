// eslint-disable-next-line vue/multi-word-component-names
<template>
<div>
  <sign-in-dialog
    ref="sign-in-dialog"
  />
  <profile-dialog
    ref="profile-dialog"
  />
  <b-navbar
  fixed="top"
  type="dark"
  class="nav-bar"
  >
    <b-navbar-brand>Mortgage Game</b-navbar-brand>
    <b-navbar-nav class="ml-auto actions">
      <b-nav-item class="my-sm-0">
        <b-icon icon="bar-chart-line" class="my-sm-0 "></b-icon>
        <b-icon icon="question-circle" class="mx-1 my-sm-0" @click="runTour"></b-icon>
        <b-button @click="startSignIn()" class="mx-2">{{ isLoggedIn() ? userFirstName : 'Sign In' }}</b-button>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { BIcon } from 'bootstrap-vue'
import SignInDialog from './SignInDialog.vue'
import ProfileDialog from './ProfileDialog.vue'

export default {
  computed: {
    ...mapState(['userFirstName'])
  },
  methods: {
    ...mapGetters(['isLoggedIn']),
    runTour () {
      this.$tours['myTour'].start()
    },
    startSignIn () {
      if (this.isLoggedIn()) {
        this.$refs['profile-dialog'].showDialog()
      } else {
        this.$refs['sign-in-dialog'].showDialog()
      }
    }
  },
  components: {
    BIcon,
    SignInDialog,
    ProfileDialog
  }
}
</script>
<style scoped>
.nav-bar {
  background-color: #21732f;
  padding: .2rem 1rem;
  justify-content: space-between;
}
a {
  color: #fff;
}
.navbar-brand {
  font-family: 'Montserrat';
}
</style>
