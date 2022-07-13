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
          content: `Pay off your mortgage with the least amount of money. This is your <strong>outstanding balance</strong> and <strong>current interest rate.</strong>`,
          params: {
            placement: 'bottom-start'
          }
        },
        {
          target: '#v-step-market-rates',
          content: `<strong>Market rates</strong> will change each month. <strong>Refinance your mortgage</strong> to save money over time!`,
          params: {
            placement: 'bottom-end'
          }
        },
        {
          target: '#v-step-play',
          content: `
          Press <strong>Play</strong> to start the simulation, where each month rates will change and you will pay your monthly payment. <strong>Stop</strong> when you want to <strong>refinance</strong> or <strong>pay off</strong> your mortgage.<br><br>
          Use the buttons below to <strong>refinance</strong> and <strong>payoff your mortgage</strong>.`,
          params: {
            placement: 'top'
          }
        },
        {
          target: '#v-step-cash',
          content: `Keep an eye out on how much cash you have and <strong>pay off your mortgage when the time is right!</strong>`,
          params: {
            placement: 'bottom-start'
          }
        },
        {
          target: '#v-step-sign-in',
          content: `Sign in so that you are entered to <strong>win a prize for your high score!</strong>`,
          params: {
            placement: 'left-end'
          }
        }
      ]
    }
  },
  mounted () {
    this.$tours['myTour'].start()
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
