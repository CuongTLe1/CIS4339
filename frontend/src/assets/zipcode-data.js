export const doughnutChartData = {
  type: 'doughnut',
  data: {
    labels: ['77042', '77004', '77052', '77002', '77449'],
    datasets: [
      {
        label: 'Number of Clients',
        data: [5, 4, 6, 3, 4],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(234, 43, 70)',
          'rgb(250, 200, 88)',
          'rgb(25, 224, 58)'
        ]
      }
    ]
  },
  options: {
    responsive: true,
    lineTension: 1
  }
}

export default doughnutChartData
