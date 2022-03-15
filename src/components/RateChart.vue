// eslint-disable-next-line vue/multi-word-component-names
<template>
<div class="chart">
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
      layout: {
        xaxis: {
          range: [0, 360],
          fixedrange: true,
          showgrid: false,
          showticklabels: false,
          color: '#969696',
          zerolinecolor: '#969696'
        },
        yaxis: {
          range: [0, 8],
          fixedrange: true,
          color: '#969696',
          zerolinecolor: '#969696'
        },
        height: 200,
        margin: {
          t: 12,
          b: 48,
          l: 24,
          r: 24
        },
        showLegend: true,
        legend: {
          x: 1,
          y: 1,
          xanchor: 'right',
          font: {
            family: 'Lato',
            color: '#969696'
          }
        },
        plot_bgcolor: 'hsla(0, 0%, 96.1%, 0.71)',
        paper_bgcolor: 'hsla(0, 0%, 96.1%, 0.71)'
      }
    }
  },
  computed: {
    ...mapState(['rateHistory', 'userRateHistory', 'optimalRateHistory', 'showOptimal']),
    data () {
      let xvals = Array.from(Array(this.rateHistory.length).keys())
      let x2vals = Array.from(Array(this.optimalRateHistory.length).keys())
      // Define Data
      var rates1 = {
        x: xvals,
        y: this.rateHistory,
        mode: 'lines',
        name: 'Market Rate',
        line: {
          color: '#21732f',
          width: 1
        }
      }
      var rates2 = {
        x: xvals,
        y: this.userRateHistory,
        mode: 'lines',
        name: 'Your Loan Rate',
        line: {
          color: '#276681',
          width: 2
        }
      }
      var rates3 = {
        x: x2vals,
        y: this.optimalRateHistory,
        mode: 'lines',
        name: 'Optimal Rate',
        line: {
          dash: 'dot',
          width: 2
        }
      }
      if (this.showOptimal) {
        return [rates1, rates2, rates3]
      } else {
        return [rates1, rates2]
      }
    }
  },
  components: {
    Plotly
  }
}
</script>
<style scoped>
.chart {
  padding: 0;
}
</style>
