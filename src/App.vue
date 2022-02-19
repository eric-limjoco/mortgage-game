<template>
  <div id="app">
    <user-manager/>
  </div>
</template>

<script>
import UserManager from './components/UserManager'

export default {
  name: 'App',
  components: {
    UserManager
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
