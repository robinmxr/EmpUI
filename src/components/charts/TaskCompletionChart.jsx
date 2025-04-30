import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Stack, Chip, Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskCompletionChart = ({ data }) => {
  const [displayCount, setDisplayCount] = useState(10);
  
  // Sort employees by tasks completed (descending)
  const sortedData = [...data].sort((a, b) => b.TasksCompleted - a.TasksCompleted);
  
  // Get top N employees for display
  const topEmployees = sortedData.slice(0, displayCount);
  
  // Calculate tasks completed by other employees
  const otherEmployees = sortedData.slice(displayCount);
  const otherTasksTotal = otherEmployees.reduce((sum, emp) => sum + emp.TasksCompleted, 0);
  
  // Prepare chart data
  const labels = [
    ...topEmployees.map(employee => {
      // Truncate long names and add department indicator
      const nameParts = employee.name.split(' ');
      const firstName = nameParts[0];
      const lastInitial = nameParts[1]?.[0] || '';
      return `${firstName} ${lastInitial}. (${employee.Department.substring(0, 3)})`;
    })
  ];
  
  // Only add "Others" if there are other employees
  if (otherEmployees.length > 0) {
    labels.push(`Others (${otherEmployees.length} employees)`);
  }

  // Generate color gradients
  const generateColors = (count) => {
    const baseColors = [
      [255, 99, 132],   // Red
      [54, 162, 235],   // Blue
      [255, 206, 86],   // Yellow
      [75, 192, 192],   // Teal
      [153, 102, 255],  // Purple
      [255, 159, 64],   // Orange
      [76, 175, 80],    // Green
      [233, 30, 99],    // Pink
      [3, 169, 244],    // Light Blue
      [255, 235, 59],   // Light Yellow
    ];
    
    return Array(count).fill(0).map((_, i) => {
      const colorIndex = i % baseColors.length;
      const [r, g, b] = baseColors[colorIndex];
      // Adjust opacity based on position
      const opacity = Math.max(0.8 - (i * 0.03), 0.4);
      return [`rgba(${r}, ${g}, ${b}, ${opacity})`, `rgba(${r}, ${g}, ${b}, 1)`];
    });
  };
  
  const colors = generateColors(topEmployees.length + 1);
  
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: [
          ...topEmployees.map(employee => employee.TasksCompleted),
          ...(otherEmployees.length > 0 ? [otherTasksTotal] : [])
        ],
        backgroundColor: colors.map(c => c[0]),
        borderColor: colors.map(c => c[1]),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        align: 'start',
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          },
          color: '#e0e0e0',
          boxWidth: 12,
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                
                return {
                  text: `${label} - ${value} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: 1,
                  hidden: false,
                  index: i,
                  fontColor: '#e0e0e0'  // Add this line to set text color
                };
              });
            }
            return [];
          }
        }
      },
      title: {
        display: true,
        text: 'Tasks Completed by Employee',
        color: '#e0e0e0',
        font: {
          size: 18
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            const idx = tooltipItems[0].dataIndex;
            if (idx < topEmployees.length) {
              return topEmployees[idx].name;
            }
            return 'Other Employees';
          },
          label: function(context) {
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            
            if (context.dataIndex < topEmployees.length) {
              const employee = topEmployees[context.dataIndex];
              return [
                `Tasks: ${value}`,
                `Percentage: ${percentage}%`,
                `Department: ${employee.Department}`,
                `On-time Rate: ${employee.OnTimeCompletionRate}%`
              ];
            } else {
              return [
                `Tasks: ${value}`,
                `Percentage: ${percentage}%`,
                `Employees: ${otherEmployees.length}`
              ];
            }
          }
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        usePointStyle: true,
        boxPadding: 5
      }
    }
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%'
    }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#e0e0e0' }}>
          Task Completion Distribution
        </Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="display-count-label">Show Top</InputLabel>
          <Select
            labelId="display-count-label"
            value={displayCount}
            onChange={(e) => setDisplayCount(e.target.value)}
            label="Show Top"
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={data.length}>All</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Chart Container */}
        <Grid item xs={12} md={8}>
          <Box sx={{ 
            height: '450px',  // Increased height
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Pie data={chartData} options={options} />
          </Box>
        </Grid>
        
        {/* Top Contributors Side Panel */}
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px'
          }}>
            <Typography variant="subtitle1" sx={{ mb: 2, color: '#e0e0e0' }}>
              Top Contributors
            </Typography>
            {topEmployees.slice(0, 8).map((emp, idx) => (
              <Box 
                key={emp.id} 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1.5,
                  p: 1,
                  borderRadius: '4px',
                  bgcolor: idx < 3 ? `${colors[idx][0]}30` : 'transparent', 
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: `${colors[idx][0]}40`
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {idx < 3 && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mr: 1.5, 
                        fontWeight: 'bold',
                        color: colors[idx][0],
                        fontSize: '1.2rem'
                      }}
                    >
                      #{idx + 1}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ color: '#e0e0e0' }}>{emp.name}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: colors[idx][0], fontWeight: 'bold' }}>
                  {emp.TasksCompleted} tasks
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Total tasks completed this month: {sortedData.reduce((sum, emp) => sum + emp.TasksCompleted, 0)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskCompletionChart;