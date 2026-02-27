"use client";

import { TubeRecordsListResponce } from "@/lib/types";
import { Box } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SummariesTable({ initialSummaries }: { initialSummaries: TubeRecordsListResponce }) {
  const { data: summaries, error } = useSWR<TubeRecordsListResponce>(
    `api/external-data/summaries?start_date="2022-01-01&end_date="2027-01-01"&page=1&limit=30&code=`,
    fetcher,
    {
      fallbackData: initialSummaries,
      refreshInterval: 5000,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!summaries) return <div>Loading...</div>;
  return (
    <Box>
      {summaries.rows.map((row, index) => (
        <li key={row.id} style={{ marginBottom: "10px" }}>
          {index}
          {row.batch.name} {row.product.marking}
          {row.plan}
        </li>
      ))}
    </Box>
  );
}
