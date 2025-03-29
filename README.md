# Atlan SQL Editor

## Overview

Atlan SQL Editor is a web-based SQL playground built using **React (via Vite)** that allows users to input, edit, and toggle between predefined SQL queries. It provides a clean, mock environment for viewing query results in a user-friendly interface, simulating the experience of a basic SQL editor. This project showcases strong frontend development principles, including **scalability, maintainability, performance optimization, and deployment readiness**.

🔗 **Live Preview:** [atlan-sql-editor-two.vercel.app](https://atlan-sql-editor-two.vercel.app)  
📁 **GitHub Repo:** [github.com/Yash3456/Atlan-SQL-Editor](https://github.com/Yash3456/Atlan-SQL-Editor)

---

## Features

- **SQL Query Input**: Integrated text editor for writing and editing SQL queries.
- **Predefined Queries**: Dropdown to select from multiple hardcoded SQL queries for quick testing.
- **Mock Data Tables**: Displays dummy data in tables and charts associated with selected queries.
- **Responsive UI**: Optimized with Vite for fast load times and smooth interaction.
- **Lightweight Design**: Using minimal dependencies for performance optimization.
- **Performance Analyzer**: Section to analyze query time and performance metrics.
- **Query History**: Displays and searches past queries made by users.
- **Dockerized Deployment**: Full Docker support for seamless development, testing, and production environments.

---

## Technologies Used

- **Frontend**: React.js (via Vite)
- **Styling**: CSS Modules
- **Type Checking**: TypeScript
- **Tooling**: ESLint for code quality assurance
- **Deployment**: Vercel for fast, continuous deployment
- **Containerization**: Docker for isolated and reproducible environments

---

## Installation & Setup

### Prerequisites

- Node.js (>= 22)
- Yarn or npm
- Docker (if running via Docker)

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Yash3456/Atlan-SQL-Editor.git
   cd Atlan-SQL-Editor
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the application locally:**

   ```sh
   npm run dev
   ```

4. **Access the application:**
   Open `http://localhost:8080` in your browser.

---

## Docker Support

This application is fully Dockerized to support streamlined development and production environments.

### Building & Running with Docker

1. **Build the Docker image:**

   ```sh
   docker build -t atlan-sql-editor .
   ```

2. **Run the Docker container:**

   ```sh
   docker run -p 8080:8080 atlan-sql-editor
   ```

3. **Using Docker Compose:**
   ```sh
   docker-compose up --build
   ```

---

## Usage

- Select a predefined query from the dropdown.
- Edit the query in the SQL input area if needed.
- View the mock results in the results table below.
- View the data visulization in the same tab for better analysis.
- View the past querry to effectively get result.

---

## Deployment

To deploy the application, use Vercel or any static hosting service:

1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy the `dist/` folder to your hosting platform.

---

## Future Enhancements

- **Monaco Editor Integration:** For advanced SQL editing with syntax highlighting.
- **Dark Mode Support:** Improved accessibility and user experience.

---

## Known Limitations

Despite the solid architecture and smooth user experience, there are several limitations to the current application due to the mock nature of the setup:

1. **Lack of Backend / Execution Engine:**

   - The application does not have a real backend or SQL execution engine. Queries are not processed, validated, or executed; they are only displayed as mock data.
   - This limits the application’s usability to real-world scenarios where actual data manipulation or querying is needed.

2. **No Query Syntax Validation:**

   - The application does not provide feedback or validation for the correctness of SQL syntax.
   - This could result in poor user experience when users attempt to input complex queries and expect some form of validation or feedback.

3. **Static Mock Data:**

   - The displayed tables are pre-defined and do not respond dynamically to the input queries.
   - Since the data is not tied to query logic, the application lacks interactivity and feels less realistic.

4. **No Page Loading Animation:**

   - In cases of slow network connectivity or heavy rendering, there is no loading indicator to improve user experience.
   - This can be problematic, especially if integrated with a backend or when large datasets are rendered in the future.

5. **Lack of Lazy Loading in SQL Editor:**
   - The application currently renders all relevant components eagerly.
   - Lazy loading could enhance performance, especially when integrating with a backend or when handling large files and data.

---

### Future Considerations

- **Implementing a Backend:** Consider integrating a lightweight Node.js or Python-based backend to handle real query execution and processing.
- **Adding Query Syntax Validation:** Integrate libraries like `sql-parser` or `Monaco Editor` for live syntax checking and error highlighting.
- **Dynamic Data Handling:** Enable the app to handle and render dynamic data based on the user’s query inputs.
- **Loading Indicators:** Implement a global or component-level loading spinner to improve the perceived performance during slow network requests.
- **Optimize Performance with Lazy Loading:** Split components using React’s `Suspense` and `lazy()` to minimize initial load time.

- No backend or actual SQL execution engine.
- Query syntax is not validated.
- Mock data is static and not tied to query logic.

---

## Contact

For any issues or suggestions, please open an issue on the repository or reach out at goyalyash311@gmail.com.

---

## Why This Project Stands Out

- ✅ **Scalable Architecture:** Clearly defined structure with isolated components and styling.
- ✅ **Deployment-Ready:** Dockerized setup allows developers to test and deploy effortlessly.
- ✅ **TypeScript Integration:** Ensures type safety and maintainability.
- ✅ **Modern Tooling:** Using Vite for fast builds and hot-reload.
- ✅ **Developer-Focused Documentation:** Comprehensive README with clear instructions.

---

Made with 💙 for the Atlan Frontend Internship Task 2025 by **Yash Goyal**.
