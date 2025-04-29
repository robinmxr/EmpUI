# Employee Performance Dashboard

This project is an Employee Performance Dashboard built with React and Material UI. It provides a visual representation of employee performance metrics, productivity, and attendance records through various charts and graphs using a sleek dark theme.

## Features

- **Dashboard**: The main container that integrates all components including charts and navigation.
- **Header**: Displays the title and navigation options for easy access to different sections.
- **Sidebar**: Provides navigation links to various parts of the dashboard.
- **Performance Metrics**: Visual representations of data including:
  - Performance scores and contribution metrics
  - Productivity and work hours tracking
  - Attendance and leave records
  - Task completion statistics
  - Employee comparison across various metrics

## Components

- `Dashboard.jsx`: Main component that renders the dashboard layout with a grid of charts.
- `Header.jsx`: Displays the title, notifications, and user avatar with app bar.
- `Sidebar.jsx`: Contains navigation links with icons for different sections of the dashboard.
- `MetricsSummary.jsx`: Displays summary cards with key performance indicators.
- `PerformanceChart.jsx`: Bar chart visualization of employee performance scores.
- `ProductivityGraph.jsx`: Displays productivity metrics like work hours and tasks completed.
- `AttendanceChart.jsx`: Doughnut chart showing attendance distribution.
- `TaskCompletionChart.jsx`: Pie chart displaying task completion distribution by employee.
- `ComparisonChart.jsx`: Radar chart comparing top employees across various metrics.
- `EmployeeTable.jsx`: Detailed table with progress bars for employee metrics.

## Technology Stack

- **React**: Frontend library for building the user interface
- **Material UI**: Component library with built-in dark theme support
- **Chart.js & React-Chartjs-2**: For creating responsive and interactive charts
- **Emotion**: CSS-in-JS styling solution used by Material UI
- **CSS**: Custom styling for components and charts

## Dark Theme

The application uses a custom dark theme with:
- Dark backgrounds (#121212, #1e1e1e) for reduced eye strain
- Light text colors (#e0e0e0) for contrast
- Accent colors (#64b5f6) for interactive elements
- Custom styling for cards, tables, and buttons
- MUI ThemeProvider integration for consistent styling

## Data

Dummy data is provided in `src/data/dummyData.json` to simulate employee performance metrics, productivity, and attendance records. This data will be replaced with real data from the backend API once connected.

## Services

The `src/services/apiService.js` file will handle API calls to fetch employee performance data from the backend.

## Styles

Styles for the dashboard and charts are defined in:
- `src/styles/main.css`: Main styles for the dashboard layout and dark theme.
- `src/theme.js`: Material UI theme configuration for dark mode.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.
5. The application will be available at http://localhost:3000.

## Dependencies

Main dependencies include:
- React 18
- Material UI v5
- Chart.js v4
- React-Chartjs-2 v5
- Emotion for styling

## License

This project is licensed under the MIT License.