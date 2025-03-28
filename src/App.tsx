import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StyleSheetManager, styled } from "styled-components";
import Navbar from "./components/Navbar";
import QueryEditor from "./components/QueryEditor";
import QueryHistory from "./components/QueryHistory";
import PerformanceMetrics from "./components/PerformanceMetrics";
import { mockQueries, mockResults } from "./utils/mockData";
import "./styles/global.css";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Footer from "./components/Footer";
import QueryResult from "./components/QuerryResult";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const EditorSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const EditorContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TopControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Dropdown = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  flex: 1;
`;

const RunButton = styled.button`
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  text-transform: uppercase;

  &:hover {
    opacity: 0.9;
  }
`;

const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const SidebarPanel = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1rem;
`;

const ResultsSection = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

function Dashboard() {
  const [currentQuery, setCurrentQuery] = useState(mockQueries[0].query);
  const [selectedQueryId, setSelectedQueryId] = useState(mockQueries[0].id);
  const [results, setResults] = useState(mockResults[0]);
  const [history, setHistory] = useState([
    { id: 1, query: mockQueries[0].query, timestamp: new Date() },
  ]);
  const [executionTime, setExecutionTime] = useState(0);

  const handleQueryChange = (newQuery: string) => {
    setCurrentQuery(newQuery);
  };

  const handleQuerySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryId = Number(event.target.value);
    const selectedQuery = mockQueries.find((q) => q.id === queryId);
    if (selectedQuery) {
      setCurrentQuery(selectedQuery.query);
      setSelectedQueryId(queryId);
    }
  };

  const handleRunQuery = () => {
    const startTime = performance.now();

    // Simulate query execution
    setTimeout(() => {
      const endTime = performance.now();
      setExecutionTime(endTime - startTime);

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          query: currentQuery,
          timestamp: new Date(),
        },
      ]);

      // Show results for the corresponding query
      const resultIndex = selectedQueryId % mockResults.length;
      setResults(mockResults[resultIndex]);
    }, 500);
  };

  const handleHistoryItemClick = (query: string) => {
    setCurrentQuery(query);
  };

  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <EditorSection>
          <EditorContainer>
            <TopControls>
              <Dropdown value={selectedQueryId} onChange={handleQuerySelect}>
                {mockQueries.map((query) => (
                  <option key={query.id} value={query.id}>
                    {query.name}
                  </option>
                ))}
              </Dropdown>
              <RunButton onClick={handleRunQuery}>Run Query</RunButton>
            </TopControls>
            <QueryEditor
              value={currentQuery}
              onChange={handleQueryChange}
              onRunQuery={handleRunQuery}
            />
          </EditorContainer>

          <SidebarContainer>
            <SidebarPanel>
              <QueryHistory
                history={history}
                onItemClick={handleHistoryItemClick}
              />
            </SidebarPanel>
            <SidebarPanel>
              <SectionTitle>Performance</SectionTitle>
              <PerformanceMetrics executionTime={executionTime} />
            </SidebarPanel>
          </SidebarContainer>
        </EditorSection>
        <QueryResult data={results} />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

function AppWithAuth() {
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    return success;
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "as"}>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StyleSheetManager>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </Router>
  );
}
