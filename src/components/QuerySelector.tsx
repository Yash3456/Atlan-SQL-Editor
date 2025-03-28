
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { mockQueries } from '../utils/mockData';

interface QuerySelectorProps {
  queries: typeof mockQueries;
  selectedQueryId: number;
  onSelect: (queryId: number) => void;
}

export default function QuerySelector({ queries, selectedQueryId, onSelect }: QuerySelectorProps) {
  const handleChange = (event: any) => {
    onSelect(event.target.value as number);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
      <InputLabel id="query-select-label">Select Query</InputLabel>
      <Select
        labelId="query-select-label"
        id="query-select"
        value={selectedQueryId}
        onChange={handleChange}
        label="Select Query"
      >
        {queries.map((query) => (
          <MenuItem key={query.id} value={query.id}>
            {query.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
