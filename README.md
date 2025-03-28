# Atlan SQL Editor (Frontend Internship Task 2025)

Live Project: [atlan-sql-editor](https://atlan-sql-editor-2wx049k4q-yash3456s-projects.vercel.app/)

## 🚀 Overview

This is a mock SQL editor created as part of the Atlan Frontend Internship Task 2025. It allows users to input SQL queries, toggle between predefined queries, and view dummy table data rendered in response. This frontend-only application simulates the experience of a basic SQL playground that a data analyst might use.

## 🧠 Core Features

- **Query Input Editor:** Textarea for writing custom SQL queries.
- **Predefined Queries Dropdown:** Choose from multiple hardcoded SQL queries.
- **Mock Data Tables:** Displays dummy data tables associated with the selected query.
- **Snappy UI:** Built with responsiveness and user experience in mind.
- **Minimal & Focused Design:** Streamlined layout for a distraction-free interface.

## 🔧 Tech Stack

- **Framework:** React.js (via Vite)
- **Styling:** CSS Modules
- **Component Library:** None used to keep it minimal and dependency-free
- **Deployment:** Vercel

## 📦 Installed Dependencies

- React
- React DOM
- Vite (for bundling)

## 🕒 Load Time

- **Initial Page Load Time:** ~500ms
- **Measurement Tool:** Chrome DevTools > Performance tab

## ⚙️ Performance Optimizations

- **Lazy Rendering:** Only the currently selected table is rendered.
- **Minimal DOM Manipulation:** Optimized state handling and conditional rendering reduce unnecessary re-renders.

## 🖼️ Application Layout

```
---------------------------------------------------
| [Dropdown with Predefined Queries]             |
|------------------------------------------------|
| [SQL Input Textarea]                           |
|                                                |
|                                                |
|------------------------------------------------|
| [Result Table for Selected Query]              |
|                                                |
---------------------------------------------------
```

## 📁 Project Structure

```
src/
├── components/
│   ├── QueryEditor.jsx
│   ├── QuerySelector.jsx
│   └── ResultTable.jsx
├── data/
│   └── queries.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🗂️ ER Diagram / Data Flow

This application uses a simple flow:

1. User selects a query from the dropdown.
2. Associated SQL query text and data table update in real-time.
3. SQL query is editable but not executed (mocked only).

*No actual database or ER diagram involved due to mock nature.*

## 🎥 Video Walkthrough

📹 [Link to Video Demo](#) — _Replace with actual video link_

### Video Highlights:
- UI and user flow demonstration
- Component structure walkthrough
- Decisions on optimizations and layout
- Challenges faced (like mock data toggling and table rendering)

## ❗ Known Limitations

- No backend or SQL execution engine
- Query syntax not validated
- Mock data not tied to query logic

## ✅ Possible Improvements

- Integrate Monaco Editor for richer SQL input
- Add support for dark mode
- Paginate large data tables
- Highlight syntax using a library like `react-syntax-highlighter`

## 💬 Challenges Faced

- Balancing simplicity and responsiveness
- Managing clean state updates for query and data sync
- Ensuring table rendering doesn’t lag on toggle

## 📝 Submission Checklist

- [x] Hosted live version on Vercel
- [x] Shared GitHub repo link
- [x] Included README and video walkthrough
- [x] Clean, well-structured React codebase

---

Made with 💙 for the Atlan Frontend Internship Task
