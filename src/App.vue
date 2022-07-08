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
          content: `<strong>Set the number of months</strong> to pay your monthly payment and <strong>press Go</strong> to start the simulation.<br><br>Use the buttons below to <strong>refinance</strong>, <strong>cashout</strong> and <strong>payoff your mortgage</strong>.`,
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
