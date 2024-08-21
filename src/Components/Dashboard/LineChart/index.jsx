import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart({ data }) {
  // Ensure the data array is not empty
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extracting the data for the x-axis and series
  const dates = data.map((item) => item.date);
  const discussionData = [1, 3, 6]; //data.map(item => parseFloat(item.discussion));
  const questionsData = [1, 2, 5]; //data.map(item => parseFloat(item.questions));
  const pollData = [1, 2, 4]; //data.map(item => parseFloat(item.poll));

  return (
    <LineChart
      xAxis={[{ data: discussionData, questionsData, pollData }]}
      series={[
        {
          data: discussionData.length ? discussionData : [0],
          label: "Discussion",
          value: discussionData,
        },
        {
          data: questionsData.length ? questionsData : [0],
          label: "Questions",
        },
        {
          data: pollData.length ? pollData : [0],
          label: "Poll",
        },
      ]}
      height={300}
    />
  );
}
