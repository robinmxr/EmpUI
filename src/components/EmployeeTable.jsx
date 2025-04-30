import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, LinearProgress, Tooltip, Typography, Box, Avatar, IconButton,
  TablePagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import avatarImage from '../assets/avatar.png';

const EmployeeTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const renderProgressBar = (value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={value} 
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getColorByValue(value),
              borderRadius: 5,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
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
    if (value >= 90) return 'rgba(76, 175, 80, 0.9)';
    if (value >= 70) return 'rgba(255, 152, 0, 0.9)';
    return 'rgba(244, 67, 54, 0.9)';
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Apply pagination
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ 
      background: 'rgba(30, 30, 46, 0.5)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: 'none'
    }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="employee metrics table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>Employee</TableCell>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>Performance</TableCell>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>Attendance</TableCell>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>Tasks</TableCell>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>On-Time Rate</TableCell>
              <TableCell sx={{ 
                color: '#e0e0e0', 
                fontWeight: 'bold', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(30, 30, 46, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <TableCell component="th" scope="row" sx={{ 
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={avatarImage}
                      alt={employee.name}
                      sx={{ 
                        mr: 2, 
                        background: 'linear-gradient(135deg, #64b5f6, #1976d2)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    {employee.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Tooltip title={`${employee.performanceScore}% Performance Score`}>
                    <div>{renderProgressBar(employee.performanceScore)}</div>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Tooltip title={`${employee.attendance}% Attendance Rate`}>
                    <div>{renderProgressBar(employee.attendance)}</div>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {employee.TasksCompleted}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Tooltip title={`${employee.OnTimeCompletionRate}% On-Time Completion Rate`}>
                    <div>{renderProgressBar(employee.OnTimeCompletionRate)}</div>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Tooltip title="View Employee Details">
                    <IconButton 
                      component={Link} 
                      to={`/employees/${employee.id}`}
                      sx={{ 
                        color: '#64b5f6',
                        '&:hover': { 
                          color: '#2196f3',
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: '#e0e0e0',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          '.MuiTablePagination-select': {
            color: '#e0e0e0'
          },
          '.MuiTablePagination-selectIcon': {
            color: '#e0e0e0'
          },
          '.MuiTablePagination-displayedRows': {
            margin: '0 16px'
          }
        }}
      />
    </Paper>
  );
};

export default EmployeeTable;