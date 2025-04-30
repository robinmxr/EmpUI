import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import { Dashboard, People, BarChart, Assignment, Settings, Person } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          background: 'rgba(30, 30, 46, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        },
      }}
    >
      <Toolbar />
      <div style={{ 
        overflowY: 'auto',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE and Edge
        '&::-webkit-scrollbar': { 
          display: 'none' // Chrome, Safari, Opera
        }
      }}>
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/"
            selected={path === '/'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <Dashboard sx={{ color: path === '/' ? '#64b5f6' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          
          <ListItem 
            button 
            component={Link} 
            to="/employees"
            selected={path === '/employees'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <People sx={{ color: path === '/employees' ? '#64b5f6' : 'inherit' }} />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          
          <ListItem 
            button 
            component={Link} 
            to="/reports"
            selected={path === '/reports'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          
          <ListItem 
            button 
            component={Link} 
            to="/tasks"
            selected={path === '/tasks'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
        </List>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List>
          <ListItem 
            button 
            component={Link} 
            to="/settings"
            selected={path === '/settings'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          
          <ListItem 
            button 
            component={Link} 
            to="/profile"
            selected={path === '/profile'}
            sx={{
              borderRadius: '8px',
              m: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 181, 246, 0.2)',
                color: '#64b5f6',
                borderLeft: '3px solid #64b5f6'
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                transform: 'translateX(5px)',
              }
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;