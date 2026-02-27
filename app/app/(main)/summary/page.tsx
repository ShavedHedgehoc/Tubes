import SummariesTable from "@/components/summaries-table";
import { TubeRecordsListResponce } from "@/lib/types";
import { Box } from "@chakra-ui/react";

async function getSummaries(): Promise<TubeRecordsListResponce> {
  const externalApiUrl = process.env.API_URL;
  const url = `${externalApiUrl}/summaries`;
  const res = await fetch(`${url}?start_date="2022-01-01&end_date="2027-01-01"&page=1&limit=30&code=`, {
    next: { revalidate: 5 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Summary() {
  const summaries = await getSummaries();
  return (
    <Box>
      <h1>Summary page</h1>
      <SummariesTable initialSummaries={summaries} />
    </Box>
  );
}
