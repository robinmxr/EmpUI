import config from '../config/config';

/**
 * Data service that fetches data from the API or falls back to dummy data
 */
const dataService = {
  /**
   * Fetch employee data from the API or use dummy data as a fallback
   * @returns {Promise} A promise that resolves to employee data
   */
  getEmployeeData: async () => {
    // Check if API_BASE_URL is configured
    if (config.API_BASE_URL) {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.employees}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching data from API:', error);
        console.log('Falling back to dummy data...');
        // Fallback to dummy data on error
        return import('../data/dummyData.json');
      }
    } else {
      // If API_BASE_URL is not set, use dummy data
      console.log('API URL not configured, using dummy data');
      return import('../data/dummyData.json');
    }
  },
  
  /**
   * Fetch performance metrics from the API or use dummy data as a fallback
   * @returns {Promise} A promise that resolves to performance metrics data
   */
  getPerformanceMetrics: async () => {
    if (config.API_BASE_URL) {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.performance}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching performance data:', error);
        console.log('Falling back to dummy data...');
        // Fallback to dummy data and extract just the performance metrics
        const data = await import('../data/dummyData.json');
        return {
          employees: data.employees,
          metrics: data.overallMetrics
        };
      }
    } else {
      // If API_BASE_URL is not set, use dummy data
      console.log('API URL not configured, using dummy data for performance metrics');
      const data = await import('../data/dummyData.json');
      return {
        employees: data.employees,
        metrics: data.overallMetrics
      };
    }
  },
  
  /**
   * Fetch attendance data from the API or use dummy data as a fallback
   * @returns {Promise} A promise that resolves to attendance data
   */
  getAttendanceData: async () => {
    if (config.API_BASE_URL) {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.attendance}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        console.log('Falling back to dummy data...');
        // Fallback to dummy data and extract just the attendance
        const data = await import('../data/dummyData.json');
        return {
          employees: data.employees.map(emp => ({
            id: emp.id,
            name: emp.name,
            attendance: emp.attendance,
            daysPresent: emp.DaysPresent,
            leaveTaken: emp.LeaveTaken
          }))
        };
      }
    } else {
      // If API_BASE_URL is not set, use dummy data
      console.log('API URL not configured, using dummy data for attendance');
      const data = await import('../data/dummyData.json');
      return {
        employees: data.employees.map(emp => ({
          id: emp.id,
          name: emp.name,
          attendance: emp.attendance,
          daysPresent: emp.DaysPresent,
          leaveTaken: emp.LeaveTaken
        }))
      };
    }
  },
  
  /**
   * Fetch all metrics data in one call for the dashboard
   * @returns {Promise} A promise that resolves to all dashboard data
   */
  getDashboardData: async () => {
    if (config.API_BASE_URL) {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.metrics}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        console.log('Falling back to dummy data...');
        // Fallback to dummy data
        return import('../data/dummyData.json');
      }
    } else {
      // If API_BASE_URL is not set, use dummy data
      console.log('API URL not configured, using dummy data for dashboard');
      return import('../data/dummyData.json');
    }
  },

  /**
   * Fetch a specific employee by ID
   * @param {string} employeeId The ID of the employee to fetch
   * @returns {Promise} A promise that resolves to the employee data
   */
  getEmployeeById: async (employeeId) => {
    if (config.API_BASE_URL) {
      try {
        const response = await fetch(`${config.API_BASE_URL}${config.API_ENDPOINTS.employees}/${employeeId}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching employee by ID:', error);
        console.log('Falling back to dummy data...');
        // Fallback to dummy data and find the employee
        const data = await import('../data/dummyData.json');
        
        // Handle both string and numeric IDs
        const numericId = !isNaN(employeeId) ? Number(employeeId) : null;
        
        const employee = data.employees.find(emp => 
          emp.id === numericId || 
          emp.id === employeeId || 
          emp.EmployeeGuid === employeeId
        );
        
        if (!employee) {
          throw new Error('Employee not found');
        }
        
        return employee;
      }
    } else {
      // If API_BASE_URL is not set, use dummy data
      console.log('API URL not configured, using dummy data for employee details');
      const data = await import('../data/dummyData.json');
      
      // Handle both string and numeric IDs
      const numericId = !isNaN(employeeId) ? Number(employeeId) : null;
      
      const employee = data.employees.find(emp => 
        emp.id === numericId || 
        emp.id === employeeId || 
        emp.EmployeeGuid === employeeId
      );
      
      if (!employee) {
        throw new Error('Employee not found');
      }
      
      return employee;
    }
  }
};

export default dataService;