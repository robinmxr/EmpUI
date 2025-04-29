import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Layers, AccessTime, EventAvailable, EmojiEvents } from '@mui/icons-material';

const MetricsSummary = ({ data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Performance Score
            </Typography>
            <EmojiEvents />
          </Box>
          <Typography component="p" variant="h4">
            {data.averagePerformanceScore.toFixed(1)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Team average out of 100
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Tasks Completed
            </Typography>
            <Layers />
          </Box>
          <Typography component="p" variant="h4">
            {data.averageTasksCompleted.toFixed(0)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Average per employee
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Work Hours
            </Typography>
            <AccessTime />
          </Box>
          <Typography component="p" variant="h4">
            {data.averageTotalWorkHours.toFixed(1)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Monthly average hours
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Attendance Rate
            </Typography>
            <EventAvailable />
          </Box>
          <Typography component="p" variant="h4">
            {data.averageAttendance.toFixed(1)}%
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Team average
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MetricsSummary;