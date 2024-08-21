import React, { useEffect, useState } from "react";
import { useSearch } from "../../SearchContext"; // Import your context
import { AnalysisWrap } from "./SessionAnalysis.styles";
import Table from "../../Table";
import { AnalysisCol, AnalysisData } from "../ReportData";
import { useAuth } from "../../Context/Context";
import { serverDomain } from "../../../Constants/serverDomain";

const SessionAnalysis = () => {
  const { searchTerm } = useSearch(); // Use search context
  const { companyId } = useAuth();

  const [data, setData] = useState([]);
  // Ensure searchTerm is a string and provide fallback if undefined
  const safeSearchTerm = searchTerm || "";

  // Log data for debugging
  console.log("Search Term:", safeSearchTerm);
  console.log("Data:", AnalysisData);

  // Filter data based on searchTerm
  const filteredData = data.filter((item) => {
    const name = item.SessionName || ""; // Fallback to empty string if name is undefined
    return name.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });

  console.log("Filtered Data:", filteredData);



  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${serverDomain}/reports/company/${companyId}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log(data);
        const transformedData = data.sessionAnalysis.map((i) => ({
          SessionName: i.name,
          NoOfCoach: i.numberOfCoaches,
          TotalCount: i.totalCount,
          TotalEmployeeAttended: i.totalEmployeeAttended,
          TotalHours: i.totalHours,
          TotalNumberOfSession: i.totalNumberOfSessions,
        }));
        setData(transformedData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AnalysisWrap>
      <div className="wrapper">
        <strong className="title">Session Analysis</strong>
        {filteredData.length > 0 ? (
          <Table columns={AnalysisCol} data={filteredData} border={true} />
        ) : (
          <p>No data available</p>
        )}
      </div>
    </AnalysisWrap>
  );
};

export default SessionAnalysis;
