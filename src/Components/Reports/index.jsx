import React, { useState , useEffect} from "react";
import { Outlet } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  ActiveInActiveData,
  AnalysisData,
  AnonymousData,
  CoachFeedbackData,
  CoachReportData,
  feedbackData,
} from "./ReportData";
import { ReportWrap } from "./Reports.styles";
import ReportsHeader from "./ReportsHeader";

const ReportsProfile = () => {
  const [searchQuery, setSearchQuery] = useState("");



  const handleExportData = (selectedType) => {
    let data;

    // Determine which data to use based on selectedType
    switch (selectedType) {
      case "Session Analysis":
        data = normalizeData(AnalysisData, selectedType);
        break;
      case "Anonymous Forum":
        data = normalizeData(AnonymousData, selectedType);
        break;
      case "Coach Report":
        data = normalizeData(CoachReportData, selectedType);
        break;
      case "Coach Feedback":
        data = normalizeData(CoachFeedbackData, selectedType);
        break;
      case "Active/Inactive Employee":
        data = normalizeData(ActiveInActiveData, selectedType);
        break;
      case "Feedback":
        data = normalizeData(feedbackData, selectedType);
        break;
      default:
        data = [];
    }

    console.log("Selected Type:", selectedType);
    console.log("Data to Export:", data); // Ensure this prints correctly

    // Check if data is an array and not empty
    if (!Array.isArray(data) || data.length === 0) {
      console.error("No data available to export");
      return;
    }

    try {
      // Create a worksheet from the data
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();

      // Add sheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, selectedType);

      // Save workbook to file
      XLSX.writeFile(wb, "ReportsData.xlsx");
    } catch (error) {
      console.error("Error creating or saving the Excel file:", error);
    }
  };

  const normalizeData = (data, type) => {
    console.log("Normalizing Data for Type:", type);
    console.log("Original Data:", data);

    switch (type) {
      case "Anonymous Forum":
        return data.map((item) => ({
          TypeofForum: item.TypeofForum || "N/A",
          NumberofPost: item.NumberofPost || "N/A",
        }));
      case "Coach Report":
        return data.map((item) => ({
          CoachName: item.CoachName?.text || "N/A",
          TotalSession: item.TotalSession || "N/A",
          CompletedSession: item.CompletedSession || "N/A",
          TotalEmployeeEnrolled: item.TotalEmployeeEnrolled || "N/A",
        }));
      case "Coach Feedback Analysis":
        return data.map((item) => ({
          CoachName: item.CoachName?.text || "N/A",
          // ViewFeedback: item.ViewFeedback?.image
          //   ? "Preview Available"
          //   : "No Preview",
        }));
      case "Active and Inactive Employee":
        return data.map((item) => ({
          Name: item.Name || "N/A",
          Designation: item.Designation || "N/A",
          Contact: item.Contact || "N/A",
          MailID: item.MailID || "N/A",
          LastActive: item.LastActive || "N/A",
        }));
      case "Session Feedback Analysis":
        return data.map((item) => ({
          SessionNames: item.SessionNames || "N/A",
          // ViewFeedback: item.ViewFeedback?.image
          //   ? "Preview Available"
          //   : "No Preview",
        }));
      case "Session Analysis":
        return data.map((item) => ({
          SessionName: item.SessionName || "N/A",
          TotalNumberOfSession: item.TotalNumberOfSession || "N/A",
          NoOfCoach: item.NoOfCoach || "N/A",
          TotalHours: item.TotalHours || "N/A",
          TotalEmployeeAttended: item.TotalEmployeeAttended || "N/A",
          TotalCount: item.TotalCount || "N/A",
        }));
      default:
        return [];
    }
  };
  return (
    <ReportWrap>
      <div className="header">
        <ReportsHeader
          exportData={handleExportData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="content">
        <Outlet context={{ searchQuery }} />
      </div>
    </ReportWrap>
  );
};

export default ReportsProfile;
