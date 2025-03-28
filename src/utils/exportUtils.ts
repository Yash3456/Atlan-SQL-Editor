
/**
 * Exports data to CSV file and triggers download
 * @param data Array of objects to export
 * @param filename Filename without extension
 */
export function exportToCSV(data: any[], filename: string): void {
  if (!data || !data.length) {
    console.warn('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle values that need quotes (contains comma, newline or quotes)
      const escaped = String(value).replace(/"/g, '""');
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
        return `"${escaped}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  }
  
  // Create CSV content
  const csvContent = csvRows.join('\n');
  
  // Create a Blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to JSON file and triggers download
 * @param data Array of objects to export
 * @param filename Filename without extension
 */
export function exportToJSON(data: any[], filename: string): void {
  if (!data || !data.length) {
    console.warn('No data to export');
    return;
  }
  
  // Create a JSON string with pretty formatting
  const jsonContent = JSON.stringify(data, null, 2);
  
  // Create a Blob and download link
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a link and trigger download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
