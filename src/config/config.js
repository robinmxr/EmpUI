/**
 * Configuration settings for the Employee Performance Dashboard
 * Set API_BASE_URL to your backend server URL
 * If API_BASE_URL is empty, the application will use local dummy data
 */

const config = {
  // Backend API configuration
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || '',
  API_ENDPOINTS: {
    employees: '/api/employees',
    performance: '/api/performance',
    attendance: '/api/attendance',
    tasks: '/api/tasks',
    metrics: '/api/metrics'
  },
  
  // Feature flags
  FEATURES: {
    enableRealTimeUpdates: false,
    enableNotifications: true,
    enableFiltering: true,
    enableExport: false
  },
  
  // UI configuration
  UI: {
    theme: 'dark',
    refreshInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
    itemsPerPage: 10
  },
  
  // Environment settings
  ENV: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
  }
};

export default config;