// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="rate-chart">
  <Plotly
    :data="data"
    :layout="layout"
    :display-mode-bar="false"
  ></Plotly>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { Plotly } from 'vue-plotly'

export default {
  data () {
    return {
      data: [{
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
      }],
      layout: {
        title: 'Rate History'
      }
    }
  },
  computed: {
    ...mapState([''])
  },
  components: {
    Plotly
  }
}
</script>
<style scoped>
</style>
