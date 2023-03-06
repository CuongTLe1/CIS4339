<template>
  <div class="chartbox">
    <!-- canvas element for chart -->
    <canvas id="doughnut-chart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import doughnutChartData from '../assets/zipcode-data.js'

Chart.register(...registerables)
export default {
  name: 'doughnutChart',
  data() {
    return {
      doughnutChartData: doughnutChartData
    }
  },
  //establish Chart object after mounting the component
  mounted() {
    const ctx = document.getElementById('doughnut-chart')
    new Chart(ctx, this.doughnutChartData)
  }
}
</script>
