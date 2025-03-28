import { styled } from "styled-components";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface HistoryItem {
  id: number;
  query: string;
  timestamp: Date;
}

interface QueryHistoryProps {
  history: HistoryItem[];
  onItemClick: (query: string) => void;
}

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const HistoryTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  max-height: 160px;

  @media (max-width: 768px) {
    max-height: 200px;
  }
`;

const EmptyHistoryText = styled(Typography)`
  padding: 1rem;
  font-size: 0.875rem;
  color: #777;
  text-align: center;
`;

export default function QueryHistory({
  history,
  onItemClick,
}: QueryHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = history.filter((item) =>
    item.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HistoryContainer>
      <HistoryTitle>Query History</HistoryTitle>
      <SearchInput
        className="input-search"
        placeholder="Search your past query..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <HistoryList>
        {filteredHistory.length === 0 ? (
          <EmptyHistoryText>No queries found.</EmptyHistoryText>
        ) : (
          filteredHistory.map((item) => (
            <div key={item.id}>
              <Typography
                variant="body2"
                style={{
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => onItemClick(item.query)}
              >
                {item.query.substring(0, 50)}
                {item.query.length > 50 ? "..." : ""}
              </Typography>
            </div>
          ))
        )}
      </HistoryList>
    </HistoryContainer>
  );
}
