import React from 'react';
import { useSearch } from "../../SearchContext"; // Import search context
import Table from '../../Table';
import { CoachReportCol, CoachReportData } from '../ReportData';

const CoachReport = () => {
  const { searchTerm } = useSearch(); // Access search term from context
 
  // Ensure searchTerm is a string and provide fallback if undefined
  const safeSearchTerm = searchTerm || '';
  console.log('Search Term:', safeSearchTerm);
  console.log('Data:', CoachReportData);
  // Filter data based on searchTerm
  const filteredData = CoachReportData.filter((item) => {
    // Assuming `item.feedback` is the property you're searching against
    const feedback = item.CoachName.text || ''; // Fallback to empty string if feedback is undefined
    return feedback.toLowerCase().includes(safeSearchTerm.toLowerCase());
  });


  return (
    <div>
      <div className="wrapper">
        <strong className="title">Coach Report</strong>
        <Table columns={CoachReportCol} data={filteredData} border={true} /> {/* Use filtered data */}
      </div>
    </div>
  );
};

export default CoachReport;
