export const formatDataForChart = (data) => {
    return data.map(item => ({
        name: item.name,
        performance: item.performance,
        productivity: item.productivity,
        attendance: item.attendance
    }));
};

export const calculateAveragePerformance = (data) => {
    const totalPerformance = data.reduce((acc, item) => acc + item.performance, 0);
    return totalPerformance / data.length;
};

export const calculateAverageProductivity = (data) => {
    const totalProductivity = data.reduce((acc, item) => acc + item.productivity, 0);
    return totalProductivity / data.length;
};

export const calculateAttendanceRate = (data) => {
    const totalAttendance = data.reduce((acc, item) => acc + item.attendance, 0);
    return (totalAttendance / (data.length * 100)) * 100; // Assuming attendance is a percentage
};