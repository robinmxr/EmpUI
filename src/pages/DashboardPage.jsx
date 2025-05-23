import React, { useState, useEffect } from 'react';
import { 
  Grid, Paper, Typography, Box, Card, CardContent, List, ListItem, 
  ListItemAvatar, ListItemText, Avatar, Divider, CircularProgress,
  Pagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Leaderboard, CalendarToday } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MetricsSummary from '../components/MetricsSummary';
import dataService from '../services/dataService';
import avatarImage from '../assets/avatar.png';

const TopEmployeeList = ({ title, employees, color, icon: Icon }) => {
  return (
    <Card sx={{ 
      background: 'transparent',
      boxShadow: 'none', 
      height: '100%',
      display: 'flex',
      flexDirection: 'column' 
    }}>
      <CardContent sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Icon sx={{ color: color, mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
      </CardContent>
      <List sx={{ flexGrow: 1, p: 0 }}>
        {employees.map((employee, index) => (
          <React.Fragment key={employee.id}>
            <ListItem sx={{ 
              p: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}>
              <ListItemAvatar>
                <Avatar 
                  src={avatarImage}
                  sx={{ 
                    bgcolor: index === 0 ? '#FFD700' : // Gold for 1st
                            index === 1 ? '#C0C0C0' : // Silver for 2nd
                            index === 2 ? '#CD7F32' : // Bronze for 3rd
                            `${color}`,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {index < 3 && (
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                          color: '#000',
                          fontWeight: 'bold',
                          px: 1,
                          borderRadius: '4px',
                          mr: 1,
                          fontSize: '0.7rem'
                        }}
                      >
                        #{index + 1}
                      </Typography>
                    )}
                    <Link 
                      to={`/employees/${employee.id}`}
                      style={{ 
                        color: '#e0e0e0', 
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                          color: '#64b5f6'
                        }
                      }}
                    >
                      {employee.name}
                    </Link>
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <Box sx={{ 
                      width: '100%', 
                      mr: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 5,
                      height: 8
                    }}>
                      <Box sx={{ 
                        width: `${title.includes('Performance') ? employee.performanceScore : employee.attendance}%`, 
                        height: '100%', 
                        backgroundColor: color,
                        borderRadius: 5
                      }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: color, fontWeight: 'bold' }}>
                      {title.includes('Performance') ? employee.performanceScore : employee.attendance}%
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            {index < employees.length - 1 && (
              <Divider variant="inset" component="li" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dataService.getDashboardData();
        setData(result);
      } catch (err) {
        console.error('Error in dashboard:', err);
        setError('Failed to load dashboard data. Please try again later.');
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
        marginTop: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  // Sort employees by performance score (descending)
  const topPerformers = [...data.employees]
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 5);

  // Sort employees by attendance (descending)
  const topAttendance = [...data.employees]
    .sort((a, b) => b.attendance - a.attendance)
    .slice(0, 5);

  return (
    <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Metrics Summary Cards */}
        <Grid item xs={12}>
          <MetricsSummary data={data.overallMetrics} />
        </Grid>
        
        {/* Top Performers List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 0, 
            height: '100%', 
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <TopEmployeeList 
              title="Top Performers" 
              employees={topPerformers} 
              color="#64b5f6"
              icon={Leaderboard}
            />
          </Paper>
        </Grid>
        
        {/* Top Attendance List */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 0, 
            height: '100%', 
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <TopEmployeeList 
              title="Best Attendance" 
              employees={topAttendance} 
              color="#4caf50"
              icon={CalendarToday}
            />
          </Paper>
        </Grid>
        
        {/* Recent Activity or Additional Info */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            background: 'rgba(30, 30, 46, 0.7)',
            backdropFilter: 'blur(10px)', 
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <Typography variant="h6" gutterBottom>Quick Summary</Typography>
            <Typography variant="body2" paragraph>
              The current month shows an overall performance score of {data.overallMetrics.averagePerformanceScore.toFixed(1)}% 
              with average attendance at {data.overallMetrics.averageAttendance.toFixed(1)}%. 
              Employees completed an average of {data.overallMetrics.averageTasksCompleted} tasks this month.
            </Typography>
            <Typography variant="body2">
              Visit the Reports section for detailed charts and analytics on employee performance metrics.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;