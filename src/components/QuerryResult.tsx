import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  styled,
  Tab,
  Tabs,
} from "@mui/material";
import { Download, BarChart, TableChart } from "@mui/icons-material";
import { exportToCSV, exportToJSON } from "../utils/exportUtils";
import ResultVisualization from "./ResultVisualization";
import ResultsTable from "./ResultsTable";

const ResultsContainer = styled(Paper)({
  padding: "1rem",
  borderRadius: "4px",
});

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const ExportButtonsContainer = styled(Box)({
  display: "flex",
  gap: "0.5rem",
});

interface ResultsTableProps {
  data: {
    columns: [];
    rows: [];
  };
}

const QueryResult: React.FC<ResultsTableProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");

  const exportData = (format: "csv" | "json") => {
    if (format === "csv") {
      exportToCSV(data.rows, "query-results");
    } else {
      exportToJSON(data.rows, "query-results");
    }
  };

  const handleChangeView = (
    event: React.SyntheticEvent,
    newValue: "table" | "chart"
  ) => {
    setViewMode(newValue);
  };

  return (
    <ResultsContainer elevation={2}>
      <HeaderContainer>
        <Typography variant="h6">Query Results</Typography>
        <ExportButtonsContainer>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => exportData("csv")}
            size="small"
          >
            CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => exportData("json")}
            size="small"
          >
            JSON
          </Button>
        </ExportButtonsContainer>
      </HeaderContainer>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={viewMode} onChange={handleChangeView}>
          <Tab
            icon={<TableChart fontSize="small" />}
            label="Table"
            value="table"
          />
          <Tab
            icon={<BarChart fontSize="small" />}
            label="Charts"
            value="chart"
          />
        </Tabs>
      </Box>

      {viewMode === "table" ? (
        <ResultsTable data={data} />
      ) : (
        <ResultVisualization data={data.rows} />
      )}
    </ResultsContainer>
  );
};

export default QueryResult;
