import { styled } from "styled-components";

interface ResultsTableProps {
  data: {
    columns: string[];
    rows: never[];
  };
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 1rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: var(--table-header-bg);
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--table-border);
`;

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--table-border);
`;

const TableRow = styled.tr`
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export default function ResultsTable({ data }: ResultsTableProps) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            {data.columns.map((column) => (
              <TableHeader key={column}>{column.toUpperCase()}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((cell: never, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
