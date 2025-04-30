import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';
import EmployeeTable from '../components/EmployeeTable';
import dataService from '../services/dataService';

const EmployeePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataService.getEmployeeData();
        setData(result);
      } catch (err) {
        console.error('Error loading employee data:', err);
        setError('Failed to load employee data. Please try again later.');
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
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Employee Details
      </Typography>
      
      <Paper sx={{ 
        p: 3, 
        background: 'rgba(30, 30, 46, 0.7)',
        backdropFilter: 'blur(10px)', 
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <EmployeeTable data={data.employees} />
      </Paper>
    </Box>
  );
};

export default EmployeePage;