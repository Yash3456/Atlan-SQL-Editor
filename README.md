# Atlan SQL Editor

## Overview

Atlan SQL Editor is a web-based SQL playground that allows users to input, edit, and toggle between predefined SQL queries. It provides a mock environment for viewing query results in a user-friendly interface, simulating the experience of a basic SQL editor.

## Features

- **SQL Query Input**: Textarea for writing and editing SQL queries.
- **Predefined Queries**: Dropdown to select from multiple hardcoded SQL queries.
- **Mock Data Tables**: Displays dummy data tables associated with selected queries.
- **Responsive UI**: Optimized for a seamless user experience.
- **Lightweight Design**: Minimal dependencies for faster load times.

## Technologies Used

- **Frontend**: React.js (via Vite)
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Installation & Setup

### Prerequisites

- Node.js (>= 22)
- Yarn or npm

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/atlan-sql-editor.git
   cd atlan-sql-editor
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the application:**

   ```sh
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:3000` in your browser.

## Usage

- Select a predefined query from the dropdown.
- Edit the query in the SQL input area if needed.
- View the mock results in the results table below.

## Deployment

To deploy the application, use Vercel or any static hosting service:

1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting platform.

## Future Enhancements

- Integrate Monaco Editor for advanced SQL editing.
- Add syntax highlighting for better readability.
- Support for dark mode.
- Paginate large data tables for better performance.
- Save query history and allow users to manage saved queries.

## Known Limitations

- No backend or actual SQL execution engine.
- Query syntax is not validated.
- Mock data is static and not tied to query logic.

## Contact

For any issues or suggestions, please open an issue on the repository or reach out at goyalyash311@gmail.com.

---

Made with 💙 for the Atlan Frontend Internship Task 2025 by Yash Goyal.
