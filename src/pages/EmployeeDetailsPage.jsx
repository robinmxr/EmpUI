import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Avatar, 
  Chip, 
  Divider,
  CircularProgress, 
  Alert,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button
} from '@mui/material';
import { 
  Email, 
  Phone, 
  Work, 
  Business, 
  AssignmentTurnedIn, 
  Timer,
  CalendarToday,
  Star,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import dataService from '../services/dataService';
import avatarImage from '../assets/avatar.png';

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        console.log("Fetching employee with ID:", id);
        
        // Get employee data from service
        const result = await dataService.getEmployeeData();
        
        // Find the specific employee by ID - handle both string and numeric IDs
        const employeeData = result.employees.find(emp => {
          // Handle numeric IDs by converting the parameter to a number if needed
          const numericId = !isNaN(id) ? Number(id) : null;
          return emp.id === numericId || emp.id === id || emp.EmployeeGuid === id;
        });
        
        console.log("Found employee data:", employeeData);
        
        if (!employeeData) {
          throw new Error('Employee not found');
        }
        
        setEmployee(employeeData);
      } catch (err) {
        console.error('Error loading employee details:', err);
        setError('Failed to load employee details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployeeData();
  }, [id]);

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
        <Button 
          startIcon={<ArrowBack />}
          variant="outlined" 
          onClick={() => navigate('/employees')}
          sx={{ mt: 2 }}
        >
          Return to Employees List
        </Button>
      </Box>
    );
  }

  const getMetricColor = (value) => {
    if (value >= 90) return '#4caf50';
    if (value >= 70) return '#ff9800';
    return '#f44336';
  };

  const renderMetricProgress = (value, label) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="body2" sx={{ color: getMetricColor(value) }}>
          {value}%
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={value} 
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getMetricColor(value),
            borderRadius: 5,
          }
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/employees')}
        sx={{ mb: 3 }}
      >
        Back to Employees
      </Button>
      
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Employee Details
      </Typography>
      
      <Grid container spacing={3}>
        {/* Employee Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <Avatar
              src={employee.image || avatarImage}
              alt={employee.name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                bgcolor: '#1976d2',
                fontSize: '2.5rem',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                border: '4px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {employee.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
              {employee.name}
            </Typography>
            
            <Chip 
              label={employee.Designation} 
              sx={{ 
                mb: 2, 
                background: 'rgba(25, 118, 210, 0.2)', 
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(100, 181, 246, 0.3)',
                color: '#64b5f6'
              }} 
            />
            
            <Divider sx={{ width: '100%', mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            
            <List sx={{ width: '100%' }}>
              <ListItem>
                <Email sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.6)' }} />
                <ListItemText 
                  primary="Email" 
                  secondary={employee.Email} 
                />
              </ListItem>
              
              <ListItem>
                <Phone sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.6)' }} />
                <ListItemText 
                  primary="Phone" 
                  secondary={employee.Phone} 
                />
              </ListItem>
              
              <ListItem>
                <Business sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.6)' }} />
                <ListItemText 
                  primary="Department" 
                  secondary={employee.Department} 
                />
              </ListItem>
              
              <ListItem>
                <Work sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.6)' }} />
                <ListItemText 
                  primary="Employee ID" 
                  secondary={employee.EmployeeGuid} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Employee Metrics Card */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            p: 3,
            height: '100%',
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            
            <Grid container spacing={3}>
              {/* Performance Score */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Star sx={{ fontSize: 'small', mr: 1, verticalAlign: 'middle', color: '#ffc107' }} />
                    Performance Score
                  </Typography>
                  {renderMetricProgress(employee.performanceScore, 'Overall Performance')}
                </Box>
              </Grid>
              
              {/* Attendance */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <CalendarToday sx={{ fontSize: 'small', mr: 1, verticalAlign: 'middle', color: '#4caf50' }} />
                    Attendance
                  </Typography>
                  {renderMetricProgress(employee.attendance, 'Attendance Rate')}
                </Box>
              </Grid>
              
              {/* Tasks Completion */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <AssignmentTurnedIn sx={{ fontSize: 'small', mr: 1, verticalAlign: 'middle', color: '#2196f3' }} />
                    Task Completion
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Completed Tasks</Typography>
                    <Typography variant="body2" color="primary">
                      {employee.TasksCompleted}
                    </Typography>
                  </Box>
                  {renderMetricProgress(employee.OnTimeCompletionRate, 'On-time Completion Rate')}
                </Box>
              </Grid>
              
              {/* Productivity */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  mb: 2
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Timer sx={{ fontSize: 'small', mr: 1, verticalAlign: 'middle', color: '#ff9800' }} />
                    Productivity
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Projects</Typography>
                    <Typography variant="body2" color="primary">
                      {employee.ProjectsWorkedOn}
                    </Typography>
                  </Box>
                  {renderMetricProgress(employee.productivity || employee.ContributionScore, 'Contribution Score')}
                </Box>
              </Grid>
            </Grid>
            
            {/* Working Hours Analysis */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Working Hours Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <Typography variant="subtitle2">Monthly Summary</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Total Work Hours</Typography>
                        <Typography variant="body2" color="primary">
                          {employee.TotalWorkHours}h
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Days Present</Typography>
                        <Typography variant="body2" color="primary">
                          {employee.DaysPresent} days
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Leave Taken</Typography>
                        <Typography variant="body2" color="primary">
                          {employee.LeaveTaken} days
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px'
                  }}>
                    <Typography variant="subtitle2">Daily Average</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                      <Typography variant="body2">Average Daily Hours</Typography>
                      <Typography variant="body2" color="primary">
                        {employee.AvgDailyWorkHours}h
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(employee.AvgDailyWorkHours / 9) * 100} // Assuming 9 hours is 100%
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#2196f3',
                          borderRadius: 5,
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetailsPage;