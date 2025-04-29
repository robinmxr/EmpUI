import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import PerformanceChart from './charts/PerformanceChart';
import ProductivityGraph from './charts/ProductivityGraph';
import AttendanceChart from './charts/AttendanceChart';
import ComparisonChart from './charts/ComparisonChart';
import TaskCompletionChart from './charts/TaskCompletionChart';
import MetricsSummary from './MetricsSummary';
import EmployeeTable from './EmployeeTable';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data from your JSON file or API
    import('../data/dummyData.json')
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Performance Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Metrics Summary Cards */}
        <Grid item xs={12}>
          <MetricsSummary data={data.overallMetrics} />
        </Grid>
        
        {/* Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Performance Metrics
            </Typography>
            <PerformanceChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Task Completion Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Task Completion Distribution
            </Typography>
            <TaskCompletionChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Attendance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Attendance Overview
            </Typography>
            <AttendanceChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Productivity Graph */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Productivity Metrics
            </Typography>
            <ProductivityGraph data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Comparison Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Employee Comparison
            </Typography>
            <ComparisonChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Employee Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom component="div">
              Employee Details
            </Typography>
            <EmployeeTable data={data.employees} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;