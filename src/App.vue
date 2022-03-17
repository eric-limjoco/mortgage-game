<template>
  <b-container fluid id="app">
    <v-tour name="myTour" :steps="steps"></v-tour>
    <nav-bar/>
    <game-home/>
  </b-container>
</template>

<script>
import NavBar from './components/NavBar.vue'
import GameHome from './components/GameHome'

export default {
  name: 'App',
  data () {
    return {
      steps: [
        {
          target: '#v-step-outstanding-balance', // We're using document.querySelector() under the hood
          content: `Pay off your mortgage with the least amount of money. This is your <strong>Outstanding Balance</strong>.`,
          params: {
            placement: 'auto-end'
          }
        }
      ]
    }
  },
  components: {
    NavBar,
    GameHome
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato|Montserrat:400,600&display=swap');
@import url('vue-tour/dist/vue-tour.css');
@import url('App.css');
#app,
.modal-dialog {
  font-family: 'Lato';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
