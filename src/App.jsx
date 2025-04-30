import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import glassmorphicTheme from './theme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import ReportsPage from './pages/ReportsPage';
import './styles/main.css';

function App() {
  return (
    <Router>
      <ThemeProvider theme={glassmorphicTheme}>
        <CssBaseline />
        <Box>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/tasks" element={
              <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
                <h2>Tasks Page</h2>
                <p>Coming soon...</p>
              </Box>
            } />
            <Route path="/settings" element={
              <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
                <h2>Settings Page</h2>
                <p>Coming soon...</p>
              </Box>
            } />
            <Route path="/profile" element={
              <Box sx={{ flexGrow: 1, p: 3, marginLeft: '240px', marginTop: '64px' }}>
                <h2>Profile Page</h2>
                <p>Coming soon...</p>
              </Box>
            } />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;