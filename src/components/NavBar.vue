// eslint-disable-next-line vue/multi-word-component-names
<template>
<b-navbar
  fixed="top"
  type="dark"
  variant="success"
  class="nav-bar"
  >
  <b-navbar-nav>
    <b-navbar-brand>Mortgage Game</b-navbar-brand>
    <b-nav-item>
      {{ isLoggedIn() ? 'Sign Out' : 'Sign In' }}
    </b-nav-item>
    <b-nav-item>
      <b-icon icon="gear"></b-icon>
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
  padding: .4rem 1rem;
}
</style>
