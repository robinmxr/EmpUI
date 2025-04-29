import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Badge } from '@mui/material';
import { Notifications, Settings } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Employee Performance Dashboard
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <Avatar sx={{ ml: 2 }} alt="Admin User" src="/static/images/avatar/1.jpg" />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;