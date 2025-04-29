import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const ComparisonChart = ({ data }) => {
  // Limit to top 3 employees based on performance score for cleaner chart
  const topEmployees = [...data]
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 3);

  const chartData = {
    labels: ['Performance', 'Productivity', 'Attendance', 'Task Completion', 'On-Time Rate', 'Contribution'],
    datasets: topEmployees.map(employee => ({
      label: employee.name,
      data: [
        employee.performanceScore,
        employee.productivity,
        employee.attendance,
        (employee.TasksCompleted / 50) * 100, // Normalized to percentage
        employee.OnTimeCompletionRate,
        employee.ContributionScore
      ],
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
      borderWidth: 2,
    }))
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return <Radar data={chartData} options={options} />;
};

export default ComparisonChart;