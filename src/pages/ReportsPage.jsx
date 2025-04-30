import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import PerformanceChart from '../components/charts/PerformanceChart';
import ProductivityGraph from '../components/charts/ProductivityGraph';
import AttendanceChart from '../components/charts/AttendanceChart';
import ComparisonChart from '../components/charts/ComparisonChart';
import TaskCompletionChart from '../components/charts/TaskCompletionChart';
import dataService from '../services/dataService';

const ReportsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataService.getPerformanceMetrics();
        setData(result);
      } catch (err) {
        console.error('Error loading report data:', err);
        setError('Failed to load performance reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 64px)',
        marginLeft: '240px',
        marginTop: '64px'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        p: 3, 
        marginLeft: '240px', 
        marginTop: '64px'
      }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Paper sx={{ p: 3, background: 'rgba(30, 30, 46, 0.7)' }}>
          <Typography>
            Please check your network connection or contact system administrator.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Performance Reports
      </Typography>
      
      <Grid container spacing={3}>
        {/* Performance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <Typography variant="h6" gutterBottom component="div">
              Performance Metrics
            </Typography>
            <PerformanceChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Attendance Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <Typography variant="h6" gutterBottom component="div">
              Attendance Overview
            </Typography>
            <AttendanceChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Task Completion Chart - Now takes full width */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <TaskCompletionChart data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Productivity Graph */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <Typography variant="h6" gutterBottom component="div">
              Productivity Metrics
            </Typography>
            <ProductivityGraph data={data.employees} />
          </Paper>
        </Grid>
        
        {/* Comparison Chart - Already full width */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <Typography variant="h6" gutterBottom component="div">
              Employee Performance Comparison
            </Typography>
            <ComparisonChart data={data.employees} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;