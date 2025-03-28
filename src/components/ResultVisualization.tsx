import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import Alert from "@mui/material/Alert";

// Array of colors for the charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
];

interface ResultVisualizationProps {
  data: never[];
}

export default function ResultVisualization({
  data,
}: ResultVisualizationProps) {
  const [chartType, setChartType] = useState("bar");
  const [xAxisField, setXAxisField] = useState("");
  const [yAxisField, setYAxisField] = useState("");

  // Get all field names from the data
  const fields = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Set default fields when data or fields change
  React.useEffect(() => {
    if (fields.length > 0) {
      // Try to find numeric and non-numeric fields for better defaults
      const numericFields = fields.filter(
        (field) =>
          !isNaN(Number(data[0][field])) && typeof data[0][field] !== "boolean"
      );

      const nonNumericFields = fields.filter(
        (field) =>
          isNaN(Number(data[0][field])) || typeof data[0][field] === "boolean"
      );

      if (numericFields.length > 0 && nonNumericFields.length > 0) {
        setXAxisField(nonNumericFields[0]);
        setYAxisField(numericFields[0]);
      } else {
        setXAxisField(fields[0]);
        setYAxisField(fields.length > 1 ? fields[1] : fields[0]);
      }
    }
  }, [fields, data]);

  // Handle chart type change
  const handleChartTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newChartType: string
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  // Check if we can visualize the data
  const canVisualize = data.length > 0 && fields.length > 0;

  // If we can't visualize the data, show a message
  if (!canVisualize) {
    return (
      <Alert severity="info">
        No data available for visualization. Run a query to see results.
      </Alert>
    );
  }

  // Format data for Pie Chart (take top 5 values for clarity)
  const pieData = data.slice(0, 5).map((item) => ({
    name: String(item[xAxisField]),
    value: Number(item[yAxisField]) || 0,
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChartTypeChange}
          aria-label="chart type"
          size="small"
        >
          <ToggleButton value="bar" aria-label="bar chart">
            <BarChartIcon />
          </ToggleButton>
          <ToggleButton value="line" aria-label="line chart">
            <ShowChartIcon />
          </ToggleButton>
          <ToggleButton value="pie" aria-label="pie chart">
            <PieChartIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="x-axis-label">X-Axis</InputLabel>
          <Select
            labelId="x-axis-label"
            value={xAxisField}
            label="X-Axis"
            onChange={(e) => setXAxisField(e.target.value)}
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="y-axis-label">Y-Axis</InputLabel>
          <Select
            labelId="y-axis-label"
            value={yAxisField}
            label="Y-Axis"
            onChange={(e) => setYAxisField(e.target.value)}
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ width: "100%", height: 400 }}>
        {chartType === "bar" && (
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xAxisField}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yAxisField} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === "line" && (
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xAxisField}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={yAxisField}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === "pie" && (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, yAxisField]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      {chartType === "pie" && pieData.length > 5 && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, textAlign: "center" }}
        >
          Note: Only showing top 5 values for better visualization
        </Typography>
      )}
    </Box>
  );
}
