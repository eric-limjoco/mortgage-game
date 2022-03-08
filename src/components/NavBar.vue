// eslint-disable-next-line vue/multi-word-component-names
<template>
<b-navbar
  fixed="top"
  type="dark"
  class="nav-bar"
  >
  <b-navbar-brand>Mortgage Game</b-navbar-brand>
  <b-navbar-nav class="ml-auto actions">
    <b-nav-item class="my-sm-0">
      <b-icon icon="bar-chart-line" class="my-sm-0 "></b-icon>
      <b-icon icon="question-circle" class="mx-1 my-sm-0 "></b-icon>
      <a href="" class="mx-2">{{ isLoggedIn() ? 'Sign Out' : 'Sign In' }}</a>
    </b-nav-item>
  </b-navbar-nav>
</b-navbar>
</template>
<script>
import { mapGetters } from 'vuex'
import { BIcon } from 'bootstrap-vue'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapGetters(['isLoggedIn'])
  },
  components: {
    BIcon
  }
}
</script>
<style scoped>
.nav-bar {
  background-color: #21732f;
  padding: .4rem 1rem;
  justify-content: space-between;
}
a {
  color: #fff;
}
.navbar-brand {
  font-family: 'Montserrat';
}
</style>
