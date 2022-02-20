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
        y: [1, 2, 3, 4],
        type: 'scatter'
      }],
      layout: {
        yaxis: {
          fixedrange: true
        },
        xaxis: {
          fixedrange: true
        },
        height: 340,
        margin: {
          t: 12,
          b: 48,
          l: 24,
          r: 24
        }
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
