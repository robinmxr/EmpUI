import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Badge, Tooltip, Chip } from '@mui/material';
import { Notifications, Settings, CloudOff } from '@mui/icons-material';
import config from '../config/config';
import avatarImage from '../assets/avatar.png';

const Header = () => {
  // Determine if we're using dummy data
  const usingDummyData = !config.API_BASE_URL;

  return (
    <AppBar position="fixed" sx={{ 
      zIndex: (theme) => theme.zIndex.drawer + 1,
      background: 'rgba(30, 30, 46, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div" sx={{
          background: 'linear-gradient(45deg, #64b5f6, #2196f3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          EmPerf
        </Typography>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {usingDummyData && (
            <Tooltip title="Using local dummy data. Configure API_BASE_URL to connect to backend.">
              <Chip
                icon={<CloudOff fontSize="small" />}
                label="Offline Mode"
                size="small"
                color="warning"
                variant="outlined"
                sx={{ mr: 2 }}
              />
            </Tooltip>
          )}
          
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          
          <Avatar 
            src={avatarImage}
            sx={{ 
              ml: 2,
              background: 'linear-gradient(45deg, #64b5f6, #1976d2)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }} 
            alt="Admin User"
          >
            A
          </Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;