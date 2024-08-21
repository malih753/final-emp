import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

// const data = [
//   { value: 40 },
//   { value: 40 },
//   { value: 40 },
//   { value: 40 },
//   { value: 40 },
// ];

const size = {
  width: 400,
  height: 200,
};

export default function PieArcLabel({ data }) {
  console.log(data);

  const transformedData = data.map((item) => ({
    value: parseFloat(item.percent), // Convert percent to a number
    label: item.title, // Optional: You can also include the title if needed
    color: item.bgColor, // Use the bgColor for the arc color
  }));
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}%`,
          arcLabelMinAngle: 45,
          data: transformedData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "black",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
