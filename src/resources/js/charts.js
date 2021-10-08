import Chart from 'chart.js/auto';

document.addEventListener('DOMContentLoaded', () => {
  const $doughnutCanvasElements = Array.prototype.slice.call(document.querySelectorAll('.chart-js-doughnut'), 0);
  
  if ($doughnutCanvasElements.length > 0) {

    $doughnutCanvasElements.forEach(el => {

      const chartCanvas = el.getContext('2d');
      const chartData = JSON.parse(el.dataset.chartData);
  
      const data = {
        labels: chartData.quantities.map(item => item.name),
        datasets: [
          {
            label: el.dataset.chartTitle,
            data: chartData.quantities.map(item => Number(item.count)),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ]
          }
        ]
      };

      const chart = new Chart(chartCanvas, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: el.dataset.chartTitle
            }
          }
        }
      })
    });
  }
});
