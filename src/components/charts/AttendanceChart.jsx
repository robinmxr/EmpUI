import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ data }) => {
  // Calculate the average values
  const avgDaysPresent = data.reduce((sum, emp) => sum + emp.DaysPresent, 0) / data.length;
  const avgLeaveTaken = data.reduce((sum, emp) => sum + emp.LeaveTaken, 0) / data.length;
  const workingDaysPerMonth = avgDaysPresent + avgLeaveTaken;
  const absentDays = workingDaysPerMonth - avgDaysPresent - avgLeaveTaken;
  
  const chartData = {
    labels: ['Present', 'Leave', 'Absent'],
    datasets: [
      {
        data: [avgDaysPresent, avgLeaveTaken, absentDays],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value.toFixed(1)} days`;
          }
        }
      }
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default AttendanceChart;