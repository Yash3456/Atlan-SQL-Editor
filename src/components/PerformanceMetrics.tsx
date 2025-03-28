
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

interface PerformanceMetricsProps {
  executionTime: number;
}

export default function PerformanceMetrics({ executionTime }: PerformanceMetricsProps) {
  // Calculate performance rating (just for demonstration)
  const getPerformanceRating = (time: number) => {
    if (time < 300) return 'Excellent';
    if (time < 800) return 'Good';
    if (time < 1500) return 'Average';
    return 'Slow';
  };

  const getProgressColor = (time: number) => {
    if (time < 300) return 'success';
    if (time < 800) return 'info';
    if (time < 1500) return 'warning';
    return 'error';
  };

  // Calculate progress value (0-100)
  const getProgressValue = (time: number) => {
    // Inverse relationship: lower time = higher progress value
    return Math.max(0, Math.min(100, 100 - (time / 20)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">Execution Time:</Typography>
        <Typography variant="body2" fontWeight="bold">
          {executionTime.toFixed(2)} ms
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2">Performance:</Typography>
        <Typography variant="body2" fontWeight="bold">
          {getPerformanceRating(executionTime)}
        </Typography>
      </Box>
      
      <Box sx={{ mt: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={getProgressValue(executionTime)} 
          color={getProgressColor(executionTime) as "success" | "info" | "warning" | "error"}
        />
      </Box>
    </Box>
  );
}
