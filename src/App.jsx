import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './styles/main.css';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="container">
        <Header />
        <Sidebar />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;