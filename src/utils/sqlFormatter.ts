
// A simple SQL formatter
export function formatSQL(sql: string): string {
  if (!sql.trim()) return sql;

  // List of SQL keywords for formatting
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
    'OUTER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
    'UNION', 'ALL', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP',
    'TABLE', 'VIEW', 'INDEX', 'CONSTRAINT', 'CASCADE', 'RESTRICT', 'SET',
    'INTO', 'VALUES', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'BETWEEN',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AS', 'WITH'
  ];

  // Create a regex for SQL keywords with word boundaries
  const keywordRegex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'gi');

  // Format SQL
  let formatted = sql
    // Replace multiple whitespace with a single space
    .replace(/\s+/g, ' ')
    // Add line break before keywords
    .replace(keywordRegex, '\n$1')
    // Handle parentheses
    .replace(/\(/g, '\n(\n')
    .replace(/\)/g, '\n)\n')
    // Handle commas
    .replace(/,/g, ',\n')
    // Remove extra line breaks
    .replace(/\n+/g, '\n')
    .trim();

  // Uppercase SQL keywords
  formatted = formatted.replace(keywordRegex, (match) => match.toUpperCase());

  return formatted;
}
