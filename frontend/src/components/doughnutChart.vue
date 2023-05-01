<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
Chart.register(...registerables)

const apiURL = import.meta.env.VITE_ROOT_API
export default {
  mounted() {
    axios
      .get(`https://project-app-c18v.onrender.com/clients/zipcodes`)
      .then((response) => {
        const zipcodesData = response.data

        const ctx = this.$refs.chart.getContext('2d')
        const chart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: zipcodesData.map((d) => d._id),
            datasets: [
              {
                label: 'Number of events per zipcode',
                data: zipcodesData.map((item) => item.count),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#C9CBCF'
                ]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Number of clients per zipcode'
            }
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
