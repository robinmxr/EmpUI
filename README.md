# Employee Performance Dashboard

This project is an Employee Performance Dashboard built with React. It provides a visual representation of employee performance metrics, productivity, and attendance records through various charts and graphs.

## Features

- **Dashboard**: The main container that integrates all components including charts and navigation.
- **Header**: Displays the title and navigation options for easy access to different sections.
- **Sidebar**: Provides navigation links to various parts of the dashboard.
- **Charts**: Visual representations of data including:
  - Performance metrics
  - Productivity metrics
  - Attendance records
  - Comparison of performance across employees or teams

## Components

- `Dashboard.jsx`: Main component that renders the dashboard layout.
- `Header.jsx`: Displays the title and navigation links.
- `Sidebar.jsx`: Contains links to different sections of the dashboard.
- `PerformanceChart.jsx`: Visualizes employee performance data.
- `ProductivityGraph.jsx`: Displays productivity metrics.
- `AttendanceChart.jsx`: Shows attendance records.
- `ComparisonChart.jsx`: Compares performance metrics across employees or teams.

## Data

Dummy data is provided in `src/data/dummyData.json` to simulate employee performance metrics, productivity, and attendance records. This data will be replaced with real data from the backend API once connected.

## Services

The `src/services/apiService.js` file will handle API calls to fetch employee performance data from the backend.

## Styles

Styles for the dashboard and charts are defined in:
- `src/styles/main.css`: Main styles for the dashboard layout.
- `src/styles/charts.css`: Styles specific to the chart components.

## Utilities

Utility functions for processing chart data are located in `src/utils/chartHelpers.js`.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.

## License

This project is licensed under the MIT License.