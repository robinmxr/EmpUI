import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, LinearProgress, Tooltip, Typography, Box 
} from '@mui/material';

const EmployeeTable = ({ data }) => {
  const renderProgressBar = (value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={value} 
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getColorByValue(value),
              borderRadius: 5,
            }
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${value}%`}</Typography>
      </Box>
    </Box>
  );
  
  const getColorByValue = (value) => {
    if (value >= 90) return '#4caf50';
    if (value >= 70) return '#ff9800';
    return '#f44336';
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee metrics table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Employee</strong></TableCell>
            <TableCell><strong>Performance</strong></TableCell>
            <TableCell><strong>Attendance</strong></TableCell>
            <TableCell><strong>Tasks Completed</strong></TableCell>
            <TableCell><strong>On-Time Rate</strong></TableCell>
            <TableCell><strong>Projects</strong></TableCell>
            <TableCell><strong>Contribution</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((employee) => (
            <TableRow
              key={employee.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell>
                <Tooltip title={`${employee.performanceScore}% Performance Score`}>
                  <div>{renderProgressBar(employee.performanceScore)}</div>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={`${employee.attendance}% Attendance Rate`}>
                  <div>{renderProgressBar(employee.attendance)}</div>
                </Tooltip>
              </TableCell>
              <TableCell>{employee.TasksCompleted}</TableCell>
              <TableCell>
                <Tooltip title={`${employee.OnTimeCompletionRate}% On-Time Completion Rate`}>
                  <div>{renderProgressBar(employee.OnTimeCompletionRate)}</div>
                </Tooltip>
              </TableCell>
              <TableCell>{employee.ProjectsWorkedOn}</TableCell>
              <TableCell>
                <Tooltip title={`${employee.ContributionScore} Contribution Score`}>
                  <div>{renderProgressBar(employee.ContributionScore)}</div>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;