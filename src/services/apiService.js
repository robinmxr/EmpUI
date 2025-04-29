export const fetchEmployeePerformanceData = async () => {
    try {
        const response = await fetch('/api/employee-performance');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching employee performance data:', error);
        throw error;
    }
};

export const fetchProductivityData = async () => {
    try {
        const response = await fetch('/api/productivity');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching productivity data:', error);
        throw error;
    }
};

export const fetchAttendanceData = async () => {
    try {
        const response = await fetch('/api/attendance');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        throw error;
    }
};