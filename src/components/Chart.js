
import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  datasets: [{
    data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    borderWidth: 4,
    pointBackgroundColor: '#007bff'
  }]
}

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: false
      }
    }]
  },
  legend: {
    display: false,
  }
}

const MyChart = () => {
  return (
    <div>
      <Line data={data} options={options}/>
    </div>
  )
}

export default MyChart