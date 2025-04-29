import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductivityGraph = ({ data }) => {
  const chartData = {
    labels: data.map(employee => employee.name),
    datasets: [
      {
        label: 'Total Work Hours',
        data: data.map(employee => employee.TotalWorkHours),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        label: 'Tasks Completed',
        data: data.map(employee => employee.TasksCompleted * 3), // Scaled for better visualization
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Productivity Metrics by Employee'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default ProductivityGraph;